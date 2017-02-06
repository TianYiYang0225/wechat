// pages/join/join.js
var app = getApp();
Page({
  data:{
    userInfo: {},
    stu_input:'',
  },
  bindViewTapJoin: function() {
    wx.switchTab({
      url: '../courseIndex/courseIndex'
    })
  },
  listen:function(e){
    this.data.stu_input = e.detail.value
    console.log(this.data.stu_input);
  },
  onLoad:function(){
    var that = this
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})