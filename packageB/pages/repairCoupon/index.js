let HTTP = require('../../../utils/httpHelper.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: [],
    page:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponList(0,this.data.page);
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
    this.getCouponList(tabIndex,this.data.page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 选项卡切换
   * @param {object} e 组件抛出事件
   */
  changeTabs(e) {
    this.getCouponList(e.detail.activeKey,1);
    this.setData({
      page:1,
      couponList:[],
      tabIndex:e.detail.activeKey
    })
  },



  /**
   * 查看详情 
   */
  spread: function (e) {
    let index = e.currentTarget.dataset.index;
    let couponList = this.data.couponList;
    couponList[index].spread = !couponList[index].spread;
      this.setData({
        couponList: couponList
      })
  },

  /**
   * 查询已核销保养券
   * @param {number} typeId  查询类型
   * @param {*} page 页数
   */

  getCouponList(typeId,page) {
    let self = this;

    HTTP.httpGet('alreadyVerification', {
      typeId,
      page
    }).then(res => {
      self.setData({
        couponList: self.data.couponList.concat(res.rows),
        page
      })
    }).catch(err => {
      console.log('已核销查询失败----', err)
    })

  },
  
})