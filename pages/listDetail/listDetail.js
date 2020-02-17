// pages/listDetail/listDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: {},
    imgArr: [],
    obs: 'http://q3zie9bz3.bkt.clouddn.com/',
    commentArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = options.data
    data = JSON.parse(data)
    let arr = data.side_imgs.split(',')
    this.setData({
      listData: data,
      imgArr: arr
    })
    this.initComment(1, 1, 10, data.id || 2)
    
    console.log(this.data.imgArr)
  },
  initComment(type, page, size, list_id) {
    app.apis.getComment(type, page, size, list_id).then(res => {
      console.log(res)
      // 图片字符串转为数组
      for (let i = 0; i < res.data.length; i++) {
        res.data[i] = { ...res.data[i], ...{ answerImgArr: res.data[i].imgs.split(',') } }
      }
      this.setData({
        commentArr: res.data
      })
    }, err => {

    })
  },
  showPic(e) {
    console.log(e)
    let data = e.currentTarget.dataset
    for (let i = 0; i < data.imgs.length; i++) {
      data.imgs[i] = this.data.obs + data.imgs[i]
    }
    if (data && data.index) {
      wx.previewImage({
        urls: data.imgs,
        current: data.imgs[data.index]
      })
    } else {
      wx.previewImage({
        urls: data.imgs
      })
    }    
  },
  toReply() {
    wx.navigateTo({
      url: `/pages/newList/newList?listType=0&parentsID=0&listID=${this.data.listData.id}&listEditorID=${this.data.listData.user_id}`,
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
    console.log("触底")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})