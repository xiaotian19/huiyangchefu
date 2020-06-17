/**
 * 公共参数配置
 * @auther 陈智清
 * @email 948993029@qq.com
 * @wechat b948993029 || czq-10
 * @desc 版权所有归个人所有，可用于非商业学习交流，写的不好的地方请多多指教。
 */
var _config = {
  Name: '', //小程序名称
  Company: '', //公司名称
  WebSite: '', //后台地址
  Version: '0.0.1', //当前版本号，主要用于版本更新对缓存数据的清理
  Auther: '[陈智清]-[Bulu]-[email:948993029@qq.com/Wechat:b948993029 || czq-10]', //开发者
  Description: '', //小程序介绍
  Creatime: '2020-06-01', //小程序创建时间
  Debug: false, //是否开启调试
  HttpRequest: 'https://www.zsjvp.com/car', //线上运营环境
  HttpTestRequest: 'https://www.zsjvp.com/car', //测试环境

  /**
   * 接口地址
   */

  ApiUrl: {
    "login": "/a_app_login.action", //用户登录
    "getUserInfo": "/a_app_getUserInfo.action", //获取用户信息
    "swiperImg": "/a_app_getBannerList.action", //轮播图数据
    "orderPayment": "/a_app_wxPay.action", //微信支付
    "couponList": "/a_app_getCouponList.action", //获取保养券列表
    "getPosition": "/a_app_getCity.action", //获取当前位置信息
    "region": "/a_app_registManager.action", //地区经理注册
    "userRepair": "/a_app_registBoss.action", //修理厂注册
    "userStaff": "/a_app_registEmployee.action", //员工注册
    "model": "/a_app_getBrandList.action", //车型品牌
    "modelProduct": "/a_app_getCouponByBrand.action", //根据车型 选择卡劵
    "getCode": "/a_app_createQRCode.action", //创建邀请二维码
    "myCoupon": "/a_app_getMyCoupon.action", //获取我的卡劵
    "createCode": "/a_app_createQRCode.action", //创建核销码
    "getSpecifyCoupon": "/a_app_getCouponById.action", //查询指定的保养券
    "getVerificationCoupon": "/a_app_getCouponByQRCode.action", //获取核销的卡券信息
    "verification": "/a_app_writeOff.action", //确认核销
    "alreadyVerification": "/a_app_getFactoryCoupon.action", //查询已核销
    "setRepairInfo": "/a_app_setFactoryInfo.action", //设置门店信息
    "getStaffInfo": "/a_app_getMyEmployeeList.action", //获取我的员工信息
    "imageUpload": "/a_app_wxUploadImg.action", //上传图片
    "getRepairInfo": "/a_app_getFactoryInfo.action", //查询我的门店信息
    "myInviteRepair": "/a_app_getMyFactoryList.action", // 我邀请的修理厂
    "myInviteOwner": "/a_app_getMyUserList.action", //查询自己邀请的车主
    "getLocationReStores": "/a_app_getFactoryList.action", //获取附件门店
    "removeStaff": "/a_app_deleteEmployee.action", //删除员工
    "getOrderDetail": "/a_app_getPayList.action", //查询我的购买记录
    "getTakeDetail": "/a_app_getRebateList.action", //佣金记录
    "getIncomeDetail": "/a_app_getIncomeList.action", //查询门店收入
    "getUpgradeCoupon": "/a_app_getChangeCoupon.action", //获取可置换的保养券
    "upgradeConpon": "/a_app_changeCoupon.action", //升级卡券
    "checkIn": "/a_app_signIn.action", //确认账号状态
  },
  /**
   * 本地存储对像的KEY
   */
  StorageKeys: {

  },


  /**
   * 需要加载提示接口
   */

  loading: ['couponList', 'myInviteOwner', 'alreadyVerification', 'getIncomeDetail', 'getTakeDetail', 'getOrderDetail', 'model', 'myCoupon', 'myInviteRepair'],


  /**
   * 需要验证登录接口
   */

  isLogin: ['orderPayment', 'getCode', 'myInviteOwner', 'getTakeDetail', 'myCoupon', 'getOrderDetail', 'alreadyVerification', 'getIncomeDetail', 'getStaffInfo', 'getRepairInfo', 'region', 'userRepair', 'userRepair'],

  /**
   * 身份标识
   */

    userRoleType:['','车主','门店','员工','地区经理'],
  /**
   * 首页导航配置
   */
  navList: [[{
    image: 'order', // 图标
    text: '我的保养', //名字
    url: 'packageB/pages/qrcode/index', //跳转路径
  }, {
    image: 'address', // 图标
    text: '保养门店', //名字
    url: 'pages/store/index', //跳转路径
  }],[{
    image: 'order', // 图标
    text: '立即核销', //名字
    url: 'packageB/pages/qrcode/index', //跳转路径
  }, {
    image: 'address', // 图标
    text: '保养门店', //名字
    url: 'pages/store/index', //跳转路径
  }]],

  /**
   * 我的工具功能栏配置
   */
  navCar: [{
    image: 'add', // 图标
    text: '邀请车主', //名字
    url: 'pages/index/index', //跳转路径
  }, {
    image: 'user', // 图标
    text: '我的车主', //名字
    url: 'pages/index/index', //跳转路径
  }, {
    image: 'comment', // 图标
    text: '我的佣金', //名字
    url: 'pages/index/index', //跳转路径
  }, {
    image: 'order', // 图标
    text: '我的保养', //名字
    url: 'packageB/pages/qrcode/index', //跳转路径
  }, {
    image: 'success', // 图标
    text: '购买记录', //名字
    url: 'packageB/pages/qrcode/index', //跳转路径
  }],

  /**
   * 修理厂工具栏配置
   */

  boos: [{
    text: '核销保养券', //名字
  }, {
    text: '我的核销', //名字
    url: "/packageB/pages/repairCoupon/index"
  }, {
    text: '门店收入', //名字
    url: "/packageB/pages/incomeDetail/index"
  }, {
    text: '我的流水', //名字
    url: '/packageB/pages/incomeDetail/index'
  }, {
    text: '我的员工', //名字
    url: "/packageB/pages/myStaff/index"
  }, {
    text: '门店信息', //名字
    url: '/packageB/pages/storeInfo/index'
  }],

  /**
   * 地区经理工具栏配置
   */
  repair: [{
    text: '邀请门店加入', //名字
  }, {
    text: '我邀请的门店', //名字
    url: "/packageB/pages/myInviteRepair/index"
  }],

  /**
   * 员工工具栏配置
   */
  staff: [{
    text: '核销保养券', //名字
  }, {
    text: '我的核销', //名字
    url: "/packageB/pages/repairCoupon/index"
  }]

}
module.exports.config = _config;