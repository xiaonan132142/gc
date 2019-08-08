<template>
    <ul>
        <li
            v-for="(item,index) in list"
            :key="index"
            @click="checkDesc(item)"
            :class="{move:candelete._id==item._id}"
            @touchstart="touchStart(item)"
            @touchend="touchEnd(item)">
            <div class="dec-block">
                <div>{{item.title}}</div>
                <div class="userinfo">
                    <img src="../assets/img/user.jpg" width="17px" height="17px" alt="">
                    <span>{{item.accountName}}</span>
                </div>
                <div class="content">{{item.contents&&item.contents[0].desc}}</div>
            </div>
            <div class="article-info">
                <div class="info">
                    <span class="price" v-if="!item.free">{{item.price}} 垃圾币</span>
                    <span class="comment">{{item.commentCount}}条评论</span>
                    <span>{{item.date}}</span>
                </div>
                <button class="btn check-btn" @click.stop="checkComment(item._id)">查看评论</button>
            </div>
            <div><span v-for="(item,index) in item.contents" :class="[item && item.sort?'tag-class':'']">{{item.sort}}</span></div>
            <div class="del" @click.stop="deleteItem(item)"><span>删除</span></div>
        </li>
    </ul>
</template>
<script>
    import '../assets/scss/componentView.scss'
    import {mapGetters} from 'vuex'
    export default {
        name: "minelist",
        props:['parentData'],
        data() {
            return {
                list: [],
                clientNum: {}, // 记录开始滑动（x1）,结束滑动（x2）的鼠标指针的位置
                candelete: {}, // 滑动的item
            }
        },
        computed: {
            ...mapGetters([
                'userInfo',
            ]),
        },
        methods: {
            checkDesc(item){
                this.$router.push({
                    name:'Check',
                    params:item
                })
            },
            deleteItem(item) {
                this.axios.post(this.GLOBAL.baseUrl + '/classification/takeOff',{id:item._id})
                    .then((res) => {
                        let {state, data} = res.data
                        if (state=== "success") {
                            this.getlist()
                        }
                    })
                    .catch(err => console.log(err))
            },
            touchStart(item) {
                let touchs = event.changedTouches[0];
                // 记录开始滑动的鼠标位置
                this.clientNum.x1 = touchs.pageX;
                this.candelete = {};
            },
            touchEnd(item) {
                let touchs = event.changedTouches[0];
                // 记录结束滑动的鼠标位置
                this.clientNum.x2 = touchs.pageX;
                this.candelete = {};
                // 判断滑动距离大于50，判定为滑动成功，否则失败
                if (
                    this.clientNum.x2 < this.clientNum.x1 &&
                    Math.abs(this.clientNum.x1) - Math.abs(this.clientNum.x2) > 50
                ) {
                    event.preventDefault();
                    this.candelete = item;
                } else if (
                    this.clientNum.x2 > this.clientNum.x1 &&
                    Math.abs(this.clientNum.x2) - Math.abs(this.clientNum.x1) > 10
                ) {
                    event.preventDefault();
                    this.candelete = {};
                }
            },
            getlist(){
                let url = this.parentData==='public'?'/classification/getPublishedByUser?userId=-QM7XbtaD':'/read/getAllByUserId?userId=-QM7XbtaD'
                this.axios.get(this.GLOBAL.baseUrl + url)
                    .then((res) => {
                        let {state, data} = res.data
                        if (state === 'success') {
                            this.list =  data
                        }
                    })
                    .catch(err => console.log(err))
            },
            checkComment(val) {
                this.$router.push({
                    name: 'Check',
                    params: {id: val, from: 'checkComment'}
                })
            },
        },

    }
</script>

<style scoped>
    li {
        border-bottom: 1px solid #EDEDED;
        line-height: 40px;
        position: relative;
        transform: translateX(0);
        transition: all .3s; /*滑动效果更生动*/
        padding-left: 10px;
    }


    ul {
        overflow-x: hidden; /*隐藏ul x轴的滚动条*/
    }

    li.move {
        transform: translateX(-60px); /*滑动后x轴位移-60px,使其可见*/
    }

    .del {
        position: absolute;
        top: 0;
        right: -1px;
        z-index: 3;
        width: 60px;
        height: 100%;
        text-align: center;
        color: #fff;
        background-color: #ff5b45;
        transform: translateX(60px);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .userinfo{
        height:17px;
        display: flex;
        justify-content: flex-start;

    }
    .article-info {
        font-size: 12px;
        color: rgba(0, 0, 0, .4);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .info {
        flex: 1;
    }
    .price{
        color:#FF8D00;
        margin-right: 10px;
    }
    .comment{
        margin-right: 12px;
    }
    .check-btn{
        width:50px;
        color:#00C691;
    }
    .tag-class{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        max-width: 80px;
        height: 15px;
        line-height: 15px;
        padding:3px 10px;
        margin:0 10px 10px 0;
        border:1px solid #00C691;
        background-color:#00C691;
        border-radius: 5px;
        color:#fff;
        font-size: 12px;
    }

</style>

