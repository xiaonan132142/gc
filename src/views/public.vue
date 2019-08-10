<template>
    <div class="gc-public">
        <div class="public-header">
            <button @click="goback" class="btn goback-btn">返回上一层</button>
            <button @click="toPublc" class="public-btn">发布</button>
        </div>
        <div class="public-content" v-if="contentlist.length">
            <x-input :max="30" placeholder="请输入标题" required class="title" v-model="titleVal"></x-input>
            <div class="main-content" v-for="(item,index) in contentlist">
                <div class="header">
                    <span>第{{index+1}}步</span>
                    <div>
                        <button @click="handleAdd(item,index,'add')" v-if="!item.addModel.desc" class="btn addbtn">
                            点击添加内容
                        </button>
                        <button @click="handleAdd(item,index,'edit')" v-else class="btn addbtn">编辑</button>
                        <button v-if="index>0" class="btn delbtn" @click="delStep(item)">X</button>
                    </div>
                </div>
                <div v-if="item.addModel.sort" class="tag-class">{{item.addModel.sort | filterSort}}</div>
                <div v-if="item.addModel.desc" class="content">
                    <div class="desc">{{item.addModel.desc}}</div>
                    <img src="../assets/img/eg.png" width="100%" height="181px" alt="img">
                </div>
            </div>
            <button v-if="contentlist.length<4" class="btn step-btn" @click="addStep">+添加步骤</button>
        </div>
        <div v-transfer-dom>
            <x-dialog @on-hide="showDialog=false" v-model="showDialog" hide-on-blur
                      :dialog-style="{'max-width': '100%',width:'90%', height: '359px','padding':'18px 0 30px', 'background-color': '#fff','border-radius':'20px'}">
                <div class="dialog-wrap"
                     style="width: 100%;height: 100%;padding:15px 19px 0 19px;text-align: center;font-size: 12px;">
                    <span style="font-size: 16px;line-height: 22px">请选择付费设置</span>
                    <div style="color:#000;font-size:18px;display: flex;justify-content: flex-start">
                    </div>
                    <checklist :max="1" style="text-align: left;margin:10px 0;" :options="commonList"
                               v-model="switchVal" @on-change="handleChange"></checklist>
                    <div style="color:#000;display: flex;margin:10px 0;justify-content: center;margin-bottom: 30px">
                        <x-input :disabled="switchVal.toString()=='1'" :max="3"
                                 style="width:170px;height: 44px;background-color:#F1F1F1;border: 1px solid #ccc;color:#000;border-radius: 5px"
                                 v-model="setNum"></x-input>
                        <p style="height:30px;line-height: 44px;margin-left: 10px">垃圾币</p>
                    </div>
                    <x-button
                            style="width: 100%;height:60px;background-color: #00C691;border-radius: 30px;color:#fff;font-size: 18px;box-shadow: 0 4px 16px 0 rgba(0,198,145,.38);"
                            type="primary" @click.native="submit">确定
                    </x-button>
                </div>
            </x-dialog>
        </div>
        <toast v-model="showToast" type="text">{{errorMsg}}</toast>
    </div>
</template>

<script>
    import cache from '@/utils/cache';
    import '../assets/scss/public.scss'
    import {mapGetters} from 'vuex'
    import {Toast, XInput, XButton, XSwitch, XDialog, TransferDomDirective as TransferDom, Checklist} from 'vux'

    export default {
        name: "public",
        directives: {
            TransferDom,
        },
        components: {
            XInput, XButton, XDialog, XSwitch, Checklist, Toast
        },
        data() {
            return {
                showToast: false,
                errorMsg: '',
                titleVal: '',
                commonList: [
                    {key: '1', value: '免费', inlineDesc: '用户可免费查看'},
                    {key: '2', value: '付费', inlineDesc: '用户需付费才能查看'},
                ],
                contentlist: [{addModel: {desc: '', image: ''}}],
                showDialog: false,
                switchVal: ['1'],
                setNum: 0,
            }
        },
        computed: {
            ...mapGetters([
                'chainInfo',
            ]),
        },
        created() {
            let from = this.$router.currentRoute.params.name
            if (from === 'add') {
                this.contentlist = !cache.get('contentsModel') ? [] : cache.get('contentsModel')
                this.titleVal = cache.get('title')
            }
        },
        filters:{
            filterSort(val){
                if(val==1){
                    return '干垃圾'
                }else if(val==2){
                    return '湿垃圾'
                }else if(val==3){
                    return '其他'
                }else if(val==4){
                    return '不可回收'
                }else{
                    return;
                }
            },
        },
        methods: {
            goback() {
                this.$router.push('Mine')
                cache.set('contentsModel', [])
                console.log(cache.get('contentsModel'))
            },
            toPublc() {
                if (this.titleVal == '') {
                    this.showToast = true
                    this.errorMsg = '请填写标题'
                    return
                }
                this.showDialog = true
            },
            addStep() {
                this.contentlist.push({
                    addModel: {id: Date.now(), desc: '', image: ''}
                })
            },
            delStep(item) {
                let index = this.contentlist.indexOf(item)
                if (index !== -1) {
                    this.contentlist.splice(index, 1)
                    cache.set('contentsModel', this.contentlist)
                    console.log(cache.get('contentsModel'))
                }
            },
            handleAdd(item, index, name) {
                item.id = !item.id ? Date.now() : item.id
                item.index = index
                this.$router.push({
                    name: 'Add',
                    params: {data: item, name: name}
                })
                cache.set('title', this.titleVal)
            },
            handleChange(val) {
                this.switchVal = val
                val === '1' ? this.setNum = 0 : this.setNum = this.setNum
            },
            submit() {
                let arr = []
                this.contentlist.forEach(item => {
                    arr.push(item.addModel)
                })
                let params = {
                    userId: this.chainInfo.userId,
                    title: this.titleVal,
                    contents: arr,
                    free: this.switchVal == '1' ? true : false,
                    price: this.setNum,
                }
                this.axios.post(this.GLOBAL.baseUrl + '/classification/publish', params)
                    .then((res) => {
                        let {state, data} = res.data
                        if (state === 'success') {
                            this.showDialog = false
                            this.$router.push('SuccessModel')
                            cache.set('contentsModel', [])
                            cache.set('title','')
                        }
                    })
                    .catch(err => console.log(err))
            },
        },
    }
</script>
