// components/top-nav/top-nav.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titleName: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navHeight: 0,
    navTop: 0,
    windowHeight: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  ready() {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight,
    })
  },
})
