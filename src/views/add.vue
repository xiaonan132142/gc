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
            <x-button type="primary" @click.native="finished">完成</x-button>
        </div>
        <div v-transfer-dom>
            <x-dialog @on-hide="submit" v-model="showDialog" hide-on-blur
                      :dialog-style="{'max-width': '100%',width:'289px', height: '282px', 'background-color': '#001436','border-radius':'22px'}">
                <div class="dialog-wrap" style="width: 100%;height: 100%;padding:15px 19px 0 19px;text-align: center;font-size: 12px;">
                    <div style="color:#fff;font-size:16px;display: flex;justify-content: flex-start">
                        <x-switch title="免费" @on-change="handleChange" :value-map="['0', '1']" v-model="switchVal"></x-switch>
                    </div>
                    <div style="color:#fff;display: flex;margin:10px 0;justify-content: center">
                        <p style="height:30px;line-height: 30px;margin-right: 10px">请设置金额</p>
                        <x-input :disabled="switchVal==0" :max="3" style="width:100px;height: 30px;border: 1px solid #ccc;color:#fff;border-radius: 5px" type="number" v-model="setNum"></x-input>
                        <p style="height:30px;line-height: 30px;margin-left: 10px">垃圾币</p>
                    </div>
                    <div style="color:#fff;text-align:left;line-height: 18px;padding:0 20px 30px;">
                        <p>友情提示:</p>
                        <p>免费，所有人将无偿查看</p>
                        <p>付费，请设置相应付费金额</p>
                        <p>不设置，直接关闭，视为免费</p>
                    </div>
                    <x-button type="primary" @click.native="submit">提交</x-button>
                </div>
            </x-dialog>
        </div>
    </div>
</template>

<script>
    import '../assets/scss/add.scss'
    //import Uploader from 'vux-uploader'
    import {XInput,XButton,XTextarea,TransferDomDirective as TransferDom,XDialog,XSwitch} from 'vux'

    export default {
        name: "add",
        directives: {
            TransferDom,
        },
        components:{
            XTextarea,
            XInput,XButton,XDialog,
            XSwitch,
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
                showDialog:false,
                switchVal:'0',
                setNum:0,
                isdisabled:false,
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
            finished(){
                this.showDialog=true
            },
            handleChange(val){
                this.switchVal = val
                console.log(val)
            },
            submit(){
                let params={
                    state:this.switchVal,
                    count:this.setNum,
                }
                console.log(params)
                this.showDialog=false
                this.$router.push('Mine')
            },
            previewMethod(){},
            addImageMethod(){},
            removeImageMethod(){},
        },
    }
</script>


