<template>
    <div class="gc-index">
        <div class="header">
            <img class="logo" src="../assets/img/logo.png" alt="">
            <x-input v-model="keyword"  @on-blur="search" class="weui-vcode"
                     placeholder="请输入查询垃圾">
                <img style="margin-right: 10px" slot="label" src="../assets/img/search.png" width="21" height="20">
            </x-input>
        </div>
        <div class="opration">
            <span>今日推荐</span>
            <button class="btn personc" @click="handleRouter('Mine')">个人中心</button>
        </div>
        <div class="top-list">
            <componentView ref="toplist"></componentView>
        </div>
    </div>
</template>

<script>
    import cache from '@/utils/cache';
    import store from '../store';
    import componentView from './componentView'
    import {
        TransferDomDirective as TransferDom,
        XInput,
        Group,
        XButton,
    } from 'vux';
    import '../assets/scss/indexStyle.scss';
    import {mapGetters} from 'vuex';

    export default {
        directives: {
            TransferDom,
        },
        components: {
            XInput, Group, XButton, componentView
        },
        data() {
            return {
                keyword: '',
                toplist: [
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
            };
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ]),
        },
        methods: {
            handleRouter(name) {
                this.$router.push(name)
            },
            search() {
                this.$router.push({
                    name: 'Search',
                    params: {keyword: this.keyword}
                });
            },
        },
        mounted() {
            this.$refs.toplist.getToplist()
        },
        beforeCreate() {
            let obj = {
                chainId: this.$route.query.chainId,
                userId: this.$route.query.userId,
                phoneNum: this.$route.query.phoneNum,
                accountName: this.$route.query.accountName,
            };
            store.commit('SET_CHAININFO', obj);
        },
    };
</script>
