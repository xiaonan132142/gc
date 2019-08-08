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
            <div><span v-for="(item,index) in item.contents"
                       :class="[item && item.sort?'tag-class':'']">{{item.sort}}</span></div>
        </div>
        <toast v-model="showToast" type="text">{{errorMsg}}</toast>
    </div>
</template>

<script>
    import {createU3} from 'u3.js';
    import config from '../../config/ultrain';
    import {XButton, Toast} from 'vux'
    import '../assets/scss/componentView.scss'
    import {mapGetters} from 'vuex';

    export default {
        name: "componentView",
        components: {
            XButton, Toast,
        },
        props: ['parentData'],
        data() {
            return {
                list: [],
                showToast: false,
                errorMsg: '',
                balance: 0,
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
                    name: 'Check',
                    params: {id: val, from: 'checkComment'}
                })
            },
            handleRouter(item) {
                console.log(item)
                if (item.free || item.hasRead) {
                    this.$router.push({
                        name: 'Check',
                        params: item,
                    })
                } else {
                    //调用钱包
                    if (item.price > 0) {
                        this.getWallet(item)
                    }
                }
            },
            getToplist() {
                this.axios.get(this.GLOBAL.baseUrl + '/classification/getTodayRecommend', {readerId: '-QM7XbtaD'})
                    .then((res) => {
                        let {state, data} = res.data
                        if (state === 'success') {
                            this.list = data
                        }
                    })
                    .catch(err => console.log(err))
            },
            getResultlist() {
                this.axios.get(this.GLOBAL.baseUrl + '/classification/getAll', {
                    keyword: this.parentData,
                    readerId: '-QM7XbtaD'
                })
                    .then((res) => {
                        let {state, data} = res.data
                        if (state === 'success') {
                            this.list = data
                        }
                    })
                    .catch(err => console.log(err))
            },
            // 获取balance
            async getBanlance() {
                const u3 = createU3(config);
                this.balance = await u3.getCurrencyBalance({
                    code: config.pointAccount,
                    account: config.poolAccount,
                    symbol: config.symbol,
                });
            },
            getWallet(item) {
                if (item.price > this.balance) {
                    this.errorMsg = '您的积分不足';
                    this.showToast = true;
                    return;
                }
                let postData = {
                    'chainId': this.chainInfo.chainId,                 //[必填],链ID,从url的参数中获取后回填至此
                    'contract': config.pointAccount,             //[必填],如果转账UGAS,则值为"utrio.token"，否则值为具体的发币合约的owner账号
                    'action': 'transfer',                   //[必填],转账业务，值为固定的值"transfer"
                    'type': 'transfer',                     //[必填],转账业务的固定值为"transfer"
                    'bizId': new Date().getMilliseconds(),              //[必填],业务id,用来保证同一业务不会重复转账
                    'data': {
                        'payer': this.chainInfo.accountName,
                        'receiver': config.poolAccount,           //[必填],收款账号，一般为商家的账号
                        'quantity': (parseInt(this.selectCount[0]) - 2) + ' UPOINT',           //[必填],数量及单位，如果是UGAS,则比如"100.0000 UGAS"
                        'memo': 'predict to pool',                        //[必填],值可以空
                    },
                };

                let postData2 = {
                    'chainId': this.chainInfo.chainId,                 //[必填],链ID,从url的参数中获取后回填至此
                    'contract': config.pointAccount,             //[必填],如果转账UGAS,则值为"utrio.token"，否则值为具体的发币合约的owner账号
                    'action': 'transfer',                   //[必填],转账业务，值为固定的值"transfer"
                    'type': 'transfer',                     //[必填],转账业务的固定值为"transfer"
                    'bizId': new Date().getMilliseconds(),              //[必填],业务id,用来保证同一业务不会重复转账
                    'data': {
                        'payer': this.chainInfo.accountName,
                        'receiver': config.gainAccount,           //[必填],收款账号，一般为商家的账号
                        'quantity': '2 UPOINT',           //[必填],数量及单位，如果是UGAS,则比如"100.0000 UGAS"
                        'memo': 'predict to fee',                        //[必填],值可以空
                    },
                };

                let data = [postData, postData2];
                if (window.postMessage) {
                    console.log('sending data to webview...', JSON.stringify(data));
                    window.postMessage(JSON.stringify(data));
                } else {
                    throw Error('postMessage接口还未注入');
                }
            },
        },
        mounted() {
            // 调用钱包结果
            document.addEventListener('message', (e) => {
                let result = e.data;
                let {success, msg} = JSON.parse(result);
                if (success) {
                    this.getBanlance();
                } else {
                    this.errorMsg = msg;
                    this.showToast = true;
                }
            });
        },
    }
</script>
