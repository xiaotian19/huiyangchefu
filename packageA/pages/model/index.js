const HTTP = require('../../../utils/httpHelper.js');
const app = getApp();
/**
 * { listData  
	"id": "35",
	"provincecode": "150000",
	"city": "阿拉善盟",
	"code": "152900",
	"initial": "A",
	"short": "Alashanmeng"
}
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getModel()
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



  getModel(){
    let self = this;
    
    let data = {};

    HTTP.httpGet("model",{}).then(res=>{
      HTTP.httpGet("model",{sn:0}).then(resp=>{
        self.setData({
          listData:self.formatList(resp.rows,res.rows)
        })
        wx.hideLoading()
      }).catch(err=>{
        wx.hideLoading()
      })
    }).catch(err=>{
      wx.hideLoading()
    })
  },


  /**
   * 数据过滤器
   */
  formatList(key,list) {
		let tempArr = [];

		key.forEach(keys => {
      let tempObj = {};
      
			tempObj.key = keys.name;
			tempObj.data = list.filter(item => item.sn.slice(0,1) == keys.name).map(item => {
				return {name: item.name, sn: item.sn, img:item.img}
			});

			if(tempObj.data && tempObj.data.length > 0) {
				tempArr.push(tempObj);
			}
		})
		return tempArr;
  },
  
  skipModul(e){
    let data = e.detail;
    app.model = {};
    app.model.one = data;
    app.navigationTo('packageA/pages/modelTwo/index?sn='+ data.sn + '&img=' + data.img + '&name=' + data.name);
  },
   
})