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
                toplist:[],
            };
        },
        computed: {
            ...mapGetters([
                'chainInfo'
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
                cache.set('keyword',this.keyword)
            },
        },
        mounted() {
            this.$refs.toplist.getToplist()
            console.log(this.chainInfo)
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
