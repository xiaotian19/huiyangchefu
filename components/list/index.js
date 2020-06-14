
let isScrolltolower = false;
Component({

  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    type: { //加载中 loading  到底了 bottom  加载结束 end
      type: String,
      value: false,
      observer(val) {
        if (val == 'loading') {
          this.setData({
            isShow: true, // 显示加载框
            isLoading: true //加载中
          })
        } else if (val == 'end') {
          this.setData({
            isShow: false, // 显示加载框
          })
        } else if (val == 'bottom') {
          this.setData({
            isShow: true, // 显示加载框
            isLoading: false //加载完成 到底了
          })
        }
      },
    },
    current: Number, //当前页面索引
    drop: Boolean, // true 下拉刷新接 false 下拉刷新结束
    number: { //侧滑页面数 swiperList 为true是生效
      type: Number,
      value: 1
    },
    swiperList: { //是否使用侧滑
      type: Boolean,
      value: true
    },
    noData:{//控制无数据提示显示
      type: Boolean,
      value: false
    },
    noDataText:{//无数据显示文本
      type:String,
      value:''
    },
    occupyH:{//外部占用高度  默认组件获取屏幕高度， 外部如需高度在此可以减少list组件的高度
      type:Number,
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: '', //手机屏幕高度
    navConfig: [{
      type: 'end',
      line: true,
      custom: false,
      color: '',
      loadingText: '努力加载中...',
      endText: '已经到底了~'
    }, {
      type: 'loading',
      line: true,
      custom: false,
      color: '',
      loadingText: '努力加载中...',
      endText: '已经到底了~'
    }],
    isShow: false, // 是否隐藏底部加载信息

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 滑动触底
    Scrolltolower(e) {
      if (!isScrolltolower) {
        this.triggerEvent('Scrolltolower', e);
        isScrolltolower = true; //禁止在3秒内再次触发
      }
      let timer = setTimeout(() => {
        isScrolltolower = false;
      }, 3000)
    },

    // swiper滑动触发
    swiperChange(e) {
      this.triggerEvent('change', e.detail);
    },
  },

  lifetimes: {
    attached: function () {
      //获取手机屏幕高毒
      this.setData({
        height: wx.getSystemInfoSync().windowHeight
      })

      // 控制短时间多次触发触底操作
      this.isScrolltolower = false;

    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})