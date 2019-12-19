// components/tab/tab.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: Array
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab: 0 // 关联全局的currentTab 
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    ready() {
      this.setData({
        currentTab: app.globalData.currentTab
      })
    }
  },
  methods: {
    // 下划线动画
    lineAnimate() {
      this.animate('.line', [
        { width: 0 },
        { width: '40rpx' },
      ], 200, function () {
      }.bind(this))
    },
    // 点击切换tab事件
    clickTab(e) {
      this.setData({
        currentTab: e.currentTarget.dataset.index
      }, () => {
        this.lineAnimate()
        app.globalData.currentTab = this.data.currentTab
      })
    }
  }
})
