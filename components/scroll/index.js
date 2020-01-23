Component({
	properties: {
		// 控制空状态的显示
		emptyShow: {
			type: Boolean,
			value: false,
		},
		// 空状态的图片
		emptyUrl: {
			type: String,
			value: "/assets/image/empty/empty.png"
		},
		// 空状态的文字提示
		emptyText: {
			type: String,
			value: "未找到数据"
		},
    // iOS点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部，只支持竖向
    enableBackToTop: {
      type: Boolean,
      value: false
    },
    // 判断当前是哪个列表
    listType: {
      type: Number,
      value: 0
    },
    // 高度
    scrollH: {
      type: String,
      value: 0,
      observer: 'setScrollHeight'
    }
	},
	data: {
    loadStatus: 'loaded',  // loading 和 loaded 两种模式
    stillHavelist: '',    // 是否还有未加载的页码， no or yes

	},
  // observers: {
  //   'stillHavelist': () => {
  //     if (this.data.stillHavelist == 'no') {
        
  //     }
  //   }
  // },
	methods: {
    /**
     * 改变当前列表数据标志状态
     */
    changeLoadStatus(status) {
      this.setData({
        loadStatus: status.detail
      })
      console.log('加载状态', this.data.loadStatus)
    },
    changePageStatus(status) {
      this.setData({
        stillHavelist: status.detail
      })
    },

		/**
		 * 加载更多
		 */
		more() {
      console.log(333)
      console.log(this.data.stillHavelist)
      /*列表数据还在加载或者没有剩余*/
        if (this.data.loadStatus == 'loading' || this.data.stillHavelist == 'no') return
      /*列表数据还有剩余则加载*/
      this.selectComponent('#p_list').moreList();
		},
	},
	ready() {
		// this.init();
    

	}
});
