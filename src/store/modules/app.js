const app = {
  state: {
    direction: 'swiper',       //tip或者swiper(点击返回还是滑动返回)
    userInfo: {
      userId: '',
      username: '',
      avatar: '',
      phoneNum: '',
      accountName: '',
    },
    chainInfo: {
      chainId: '',
      userId: '',
      phoneNum: '',
      accountName: '',
    },
    mineObj: {
      value:''
    },
  },
  mutations: {
    SET_DIRECTION: (state, direction) => {
      state.direction = direction;
    },
    SET_USERINFO: (state, obj) => {
      state.userInfo = obj;
    },
    SET_CHAININFO: (state, obj) => {
      state.chainInfo = obj;
    },
    SET_MINEOBJ: (state, obj) => {
      state.mineObj = obj;
    },
  },
};

export default app;
