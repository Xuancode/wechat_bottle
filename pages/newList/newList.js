// pages/newList/newList.js
const qiniuUploader = require("../../utils/qiniuUploader");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upImg: [
    ],
  },

  getPhoto() {
    // let _this.
    wx.chooseImage({
      count: 6,
      sourceType: ['album', 'camera'],
      success: res=> {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        this.setData({
          upImg: [...this.data.upImg, ...tempFilePaths]
        })
        // console
        console.log(tempFilePaths)
        this.upImg(tempFilePaths)
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  upImg(filePath) {
    const token = wx.getStorageSync('qiNiuToken')
    console.log(token)
    qiniuUploader.upload( filePath[0], (res) => {

    }), (err) => {

    }, {
      region: 'ECN',
      domain: 'ps-please-dev.s3-cn-south-1.qiniucs.com',
      key: filePath[0],
      uptoken: token
    }, (res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    },() => {
      console.log('取消上传')
    }, () => {
      console.log('上传前执行的操作')
    }, (err) => {
      console.log('complete')
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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