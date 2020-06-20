/**
 * tabBar页面路径列表 (用于链接跳转时判断)
 * tabBarLinks为常量, 无需修改
 */
const tabBarLinks = [
  "pages/index/index",
  "pages/store/index",
  "pages/center/index"
];


let HTTP = require('utils/httpHelper.js');
let config = require('utils/config.js').config

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function (options) {
    // 缓存邀请人id
    if (Object.keys(options.query).length != 0) {
      if(options.query.scene != undefined){
        wx.setStorageSync('invite', options.query.scene);
      }
      if(options.query.id != undefined && options.query.id && options.query.id != wx.getStorageSync('userId')){
        wx.setStorageSync('inviteId', options.query.id);
      }
    }
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    this.checkIn();
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },

  /**
   * 小程序主动更新
   */
  updateManager() {
    if (!wx.canIUse('getUpdateManager')) {
      return false;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      // console.log(res.hasUpdate)
    });
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，即将重启应用',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      });
    });
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    });
  },

  /**
   * 跳转到指定页面
   * 支持tabBar页面
   */
  navigationTo(url) {
    if (!url || url.length == 0) {
      return false;
    }
    if (tabBarLinks.indexOf(url) > -1) {
      wx.switchTab({
        url: '/' + url
      });
    } else {
      // 普通页面
      wx.navigateTo({
        url: '/' + url
      });
    }
  },

  /**
   * 验证登录
   */
  checkIsLogin() {
    if (wx.getStorageSync('token') == '') {
      this.isLogin()
    }
    return wx.getStorageSync('token') == ''
  },

  /**
   * 登录验证通过执行登录
   */

  isLogin() {
    wx.showModal({
      content: '您还未登录，是否立即登录',
      confirmText: '立即登录',
      success: res => {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
      }
    })
  },


  /**
   * 授权登录
   * @param {obj} e 头像昵称
   */
  getUserInfo(e) {
    let App = this;
    return new Promise((resolve, reject) => {
      if (e.detail.errMsg !== 'getUserInfo:ok') {
        return false;
      }

      // 执行微信登录
      wx.login({
        success(res) {
          // 发送用户信息
          HTTP.httpPost('login', {
            code: res.code,
            nickName: e.detail.userInfo.nickName,
            headImg: e.detail.userInfo.avatarUrl,
            sn: wx.getStorageSync('invite') || '',
            id:wx.getStorageSync('inviteId') || '',
          }, '正在登录').then(res => {
            // 记录token 
            wx.setStorageSync('token', res.rows[0].token);
            wx.setStorageSync('userId', res.rows[0].id);
            resolve(res.rows)
          }).catch(err => {
            console.log('登录错误---', err)
            reject(err)
            wx.hideLoading();
          })
        }
      });
    })
  },

  /**
   * 拼接图片路径
   */

  spliceImgUrl() {
    return config.HttpRequest + url;
  },


  /**
   * 导航
   * @param {Object} store 门店信息
   */
  navigation(store) {
    let self = this;
    wx.openLocation({
      latitude: store.latitude,
      longitude: store.longitude,
      name: store.name,
      address: store.address
    })
  },

  /**
   * 用户信息验证
   */
  checkIn() {
    let self = this;

    HTTP.httpGet('checkIn').then(res => {
      if (res.header.message == '用户不存在！') {
        wx.removeStorageSync('token');
        self.isLogin();
      } else {
        // 记录token 
        wx.setStorageSync('token', res.rows[0].token);
      }
    }).catch(err => {
      console.log(err)
    })
  }

})