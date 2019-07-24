<template>
  <div>
    <vueSeamless class="dialogue" :data="dialogueList" :class-option="classOption">
      <ul>
        <li class="dialogue-wrap" v-for="(usr,index) in dialogueList">
          <img class="img" :src="usr.user && usr.user.avatar">
          <span class="word">{{usr.content}}</span>
        </li>
      </ul>
    </vueSeamless>
  </div>
</template>

<script>
  import vueSeamless from 'vue-seamless-scroll';
  import { defaultAvatar } from '../../config/ultrain';

  export default {
    components: {
      vueSeamless,
    },
    name: 'indexChart',
    created() {
      this.getChatList();
    },
    data() {
      return {
        dialogueList: [],
      };
    },
    computed: {
      classOption: function() {
        return {
          step: 0.2,
          limitMoveNum: 5,
          hoverStop: false,
          direction: 1,
          openWatch: true,
          singleHeight: '16.98px',
          waitTime: 1000,
        };
      },
    },
    methods: {
      // 聊天
      getChatList() {
        this.axios.get(this.GLOBAL.baseUrl + '/chat/list')
          .then((res) => {
            let { state, message, data } = res.data;
            if (state == 'success') {
              let dataFix = data.map(d => {
                if (d.user) {
                  return d;
                } else {
                  return Object.assign({}, d, { user: { avatar: defaultAvatar } });
                }
              });
              this.dialogueList = dataFix || [];
            }
          })
          .catch((err) => console.log(err));
      },
    },
  };
</script>

<style scoped>

</style>
