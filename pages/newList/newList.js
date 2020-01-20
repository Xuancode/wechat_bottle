// pages/newList/newList.js
const qiniuUploader = require("../../utils/qiniuUploader")
const {regeneratorRuntime} = global
const app = getApp()
// qiniuUploader.init()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    upImg: [],
    // upImg: [],
    textareaValue: '',
    imgMaxLength: 6,
    loadingTimer: null,
    listType: 2,
    parentsID: 0, // 增加评论时需要父id
    listID: 0,  // 增加评论时需要listid
    listEditorID: 0,

  },

  saveValue(e) {
    this.data.textareaValue = e.detail.value
  },
  deleteImg(e) {
    this.data.upImg.splice(e.currentTarget.dataset.deleteindex, 1)
    this.setData({
      upImg: this.data.upImg
    })
  },
  showPic(e, data) {
    wx.previewImage({
      urls: this.data.upImg,
      current: this.data.upImg[e.currentTarget.dataset.imgindex],
    })
  },
  getPhoto() {
    const _this = this
    if (this.data.upImg.length >= this.data.imgMaxLength) {
      console.log(`最多选择${this.data.imgMaxLength}张图片哦`)
      wx.showToast({
        title: `最多选择${this.data.imgMaxLength}张图片哦`,
        icon: 'none',
        duration: 2000,
      })
      return
    }
    wx.chooseImage({
      count: this.data.imgMaxLength - this.data.upImg.length,
      sourceType: ['album', 'camera'],
      success: res=> {
        // console.log(res)
        const tempFilePaths = res.tempFilePaths
        this.setData({
          upImg: [...this.data.upImg, ...tempFilePaths]
        })
        // console
        console.log(tempFilePaths)
      },
      fail(err) {
        if (err.errMsg.indexOf('cancel') == -1) {
          _this.errorImgTip()
          console.log("图片上传错误" + err)
        }
      }
    })
  },
  // 表单验证
  validate() {
    if (this.data.textareaValue.length == 0) {
      wx.showToast({
        title: '请描述您的需求哦',
        icon: 'none',
        duration: 2000,
      })
      return true
    } else if (this.data.upImg.length == 0) {
      wx.showToast({
        title: '请选择您要处理的图片哦',
        icon: 'none',
        duration: 2000,
      })
      return true
    }
  },
  async announce() {
    if (this.validate()) {
      return
    }
    // 显示loading， 定时10s关闭，以防出错无法关闭的情况
    wx.showLoading({
      title: '上传中',
    })
    this.data.loadingTimer = setTimeout(()=> {
      wx.hideLoading()
    }, 10000)
    try {
      const upRes = await this.upLoadImg(this.data.upImg, wx.getStorageSync('qiNiuToken'))
      if (this.data.listType == 2) {
        // 新增list时候使用的数据
        let listData = {
          title: this.data.textareaValue,
          src_img: upRes[0],
          side_imgs: upRes.join(','),
          listType: this.data.listType
        }
        const resData = await app.apis.addList(listData)
      } else {
        // 新增comment时候使用的数据
        let uid = JSON.parse(wx.getStorageSync('user_info')).id
        let commentData = {
          content: this.data.textareaValue,
          parents_id: this.data.parentsID,
          list_id: this.data.listID,
          imgs: upRes.join(','),
          is_editor: this.data.listEditorID == uid ? 1 : 0
        }
        const resData = await app.apis.addComment(commentData)
      }

      wx.hideLoading()
      clearTimeout(this.data.loadingTimer)
      this.backRouter()
    } catch (err) {
      wx.hideLoading()
      clearTimeout(this.data.loadingTimer)
      this.errorImgTip()
      console.log(err)
    }
  },
  backRouter() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  errorImgTip() {
    wx.showModal({
      title: '提示',
      content: '图片上传失败，请检查是否有错误图片或者过大的图片',
      showCancel: false,
      success(res) {
      }
    })
  },
  upLoadImg(filePaths, token) {
    const _this = this
    let uplist = []
    for (let index in filePaths) {
      const path = filePaths[index]
      let promise = new Promise((resolve, reject) => {
        let a = filePaths[index].split('.')
        let endName = a[a.length -1]
        qiniuUploader.upload( filePaths[index], (res) => {
          console.log("成功了")
          resolve(res.key)
        }, (err) => {
          _this.errorImgTip()
          reject(error)
        }, {
          uptoken: token,
          uptokenURL: true, // 修改过，地址写到apis里面
          region: 'ECN',
          domain: 'q3zie9bz3.bkt.clouddn.com',
          key: new Date().getTime() + '.' + endName,

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
    return Promise.all(uplist)  
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      listType: options.listType || 2,
      parentsID: options.parentsID || 0,
      listID: options.listID || 0,
      listEditorID: options.listEditorID || 0,
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