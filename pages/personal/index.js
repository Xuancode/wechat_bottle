// pages/personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /** 列表数据 */
    caseData: [
      {
        icon: '/img/icon/lets.png',
        text: '求P记录',
        navUrl: ''
      },
      {
        icon: '/img/icon/lets.png',
        text: 'P图记录',
        navUrl: ''
      },
      {
        icon: '/img/icon/lets.png',
        text: '成为作者',
        navUrl: ''
      },
    ],
    helpData: [
      {
        icon: '/img/icon/lets.png',
        text: '意见反馈',
        navUrl: ''
      },
      {
        icon: '/img/icon/lets.png',
        text: '常见问题',
        navUrl: ''
      },
      {
        icon: '/img/icon/lets.png',
        text: '关于我们',
        navUrl: ''
      },
    ],
    nickName: '',
    introduce: '',
    avatarUrl: '',
    obs: app.globalData.qiNiuObs,
    userAllow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.apis.getLoginStatus().then(res=> {
      this.setData({
        introduce: res.data.introduce,
        nickName: res.data.name,
        avatarUrl: res.data.avatar
      })
      console.log(res.data)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})