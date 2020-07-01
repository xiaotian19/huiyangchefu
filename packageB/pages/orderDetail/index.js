let HTTP = require('../../../utils/httpHelper.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:[],
    page:1,
    isbottom:false,
    cancelColor: '#888', //时间取消按钮颜色
    dateInput: "", //选择的时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrderDetail(1,this.data.dateInput);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.dateTime = this.selectComponent("#tui-dateTime-ctx")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderDetail(1,this.data.dateInput);
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
    if(this.data.isbottom){
      this.getOrderDetail(this.data.page + 1,this.data.dateInput);
    }
  },

  getOrderDetail(page,beginDate = ''){
    let self = this;

    HTTP.httpGet('getOrderDetail',{page,beginDate}).then(res=>{
      if(res.rows.length > 20){
        self.setData({
          order:[...this.data.order,...res.rows],
          page,
          isbottom:true
        })
      }

      self.setData({
        order:[...this.data.order,...res.rows],
        page
      })
    }).catch(err=>{
      console.log('购买记录加载失败----',err)
    })
  },


  /**
   * 时间选择
   */

  dateTimeShow(e) {
    this.dateTime.show();
  },

  /**
   * 取消时间选择
   */
  cancleDateTime() {
    this.setData({
      dateInput: '',
      order:[]
    })
    this.getOrderDetail(1,this.data.dateInput);
  },


  /**
   * 获取选择时间
   */
  dateChange(e) {
    this.setData({
      dateInput: e.detail.result
    })
  },

  /**
   * 点击搜索
   */

  dateTimeSearch() {
    this.setData({
      order:[]
    })
    this.getOrderDetail(1, this.data.dateInput)
  },
})