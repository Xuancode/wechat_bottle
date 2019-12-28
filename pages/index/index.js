//index.js
//获取应用实例
const app = getApp()

wx.login({
  success(res) {
    console.log(res)
  }
})

Page({
  data: {
    motto: 'ai, no money',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    getKeyUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx27d8d47c69b319c9&secret=ce7cc07752d6cb94e030ef0fc8260293&js_code=JSCODE&grant_type=authorization_code',
    tabList: [{ label: '推荐', index: 0 }, { label: '完成', index: 1 }, { label: '待做', index: 2 }, { label: '我的', index: 3}]
  },
  //tab选择

  //**自定义函数部分**//
  getKey: function() {
    wx.request({
      url: getKeyUrl,
    })
  },
  //轮播图
  clickBanner: function(e) {
    console.log(e.currentTarget.dataset.url)
    console.log(this.motto)
  },

  //test
  test: function(e) {
    console.log(e)
  },
  
  


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  //监听下拉刷新
  onPullDownRefresh() {
    console.log("已经下拉刷新")
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(e.detail.userInfo)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
