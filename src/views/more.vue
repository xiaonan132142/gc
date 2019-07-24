<template>
    <div class="gbt-mine">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="gbt-mine-header">
            <img :src="userInfo.avatar" width="69px" height="69px" style="border-radius: 69px" alt="">
            <span class="name">{{userInfo.username}}</span>
            <div class="price">
                <img src="data:image/png;base64,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" width="23px" height="23px" alt="">
                <span class="count">X{{rankInfo.awardTimes}}</span>
                <span class="desc">金蛋奖励</span>
            </div>
        </div>
        <div class="gbt-mine-content">
            <div class="info">
                <div><p class="rank">{{rankInfo.predictRank}}</p>
                    <p class="desc">活跃度排行</p></div>
                <div><p class="rank">{{rankInfo.winRank}}</p>
                    <p class="desc">胜率排行</p></div>
                <div><p class="rank">{{(rankInfo.winRatio*100).toFixed(2)}}%</p>
                    <p class="desc">胜率</p></div>
                <div><p class="rank">{{rankInfo.predictTimes}}</p>
                    <p class="desc">预言战绩</p></div>
            </div>
            <div class="tab">
                <div class="btns" ref="tabbtns">
                    <button class="btn tab-btn active" @click="handleTab($event,'活跃度排行')">活跃度排行</button>
                    <button class="btn tab-btn" @click="handleTab($event,'胜率排行')">胜率排行</button>
                </div>
                <div class="list">
                    <div class="list-block" v-for="(itm,index) in tableData[tabIndex]" :key="index">
                        <div class="block-item">
                            <span class="sp1-more">{{index+1}}</span>
                            <img width="32px" height="32px" :src="itm.user.avatar" alt="">
                            <span class="sp2-more">{{itm.user.username}}</span>
                            <span class="sp3-more"><span v-if="tabIndex=='活跃度排行'">{{itm.predictTimes}}</span><span
                                    v-else>{{(itm.winRatio*100).toFixed(2)}}%</span><span class="sp4-more"
                                                                                          v-if="tabIndex=='活跃度排行'">活跃度</span></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/scss/mine.scss'
    import {mapGetters} from 'vuex'

    export default {
        components: {},
        computed: {
            ...mapGetters([
                'userInfo',
                'rankInfo',
            ])
        },
        name: "more",
        data() {
            return {
                tabIndex: '活跃度排行',
                tablist: ['活跃度排行', '胜率排行'],
                tableData: {},
            }
        },
        created() {
            this.tabIndex = this.tablist[this.$route.params.index]
        },
        mounted() {
            if (this.$route.params && this.$route.params.index == 1) {
                this.handleTabWin()
                this.tabIndex = this.tablist[this.$route.params.index]
            } else {
                this.tabIndex = this.tablist[0]
            }
            this.getTableData()
        },
        methods: {
            async getTableData() {
                let map = new Map()
                let obj = {}
                let activelist = await this.getDataUrl('/rank/activeList')
                let winlist = await this.getDataUrl('/rank/winList')
                map.set('活跃度排行', activelist)
                map.set('胜率排行', winlist)
                for (let [key, value] of map) {
                    obj[key] = value
                }
                this.tableData = obj
            },
            getDataUrl(url) {
                const promise = new Promise((resolve, reject) => {
                    this.axios.get(this.GLOBAL.baseUrl + url)
                        .then((res) => {
                            let {state, data} = res.data
                            state == 'success' ? resolve(data) : resolve([])
                        }).catch((err) => {
                        reject(err)
                    })
                })
                return promise
            },
            goback() {
                this.$router.go(-1)
            },
            handleTab(e, val) {
                let eles = this.$refs.tabbtns.querySelectorAll('button')
                eles.forEach(item => {
                    item.className = 'btn tab-btn'
                })
                e.target.className = 'btn tab-btn active'
                this.tabIndex = val
            },
            handleTabWin() {
                let eles = this.$refs.tabbtns.querySelectorAll('button')
                eles.forEach(item => {
                    item.className = 'btn tab-btn'
                })
                eles[1].className = 'btn tab-btn active'
            },
        },
    }
</script>


