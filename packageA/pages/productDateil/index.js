  let HTTP = require('../../../utils/httpHelper.js');
  let app = getApp();
  Page({

    /**
     * 页面的初始数据
     */
    data: {
      // scrollH:wx.getSystemInfoSync().windowWidth,//轮播图高度
      bannerIndex: 0, //轮播图当前索引
      detailInfo: {}, //商品详情信息
      swiperImgH: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getcouponDetail(options.id);
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
     * 获取保养劵详情
     * @param {string} e  商品id
     */
    getcouponDetail(e) {
      let self = this;

      HTTP.httpGet('getSpecifyCoupon', {
        id: e
      }).then(res => {
        self.setData({
          detailInfo: res.rows[0]
        })
      })
    },

    /**
     * 获取图片信息
     */

    getImgInfo(e) {
      this.setData({
        scrollH: e.detail.height
      })
    },



    /**
     * 发起微信支付
     */

    submitPay() {
      var self = this;
      let pro = self.data.detailInfo

      wx.showModal({
        content: `您购买的保养券只能在${pro.province}-${pro.city}-${pro.district}内使用，是否确定购买？`,
        success:res=>{
          if(res.confirm){
      
            HTTP.httpPost('orderPayment', {
              id: self.data.detailInfo.id
            },'正在支付').then(res => {
              if (!res.rows) {
                wx.hideLoading();
                wx.showModal({
                  coutent: res.header.message,
                  confirmText: '重新支付',
                  success: res => {
                    if (res.confirm) {
                      // 重新发起支付
                      self.submitPay();
                    }
                  }
                })
                return
              }
              wx.hideLoading();
              let data = res.rows[0];
              // 发起微信支付
              wx.requestPayment({
                nonceStr: data.nonceStr,
                package: data.packageData,
                paySign: data.paySign,
                signType: data.signType,
                timeStamp: data.timeStamp,
                success: res => {
                  if (res.errMsg == 'requestPayment:ok') {
                    app.navigationTo('packageB/pages/paySuccess/index');
                  }
                },
                fail: res => {
                  if (res.errMsg == 'requestPayment:fail cancel') {
                    wx.showToast({
                      title: '支付已取消',
                      icon: "none"
                    })
                  }
                }
              })
            }).catch(err=>{
              console.log('支付发起失败----',err)
            })
          }
        }
      })

    },

  })