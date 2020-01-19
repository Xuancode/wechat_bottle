// pages/listDetail/listDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: {},
    imgArr: [],
    obs: 'http://q3zie9bz3.bkt.clouddn.com/'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.data)
    let data = options.data
    data = JSON.parse(data)
    let arr = data.side_imgs.split(',')
    this.setData({
      listData: data,
      imgArr: arr
    })
    
    console.log(this.data.imgArr)
  },

  showPic(e) {
    // if (e.imgs || e.imgs.length >1) {
      
    // }
    if (e.currentTarget.dataset && e.currentTarget.dataset.index) {
      wx.previewImage({
        urls: e.currentTarget.dataset.imgs,
        current: e.currentTarget.dataset.imgs[e.currentTarget.dataset.index]
      })
    } else {
      wx.previewImage({
        urls: e.currentTarget.dataset.imgs
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})