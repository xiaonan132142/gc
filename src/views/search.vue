<template>
    <div class="gc-search">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="search-wrap">
            <x-input v-model="keyword" @on-blur="search" class="weui-vcode" placeholder="请输入查询垃圾">
                <img style="margin-right: 10px" slot="label" src="../assets/img/search.png" width="16" height="15">
            </x-input>
        </div>
        <div class="search-list">
            <componentView :parentData="keyword" ref="resultlist"></componentView>
        </div>
    </div>
</template>

<script>
    import {XButton, Toast,XInput} from 'vux'
    import '../assets/scss/search.scss'
    import componentView from './componentView'

    export default {
        name: "search",
        components: {
            XInput,XButton, Toast,componentView
        },
        data() {
            return {
                keyword:'',
            }
        },
        created(){
            this.keyword = this.$router.currentRoute.params.keyword
            this.$refs.resultlist.getResultlist()
        },
        methods: {
            goback() {
                this.$router.go(-1)
            },
            search(){
                this.$refs.resultlist.getResultlist()
            },
        },
    }
</script>
