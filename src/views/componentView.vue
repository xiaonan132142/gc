<template>
    <div>
        <div class="item-block" v-for="(item,index) in list" @click="handleRouter(item)">
            <div class="title">
                <span>{{item.title}}</span>
            </div>
            <div v-if="item.isimg" class="dec-block-img">
                <div class="left">
                    <div class="userinfo">
                        <img src="../assets/img/user.jpg" width="17px" height="17px" alt="">
                        <span>{{item.accountname}}</span>
                    </div>
                    <div class="content">附近的开发接口就分开两地分居的手机发地方</div>
                </div>
                <img src="../assets/img/eg.png" width="104px" height="77px" alt="">
            </div>
            <div v-else class="dec-block">
                <div class="userinfo">
                    <img src="../assets/img/user.jpg" width="17px" height="17px" alt="">
                    <span>{{item.accountname}}</span>
                </div>
                <div class="content">附近的开发接口就分开两地分居的手机发地方</div>
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

    export default {
        name: "componentView",
        components: {
            XButton
        },
        props:['parentData'],
        data() {
            return {
                list: [
                    {
                        id: '1',
                        avatar: '',
                        accountname: 'username',
                        date: '2019/08/16',
                        title: '啦啦啊啊了不错哦',
                        score: 98,
                        isfree: false,
                        isbuy: false,
                        price: 2,
                        isimg:true,
                        contents: [
                            {
                                id: Date.now(),
                                editModel: {
                                    decs: '1发开始的减肥开始疯狂上岛咖啡开始的房间看了世界仿佛都是开发建设的咖啡开始',
                                    imgdata: '',
                                },
                            },
                            {
                                id: Date.now(),
                                editModel: {
                                    decs: '1发开始的减肥开始疯狂上岛咖啡开始的房',
                                    imgdata: '',
                                },
                            },
                            {
                                id: Date.now(),
                                editModel: {
                                    decs: '1发开始的减肥开始疯狂上岛咖啡开始的房发开始的减肥开始疯狂上岛咖啡开始的房发开始的减肥开始疯狂上岛咖啡开始的房',
                                    imgdata: '',
                                },
                            }
                        ],
                    },
                    {
                        id: '2',
                        avatar: '',
                        accountname: 'username',
                        date: '2019.08.16',
                        title: '啦啦啊啊',
                        score: 98,
                        isfree: true,
                        isbuy: false,
                        price: 4,
                        isimg:false,
                        contents: [
                            {
                                id: Date.now(),
                                editModel: {
                                    decs: '1发开始的减肥开始疯狂上岛咖啡开始的房间看了世界仿佛都是开发建设的咖啡开始',
                                    imgdata: '',
                                },
                            },
                            {
                                id: Date.now(),
                                editModel: {
                                    decs: '1发开始的减肥开始疯狂上岛咖啡开始的房',
                                    imgdata: '',
                                },
                            },
                            {
                                id: Date.now(),
                                editModel: {
                                    decs: '1发开始的减肥开始疯狂上岛咖啡开始的房发开始的减肥开始疯狂上岛咖啡开始的房发开始的减肥开始疯狂上岛咖啡开始的房',
                                    imgdata: '',
                                },
                            }]
                    },
                    {
                        id: '3',
                        avatar: '',
                        accountname: 'username',
                        date: '2019.08.16',
                        title: '啦啦啊啊是否觉得是开发商分慧生对冯绍峰',
                        score: 98,
                        isfree: false,
                        isbuy: true,
                        price: 4,
                        isimg:false,
                    },
                    {
                        id: '4',
                        avatar: '',
                        accountname: 'username',
                        date: '2019.08.16',
                        title: '啦啦啊啊了不错哦',
                        score: 98,
                        isfree: false,
                        isbuy: false,
                        price: 2,
                        isimg:false,
                    },
                    {
                        id: '5',
                        avatar: '',
                        accountname: 'username',
                        date: '2019.08.16',
                        title: '啦啦啊啊了不错哦',
                        score: 98,
                        isfree: false,
                        isbuy: false,
                        price: 2,
                        isimg:false,
                    },
                    {
                        id: '6',
                        avatar: '',
                        accountname: 'username',
                        date: '2019.08.16',
                        title: '啦啦啊啊了不错哦',
                        score: 98,
                        isfree: false,
                        isbuy: false,
                        price: 2,
                        isimg:false,
                    },
                ],
            }
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
                if (!item.isfree && !item.isbuy) {
                    //调用钱包
                    return
                }
                this.$router.push({
                    name: 'Check',
                    params: item,
                })
            },
            getToplist() {
                this.axios.get(this.GLOBAL.baseUrl + '/classification/getAll')
                    .then((res) => {
                        let {state, data} = res.data
                        if (state === 'success') {
                            this.list =  data
                        }
                    })
                    .catch(err => console.log(err))
            },
            getResultlist() {
                this.axios.get(this.GLOBAL.baseUrl + '/classification/getAll',{keyword:this.parentData})
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
