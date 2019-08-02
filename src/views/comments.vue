<template>
    <div class="gc-comments">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <button-tab v-model="tabIndex">
            <button-tab-item>全部</button-tab-item>
            <button-tab-item>好评</button-tab-item>
            <button-tab-item>中评</button-tab-item>
            <button-tab-item>差评</button-tab-item>
        </button-tab>
        <div class="comments-w">
            <div class="comments-block" v-for="(item,index) in list" :key="index">
                <div class="item-block">
                    <p class="sp">
                        <span>{{item.accountname}}</span>
                        <span>{{item.date}}</span>
                    </p>
                    <span>{{item.state | filterState}}</span>
                </div>
                <div class="item-block">{{item.comments}}</div>
            </div>
        </div>
    </div>
</template>
<script>
    import '../assets/scss/comments.scss'
    import {ButtonTab, ButtonTabItem} from 'vux'
    export default {
        name: "comments",
        components:{
            ButtonTab, ButtonTabItem
        },
        data(){
            return{
                tabIndex:0,
                list:[
                    {accountname:'zhnagsan',date:'2019.08.13',comments:'走心作者棒棒山东警方跨世纪福克斯的山东飞机上看到肌肤开始发售福建省地方就开始发售的者棒棒山东警方跨世纪福克斯的',state:1},
                    {accountname:'zhnagsfdan',date:'2019.08.13',comments:'走心作者棒棒sf',state:2},
                ],
            }
        },
        methods:{
            goback(){
                this.$router.go(-1)
            },
        },
        filters:{
            filterState(val){
                if(val===1){
                    return '好评'
                }
                if(val===2){
                    return '中评'
                }
                if(val===3){
                    return '差评'
                }
            },
        },
    }
</script>
