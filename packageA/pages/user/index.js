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

 

    HTTP.httpPost("region",data,'注册中').then(res=>{
      if(res.rows.length != 0){
        wx.setStorageSync('token', res.rows[0].token);
        wx.showModal({
          title: '温馨提示',
          content: '注册成功',
          confirmText: '知道了',
          showCancel: false,
          success:res=>{
            if(res.confirm){
              app.navigationTo('pages/center/index');
            }
          }
        })
      }
    }).catch(err=>{
      console.log('地区经理注册失败----',err)
    })

  },


})