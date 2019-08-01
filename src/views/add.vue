<template>
    <div class="gc-add">
        <button @click="goback" class="btn goback-btn">返回上一层</button>
        <div class="edit-block">
            <x-input :max="50" placeholder="请输入标题" required class="title" title="title" v-model="titleVal"></x-input>
            <div class="single-block" v-for="(item,index) in items" :key="index">
                <div class="operation">
                    第{{index+1}}步
                    <button @click="itemsAdd" class="btn ope-btn"><span>+</span></button>
                    <button v-if="index" @click="itemMinus(item)" class="btn ope-btn"><span>-</span></button>
                </div>
                <x-textarea :max="50" placeholder="请输入具体描述" required title="描述" v-model="item.editModel.decs"></x-textarea>
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
            <x-button type="primary">完成</x-button>
        </div>
    </div>
</template>

<script>
    import '../assets/scss/add.scss'
    //import Uploader from 'vux-uploader'
    import {XInput,XButton,XTextarea} from 'vux'
    export default {
        name: "add",
        components:{
            XTextarea,
            XInput,XButton
        },
        data(){
            return{
                titleVal:'',
                imagesUrl:[],
                uploadUrl:'',
                params:{},
                items:[
                    {
                        id: Date.now(),
                        editModel:{
                            decs:'',
                            imgdata:'',
                        },
                    }
                ],
            }
        },
        methods:{
            goback(){
                this.$router.go(-1)
            },
            itemsAdd(){
               this.items.push({
                   id: Date.now(),
                   editModel:{
                       decs:'',
                       imgdata:'',
                   },
               })
            },
            itemMinus(item){
                let index = this.items.indexOf(item)
                if(index !== -1){
                    this.items.splice(index, 1)
                }
            },
            previewMethod(){},
            addImageMethod(){},
            removeImageMethod(){},
        },
    }
</script>


