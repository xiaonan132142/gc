<template>
  <div class="gc-public">
    <div class="public-header">
      <button @click="goback" class="btn goback-btn">返回上一层</button>
      <button @click="toPublc" class="public-btn">发布</button>
    </div>
    <div class="public-content">

      <x-input :max="30" placeholder="请输入标题" required class="title" v-model="title"></x-input>

      <checker v-model="sort" default-item-class="default-tag" selected-item-class="selected-tag">
        <checker-item value="干垃圾">干垃圾</checker-item>
        <checker-item value="湿垃圾">湿垃圾</checker-item>
        <checker-item value="其他">其他</checker-item>
        <checker-item value="不可回收">不可回收</checker-item>
      </checker>

      <x-textarea class="area" :max="50" placeholder="请将描述填写完整，图文并茂更有助于好评哦!" v-model="desc"></x-textarea>

      <uploader
        title=""
        :limit="1"
        :show-header="false"
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
  import '../assets/scss/public.scss';
  import { mapGetters } from 'vuex';
  import {
    Toast,
    XInput,
    XButton,
    XSwitch,
    XDialog,
    TransferDomDirective as TransferDom,
    Checklist,
    Checker,
    CheckerItem,
    XTextarea,
  } from 'vux';
  import Uploader from 'vux-uploader-component';

  export default {
    name: 'public',
    directives: {
      TransferDom,
    },
    components: {
      XInput, Uploader, XButton, XDialog, XSwitch, Checklist, Toast, Checker, CheckerItem, XTextarea,
    },
    data() {
      return {
        showToast: false,
        errorMsg: '',
        title: '',
        desc: '',
        sort: '',
        image: '',

        remoteUrl: '',
        fileList: [],

        commonList: [
          { key: '1', value: '免费', inlineDesc: '用户可免费查看' },
          { key: '2', value: '付费', inlineDesc: '用户需付费才能查看' },
        ],
        showDialog: false,
        switchVal: ['1'],
        setNum: 0,
      };
    },
    computed: {
      ...mapGetters([
        'chainInfo',
      ]),
    },
    created() {
      let from = this.$router.currentRoute.params.name;
      if (from === 'add') {
        this.contentlist = !cache.get('contentsModel') ? [] : cache.get('contentsModel');
        this.title = cache.get('title');
      }
    },
    methods: {
      goback() {
        this.$router.push('Mine');
        cache.set('contentsModel', []);
        console.log(cache.get('contentsModel'));
      },

      toPublc() {
        if (this.title == '') {
          this.showToast = true;
          this.errorMsg = '请填写标题';
          return;
        }
        if (this.desc == '') {
          this.showToast = true;
          this.errorMsg = '请填写内容';
          return;
        }
        this.showDialog = true;
      },

      handleChange(val) {
        this.switchVal = val;
        val === '1' ? this.setNum = 0 : this.setNum = this.setNum;
      },

      submit() {
        let params = {
          userId: this.chainInfo.userId,
          title: this.title,
          desc: this.desc,
          sort: this.sort,
          image: this.image,
          free: this.switchVal == '1' ? true : false,
          price: this.setNum,
        };
        this.axios.post(this.GLOBAL.baseUrl + '/classification/publish', params)
          .then((res) => {
            let { state, data } = res.data;
            if (state === 'success') {
              this.showDialog = false;
              this.$router.push('SuccessModel');
              cache.set('contentsModel', []);
              cache.set('title', '');
            }
          })
          .catch(err => console.log(err));
      },

      onChange(FileItem, FileList) {
        /*this.getUrlBase64(path, ext, (base64)=> {
            console.log(base64);//base64编码值
        });*/
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
  };
</script>
