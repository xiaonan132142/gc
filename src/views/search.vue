<template>
    <div class="gc-search">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="search-list">
            <div class="item-block" v-for="(item,index) in list" @click="handleRouter(item)">
                <div class="dec-block">
                    <div class="userinfo">
                        <img src="../assets/img/user.jpg" width="30px" height="30px" alt="">
                        <span>{{item.accountname}}</span>
                    </div>
                    <span class="date">{{item.date}}</span>
                </div>
                <div class="dec-block">
                    <div class="title-w">
                        <span class="title">{{item.title}}</span>
                        <span>{{item.score}}分</span>
                    </div>
                    <div class="info-w">
                        <span><span v-if="item.isfree">free</span><span v-else>{{item.tokens}} largeBee</span></span>
                        <span v-if="!item.isfree && !item.isbuy"><x-button @click.native="toBuy(item.id)" type="primary" class="clock">解锁</x-button></span>
                    </div>
                </div>
                <x-button class="check-btn" @click.native.stop="checkComment(item.id)">查看评论</x-button>
            </div>
        </div>
        <toast v-model="showToast" position="middle" type="warn">{{errorMsg}}</toast>
    </div>
</template>

<script>
    import {XButton, Toast} from 'vux'
    import '../assets/scss/search.scss'

    export default {
        name: "search",
        components: {
            XButton, Toast
        },
        data() {
            return {
                showToast: false,
                errorMsg: '',
                list: [
                    {
                        id: '1',
                        avatar: '',
                        accountname: 'username',
                        date: '2019.08.16',
                        title: '啦啦啊啊了不错哦',
                        score: 98,
                        isfree: false,
                        isbuy: false,
                        tokens: 2,
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
                        tokens: 4,
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
                        tokens: 4
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
                        tokens: 2
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
                        tokens: 2
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
                        tokens: 2
                    },
                ],
            }
        },
        methods: {
            goback() {
                this.$router.go(-1)
            },
            checkComment(val) {
                console.log(val)
                this.$router.push({
                    name:'Comments',
                    params:{id:val}
                })
            },
            toBuy(val) {
                console.log(val)
            },
            handleRouter(item) {
                if (!item.isfree && !item.isbuy) {
                    this.showToast = true
                    this.errorMsg = '请先解锁'
                    return
                }
                this.$router.push({
                    name: 'Check',
                    params: item,
                })
            },
        },
    }
</script>


