<template>
    <div class="mine-wraper">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="mine-header">
            <span class="name">似懂非懂分</span>
            <img src="../assets/img/user.jpg" class="avatar-b" alt="avator">
        </div>
        <div class="mine-opration">
            <div class="opration-item">
                <span class="key">垃圾币</span>
                <span class="key">{{balance}}</span>
            </div>
            <div class="opration-item" @click="handleRouter('public')">
                <span class="key">已发布</span>
                <div class="item">
                    <span class="keyvalue"></span>
                    <img src="../assets/img/arrow-right.png" width="9px" height="15px" alt="">
                </div>
            </div>
            <div class="opration-item" @click="handleRouter('hasRead')">
                <span class="key">已阅读</span>
                <div class="item">
                    <span class="keyvalue"></span>
                    <img src="../assets/img/arrow-right.png" width="9px" height="15px" alt="">
                </div>
            </div>
        </div>
        <x-button class="public-btn" type="primary" @click.native="handlePub">发布</x-button>
    </div>
</template>

<script>
    import {createU3} from 'u3.js';
    import config from '../../config/ultrain';
    import store from '../store';
    import '../assets/scss/mine.scss'
    import {XButton, ButtonTab, ButtonTabItem} from 'vux'
    import {mapGetters} from 'vuex'

    export default {
        name: "mine",
        components: {XButton, ButtonTab, ButtonTabItem},
        data() {
            return {
                tabIndex: 0,
                balance:0,
            }
        },
        computed: {
            ...mapGetters([
                'chainInfo'
            ]),
        },
        created(){
            this.getBanlance()
        },
        methods: {
            goback() {
                this.$router.push('/')
            },
            handleRouter(name) {
               this.$router.push('ArticleComponent')
               let obj={
                   value:name
               }
               store.commit('SET_MINEOBJ',obj)
            },
            handlePub(){
                this.$router.push('Public')
            },
            // 获取balance
            async getBanlance() {
                const u3 = createU3(config);
                let balance = await u3.getCurrencyBalance({
                    code: config.pointAccount,
                    account: this.chainInfo.accountName,
                    symbol: config.symbol,
                });
                this.balance = balance&&balance[0]
            },
        },
    }
</script>
