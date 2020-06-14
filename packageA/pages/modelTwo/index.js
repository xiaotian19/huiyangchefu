const HTTP = require('../../../utils/httpHelper.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getModel(options.sn);
    this.img = options.img;
    this.name = options.name;
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



  getModel(sn) {
    let self = this;

    let data = {};

    HTTP.httpGet("model", {
      sn
    }).then(res => {
      self.setData({
        listData: self.formatList(res.rows)
      })
      wx.hideLoading()
    }).catch(err=>{
      wx.hideLoading()
    })
  },

  /**
   * 数据过滤器
   */
  formatList(list) {
    let tempArr = [];
    let tempObj = {};


    list.forEach(item => {
      tempObj= {
        name: item.name,
        sn: item.sn,
        img: this.img
      }
      tempArr.push(tempObj);
    })


    return [{key:this.name,data:tempArr}];
  },

  skipModul(e) {
    let data = e.detail;

    app.model.two = data;
    app.navigationTo('packageA/pages/modelThree/index?sn='+ data.sn + '&img=' + data.img + '&name=' + data.name);
  },
})