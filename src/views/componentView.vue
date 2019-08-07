<template>
    <div>
        <div class="item-block" v-for="(item,index) in list" @click="handleRouter(item)">
            <div class="title">
                <span>{{item.title}}</span>
            </div>
            <div v-if="item.contents && item.contents[0].image" class="dec-block-img">
                <div class="left">
                    <div class="userinfo">
                        <img src="../assets/img/user.jpg" width="17px" height="17px" alt="">
                        <span>{{item.accountName}}</span>
                    </div>
                    <div class="content">{{item.contents[0].desc}}</div>
                </div>
                <img src="../assets/img/eg.png" width="104px" height="77px" alt="">
            </div>
            <div v-else class="dec-block">
                <div class="userinfo">
                    <img src="../assets/img/user.jpg" width="17px" height="17px" alt="">
                    <span>{{item.accountName}}</span>
                </div>
                <div class="content">{{item.contents&&item.contents[0].desc}}</div>
            </div>
            <div class="article-info">
                <div class="info">
                    <span class="price" v-if="!item.free">{{item.price}} 垃圾币</span>
                    <span class="comment">1条评论</span>
                    <span>{{item.date}}</span>
                </div>
                <button class="btn check-btn" @click.stop="checkComment(item.id)">查看评论</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {XButton} from 'vux'
    import '../assets/scss/componentView.scss'
    import {mapGetters} from 'vuex';
    export default {
        name: "componentView",
        components: {
            XButton
        },
        props:['parentData'],
        data() {
            return {
                list:[],
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ]),
        },
        methods: {
            goback() {
                this.$router.go(-1)
            },
            checkComment(val) {
                this.$router.push({
                    name:'Check',
                    params:{id:val,from:'checkComment'}
                })
            },
            handleRouter(item) {
                console.log(item)
                if(item.free||item.hasRead){
                    this.$router.push({
                        name: 'Check',
                        params: item,
                    })
                }else{
                    //调用钱包
                    return
                }
            },
            getToplist() {
                this.axios.get(this.GLOBAL.baseUrl + '/classification/getTodayRecommend',{readerId:'-QM7XbtaD'})
                    .then((res) => {
                        let {state, data} = res.data
                        if (state === 'success') {
                            this.list =  data
                        }
                    })
                    .catch(err => console.log(err))
            },
            getResultlist() {
                this.axios.get(this.GLOBAL.baseUrl + '/classification/getAll',{keyword:this.parentData,readerId:'-QM7XbtaD'})
                    .then((res) => {
                        let {state, data} = res.data
                        if (state === 'success') {
                            this.list =  data
                        }
                    })
                    .catch(err => console.log(err))
            },
        },
    }
</script>
