<template>
    <div class="gc-index" style="color:#fff">
        <button class="btn avatarBtn" @click="handleRouter('Mine')">
            <img src="../assets/img/user.jpg" class="avatar-s" alt="avator">
        </button>
        <x-input title="搜索" class="weui-vcode">
            <x-button slot="right" type="primary" mini>搜索一下</x-button>
        </x-input>
    </div>
</template>

<script>
    import {createU3} from 'u3.js';
    import store from '../store';
    import config from '../../config/ultrain';
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
            XInput,Group,XButton,
        },
        data() {
            return {

            };
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ]),
        },
        methods: {
            // 获取balance
            async getBanlance() {
                const u3 = createU3(config);
                const balance = await u3.getCurrencyBalance({
                    code: config.pointAccount,
                    account: config.poolAccount,
                    symbol: config.symbol,
                });
                this.userBanlance = userbalance.length ? userbalance[0].split(' ')[0] : 0;
            },
            handleRouter(name){
                this.$router.push(name)
            },
            // 提交预言
            // sureGuess() {
            //     if (this.selectCount.length) {
            //         if (this.selectCount[0] > this.userBanlance) {
            //             this.errorMsg = '您的积分不足';
            //             this.showToast = true;
            //             return;
            //         }
            //         let postData = {
            //             'chainId': this.chainInfo.chainId,                 //[必填],链ID,从url的参数中获取后回填至此
            //             'contract': config.pointAccount,             //[必填],如果转账UGAS,则值为"utrio.token"，否则值为具体的发币合约的owner账号
            //             'action': 'transfer',                   //[必填],转账业务，值为固定的值"transfer"
            //             'type': 'transfer',                     //[必填],转账业务的固定值为"transfer"
            //             'bizId': new Date().getMilliseconds(),              //[必填],业务id,用来保证同一业务不会重复转账
            //             'data': {
            //                 'payer': this.chainInfo.accountName,
            //                 'receiver': config.poolAccount,           //[必填],收款账号，一般为商家的账号
            //                 'quantity': (parseInt(this.selectCount[0]) - 2) + ' UPOINT',           //[必填],数量及单位，如果是UGAS,则比如"100.0000 UGAS"
            //                 'memo': 'predict to pool',                        //[必填],值可以空
            //             },
            //         };
            //
            //         let postData2 = {
            //             'chainId': this.chainInfo.chainId,                 //[必填],链ID,从url的参数中获取后回填至此
            //             'contract': config.pointAccount,             //[必填],如果转账UGAS,则值为"utrio.token"，否则值为具体的发币合约的owner账号
            //             'action': 'transfer',                   //[必填],转账业务，值为固定的值"transfer"
            //             'type': 'transfer',                     //[必填],转账业务的固定值为"transfer"
            //             'bizId': new Date().getMilliseconds(),              //[必填],业务id,用来保证同一业务不会重复转账
            //             'data': {
            //                 'payer': this.chainInfo.accountName,
            //                 'receiver': config.gainAccount,           //[必填],收款账号，一般为商家的账号
            //                 'quantity': '2 UPOINT',           //[必填],数量及单位，如果是UGAS,则比如"100.0000 UGAS"
            //                 'memo': 'predict to fee',                        //[必填],值可以空
            //             },
            //         };
            //
            //         let data = [postData, postData2];
            //         if (window.postMessage) {
            //             console.log('sending data to webview...', JSON.stringify(data));
            //             window.postMessage(JSON.stringify(data));
            //         } else {
            //             throw Error('postMessage接口还未注入');
            //         }
            //     } else {
            //         this.errorMsg = '请选择预言积分';
            //         this.showToast = true;
            //     }
            // },
        },
        created() {

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
        mounted() {


        },
    };
</script>
