// pages/courseIndex/courseIndex.js
Page({
  data:{
    num:1,
  },
  bindViewTapAtt: function() {
    wx.navigateTo({
      url: '../attIndex/attIndex'
    })
  },
  bindViewTapTopic: function() {
    wx.navigateTo({
      url: '../topicIndex/topicIndex'
    })
  },
  bindViewTapLesson: function() {
    wx.navigateTo({
      url: '../lessonIndex/lessonIndex'
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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