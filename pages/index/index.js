let HTTP = require('../../utils/httpHelper.js')
let navList = require('../../utils/config.js').config.navList;
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    stores: {}, //距离最近的门店
    list: [], //首页导航
    navList: navList, //首页导航栏信息
    imgUrls: [], //轮播图图片地址
    productList: [], //商品信息
    curTab: 1, //轮播图当前页索引标识
    position: wx.getStorageSync('districtSn'), //判断当前缓存里是否有位置信息
    userRole: 0, //用户身份 2 门店 3门店员工 4 地区经理 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取轮播图信息
    this.GetSwiperImg();
    // 获取当前位置
    this.onGetChooseLocation();
    // 获取保养券信息
    this.getCouponInfo();
    // 缓存邀请人id
    if (options.sn) {
      wx.setStorageSync('invite', options.sn);
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
    // 获取用户信息
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

  },

  navListTap(e) {
    if (e.detail.name === '立即核销') {
      this.openCamera()
    } else {
      app.navigationTo(e.detail.url)
    }
  },

  /**
   * 图片集切换
   * @param {obj} e 
   */
  PictureSwiperChange: function (e) {
    var self = this;
    self.setData({
      curTab: e.detail.current + 1
    })
  },

  /**
   * 轮播图数据
   */

  GetSwiperImg() {
    let self = this;

    HTTP.httpGet('swiperImg').then(res => {
      self.setData({
        imgUrls: res.rows
      })
    }).catch(err => {
      console.log('轮播图请求失败-----', err)
    })
  },

  /**
   * 定位当前最新位置
   */

  getPosition(e) {
    let self = this;

    wx.getLocation({
      success: res => {
        wx.setStorageSync('latitude', res.latitude);
        wx.setStorageSync('longitude', res.longitude);
        self.getLocationReStores(res.latitude, res.longitude);
        HTTP.httpGet('getPosition', {
          latitude: res.latitude,
          longitude: res.longitude
        }).then(res => {
          if (res.rows) {
            // 缓存当前区号
            wx.setStorageSync('districtSn', res.rows[0].districtSn);
            self.getCouponInfo();
            self.setData({
              position: res.rows[0].districtSn
            })
          }
        }).catch(err => {
          console.log('当前位置请求失败-----', err)
        })
      }
    })
  },

  /** 
   * 获取地理位置授权
   */
  onGetChooseLocation(e) {
    let self = this;
    wx.getSetting({
      isHighAccuracy: true,
      highAccuracyExpireTime: 4000,
      success(res) {
        if (res.authSetting['scope.userLocation'] == undefined) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(e) {
              // 获取位置
              self.getPosition()
            },
            fail: err => {
              wx.showToast({
                title: '授权失败',
                icon: 'none'
              })
            }
          })
        } else {
          // 获取位置
          self.getPosition()
        }
      }
    })
  },

  /**
   * 打开设置也允许授权
   */
  openSetting() {
    let self = this;

    wx.openSetting({
      success(res) {
        console.log(res)
        if (res.authSetting['scope.userLocation']) {
          // 获取位置
          self.getPosition()
          wx.showToast({
            title: '位置授权成功',
            icon: "none"
          })
        } else {
          wx.showToast({
            title: '授权失败',
            icon: 'none'
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  },

  /**
   * 获取商品信息
   */
  getCouponInfo() {
    let self = this;

    let districtSn = wx.getStorageSync('districtSn');
    HTTP.httpGet('couponList', {
      areaSn: districtSn
    }).then(res => {
      self.setData({
        productList: res.rows
      })
    }).catch(err => {
      console.log('保养劵商品请求失败-----', err)
    })
  },

  /**
   * 查询附近的门店
   * @param {String} latitude 经度
   * @param {String} longitude 纬度
   */
  getLocationReStores(latitude, longitude) {
    let self = this;
    HTTP.httpGet('getLocationReStores', {
      latitude,
      longitude,
      page: 1
    }).then(res => {
      res.rows[0].filedata = res.rows[0].filedata.split(',');
      self.setData({
        stores: res.rows[0]
      })
    }).catch(err => {
      console.log('获取附近门店失败----', err)
    })
  },

  /**
   * 拨打电话
   */
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: this.data.stores.phone,
      fail: err => {
        console.log('拨打电话取消了', err)
      }
    })
  },

  /**
   * 导航
   * @param {object} e 点击事件携带对象
   */
  navigation(e) {
    app.navigation(e.currentTarget.dataset.item);
  },
  /**
   * 获取用户信息
   */

  getUserInfo() {
    let self = this;

    HTTP.httpGet('getUserInfo').then(res => {
      if (res.rows.length > 0) {
        if (res.rows[0].userType == 2 || res.rows[0].userType == 3) {
          self.setData({
            list: self.data.navList[1],
          })
        } else {
          self.setData({
            list: self.data.navList[0],
          })
        }
      } else {
        self.setData({
          list: self.data.navList[0],
        })
      }
    }).catch(err => {
      console.log('获取用户信息失败---'.err)
    })
  },

  //打开相机扫码
  openCamera() {
    wx.scanCode({
      onlyFromCamera: true,
      falil: err => {
        console.log('打开扫码失败', err)
      }
    })
  },

})