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
    obs: 'http://q3zie9bz3.bkt.clouddn.com/',
    page: 1
  },
  lifetimes: {
    ready() {
      this.getData(this.data.page, 10)
      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    moreList(val) {
      // console.log('更多内')
      this.triggerEvent('loadStatus', 'loading')
      this.getData(this.data.page, 10)
    },
    getData(page, size) {
      console.log( '页码',this.data.page)
      app.apis.getList(this.data.typeTable[this.properties.listType], page, size).then(res => {
        // 处理图片字符串转为数组，推荐命名为answerImgArr， 其他命名为askImgArr
        if (this.data.typeTable[this.properties.listType] == 1) {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i] = { ...res.data[i], ...{ answerImgArr: res.data[i].comments[0].imgs.split(',') } }
          }
        } else {
          for (let i = 0; i < res.data.length; i++) {
            res.data[i] = { ...res.data[i], ...{ askImgArr: res.data[i].side_imgs.split(',') } }
          }
        }
        // 初始化或拼接数据
        this.setData({
          data_list: this.data.data_list.length > 0 ? [...this.data.data_list, ...res.data] : res.data
        })

        // 判断是否还有剩余页码
        if (this.data.page === res.meta.pagination.total_pages) {
          console.log('no了吧')
          this.triggerEvent('pageStatus', 'no')
        } else {
          this.data.page++ 
        }
        
        // this.set(this.data.data_list)
      })
    },
    addList(){
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
