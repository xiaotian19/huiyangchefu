let HTTP = require('../../../utils/httpHelper.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staff: [],
    codeSrc: '', //邀请二维码
    role: '', //邀请注册身份
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getStaffInfo();
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
   * 
   * @param {*} e 点击事件携带参数
   */
  removeStaff(e) {
    let self = this;
    wx.showModal({
      content: '是否确认删除当前员工',
      success: res => {
        if (res.confirm) {
          HTTP.httpPost('removeStaff', {
            id: e.currentTarget.dataset.id
          }, '正在删除').then(res => {
            wx.hideKeyboard();
            wx.showToast({
              title: '删除成功',
            })
            self.getStaffInfo();
          }).catch(err => {
            console.log('员工删除失败----', err)
          })
        }
      }
    })

  },

  /**
   * 获取员工信息
   */

  getStaffInfo() {
    let self = this;

    HTTP.httpGet('getStaffInfo').then(res => {
      self.setData({
        staff: res.rows
      })
    }).catch(err => {
      console.log('我的员工信息获取失败----', err)
    })
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


  getMyInviteCode(){
    this.getCode('packageA/pages/userStaff/index','您正在邀请：员工')
  },

})