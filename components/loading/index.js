/**
 * 来自 lin-ui库
 */

import computeOffset from '../behaviors/computeOffset';
import validator from '../behaviors/validator';

Component({
  behaviors: [computeOffset, validator],
  externalClasses: ['l-container-class', 'l-class'],
  properties: {
    // 显示与隐藏
    show: {
      type: Boolean,
      value: false
    },
    opacity: {
      type: String,
      value: '1'
    },
    bgColor: String,
    zIndex:{
      type:String,
      value: '776'
    },
    // 类型
    type: {
      type: String,
      value: 'rotate',
      options: ['flash', 'flip', 'change', 'rotate', 'circle']
    },
    // 动画颜色
    color: {
      type: String,
      value: ''
    },
    // loading 动画大小
    size: {
      type: String,
      value: 'medium',
    },
    // 自定义
    custom: Boolean,
    // 全屏模式
    fullScreen: Boolean
  },

  attached() {
    this._init();
  },

  pageLifetimes: {
    show() {
      this._init();
    },
  },

  methods: {
    _init() {
      wx.lin = wx.lin || {};
      wx.lin.showLoading = (options) => {
        const {
          custom = false,
          fullScreen = false,
          color = '',
          type = 'rotate',
          size = 'medium',
          opacity = '1'
        } = { ...options };
        this.setData({
          custom,
          fullScreen,
          color,
          type,
          size,
          opacity,
          show: true
        });
      };
      wx.lin.hideLoading = () => {
        this.setData({
          show: false
        });
      };
    },
    // 阻止滑动
    doNothingMove() {
      // do nothing……
    },
  }
});
