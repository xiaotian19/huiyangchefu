/**
    list: [{
      image: 'cart',// 图标
      text: '我的购物车', //名字
      path:'pages/index/index',//跳转路径
    }]
 */

 let app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    listNumber:Number,//每行个数
    list:Array,// 导航数组
    size:Number,//图标大小
    tapType:{//  url  跳转页面   tap 点击事件
      type:String,
      value:'url'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 导航跳转页面
     */
    spipUrl(e){
      let index = e.detail.index;
      if(this.data.tapType == 'url'){
        app.navigationTo(this.data.list[index].url);
      }else{
        this.triggerEvent('click',{name:this.data.list[index].text,url:this.data.list[index].url});
      }
    }
  }
})
