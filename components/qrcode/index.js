
/**
 * thor ui
 * 
 * [{
        name: "购物券",
        code: "xyz0900100200",
        invalidTime: "2019-07-01",
        spread: true,
        sendTime: "2019-06-01",
        suitStore: "全部",
        img:"",
        useDescribe: ["1、可在任何适用商家内消费", "2、解释权归Thor所有"]
      }],
 */
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    noDataText:String,
    couponList:{
      type:Array,
      value:[],
    },
    type:{ // 值 canvas ||  images  判断用画布渲染或者图片渲染
      type:String,
      value:"image"
    },
    btnText:{// 点击按钮文本
      type:String,
      value:'查看详情'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false, //android上conver-view盖不住canvas的bug,可以做平台判断
    couponNum: 4,
    qrcode_w: 130,//二维码的宽
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化数据
    initData(){
      wx.getSystemInfo({ // 判断系统
        success: (res) => {
          if (res.system.indexOf('iOS') > -1 || res.platform.indexOf('ios') > -1) {
            this.setData({
              show: true
            })
          }
        }
      });
      const W = wx.getSystemInfoSync().windowWidth;
      const rate = 750.0 / W;
      //利用比例将260rpx转换为px
      const qrcode_w = 260 / rate;
      this.setData({
        qrcode_w: qrcode_w
      }, () => {
        this.couponQrCode(this.data.couponList[0].code, "couponQrcode0")
      });
    },

    /**
     * 查看详情 
     */
    spread: function(e) {
      let index = e.currentTarget.dataset.index;
      let couponList = this.data.couponList;
      couponList[index].spread = !couponList[index].spread;
      if(couponList[index].state == 1){
        this.setData({
          couponList: couponList
        })
      }
    },

    tapCreateCode(e){
      this.triggerEvent('Create',e.currentTarget.dataset.item)
    },

    tapUpgradeCode(e){
      this.triggerEvent('Upgrade',e.currentTarget.dataset.item)
    },
    
    /**
     * 图片使用画布进行渲染
     */
    couponQrCode(){
      
    },
  },

  lifetimes: {
    attached: function() {
        // 初始化数据
        this.initData();
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})
