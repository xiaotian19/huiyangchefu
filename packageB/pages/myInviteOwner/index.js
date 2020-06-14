let HTTP = require('../../../utils/httpHelper.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inviteInfo:[],//邀请的用户信息
    page:1,//请求页面数
    noData:true,//控制无数据显示
    typeId:'1',//请求用户分销等级  1 一级  2 二级
    total:0,//人数总数
    isBottom:false,//判断触底加载是否完毕
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInviteInfo(1,'1');
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
    if(this.data.isBottom){
      this.getInviteInfo(this.data.page + 1,)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  
  /**
   * tab栏切换
   * @param {object} 组件抛出对象
   */
  changeTabs(e) {
    let typeId = e.detail.activeKey;
    this.getInviteInfo(1,typeId);
    this.setData({
      typeId,
      inviteInfo:[],
    })
  },


  /**
   * 获取邀请信息
   * @param {number} page 请求页数
   */

  getInviteInfo(page,typeId) {
    let self = this;

    HTTP.httpGet('myInviteOwner', {
      page,
      typeId
    }).then(res => {
      if (self.data.inviteInfo == (res.header.total*20)) {
        wx.showToast({
          title: '没有数据啦~',
          icon: "none"
        })
        self.setData({
          isBottom:false
        })
      }
      if (res.rows.length <= 20) {
        self.setData({
          inviteInfo: [...self.data.inviteInfo, ...res.rows],
          total: res.header.total,
          page,
        })
      }
    }).catch(err => {
      console.log('车主邀请加载失败----',err)
    })
  },


})