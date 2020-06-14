// components/dispayCode/dispayCode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    role:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    animation: 'bounceInUp',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭
    onHide(e) {
      let that = this;
      this.setData({
        animation: 'bounceInUpOver'
      })
      let timer = setTimeout(() => {
        that.setData({
          src: '',
          animation:'bounceInUp'
        })
        clearTimeout(timer);
      },500)
    },

  },

  lifetimes: {
    attached: function() {
      let that = this;
      wx.getSystemInfo({
        success: res => {
          that.setData({
            res
          })
        }
      })
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})