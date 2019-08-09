<template>
    <div class="gc-add">
        <div class="public-header">
            <button @click="goback" class="btn goback-btn">返回上一层</button>
            <button @click="toAdd" class="public-btn"><span v-if="name==='add'">添加</span><span v-else>保存</span></button>
        </div>
        <div class="tip">
            请将同类垃圾放到同一步骤
        </div>
        <div class="single-block">
            <div class="step">
                第{{model.index+1}}步
            </div>
            <x-textarea class="area" :max="50" placeholder="请将描述填写完整，图文并茂更有助于好评哦!" v-model="desc"></x-textarea>
            <uploader
                    :limit="1"
                    :multiple="false"
                    v-model="fileList"
                    :url="remoteUrl"
                    @on-change="onChange"
                    @on-cancel="onCancel"
                    @on-success="onSuccess"
                    @on-error="onError"
                    @on-delete="onDelete"
            >
            </uploader>
            <checker v-model="sort" default-item-class="default-tag" selected-item-class="selected-tag">
                <checker-item value="1">干垃圾</checker-item>
                <checker-item value="2">湿垃圾</checker-item>
                <checker-item value="3">其他</checker-item>
                <checker-item value="4">不可回收</checker-item>
            </checker>
        </div>
        <toast v-model="showToast" type="text">{{errorMsg}}</toast>
    </div>
</template>

<script>
    import cache from '@/utils/cache';
    import '../assets/scss/add.scss'
    import Uploader from 'vux-uploader-component'
    import {XTextarea, Checker, CheckerItem} from 'vux'

    export default {
        name: "add",
        components: {
            XTextarea, Uploader, Checker, CheckerItem
        },
        created() {
            let {data, name} = this.$router.currentRoute.params
            console.log(data)
            this.name = name
            this.contents = !cache.get('contentsModel') ? [] : cache.get('contentsModel')
            if (name === 'add') {
                this.model = data
            } else {
                this.model = data
                this.desc = data.addModel.desc
            }
        },
        data() {
            return {
                remoteUrl: '',
                showToast: false,
                errorMsg: '',
                titleVal: '',
                name: '',
                step: '',
                desc: '',
                imgurl: '',
                model: {},
                contents: [],
                sort: '',
            }
        },
        methods: {
            goback() {
                this.$router.go(-1)
            },
            toAdd() {
                if (this.desc == '') {
                    this.showToast = true
                    this.errorMsg = '请填写内容'
                    return
                }
                this.model = {
                    id: this.model.id,
                    index: this.model.index,
                    addModel: {desc: this.desc, image: this.imgurl, sort: this.sort}
                }
                if (this.name === 'add') {
                    this.contents.push(this.model)
                } else {
                    for (let i = 0; i < this.contents.length; i++) {
                        let item = this.contents[i]
                        if (this.model.id == item.id) {
                            this.contents[i] = this.model
                        }
                    }
                }
                cache.set('contentsModel', this.contents)
                console.log(cache.get('contentsModel'))
                this.$router.push({
                    name: 'Public',
                    params: {name: 'add'}
                })
            },
            getUrlBase64(url, ext, callback) {
                var canvas = document.createElement("canvas");   //创建canvas DOM元素
                var ctx = canvas.getContext("2d");
                var img = new Image;
                img.crossOrigin = 'Anonymous';
                img.src = url;
                img.onload = function () {
                    canvas.height = 60; //指定画板的高度,自定义
                    canvas.width = 85; //指定画板的宽度，自定义
                    ctx.drawImage(img, 0, 0, 60, 85); //参数可自定义
                    var dataURL = canvas.toDataURL("image/" + ext);
                    callback.call(this, dataURL); //回掉函数获取Base64编码
                    canvas = null;
                };
            },
            onChange(FileItem, FileList) {
                this.getUrlBase64(path, ext, (base64)=> {
                    console.log(base64);//base64编码值
                });
            },
            onCancel() {
            },
            onSuccess(result, fileItem) {
            },
            onError() {
            },
            onDelete() {
            },
        },
    }
</script>


