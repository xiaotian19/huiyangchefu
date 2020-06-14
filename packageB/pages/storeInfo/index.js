let HTTP = require('../../../utils/httpHelper.js');
let config = require('../../../utils/config.js').config;
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneRules: [{ //手机号验证
      type: "string",
      required: true,
      message: '请输入手机号'
    }, {
      pattern: "^1(3|4|5|7|8)\\d{9}$",
      message: '手机号格式不正确，请重新输入'
    }],
    nameRules: { //门店名称验证
      type: "string",
      required: true,
      message: '请输入门店名称'
    },
    addressRules: { //门店地址验证
      type: "string",
      required: true,
      message: '请输入门店地址'
    },
    profileRules: { //门店简介验证
      type: "string",
      required: true,
      message: '请输入门店简介'
    },
    store: {}, //门店信息
    srartSubmit: false, //是否开始提交
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.lin.initValidateForm(this);
    this.getRepairInfo();
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

  /**
   * 查询我的门店信息
   */
  getRepairInfo() {
    let self = this;


    HTTP.httpGet('getRepairInfo').then(res => {
      res.rows[0].filedata = res.rows[0].filedata.split(',');
      res.rows[0].filedata = res.rows[0].filedata.map((item) => {
          wx.hideLoading();
        if (/(http|https):\/\/([\w.]+\/?)\S*/.test(item.url)) {
          return {
            url: config.HttpRequest + '/' + item
          }
        } else {
          return {
            url: item
          }
        }
      })
      self.setData({
        store: res.rows[0]
      })
    }).catch(err => {
      console.log(err)
    })
  },


  /**
   * 提交信息
   * @param {object} info //表单携带信息
   */

  submitFormInfo(info) {
    let self = this;
    let data = info.detail;
    let _images = this.data.store.filedata || [];

    if (!data.isValidate) return;


    if (_images.length == 0) {
      wx.showToast({
        title: '请上传门店照片',
        icon: "none"
      })
      return
    }


    (async function () {
      await self.getLocation().then(res => {
        if (!wx.getStorageSync('districtSn') || Object.keys(res).length == 0) {
          wx.showModal({
            content: '定位功能未授权,是否立即去首页授权',
            showCancel: false,
            confirmText: '知道了',
            success: res => {
              if (res.confirm) {
                app.navigationTo('pages/index/index');
              }
            }
          })
          return
        }


        data.values.latitude = res.latitude;
        data.values.longitude = res.longitude;

        let newArr = _images.filter(item => !/(http|https):\/\/([\w.]+\/?)\S*/.test(item.url)).map((item) => {
          return item.url
        })

        let oldarr = _images.filter(item => /(http|https):\/\/([\w.]+\/?)\S*/.test(item.url)).map((item) => {
          return item.url
        })


        if (!self.data.srartSubmit) {

          wx.showLoading({
            title: "正在上传图片"
          })

          self.setData({
            srartSubmit: true
          })

          //提交申请时，先上传图片
          HTTP.httpBatchUpload('imageUpload', newArr, {}, function (imgResp) {

            if (imgResp.length == newArr.length) {

              data.values.filedata = [...imgResp, ...oldarr];

              HTTP.httpPost('setRepairInfo', data.values,'正在保存数据').then(res => {
                wx.hideLoading()
                wx.showModal({
                  content: '提交成功',
                  showCancel: false,
                  confirmText: '知道了',
                  success: res => {
                    if (res.confirm) {
                      wx.navigateBack();
                      self.setData({
                        srartSubmit: false
                      })
                    }
                  }
                })
              }).catch(err => {
                wx.hideLoading()
                console.log(err)
                self.setData({
                  srartSubmit: false
                })
              })
            } else {
              wx.hideLoading()
              wx.showToast({
                title: '图片上传失败！',
                mask: true,
                icon: 'none'
              });
              self.setData({
                srartSubmit: false
              })
              return;
            }
          }, function (err) {
            console.log(err)
          });
        }

      })
    })()

  },


  /**
   * 获取经度纬度
   */
  getLocation() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        success: res => {
          resolve(res);
        },
        fail: err => {
          reject(err);
        }
      })
    })
  },


  /**
   * 添加上传图片
   * @param {object} img 上传图片携带对象
   */
  addImgUrl(img) {
    this.setData({
      ['store.filedata']: img.detail.all
    })
  },


  /**
   * 删除图片
   * @param {object} img 删除图片携带对象
   */

  removeImgUrl(img) {
    this.setData({
      ['store.filedata']: img.detail.all
    })
  }

})