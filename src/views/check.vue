<template>
  <div class="gc-check">
    <button @click="goback" class="btn goback-btn">返回上一层</button>
    <div class="content-wrap">
      <div class="title">{{modelData.title}}</div>
      <div class="article-info">
        <div v-if="modelData.user" class="author">
          <img :src="modelData.user.avatar" width="25px" height="25px" alt="">
          <span class="name">{{modelData.user.username}}</span>
        </div>
        <span class="date">{{modelData.createdAt}}</span>
      </div>

      <div v-if="showComment" class="single-block">
        <div class="desc">{{modelData.desc + '属于' + modelData.sort }}</div>
        <img :src="modelData.image" width="100%" height="181px" alt="">
        <div class="tag-class">{{modelData.sort}}</div>
      </div>

      <div class="comment-list" v-if="commentList">
        <div class="title">评价</div>
        <div class="comment-item" v-for="(item,index) in commentList">
          <div class="user">
            <img class="avatar" :src="item.user.avatar" width="38px" height="38px" alt="">
            <span class="accountname">{{item.user.username}}</span>
          </div>

          <div class="comment-info" v-for="itm in item.contents">
                        <span class="content">
                            <img v-if="item.attitude=='1'" src="../assets/img/goodSelect.png" width="12px" height="11px"
                                 alt="">
                            <img v-if="item.attitude=='-1'" src="../assets/img/sadSelect.png" width="12px" height="11px"
                                 alt="">
                            <span v-if="item.contents">{{itm.desc}}</span>
                        </span>
            <span v-if="item.contents" class="date">{{itm.time}}</span>
          </div>
        </div>
      </div>

      <div class="comment" v-if="showComment">
        <checker
          type="radio"
          :radio-required="isrequired"
          :max="1"
          @on-change="changeCheck"
          v-model="radioValue"
          default-item-class="defalut-class"
          selected-item-class="selected-class"
        >
          <checker-item key="1" value="1">
            <template>
              <div class="item-wrap">
                <img v-if="radioValue!='1'" src="../assets/img/good.png" width="24px" height="22px"
                     alt="">
                <img v-else src="../assets/img/goodSelect.png" width="24px" height="22px" alt="">
                <span class="num">{{modelData.upCount}}</span>
              </div>
            </template>
          </checker-item>
          <checker-item key="-1" value="-1">
            <template>
              <div class="item-wrap">
                <img v-if="radioValue!='-1'" src="../assets/img/sad.png" width="24px" height="22px"
                     alt="">
                <img v-else src="../assets/img/sadSelect.png" width="24px" height="22px" alt="">
                <span class="num">{{modelData.downCount}}</span>
              </div>
            </template>
          </checker-item>
        </checker>
        <x-input @on-blur="submit" class="areablock" :max="50" placeholder="发表你的观点吧" v-model="comment"></x-input>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import '../assets/scss/check.scss';
  import { Checklist, XInput, XButton, Checker, CheckerItem } from 'vux';

  export default {
    name: 'check',
    components: {
      Checklist, XInput, XButton, Checker, CheckerItem,
    },
    data() {
      return {
        isrequired: true,
        showComment: true,
        isComment: true,
        parentData: {},
        commentList: [],
        radioValue: '',
        comment: '',
        modelData: {},
      };
    },
    computed: {
      ...mapGetters([
        'chainInfo',
      ]),
    },
    mounted() {
      this.parentData = this.$route.params;
      let { _id, from } = this.parentData;
      this.getArticle(_id);
      this.setRead(_id);
      // 查看评价不可评价
      this.showComment = !(from === 'checkComment');
    },
    methods: {
      goback() {
        this.$router.go(-1);
      },
      getArticle(id) {
        this.axios.get(this.GLOBAL.baseUrl + `/classification/getById?id=${id}`)
          .then(res => {
            let { state, data } = res.data;
            if (state === 'success') {
              this.modelData = data;
              this.commentList = data.comments;
              this.commentList.forEach(item => {
                if (item.user.userId == this.chainInfo.userId) {
                  this.radioValue = item.attitude;
                }
              });
            }
          })
          .catch(err => console.log(err));
      },
      setRead(id) {
        let params = {
          userId: this.chainInfo.userId,
          classificationId: id,
        };
        this.axios.post(this.GLOBAL.baseUrl + '/read/add', params)
          .then(res => {
            let { state, data } = res.data;
          })
          .catch(err => console.log(err));
      },
      changeCheck(val) {
        console.log(val);
        this.radioValue = val;
        let params = {
          userId: this.chainInfo.userId,
          classificationId: this.parentData._id,
          attitude: this.radioValue,
        };
        this.axios.post(this.GLOBAL.baseUrl + '/comment/addAttitude', params)
          .then((res) => {
            let { state, data } = res.data;
            if (state === 'success') {
              this.getArticle(this.parentData._id);
            }
          })
          .catch(err => console.log(err));
      },
      submit() {
        let params = {
          userId: this.chainInfo.userId,
          classificationId: this.parentData._id,
          content: this.comment,
        };
        this.axios.post(this.GLOBAL.baseUrl + '/comment/addContent', params)
          .then((res) => {
            let { state, data } = res.data;
            if (state === 'success') {
              this.getArticle(this.parentData._id);
            }
          })
          .catch(err => console.log(err));
      },
    },
  };
</script>

<style scoped lang="scss">

</style>
