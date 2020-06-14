let HTTP = require('../../../utils/httpHelper.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],//保养券列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponList(1);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   * 获取保养劵列表
   */

  getCouponList(typeId) {
    let self = this;

    wx.showLoading({
      title: '加载中',
    })
    HTTP.httpGet('myCoupon',{typeId}).then((res) => {
      self.setData({
        couponList:res.rows
      })
      wx.hideLoading()
    }).catch(err=>{
      console.log('保养劵查询失败----',err)
    })
  },

  /**
   * 选项卡切换
   * @param {object} e  组件抛出事件
   */

  changeTabs(e){
    this.getCouponList(e.detail.activeKey);
  },


  /**
   * 创建核销码
   * @param {object} e 组件抛出事件 
   */

  tapCreateCode(e){
    let self = this;

    HTTP.httpPost('createCode',{id:e.detail.id,pageUrl:'packageB/pages/verification/index'},'正在生成核销码').then(res=>{
      self.setData({
        codeSrc:res.rows[0].img,
        role:`你正在核销：${e.detail.name}`
       })
       wx.hideLoading()
    }).catch(err=>{
      wx.hideLoading()
    })
  },

  /**
   * 升级保养券
   * @param {object} e 主机抛出事件
   */
  tapUpgradeCode(e){
      let self = this;
      let id = e.detail.id
      app.navigationTo('packageA/pages/productInfo/index?ids='+ id + '&type=upgrade');
  },
})