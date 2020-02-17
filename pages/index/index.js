const app = getApp();

let pageStart = 0;
let pageSize = 15;

Page({
	data: {
    // 顶部导航三参数
    navHeight: 0,
    navTop: 0,
    windowHeight: 0,
    statusBarHeight: 0,

		duration: 300,  // swiper-item 切换过渡时间
		showPage: -1, // 控制列表空状态的显示时机
		categoryCur: 0,
		categoryMenu: ["推荐", "求P", "我发起的"],
		categoryData: [
			{
				name: "推荐",
				requesting: false,
				end: false,
				emptyShow: false,
				page: pageStart,
				listData: []
			},
			{
        name: "求P",
				requesting: false,
				end: false,
				emptyShow: false,
				page: pageStart,
				listData: []
			},
			{
        name: "我的",
				requesting: false,
				end: false,
				emptyShow: false,
				page: pageStart,
				listData: []
			}
		],
    scrollH: 0,
	},
	// 顶部tab切换事件
	toggleCategory(e) {
		this.setData({
			duration: 0
		});
		setTimeout(() => {
			this.setData({
				categoryCur: e.detail.index
			});
		}, 0);
	},
	// 页面滑动切换事件
	swipeChange(e) {
		this.setData({
			duration: 200
		});
		setTimeout(() => {
			this.setData({
				categoryCur: e.detail.current
			})
		}, 0);
	},
  // 获取tab的高度
  countScrollH(e) {
    setTimeout(()=> {
      const query = wx.createSelectorQuery()
      query.select('.index_page').boundingClientRect(res => {
        this.setData({
          scrollH: res.height - app.globalData.navHeight - (375 / 750) * 80
        })
      }, err => {
        console.log(err)
      }).exec()
    }, 100) 
  },
	onLoad() {
    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight,
      statusBarHeight: app.globalData.statusBarHeight,
    })
    this.countScrollH()
	},

  onReady(){
    
  },

  getUserInfo(res) {
    app.apis.getList({type: 0, page: 1, size: 10}).then( res=> {
      console.log(res)
    })
  }
});

