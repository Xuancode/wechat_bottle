// pages/newList/newList.js
const qiniuUploader = require("../../utils/qiniuUploader");
// qiniuUploader.init()
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
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  announce() {
    console.log("点击右键")
    
    this.upLoadImg(this.data.upImg, wx.getStorageSync('qiNiuToken'))
  },
  upLoadImg(filePaths, token) {
    let uplist = []
    for (let index in filePaths) {
      const path = filePaths[index]
      let promise = new Promise((resolve, reject) => {

        qiniuUploader.upload( filePaths[0], (res) => {
          console.log("成功了")
          resolve(res.key)
        }, (err) => {
          console.log("失败了")
          reject(error)
        }, {
          uptoken: token,
          uptokenURL: true, // 修改过，地址写到apis里面
          region: 'ECN',
          domain: 'q3zie9bz3.bkt.clouddn.com',
          key: filePaths[index],

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
        })

      })
      uplist.push(promise)
    }

    Promise.all(uplist).then((resultList) => {
      console.log(resultList)
    }, error => {
      console.log(error)
      wx.showToast({
        title: '图片上传失败',
        icon: 'none',
        duration: 2000,
      })
    })
    // const token = wx.getStorageSync('qiNiuToken')
    // console.log(token)
    // qiniuUploader.upload( filePath[0], (res) => {
    //   console.log("成功了")
    // }, (err) => {
    //   console.log("失败了")
    // }, {
    //   uptoken: wx.getStorageSync('qiNiuToken'),
    //   uptokenURL: true, // 修改过，地址写到apis里面
    //   region: 'ECN',
    //   domain: 'q3zie9bz3.bkt.clouddn.com',
    //   key: filePath[0],
      
    // }, (res) => {
    //   console.log('上传进度', res.progress)
    //   console.log('已经上传的数据长度', res.totalBytesSent)
    //   console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    // },() => {
    //   console.log('取消上传')
    // }, () => {
    //   console.log('上传前执行的操作')
    // }, (err) => {
    //   console.log('complete')
    // })
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