<template>
  <div class="gbt-mine">
    <button @click="goback" class="btn goback-btn">返回上一层</button>
    <div class="gbt-mine-header">
      <img :src="userInfo.avatar" width="69px" height="69px" style="border-radius: 69px" alt="">
      <span class="name">{{userInfo.username}}</span>
      <div class="price">
        <img
          src="data:image/png;base64,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"
          width="23px" height="23px" alt="">
        <span class="count">X{{rankInfo.awardTimes}}</span>
        <span class="desc">金蛋奖励</span>
      </div>
    </div>
    <div class="gbt-mine-content">
      <div class="info">
        <div><p class="rank">{{rankInfo.predictRank}}</p>
          <p class="desc">活跃度排行</p></div>
        <div><p class="rank">{{rankInfo.winRank}}</p>
          <p class="desc">胜率排行</p></div>
        <div><p class="rank">{{(rankInfo.winRatio*100).toFixed(2)}}%</p>
          <p class="desc">胜率</p></div>
        <div><p class="rank">{{rankInfo.predictTimes}}</p>
          <p class="desc">预言战绩</p></div>
      </div>
      <div class="tab">
        <div class="btns" ref="tabbtns">
          <button class="btn tab-btn active" @click="handleTab($event,'我的预言')">我的预言</button>
          <button class="btn tab-btn" @click="handleTab($event,'我的奖励')">我的奖励</button>
        </div>
        <div class="list">
          <div class="list-block" v-for="(itm,index) of tableData[tabIndex]" :key="index">
            <div class="block-item" v-if="tabIndex=='我的预言'" @click="toRouter(itm)">
              <p class="item">
                <span class="sp1">{{itm.predictValue}}积分预言</span>
                <span class="sp2">{{itm.date}}</span>
              </p>
              <p class="item item-sub">
                <span class="sp3" v-if="itm.status=='success'">{{itm.price}}积分</span>
                <span class="sp3"><span v-if="itm.isFinished">{{itm.isWin?'成功':'失败'}}</span><span
                  v-else>待公布</span></span>
                <button class="btn"><img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAgCAMAAAAlvKiEAAAASFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACrhKybAAAAGHRSTlMAbAVoZFhOLicIYV0WMyIdEEg6GhQNU0GSAe2jAAAAoElEQVQoz23SQRKAIAwDQItVBFFBAf//U4s3UjjuBGZSOk0mmEkdy6mgBSZaUc09izpQ17RmzFrR5cF3N9E9qiyL6qwXPVEfUa/03In4xHLXQjRb1CjKVjWuo2xeiehWlZNkX8iaAcZ2/XXqyfnoc2VpBkV/M6oQb70F3wzGIebB/iFfMOJmua+xtY/rc+4Qq2GwDGWwNup7D05iqJdD+gBcpAWVGGA0BwAAAABJRU5ErkJggg=="
                  width="7px" height="11px"
                  alt=""></button>
              </p>
            </div>
            <div class="block-item" v-else-if="tabIndex=='我的奖励'">
              <p class="item-sub">
                <span class="sp1">金蛋来访</span>
                <span class="sp2">{{itm.date}}</span>
              </p>
              <p class="item item-sub">
                <span class="sp3">领取{{itm.result}}积分</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <toast v-model="showToast" type="text">{{errorMsg}}</toast>
  </div>
</template>

<script>
  import { Toast } from 'vux';
  import '../assets/scss/mine.scss';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      Toast,
    },
    name: 'mine',
    data() {
      return {
        showToast: false,
        errorMsg: '',
        tabIndex: '我的预言',
        tableData: {},
      };
    },
    created() {
      this.tabIndex = this.$route.params.index == 0 ? '我的预言' : '我的奖励';
    },
    computed: {
      ...mapGetters([
        'userInfo',
        'rankInfo',
        'chainInfo',
      ]),
    },
    async mounted() {
      if (this.$route.params && this.$route.params.index == 1) {
        this.handleTabPrice();
        this.tabIndex = '我的奖励';
      } else {
        this.tabIndex = '我的预言';
      }
      await this.getTableData();
    },
    methods: {
      async getTableData() {
        let map = new Map();
        let predictlist = await this.getList(`/predict/personal?userId=${this.chainInfo.userId}`);
        let pricelist = await this.getList(`/award/personal?userId=${this.chainInfo.userId}`);
        map.set('我的预言', predictlist);
        map.set('我的奖励', pricelist);
        console.log(pricelist);
        let obj = {};
        for (let [key, value] of map) {
          obj[key] = value;
        }
        this.tableData = obj;
      },
      getList(url) {
        const promise = new Promise((resolve, reject) => {
          this.axios.get(this.GLOBAL.baseUrl + url)
            .then((res) => {
              resolve(res.data.data);
            }).catch((err) => {
            reject(err);
          });
        });
        return promise;
      },
      goback() {
        this.$router.go(-1);
      },
      handleTab(e, val) {
        let eles = this.$refs.tabbtns.querySelectorAll('button');
        eles.forEach(item => {
          item.className = 'btn tab-btn';
        });
        e.target.className = 'btn tab-btn active';
        this.tabIndex = val;
      },
      handleTabPrice() {
        let eles = this.$refs.tabbtns.querySelectorAll('button');
        eles.forEach(item => {
          item.className = 'btn tab-btn';
        });
        eles[1].className = 'btn tab-btn active';
      },
      toRouter(itm) {
        console.log(itm);
        this.$router.push({
          name: 'MineDetails',
          params: itm,
        });
      },
    },
  };
</script>


