const HTTP = require('../../../utils/httpHelper.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: [], //商品信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    if (options.type == 'modul') {
      this.getProduct(options.ids)
    } else if (options.type == 'upgrade') {
      this.id = options.ids;
      this.getUpgradeProduct(options.ids)
    }
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
   * 获取商品数据
   */

  getProduct(sn) {
    let self = this;

    HTTP.httpGet('modelProduct', {
      sn: sn,
      areaSn:wx.getStorageSync('districtSn')
    }).then(res => {
      self.setData({
        productList: res.rows
      })
    }).catch(err => {
      console.log('获取品牌匹配产品失败-----', err)
    })
  },


  /**
   * 获取升级产品数据
   * @param {Object} couponId 保养券ID
   */
  getUpgradeProduct(couponId) {
    let self = this;

    HTTP.httpGet('getUpgradeCoupon', {
      id: couponId
    }).then(res => {
      self.setData({
        productList: res.rows.map(item => {
          item.isUpgrade = true;
          return item
        }),
      })
    }).catch(err => {
      console.log('获取升级产品失败-----', err)
    })
  },


  /**
   * 升级保养券
   */

  tapUpgradeCoupon(e) {
    let self = this;
    let id = e.currentTarget.dataset.id;

    HTTP.httpPost('upgradeConpon', {
      newId: id,
      id: self.id
    }, '正在升级卡劵').then(res => {
      if (!res.rows) {
        wx.hideLoading();
        wx.showModal({
          coutent: res.header.message,
          confirmText: '重新支付',
          success: res => {
            if (res.confirm) {
              // 重新发起支付
              self.submitPay();
            }
          }
        })
        return
      }
      wx.hideLoading();
      let data = res.rows[0];
      // 发起微信支付
      wx.requestPayment({
        nonceStr: data.nonceStr,
        package: data.packageData,
        paySign: data.paySign,
        signType: data.signType,
        timeStamp: data.timeStamp,
        success: res => {
          if (res.errMsg == 'requestPayment:ok') {
            app.navigationTo('packageB/pages/paySuccess/index');
          }
        },
        fail: res => {
          if (res.errMsg == 'requestPayment:fail cancel') {
            wx.showToast({
              title: '支付已取消',
              icon: "none"
            })
          }
        }
      })
    }).catch(err => {
      console.log('保养券升级失败----',err)
    })
  }
})