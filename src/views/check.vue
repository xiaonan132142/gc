<template>
    <div class="gc-check">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="content-wrap">
            <div class="title">{{parentData.title}}</div>
            <div class="article-info">
                <div class="author">
                    <img src="../assets/img/user.jpg" width="25px" height="25px" alt="">
                    <span class="name">accountname</span>
                </div>
                <span class="date">2019/07/19</span>
            </div>
            <div class="single-block" v-for="(item,index) in parentData.contents">
                <div class="step">第{{index+1}}步</div>
                <div class="desc">{{item.desc}}</div>
                <img :src="item.image" width="100%" height="181px" alt="">
            </div>
            <div class="comment-list">
                <div class="title">评价</div>
                <div class="comment-item" v-for="(item,index) in commentList">
                    <img class="avatar" src="../assets/img/user.jpg" alt="">
                    <div class="comment-info">
                        <span class="accountname">{{item.accountname}}</span>
                        <span class="content">{{item.content}}</span>
                        <span class="date">{{item.date}}</span>
                    </div>
                </div>
            </div>
            <div class="comment" v-if="showComment">
                <checker
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
                                <span class="num">2</span>
                            </div>
                        </template>
                    </checker-item>
                    <checker-item key="-1" value="-1">
                        <template>
                            <div class="item-wrap">
                                <img v-if="radioValue!='-1'" src="../assets/img/sad.png" width="24px" height="22px"
                                     alt="">
                                <img v-else src="../assets/img/sadSelect.png" width="24px" height="22px" alt="">
                                <span class="num">2</span>
                            </div>
                        </template>
                    </checker-item>
                </checker>
                <x-input @on-blur="submit" class="areablock" :max="50" placeholder="发表你的观点吧"
                         v-model="comment"></x-input>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import '../assets/scss/check.scss'
    import {Checklist, XInput, XButton, Checker, CheckerItem} from 'vux'

    export default {
        name: "check",
        components: {
            Checklist, XInput, XButton, Checker, CheckerItem
        },
        data() {
            return {
                showComment: true,
                isComment: true,
                parentData: {},
                commentList: [
                    {
                        avatar: '',
                        accountname: '11111',
                        content: '收到回复速度较快放寒假看对方收到回复速度较快放寒假看对方收到回复速度较快放寒假看对方',
                        date: '2019/07.19'
                    },
                    {avatar: '', accountname: '11111', content: '收到回复速度较快放寒假看对方', date: '2019/07.19'},
                    {avatar: '', accountname: '11111', content: '收到回复速度较快放寒假看对方', date: '2019/07.19'},
                ],
                radioValue: '',
                comment: '',
                articleId: '',
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ]),
        },
        created() {
            this.parentData = this.$route.params
            console.log(this.parentData)
            let {_id, from} = this.parentData
            this.showComment = !(from === 'checkComment')
            this.articleId = _id
        },
        methods: {
            goback() {
                this.$router.go(-1)
            },
            changeCheck(val) {
                console.log(val)
                this.radioValue = val
                let params = {
                    userId:'111',
                    classificationId: this.parentData._id,
                    attitude:  this.radioValue,
                }
                this.axios.post(this.GLOBAL.baseUrl + '/comment/addAttitude',params)
                    .then((res)=>{
                        let {state,data} = res.data
                    })
                    .catch(err=>console.log(err))
            },
            submit() {
                let params = {
                    userId:'111',
                    classificationId: this.parentData._id,
                    content:  this.comment,
                }
                this.axios.post(this.GLOBAL.baseUrl + '/comment/addContent',params)
                    .then((res)=>{
                        let {state,data} = res.data
                    })
                    .catch(err=>console.log(err))
            },
        },
    }
</script>

<style scoped lang="scss">

</style>
