<template>
    <div class="gc-check">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="content-wrap">
            <div class="title">{{parentData.title}}</div>
            <div class="single-block" v-for="(item,index) in parentData.contents">
                <div class="step">第{{index+1}}步</div>
                <div class="desc">{{item.editModel.decs}}</div>
                <img src="../assets/img/eg.png" width="100%" height="200px" alt="">
            </div>
            <div class="comment">
                <div class="title">评价</div>
                <checklist :options="commonList" v-model="radioValue" :max="1" @on-change="change"></checklist>
                <x-textarea class="areablock" :max="50" placeholder="请输入评价" required v-model="comment"></x-textarea>
                <x-button class="submit-btn" @click.native="submit" type="primary">提交</x-button>
            </div>
        </div>
    </div>
</template>

<script>
    import '../assets/scss/check.scss'
    import {Checklist,XTextarea,XButton} from 'vux'
    export default {
        name: "check",
        components:{
            Checklist,XTextarea,XButton
        },
        data() {
            return {
                parentData:{},
                commonList:[
                    {key:1,value:'好评'},
                    {key:2,value:'中评'},
                    {key:3,value:'差评'},
                ],
                radioValue:[1],
                comment:'',
            }
        },
        created() {
            this.parentData = this.$route.params
        },
        methods:{
            goback() {
                this.$router.go(-1)
            },
            change(val){
                this.radioValue=val
            },
            submit(){
                let params={
                    id:this.parentData.id,
                    comment:this.comment,
                    commentVal:this.radioValue.toString(),
                }
                console.log(params)
            },
        },
    }
</script>

<style scoped>

</style>
