const App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 授权登录
   */
  getUserInfo(e) {
    let _this = this;
    App.getUserInfo(e).then(res=>{
      if(!res.rows){
        wx.showToast({
          title: '登录成功',
        })
        let timer = setTimeout(()=>{
          // 跳转回原页面
          _this.onNavigateBack();
          clearTimeout(timer)
          },1000)
      }
    }).catch(err=>{
      console.log('登录失败----',err)
    })
  },

  /**
   * 暂不登录
   */
  onNotLogin() {
    let _this = this;
    // 跳转回原页面
    _this.onNavigateBack();
  },

  /**
   * 授权成功 跳转回原页面
   */
  onNavigateBack() {
    wx.navigateBack();
  },

})