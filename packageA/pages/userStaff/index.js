const verify = require('../../../utils/verify.js');
const HTTP = require('../../../utils/httpHelper.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sn = options.sn;
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  submitInfo(e){
    let data = e.detail.value;

    if(!app.checkIsLogin()){
      wx.showModal({
        content: '您还未登录，是否立即登录',
        confirmText:'立即登录',
        success:res=>{
          if(res.confirm){
            wx.navigateTo({
              url: '/pages/login/login',
            })
          }
        }
      })
      return
    }

    if (verify.isNullOrEmpty(data.name)) {
      verify.toast('请输入姓名');
      return
    } 

    if (verify.isNullOrEmpty(data.phone)) {
      verify.toast('请输入手机号码');
      return
    } else if (!verify.isMobile(data.phone)) {
      verify.toast('请输入正确的手机号码');
      return
    }

    
    data.sn = this.sn || '';
    HTTP.httpPost("userRepair",data).then(res=>{
      if(!res.rows){
        verify.toast('注册成功','successs');
        app.navigationTo('pages/center/index');
      }
    })

  },


})