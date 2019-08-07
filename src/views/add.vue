<template>
    <div class="gc-add">
        <div class="public-header">
            <button @click="goback" class="btn goback-btn">返回上一层</button>
            <button @click="toAdd" class="public-btn"><span v-if="name==='add'">添加</span><span v-else>保存</span></button>
        </div>
        <div class="single-block">
            <div class="step">
                第{{model.index+1}}步
            </div>
            <x-textarea class="area" :max="50" placeholder="请输入内容" v-model="desc"></x-textarea>
            <uploader
                    :max="1"
                    :images="imagesUrl"
                    :handle-click="true"
                    :show-header="false"
                    :readonly="false"
                    :upload-url="uploadUrl"
                    name="img"
                    :params="params"
                    size="small"
                    @preview="previewMethod"
                    @add-image="addImageMethod"
                    @remove-image="removeImageMethod"
            ></uploader>
            <checker v-model="sort" default-item-class="default-tag" selected-item-class="selected-tag">
                <checker-item value="1">干垃圾</checker-item>
                <checker-item value="2">湿垃圾</checker-item>
                <checker-item value="3">其他</checker-item>
                <checker-item value="4">不可回收</checker-item>
            </checker>
        </div>
    </div>
</template>

<script>
    import cache from '@/utils/cache';
    import '../assets/scss/add.scss'
    import Uploader from 'vux-uploader'
    import {XTextarea,Checker, CheckerItem} from 'vux'

    export default {
        name: "add",
        components: {
            XTextarea, Uploader,Checker, CheckerItem
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
                titleVal: '',
                imagesUrl: [],
                uploadUrl: '',
                params: {},
                name: '',
                step: '',
                desc: '',
                imgurl: '',
                model: {},
                contents: [],
                sort:'',
            }
        },
        methods: {
            goback() {
                this.$router.go(-1)
            },
            toAdd() {
                this.model = {
                    id: this.model.id,
                    index: this.model.index,
                    addModel: {desc: this.desc, image: this.imgurl,sort:this.sort}
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
            previewMethod() {
            },
            addImageMethod() {
            },
            removeImageMethod() {
            },
        },
    }
</script>


