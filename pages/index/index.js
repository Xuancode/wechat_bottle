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
		]
	},
  onPullDownRefresh(e) {
    console.log(e)
  },
  onReachBottom(e) {
    console.log(e)
  },
	getList(type, currentPage) {
		// let currentCur = this.data.categoryCur;

		// let _data = testData1;
		// if(currentCur % 2 == 1) _data = testData2;

		// let pageData = this.getCurrentData(currentCur);

		// pageData.requesting = true;

		// this.setCurrentData(currentCur, pageData);

		// wx.showNavigationBarLoading();

		// // 模拟异步获取数据场景
		// setTimeout(() => {
		// 	pageData.requesting = false;

		// 	wx.hideNavigationBarLoading();


		// 	if (type === 'refresh') {
		// 		pageData.listData = _data;
		// 		pageData.end = false;
		// 		pageData.page = currentPage + 1;
		// 	} else {
		// 		pageData.listData = pageData.listData.concat(_data);
		// 		pageData.end = true;
		// 		pageData.page = currentPage + 1;
		// 	}

		// 	this.setCurrentData(currentCur, pageData);
		// }, 1000);
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
			duration: 300
		});
		setTimeout(() => {
			this.setData({
				categoryCur: e.detail.current
			});
			this.loadData()
		}, 0);
	},
	// 更新页面数据
	setCurrentData(currentCur, pageData) {
		let categoryData = this.data.categoryData
		categoryData[currentCur] = pageData
		this.setData({
			categoryData: categoryData
		})
	},
	// 获取当前激活页面的数据
	getCurrentData(currentCur) {
		return this.data.categoryData[currentCur]
	},
	// 判断是否为加载新的页面,如果是去加载数据
	loadData() {
		let pageData = this.getCurrentData(this.data.categoryCur);
		if (pageData.listData.length === 0) {
			this.getList('refresh', pageStart);
		}
	},
	// 刷新数据
	refresh() {
		this.getList('refresh', pageStart);
	},
	// 加载更多
	more() {
		this.getList('more', this.getCurrentData(this.data.categoryCur).page);
	},
	onLoad() {

    this.setData({
      navHeight: app.globalData.navHeight,
      navTop: app.globalData.navTop,
      windowHeight: app.globalData.windowHeight,
      statusBarHeight: app.globalData.statusBarHeight,
    })
    
    // wx.request({
    //   url: this.globalData.hostPort + '/api/v1/session',
    //   data: {
    //     wxcode: res.code
    //   },
    //   method: 'POST',
    //   success: res => {
    //     console.log(res)

    //     wx.setStorage({
    //       "key": 'ps_token2',
    //       "data": res.data.token,
    //       success: res => {
    //         console.log(res)
    //       },
    //       fail: (err) => {
    //         console.log(err)
    //       }
    //     })
    //   }
    // })






    // // 获取用户信息部分
    // if (!app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
      
    // }



		// 第一次加载延迟 350 毫秒 防止第一次动画效果不能完全体验
		setTimeout(() => {
			this.getList('refresh', pageStart);
		}, 350);
	},

  getUserInfo(res) {
    console.log(res)

    // app.apis.getLoginStatus({ uid: 2 }).then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })

    app.apis.getList({type: 0, page: 1, size: 10}).then( res=> {
      console.log(res)
    })
  }
});

