// components/p-sroll/p-scroll.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listType: {
      type: Number,
      value: 10,
      // observer: 'requestingEnd',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    data_list: [],
    typeTable: [1, 0, 2],    // tabIndex对应listType的关系
    obs: 'http://q3zie9bz3.bkt.clouddn.com/'
  },
  lifetimes: {
    ready() {
      
      app.apis.getList(this.data.typeTable[this.properties.listType], 1, 10).then(res => {
        this.setData({
          data_list: res.data
        })
        console.log(res.data)
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    addList(){
      console.log(999)
      wx.navigateTo({
        url: '/pages/newList/newList',
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {
          console.log(res)
        },
        complete: function(res) {},
      })
    },
    showList(e) {
      console.log(e.currentTarget.dataset.item)
      let data = JSON.stringify(e.currentTarget.dataset.item)
      wx.navigateTo({
        url: '/pages/listDetail/listDetail' + '?data=' + data,
        success: function(res) {
          console.log(res)
        },
        fail: function(res) {
          console.log(res)
        },
        complete: function(res) {},
      })
    },
    //刷新相关
    refresh() {
      console.log("开始刷新")
      wx.startPullDownRefresh()
    },
    //组件监听下拉刷新
    onPullDownRefresh() {
      console.log("组件监听已经下拉刷新")
    },
  }
})
