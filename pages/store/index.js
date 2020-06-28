let HTTP = require('../../utils/httpHelper.js')
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stores: [], //门店信息
    page: 1, //加载页面数
    isBottom: true, //判断触底加载是否完毕
    isShow:false,//页底加载显示
    loadingType:'loading',//加载类型
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocationReStores(1);
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
    if (this.data.isBottom) {
      this.getLocationReStores(this.data.page + 1);
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (e) {
    return {
      title: '让有车一族进入 无忧养车时代',
      path: "/pages/index/index?id=" + wx.getStorageSync('userId') || ''
    };
  },


  /**
   * 查询附近的门店
   * @param {Number} page 页面数
   */
  getLocationReStores(page) {
    let self = this;
    if(page > 1){
      self.setData({
        isShow:true
      })
    }
    HTTP.httpGet('getLocationReStores', {
      latitude: wx.getStorageSync('latitude'),
      longitude: wx.getStorageSync('longitude'),
      page: page
    }).then(res => {
      res.rows = res.rows.map((item) => {
        if (item.filedata) {
          item.filedata = item.filedata.split(',')
        } else {
          item.filedata = [];
        }
        return item
      })
      if(res.rows.length < 20){
        self.setData({
          isShow: true && [...this.data.stores, ...res.rows].length > 0,
          loadingType:'end',
          isBottom:false,
          stores: [...this.data.stores, ...res.rows]
        })
        return
      }
      self.setData({
        isShow:false,
        stores: [...this.data.stores, ...res.rows]
      })
    }).catch(err => {
      console.log('获取附近门店失败----', err)
    })
  },


  /**
   * 拨打电话
   * @param {object} e 点击事件携带对象
   */
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },


  /**
   * 导航 
   * @param {object} e 点击事件携带对象
   */
  navigation(e) {
    app.navigation(e.currentTarget.dataset.item);
  },
})