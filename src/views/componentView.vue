<template>
  <div>
    <div class="item-block" v-for="(item,index) in list" @click="handleRouter(item)">

      <div v-if="item.image" class="dec-block-img">
        <div>
          <div class="title">
            <span>{{item.title}}</span>
          </div>

          <div class="left">
            <div class="userinfo">
              <img :src="item.user[0].avatar" alt="">
              <span>{{item.user[0].accountName}}</span>
            </div>
            <div class="content" v-if="item.free">{{item.desc + '属于' + item.sort }}</div>
            <div class="content to-pay" v-else>待解锁</div>
          </div>
        </div>

        <img :src="item.image" width="104px" height="77px" alt="">
      </div>

      <div v-else class="dec-block">
        <div class="title">
          <span>{{item.title}}</span>
        </div>

        <div class="userinfo">
          <img :src="item.user[0].avatar" alt="">
          <span>{{item.user[0].accountName}}</span>
        </div>
        <div class="content" v-if="item.free">{{item.desc + '属于' + item.sort }}</div>
        <div class="content to-pay" v-else>待解锁</div>
      </div>


      <div class="article-info">
        <div class="info">
          <!--<span :class="[item && item.sort?'tag-class':'']">{{item.sort}}</span>-->
          <span class="price" v-if="!item.free">{{item.price}} 垃圾币</span>
          <span class="price" v-else>免费</span>
          <span class="comment">{{item.commentCount}}条评论</span>
          <span>{{item.date}}</span>
        </div>
        <button class="btn check-btn" @click.stop="checkComment(item._id)">查看评论</button>
      </div>

    </div>
    <toast v-model="showToast" type="text">{{errorMsg}}</toast>
  </div>
</template>

<script>
  import { createU3 } from 'u3.js';
  import config from '../../config/ultrain';
  import { XButton, Toast } from 'vux';
  import '../assets/scss/componentView.scss';
  import cache from '@/utils/cache';
  import { mapGetters } from 'vuex';

  export default {
    name: 'componentView',
    components: {
      XButton, Toast,
    },
    props: ['parentData'],
    data() {
      return {
        list: [],
        showToast: false,
        errorMsg: '',
        balance: 0,
      };
    },
    computed: {
      ...mapGetters([
        'chainInfo',
      ]),
    },
    methods: {
      goback() {
        this.$router.go(-1);
      },
      checkComment(val) {
        this.$router.push({
          name: 'Check',
          params: { _id: val, from: 'checkComment' },
        });
      },
      handleRouter(item) {
        if (item.free || item.hasRead) {
          this.$router.push({
            name: 'Check',
            params: item,
          });
        } else {
          //调用钱包
          if (item.price != 0) {
            this.getWallet(item);
          }
        }
      },
      getToplist() {
        this.axios.get(this.GLOBAL.baseUrl + '/classification/getTodayRecommend', { readerId: this.chainInfo.userId })
          .then((res) => {
            let { state, data } = res.data;
            if (state === 'success') {
              this.list = data;
            }
          })
          .catch(err => console.log(err));
      },
      getResultlist() {
        let keywordVal = cache.get('keyword');
        this.axios.get(this.GLOBAL.baseUrl + `/classification/getAll?keyword=${keywordVal}&readerId=${this.chainInfo.userId}`)
          .then((res) => {
            let { state, data } = res.data;
            if (state === 'success') {
              this.list = data;
            }
          })
          .catch(err => console.log(err));
      },
      // 获取balance
      async getBanlance() {
        const u3 = createU3(config);
        this.balance = await u3.getCurrencyBalance({
          code: config.pointAccount,
          account: this.chainInfo.accountName,
          symbol: config.symbol,
        });
      },
      getWallet(item) {
        // if (item.price > this.balance) {
        //     this.errorMsg = '您的积分不足';
        //     this.showToast = true;
        //     return;
        // }
        let postData = {
          'chainId': this.chainInfo.chainId,                 //[必填],链ID,从url的参数中获取后回填至此
          'contract': config.pointAccount,             //[必填],如果转账UGAS,则值为"utrio.token"，否则值为具体的发币合约的owner账号
          'action': 'transfer',                   //[必填],转账业务，值为固定的值"transfer"
          'type': 'transfer',                     //[必填],转账业务的固定值为"transfer"
          'bizId': new Date().getMilliseconds(),              //[必填],业务id,用来保证同一业务不会重复转账
          'data': {
            'payer': this.chainInfo.accountName,
            'receiver': item.user[0].accountName,           //[必填],收款账号，一般为商家的账号
            'quantity': item.price + ' GC',           //[必填],数量及单位，如果是UGAS,则比如"100.0000 UGAS"
            'memo': 'pay for read',                        //[必填],值可以空
          },
        };
        let data = postData;
        if (window.postMessage) {
          console.log('sending data to webview...', JSON.stringify(data));
          window.postMessage(JSON.stringify(data));
        } else {
          throw Error('postMessage接口还未注入');
        }
      },
    },
    mounted() {
      // 调用钱包结果
      document.addEventListener('message', (e) => {
        let result = e.data;
        let { success, msg } = JSON.parse(result);
        if (success) {
          this.getBanlance();
        } else {
          this.errorMsg = msg;
          this.showToast = true;
        }
      });
    },
  };
</script>
