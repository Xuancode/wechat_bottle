const app = getApp();

Page({
	data: {
    webviewReady: false,
    jwt: ''
	},
	onLoad() {
	},

  onReady(){
    // 登录
    wx.login({
      success: res => {
        // console.log(res.code)

        app.apis.login({ wxcode: res.code }).then(res => {
          // 存储token
          wx.setStorage({
            "key": 'ps_token',
            "data": res.data.token,
          })
          wx.setStorageSync('user_info', JSON.stringify(res.data.user_info))
          this.setData({
            webviewReady: true,
            jwt: res.data.token
          })
        }).catch(err => {
          // console.log(err)
        })
      }
    })
  },

  getUserInfo(res) {
    app.apis.getList({type: 0, page: 1, size: 10}).then( res=> {
      console.log(res)
    })
  }
});

