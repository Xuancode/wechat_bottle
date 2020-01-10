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
    data_list: [
      // {
      //   title: "求P图P一个天使来拯救世人求P图P一个天使来拯救世人",
      //   editor: "tony哥",
      //   reply: "好的，马上就会有天使来拯救你",
      //   url: "/img/test/pic0.png"
      // },
      {
        title: "求P图P一个天使来拯救世人求P图P一个天使来拯救世人",
        editor: "tony哥",
        reply: "好的，马上就会有天使来拯救你",
        src_img: "/img/test/pic0.png"
      },
      {
        title: "求P图P一个天使来拯救世人求P图P一个天使来拯救世人",
        editor: "tony哥",
        reply: "好的，马上就会有天使来拯救你",
        src_img: "/img/test/pic0.png"
      },
      {
        title: "求P图P一个天使来拯救世人求P图P一个天使来拯救世人",
        editor: "tony哥",
        reply: "好的，马上就会有天使来拯救你",
        src_img: "/img/test/pic0.png"
      },
      {
        title: "求P图P一个天使来拯救世人求P图P一个天使来拯救世人",
        editor: "tony哥",
        reply: "好的，马上就会有天使来拯救你",
        src_img: "/img/test/pic0.png"
      },
      {
        title: "求P图P一个天使来拯救世人求P图P一个天使来拯救世人",
        editor: "tony哥",
        reply: "好的，马上就会有天使来拯救你",
        src_img: "/img/test/pic0.png"
      }
    ]
  },
  lifetimes: {
    ready() {
      console.log(this.properties.listType)
      app.apis.getList({ type: this.properties.listType, page: 1, size: 10 }).then(res => {
        this.setData({
          data_list: res.data
        })
        console.log(res)
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
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
