let config = require('../../utils/config.js').config;
let HTTP = require('../../utils/httpHelper.js');
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: config.navCar, //我的工具栏导航
    boos: config.boos, //修理厂老板
    staff: config.staff, //员工
    repair: config.repair, //地区经理
    myRole: config.userRoleType, //我的身份
    car:config.car,//车主
    codeSrc: '', //邀请二维码
    role: '', //邀请注册身份
    userRole: 0, //用户身份 2 门店 3门店员工 4 地区经理 
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
    this.getUserInfo();
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
    return {
      title: '让有车一族进入 无忧养车时代',
      path: "/pages/index/index?id=" + wx.getStorageSync('userId') || ''
    };
  },

  /**
   * 我的工具栏点击事件
   */

  navTapType(e) {

    switch (e.detail.text) {
      case '邀请车主':
        this.getCode("pages/index/index", '你正在邀请：车主');
        break
      case '我的车主':
        app.navigationTo('packageB/pages/myInviteOwner/index');
        break
      case '我的佣金':
        app.navigationTo('packageB/pages/takeDetail/index');
        break
      case '我的佣金':
        app.navigationTo('packageB/pages/takeDetail/index');
        break
      case '我的保养':
        app.navigationTo('packageB/pages/qrcode/index');
        break
      case '购买记录':
        app.navigationTo('packageB/pages/orderDetail/index');
        break
    }
  },

  /**
   * 联系客服
   * @param {object} e 组件抛出对象 
   */
  tapCustom(e){
    if(e.detail.e.currentTarget.dataset.url == '联系客服'){
      wx.makePhoneCall({
        phoneNumber: '18229680556',
      })
    }
    if(e.detail.e.currentTarget.dataset.url == '邀请门店加入'){
      this.getCode("packageA/pages/userRepair/index", '你正在邀请：门店');
    }
  },

  /**
   * 获取邀请二维码
   * @param {string} url  扫码跳转页面路径
   * @param {string} role 邀请提示
   */
  getCode(url, role) {

    let self = this;

    HTTP.httpGet('getCode', {
      pageUrl: url
    }, '二维码生成中').then(res => {
      self.setData({
        codeSrc: res.rows[0].img,
        role: role
      })
      wx.hideLoading()
    }).catch(err => {
      console.log('邀请车主二维码获取失败------', err)
      wx.hideLoading()
    })
  },


  /**
   * 获取用户信息
   */

  getUserInfo() {
    let self = this;

    HTTP.httpGet('getUserInfo').then(res => {
      if (res.rows.length > 0) {
        self.setData({
          userRole: res.rows[0].userType,
        })
      }else{
        self.setData({
          userRole:0
        })
      }
    }).catch(err => {
      console.log('获取用户信息失败---'.err)
    })
  },

  /**
   * 点击登录
   */
  isLogin(){
    if(this.data.userRole == 0){
      app.isLogin();
    }
  },
})