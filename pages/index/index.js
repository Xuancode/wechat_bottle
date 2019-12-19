//index.js
//获取应用实例
const app = getApp()

wx.login({
  success(res) {
    console.log(res)
    // if (res.code) {
    //   //发起网络请求
    //   wx.request({
    //     url: 'https://test.com/onLogin',
    //     data: {
    //       code: res.code
    //     }
    //   })
    // } else {
    //   console.log('登录失败！' + res.errMsg)
    // }
  }
})

Page({
  data: {
    motto: 'ai, no money',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    getKeyUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx27d8d47c69b319c9&secret=ce7cc07752d6cb94e030ef0fc8260293&js_code=JSCODE&grant_type=authorization_code',
    //轮播图 start
    carouselList: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576581916310&di=fd4cb42e391160390f984f579d051e16&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D2523955944%2C727728809%26fm%3D214%26gp%3D0.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576581915296&di=55c04eed92d8c2c5ab597f009c0dcfe8&imgtype=0&src=http%3A%2F%2Ffinance.workercn.cn%2Fhtml%2Ffiles%2F2018-08%2F02%2F20180802203850933107438.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576581988912&di=226facca1f2f6822878eb5d2119ccb44&imgtype=jpg&src=http%3A%2F%2Fimg0.imgtn.bdimg.com%2Fit%2Fu%3D1451819545%2C149563471%26fm%3D214%26gp%3D0.jpg'],
    //轮播图 end
    tabList: [{ label: 'P完', index: 0 }, { label: '求P', index: 1 }, { label: '我的P', index: 2 }]
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
