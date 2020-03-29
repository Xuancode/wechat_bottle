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
          console.log(res.data.token)
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
    
    this.playBGM()
  },

  playBGM() {
    const BGM = wx.getBackgroundAudioManager()
    
    BGM.title = 'my oasis'
    BGM.epname = 'my oasis'
    BGM.singer = 'my oasis'
    BGM.src = 'https://molitown.cn/media/bgm.m4a'
  } 
});

