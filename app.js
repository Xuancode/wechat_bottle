//app.js

import apis from './apis/apis.js'
global.regeneratorRuntime = require('./utils/runtime.js') // 兼容es7的 async, 需要的页面还要单独定义
// require("./utils/regenerator-runtime/runtime")
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 获取三个参数用于计算顶部导航位置
    // let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    // wx.getSystemInfo({
    //   success: res => {
    //     let statusBarHeight = res.statusBarHeight,
    //       navTop = menuButtonObject.top,//胶囊按钮与顶部的距离
    //       navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2;//导航高度
    //     this.globalData.navHeight = navHeight;
    //     this.globalData.navTop = navTop;
    //     this.globalData.windowHeight = res.windowHeight;
    //     this.globalData.statusBarHeight = statusBarHeight
    //   },
    //   fail(err) {
    //     console.log(err);
    //   }
    // })

    

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        } else {
          this.globalData.userInfo = null
        }
      }
    })
  },
  apis: new apis(),
  globalData: {
    userInfo: null,
    currentTab: 0,
    hostPort: 'http://localhost:7001',
    qiNiuObs: 'http://obs.molitown.cn/',
    // 顶部导航三参数
    navHeight: 0,
    navTop: 0,
    windowHeight: 0,
    statusBarHeight: 0,
  }
})