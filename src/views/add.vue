<template>
    <div class="gc-add">
        <div class="public-header">
            <button @click="goback" class="btn goback-btn">返回上一层</button>
            <button @click="toAdd" class="public-btn">添加</button>
        </div>
        <div class="single-block">
            <div class="step">
                第1步
            </div>
            <x-textarea class="area" :max="50" placeholder="请输入内容" v-model="desc"></x-textarea>
            <!-- <uploader
                     :max="1"
                     :images="imagesUrl"
                     :handle-click="true"
                     :show-header="false"
                     :readonly="true"
                     :upload-url="uploadUrl"
                     name="img"
                     :params="params"
                     size="small"
                     @preview="previewMethod"
                     @add-image="addImageMethod"
                     @remove-image="removeImageMethod"
             ></uploader>-->
        </div>
    </div>
</template>

<script>
    import '../assets/scss/add.scss'
    //import Uploader from 'vux-uploader'
    import {XTextarea} from 'vux'

    export default {
        name: "add",
        components:{
            XTextarea
        },
        data(){
            return{
                titleVal:'',
                imagesUrl:[],
                uploadUrl:'',
                params:{},
                desc:'',
            }
        },
        methods:{
            goback(){
                this.$router.go(-1)
            },
            toAdd(){},
            previewMethod(){},
            addImageMethod(){},
            removeImageMethod(){},
        },
    }
</script>


