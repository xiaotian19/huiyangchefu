let HTTP = require('../../../utils/httpHelper.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCoupon(options.scene);
    this.sn = options.scene;
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
   * 获取要核销的保养券信息
   * @param {string} sn 核销二维码编号
   */ 

  getCoupon(scene){
    let self = this;

    wx.showLoading({
      title: '加载中',
    })

    HTTP.httpGet('getVerificationCoupon',{sn:scene}).then((res) => {
      wx.hideLoading()
      self.setData({
        couponList:res.rows[0]
      })
    }).catch(err=>{
      wx.hideLoading()
      console.log('保养劵查询失败----',err)
    })

  },


  /**
   * 核销取消
   */
  onCallBack(){
    app.navigationTo('pages/center/index');
  },


/**
 * 确认核销
 */
  tapVerificationCoupon(){
    let self = this;

    HTTP.httpPost('verification',{sn:self.sn},'正在核销中').then((res) => {
      if(res.header.message === 'OK'){
        wx.showModal({
          content: '核销成功，返回个人中心',
          showCancel:false,
          confirmText:'知道了',
          success:res=>{
            if(res.confirm){
              app.navigationTo('pages/center/index');
            }
          }
        })
      }
    }).catch(err=>{
      console.log('保养劵查询失败----',err)
    })
  },
})