<template>
    <div class="mine-details">
        <div class="header-router">
            <button @click="goback" class="btn goback">返回上一层</button>
            <span class="title">记录详情</span>
        </div>
        <div class="mine-details-content">
            <div class="prophecy-block">
                <p class="item"><span class="title">预言记录</span></p>
                <p class="item">
                    <span>预言方向</span>
                    <span>
                        <span>看</span>
                    <span :class="itmData.predictResult>0?'redColor':'greenColor'">{{itmData.predictResult>0?'涨':'跌'}}</span>
                    </span>
                </p>
                <p class="item">
                    <span>预言积分</span>
                    <span>{{itmData.predictValue}}积分</span>
                </p>
                <p class="item">
                    <span>预言时间</span>
                    <span>{{itmData.date}}</span>
                </p>
            </div>
            <div class="result-block">
                <p class="item">
                    <span class="title">预言结果</span>
                    <span v-if="!itmData.isFinished" class="title">待公布</span>
                    <span v-else class="title">{{itmData.predictResult==itmData.actualResult?'预言成功':'预言失败'}}</span>
                </p>
                <p class="item">
                    <span>交易日</span>
                    <span>{{itmData.date}}</span>
                </p>
                <p class="item" v-if="itmData.isFinished">
                    <span>BTC方向</span>
                    <span>
                        <span>收</span>
                        <span :class="itmData.actualResult>0?'redColor':'greenColor'">{{itmData.actualResult>0?'涨':'跌'}}</span>
                    </span>
                </p>
                <p class="item" v-if="itmData.isFinished">
                    <span>预言奖励</span>
                    <span>{{itmData.actualValue}}积分</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mineDetails",
        data() {
            return {
                itmData: {}
            }
        },
        created() {
            this.itmData = this.$route.params

        },
        methods: {
            goback() {
                this.$router.go(-1)
            },
        },
    }
</script>

<style scoped lang="scss">
    @import "../assets/scss/theme";

    .mine-details {
        width: 100%;
        height: 100%;
        background-color: $cBg;
        position: relative;

        .mine-details-content {
            position: absolute;
            top: 50px;
            left: 0;
            bottom: 0;
            right: 0;
            border-top-right-radius: 22px;
            border-top-left-radius: 22px;
            background-color: #F5F5F5;
            padding: 22px 15px 0;
            box-sizing: border-box;

            .redColor {
                color: $cRed;
            }

            .greenColor {
                color: $cGreen;
            }

            .title {
                font-size: 13px;
                color: #000;
            }

            .prophecy-block {
                @extend .block;
                height: 181px;
            }

            .result-block {
                @extend .block;
                min-height: 103px;
                margin-top: 15px;
            }
        }
    }
</style>
