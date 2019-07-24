<template>
    <div class="btc-index">
        <div class="bg">
            <indexHeader ref="indexHeader" @toRouterActiveRule="toRouterActiveRule"/>
            <indexChart ref="indexChart"/>
            <div class="operation">
                <div class="operation-page">
                    <button @click="toRouter('dialog')" class="btn operation-btn"><img
                            src="data:image/png;base64,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"
                            width="47px" height="47px" alt=""></button>
                    <div class="operation-text" v-if="!status">
                        <div>你还未预言哦</div>
                        <div>截止本交易日22:30</div>
                    </div>
                    <button @click="toRouter('price')" class="btn operation-btn"><img
                            src="data:image/png;base64,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"
                            width="47px" height="47px" alt=""></button>
                </div>
                <div class="user-operation">
                    <div class="date">
                        <span class="sp1">{{date}}BTC指数</span>
                        <span class="sp2">{{userOperation.price}} {{userOperation.ratio}}</span>
                    </div>
                    <div class="rate">
                        <div id="upbar" class="bar" style="width: 59%">
                            <img width="100%" height="100%" src="../assets/img/redbar.png" alt="">
                        </div>
                        <div id="downbar" class="bar" style="width: 41%">
                            <img width="100%" height="100%" src="../assets/img/greenbar.png" alt="">
                        </div>
                    </div>
                    <div class="guess-btn" v-if="!status">
                        <button @click="lookUpDown('up')" class="btn guess-sub-btn"><img width="100%" height="64px"
                                                                                         src="../assets/img/redbtn.png"
                                                                                         alt="">
                        </button>
                        <button @click="lookUpDown('down')" class="btn"><img width="100%" height="64px"
                                                                             src="../assets/img/greenbtn.png" alt="">
                        </button>
                    </div>
                    <div class="guessed-text" v-if="status">
                        <p>您已预言<span v-if="predictInfo.predictResult>0" style="color:#C34E4C">涨</span><span v-else
                                                                                                            style="color:#36884A">跌</span>
                        </p>
                        <p class="p1">预计下一个交易日00:30结果揭晓</p>
                    </div>
                </div>
                <div>每个交易日涨跌仅可预言一次,每次可投20-500ultrain积分</div>
            </div>
        </div>
        <indexTab @toRouter="toRouter" @handleToMore="handleToMore"/>
        <div v-transfer-dom>
            <x-dialog @on-hide="closeShowDialog" v-model="showDialog" hide-on-blur
                      :dialog-style="{'max-width': '100%',width:'289px', height: '282px', 'background-color': '#001436','border-radius':'22px'}">
                <div class="dialog-wrap"
                     style="width: 100%;height: 100%;padding:15px 19px 0 19px;text-align: center;font-size: 12px;">
                    <div style="text-align: right;margin-right: -4px">
                        <x-icon @click="closeShowDialog" type="ios-close-empty" size="24"
                                style="fill:#7A8496;"></x-icon>
                    </div>
                    <p style="font-size: 18px;font-weight: 700;color:#FFD600;">预言{{nextDate}}大盘指数涨跌</p>
                    <p style="display: flex;justify-content: space-between;margin:30px 0 15px;"><span
                            style="color: #78BAEC">每次预言扣除2积分手续费</span><span
                            style="color: #fff">我的积分:{{userBanlance}}</span></p>
                    <div style="display: flex;justify-content: space-between">
                        <button
                                :style="[{backgroundColor:selectCount.indexOf(item)>-1?'#FFD600':'#0A2A5B'},{color:selectCount.indexOf(item)>-1?'#001436':'#fff'}]"
                                @click="handleSelectCount(item)"
                                style="width: 54px;height:34px;border:0;background-color: #0A2A5B;border-radius: 3px;color:#fff;font-size: 21px;font-weight: bold;display: flex;justify-content: center"
                                v-for="item in countlist">{{item}}
                        </button>
                    </div>
                    <button @click="sureGuess" v-if="statusUpDown=='up'"
                            style="margin-top: 33px;padding:0;width: 100%;height: 65px;border:0;background:none"><img
                            width="100%" height="65px" src="../assets/img/sureRedbtn.png" alt=""></button>
                    <button @click="sureGuess" v-if="statusUpDown!=='up'"
                            style="margin-top: 33px;padding:0;width: 100%;height: 65px;background: none;border:0;"><img
                            width="100%" height="65px" src="../assets/img/sureGreenbtn.png" alt=""></button>
                </div>
            </x-dialog>
            <toast v-model="showToast" type="text">{{errorMsg}}</toast>
        </div>
        <div v-transfer-dom>
            <x-dialog @on-hide="changeResultRead(predictInfo._id)" v-model="showResultDialog" hide-on-blur
                      :dialog-style="{'max-width': '100%',width:'289px', height: '282px', 'background-color': '#001436','border-radius':'22px'}">
                <div class="dialog-wrap"
                     style="width: 100%;height: 100%;padding:15px 19px 0 19px;text-align: center;font-size: 12px;">
                    <div style="text-align: right;margin-right: -4px">
                        <x-icon @click="changeResultRead(predictInfo._id)" type="ios-close-empty" size="24"
                                style="fill:#7A8496;"></x-icon>
                    </div>
                    <p style="font-size: 18px;font-weight: 700;color:#FFD600;display: flex"><span
                            style="flex:1;text-align: left">{{predictInfo.date}}大盘指数</span><span
                            style="width: 20px;color:#fff;">{{predictInfo.actualResult>0?'涨':'跌'}}</span></p>
                    <p style="height: 150px;line-height: 150px;font-size:26px;color: #fff;">
                        {{predictInfo.isWin?'预言成功':'预言失败'}}</p>
                    <p style="color: #fff;font-size: 16px;">收获 {{predictInfo.actualValue}} Tokens</p>
                </div>
            </x-dialog>
            <toast v-model="showToast" type="text">{{errorMsg}}</toast>
        </div>
        <div v-transfer-dom>
            <x-dialog @on-hide="changeAwardRead(awardInfo.awardId)" v-model="showDialogGlodEgg" hide-on-blur
                      :dialog-style="{'max-width': '100%',width:'289px', height: '320px',backgroundColor:'transparent'}">
                <div style="width:100%;height:100%;">
                    <div style="width:100%;height159px;position: absolute;top:0;left:0;z-index: 1">
                        <img src="../assets/img/eggBg.png" width="100%" alt="">
                        <img style="position: absolute;top:127px;left:42px;" src="../assets/img/eggText.png"
                             width="205px"
                             height="24px" alt="">
                    </div>
                    <div
                            style="width: 100%;height: 270px;position:absolute;top:50px;left:0;border-radius: 22px;background-color: #001436;padding:0 29px;">
                        <p style="font-size: 18px;color: #FFD600;margin-top: 120px">获得{{awardInfo.awardResult}}积分</p>
                        <button @click="changeAwardRead(awardInfo.awardId)"
                                style="background: none;border:0;padding:0;margin-top:32px;"><img width="100%"
                                                                                                  height="60px"
                                                                                                  src="../assets/img/sure.png"
                                                                                                  alt="">
                        </button>
                    </div>
                </div>
            </x-dialog>
        </div>
        <toast v-model="showToast" type="text">{{errorMsg}}</toast>
    </div>
