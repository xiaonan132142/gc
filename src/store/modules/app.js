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
    predictInfo: {
      predictRank: 0,
      predictTimes: 0,
      isFinished: false,
      isWin: false,
      awardResult: 0,
    },
    rankInfo:{
      predictRank: 0,
      predictTimes: 0,
      winRank: 0,
      winRatio: 0,
      winTimes: 0,
      awardTimes: 0,
    },
    chainInfo: {
      chainId: '',
      userId: '',
      phoneNum: '',
      accountName: '',
    },
    awardInfo: {
      awardDate: '',
      awardId: '',
      awardResult: 0,
    },
  },
  mutations: {
    SET_DIRECTION: (state, direction) => {
      state.direction = direction;
    },
    SET_USERINFO: (state, obj) => {
      state.userInfo = obj;
    },
    SET_RANKINFO: (state, obj) => {
      state.rankInfo = obj;
    },
    SET_PREDICTINFO: (state, obj) => {
      state.predictInfo = obj;
    },
    SET_CHAININFO: (state, obj) => {
      state.chainInfo = obj;
    },
    SET_AWARDINFO: (state, obj) => {
      state.awardInfo = obj;
    },
  },
};

export default app;
