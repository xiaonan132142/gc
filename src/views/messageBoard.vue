<template>
  <div class="gbt-dialog">
    <div class="gbt-dialog-header">
      <button @click="goback" class="btn" style="color:#000;">返回上一层</button>
      <span class="title">发弹幕</span>
      <button @click.once="send" class="btn send-btn">发送</button>
    </div>
    <x-textarea v-model="usrMessage" :max="30" placeholder="写下你的想法" @on-focus="onEvent('focus')"
                @on-blur="onEvent('blur')"></x-textarea>
    <toast v-model="showToast" type="text">{{errorMsg}}</toast>
  </div>
</template>
<script>
  import { XTextarea, Toast } from 'vux';
  import { mapGetters } from 'vuex';

  export default {
    components: {
      XTextarea, Toast,
    },
    name: 'MessageBoard',
    data() {
      return {
        showToast: false,
        usrMessage: '',
        errorMsg: '',
      };
    },
    computed: {
      ...mapGetters([
        'userInfo',
      ]),
    },
    methods: {
      goback() {
        this.$router.go(-1);
      },
      onEvent(event) {
        console.log('on', event);
      },
      send() {
        let params = {
          userId: this.userInfo.userId,
          content: this.usrMessage,
        };
        this.axios.post(this.GLOBAL.baseUrl + '/chat/add', params)
          .then((res) => {
            let { state, message } = res.data;
            if (state == 'success') {
              this.goback();
              this.$emit('listenChatList');
            } else {
              this.errorMsg = message;
              this.showToast = true;
            }
          })
          .catch((err) => console.log(err));
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "../assets/scss/theme";

  .gbt-dialog {
    width: 100%;
    height: 100%;
    background: $cWhite;

    .gbt-dialog-header {
      height: 50px;
      padding: 0 14px;
      @include flex-row(row, space-between);
      align-items: center;

      .icon {
        fill: $cBg;
      }

      .title {
        color: $cBg;
      }

      .send-btn {
        @include setBtn(70px, 30px, $cGreen, 5px, $cWhite, 12px);
      }
    }
  }
</style>