</template>

<script>
    import indexChart from './indexChart';
    import indexHeader from './indexHeader';
    import indexTab from './indexTab';
    import {createU3} from 'u3.js';
    import store from '../store';
    import config from '../../config/ultrain';
    import {
        XDialog,
        TransferDomDirective as TransferDom,
        Toast,
        Loading,
    } from 'vux';
    import '../assets/scss/indexStyle.scss';
    import {mapGetters} from 'vuex';

    export default {
        directives: {
            TransferDom,
        },
        components: {
            XDialog, Toast, Loading, indexChart, indexHeader, indexTab,
        },
        data() {
            return {
                status: false,
                statusUpDown: 'up',
                showDialog: false,
                showResultDialog: false,
                showDialogGlodEgg: false,
                intervalId: null,
                poolCount: [],
                countlist: [20, 100, 200, 500],
                dialogueList: [],
                selectCount: [],
                showToast: false,
                errorMsg: '',
                userOperation: {
                    price: '',
                    ratio: '',
                },
                userBanlance: 0,
            };
        },
        computed: {
            ...mapGetters([
                'userInfo',
                'predictInfo',
                'chainInfo',
                'awardInfo',
            ]),
            classOption: function () {
                return {
                    step: 0.2,
                    limitMoveNum: 5,
                    hoverStop: false,
                    direction: 1,
                    openWatch: true,
                    singleHeight: '16.98px',
                    waitTime: 1000,
                };
            },
            date() {
                let now = new Date();
                let m = now.getMonth() + 1;
                let d = now.getDate();
                return m + '月' + d + '日';
            },
            nextDate() {
                let now = new Date();
                let m = now.getMonth() + 1;
                let d = now.getDate() + 1;
                return m + '月' + d + '日';
            },
        },
        methods: {
            // 获取userinfo
            getPersonInfo() {
                this.axios.get(this.GLOBAL.baseUrl + `/user/personalInfo?userId=${this.chainInfo.userId}`)
                    .then((res) => {
                        let {state, data} = res.data;
                        let latestPredict = {}
                        let rank = {}
                        if (state == 'success') {
                            latestPredict = data['latestPredict']
                            rank =  data['rank']
                            if (rank) {
                                let {predictRank,predictTimes,winRank,winRatio,winTimes,awardTimes} = rank
                                let rankobj = {
                                    predictRank: predictRank,
                                    predictTimes: predictTimes,
                                    winRank: winRank,
                                    winRatio: winRatio,
                                    winTimes: winTimes,
                                    awardTimes: awardTimes,
                                };
                                store.commit('SET_RANKINFO', rankobj);
                            }
                            if (latestPredict == null) {
                                this.status = false;
                                return;
                            }
                            let {date,isFinished,predictResult,predictValue,actualResult,actualValue,isWin,_id,hasRead} = latestPredict
                            let latestPredictobj = {
                                date: date,
                                isFinished: isFinished,
                                predictResult: predictResult,
                                predictValue: predictValue,
                                actualResult: actualResult,
                                actualValue: actualValue,
                                isWin: isWin,
                                _id: _id,
                            };
                            store.commit('SET_PREDICTINFO', latestPredictobj);

                            if (isFinished) {
                                if (!hasRead) {
                                    this.showResultDialog = true;
                                }
                                this.status = false;
                                return;
                            }
                            this.status = true;
                        }
                    }).catch((err) => console.log(err));
            },
            // 获取balance
            async getBanlance() {
                const u3 = createU3(config);
                const balance = await u3.getCurrencyBalance({
                    code: config.pointAccount,
                    account: config.poolAccount,
                    symbol: config.symbol,
                });
                const userbalance = await u3.getCurrencyBalance({
                    code: config.pointAccount,
                    symbol: config.symbol,
                    account: this.chainInfo.accountName,
                });
                this.userBanlance = userbalance.length ? userbalance[0].split(' ')[0] : 0;
                this.poolCount = balance.length ? balance[0].split(' ')[0].split('') : 0;
            },

            getPersonUrl(url) {
                const promise = new Promise((resolve, reject) => {
                    this.axios.get(this.GLOBAL.baseUrl + url + `?userId=${this.chainInfo.userId}`)
                        .then((res) => {
                            let {state, data} = res.data;
                            state == 'success' ? resolve(data) : resolve(null);
                        }).catch((err) => {
                        reject(err);
                    });
                });
                return promise;
            },

            // 最新预测信息
            getLatestIndex() {
                this.axios.get(this.GLOBAL.baseUrl + '/predict/latestIndex')
                    .then((res) => {
                        let {state, message, data} = res.data;
                        if (state == 'success') {
                            this.userOperation = data;
                            let uRate = data.proportion * 100;
                            let dRate = (1 - data.proportion) * 100;
                            document.getElementById('upbar').style.width = uRate + '%';
                            document.getElementById('downbar').style.width = dRate + '%';
                        } else {
                            this.showToast = true;
                            this.errorMsg = message;
                        }
                    })
                    .catch((err) => console.log(err));
            },
            // 获取奖励信息
            async getAward() {
                let award = await this.getPersonUrl('/award/personalLatest');
                if (award) {
                    let {date, _id, result, hasRead} = award;
                    let obj = {
                        awardDate: date,
                        awardId: _id,
                        awardResult: result,
                    };
                    store.commit('SET_AWARDINFO', obj);
                    hasRead === false ? this.showDialogGlodEgg = true : this.showDialogGlodEgg = false;
                }
            },
            // 关闭猜涨跌
            closeShowDialog() {
                this.showDialog = false;
            },
            // 关闭结果弹窗
            changeResultRead(id) {
                let params = {id: id};
                this.axios.post(this.GLOBAL.baseUrl + '/predict/update', JSON.stringify(params))
                    .then((res) => {
                        let {state} = res.data;
                        if (state == 'success') {
                            this.showResultDialog = false;
                        }
                    }).catch(err => console.log(err));
            },

            // 关闭奖励弹窗
            changeAwardRead(id) {
                let params = {id: id};
                this.axios.post(this.GLOBAL.baseUrl + '/award/update', JSON.stringify(params))
                    .then((res) => {
                        let {state} = res.data;
                        if (state == 'success') {
                            this.showDialogGlodEgg = false;
                        }
                    }).catch(err => console.log(err));
            },

            //保存用户信息
            saveUserInfo() {
                let params = {
                    userId: this.$route.query.userId,
                    phoneNum: this.$route.query.phoneNum,
                    accountName: this.$route.query.accountName,
                };
                this.axios.post(this.GLOBAL.baseUrl + '/user/add', JSON.stringify(params)).then(d => {
                    if (d.data.state === 'success') {
                        store.commit('SET_USERINFO', d.data.data);
                    }
                }).catch(err => console.log(err));
            },
            lookUpDown(val) {
                let now = new Date();
                let year = now.getFullYear();
                let month = now.getMonth();
                let day = now.getDate();

                let hour = now.getHours();
                let minute = now.getMinutes();

                let start = Date.UTC(year, month, day, 0, 30);
                let end = Date.UTC(year, month, day, 22, 30);

                if (now.getTime() > start && now.getTime() < end) {
                    console.log('当前时间可以预言')
                } else {
                    this.errorMsg = '00:30 ~ 22:30 可以预言';
                    this.showToast = true;
                    return;
                }
                this.selectCount = [];
                this.showDialog = true;
                this.statusUpDown = val;
            },
            toRouter(name) {
                let index = name == 'prophecy' ? 0 : 1;
                name == 'prophecy' || name == 'price' ? this.$router.push({
                    name: 'Mine',
                    params: {index: index},
                }) : this.$router.push('MessageBoard');
            },
            toRouterActiveRule() {
                this.$router.push('ActiveRule');
            },
            handleToMore(index) {
                this.$router.push({name: 'More', params: {index: index}});
            },
            // 选择预言积分
            handleSelectCount(item) {
                let arr = this.selectCount;
                let target = arr.filter(function (a) {
                    return a == item;
                });
                if (target.length) {
                    let array = arr.filter(function (b) {
                        return b != item;
                    });
                    this.selectCount = array;
                } else {
                    arr.pop();
                    arr.push(item);
                    this.selectCount = arr;
                }
            },
            // 提交预言
            sureGuess() {
                if (this.selectCount.length) {
                    if (this.selectCount[0] > this.userBanlance) {
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
                } else {
                    this.errorMsg = '请选择预言积分';
                    this.showToast = true;
                }
            },
        },
        created() {
            this.saveUserInfo();
            this.getLatestIndex();
            this.getPersonInfo();
            this.getAward();
            this.getBanlance();
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
            this.$on('listenChatList', function () {
                this.$refs.indexChart.getChatList();
            });
            this.intervalId = setInterval(() => {
                this.$refs.indexChart.getChatList();
            }, 10000);
            document.addEventListener('message', (e) => {
                let result = e.data;
                let {success, msg} = JSON.parse(result);
                if (success) {
                    this.showDialog = false;
                    this.status = true;
                    this.getBanlance();
                    let params = {
                        userId: this.$route.query.userId,
                        predictValue: this.selectCount[0],
                        predictResult: this.statusUpDown == 'up' ? 1 : -1,
                    };
                    this.axios.post(this.GLOBAL.baseUrl + '/predict/add', params)
                        .then((res) => {
                            let {state, message} = res.data;
                            if (state !== 'success') {
                                this.errorMsg = message;
                                this.showToast = true;
                            }
                        })
                        .catch((err) => console.log(err));
                } else {
                    this.errorMsg = msg;
                    this.showToast = true;
                }
            });
        },
        beforeDestroy() {
            clearInterval(this.intervalId);
        },
    };
</script>
