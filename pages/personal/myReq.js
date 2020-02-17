// pages/personal/myReq.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    size: 10,  // 每次请求的数量,默认20
    page: 1,
    data_list: [],
    obs: app.globalData.qiNiuObs,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
  },

  initData() {
    this.getData(1, this.data.size)
  },
  moreList(val) {
    // console.log('更多内')
    this.triggerEvent('loadStatus', 'loading')
    this.getData(this.data.page, size)
  },
  getData(page, size) {
    app.apis.getList(0, page, size).then(res => {
      console.log(res)
      // 处理图片字符串转为数组askImgArr
      for (let i = 0; i < res.data.length; i++) {
        res.data[i] = { ...res.data[i], ...{ askImgArr: res.data[i].side_imgs.split(',') } }
      }
      // 初始化或拼接数据
      this.setData({
        data_list: this.data.data_list.length > 0 ? [...this.data.data_list, ...res.data] : res.data
      })
      // 判断是否还有剩余页码
      // if (this.data.page === res.meta.pagination.total_pages) {
      //   this.triggerEvent('pageStatus', 'no')
      // } else {
      //   this.data.page++
      // }

    })
  },
  addList() {
    wx.navigateTo({
      url: '/pages/newList/newList',
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
  },
  showList(e) {
    console.log(e.currentTarget.dataset.item)
    let data = JSON.stringify(e.currentTarget.dataset.item)
    wx.navigateTo({
      url: '/pages/listDetail/listDetail' + '?data=' + data,
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
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