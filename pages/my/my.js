// pages/my/my.js
var app = getApp();
var Bmob = require('../../utils/bmob.js');
Page({
  data:{
    userInfo: {},
    stu_id: '',
    stu_name:'',
    stu_class:'',
    fenshu:''
  },
  onLoad:function(options){
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    var value = wx.getStorageSync('stu_id')
    this.setData({
      stu_id : value
    })
    var Student = Bmob.Object.extend("Student");
    var query = new Bmob.Query(Student);
    var stuId = this.data.stu_id
    query.equalTo("Student_Id", stuId);
    // 查询所有数据
    query.find({
        success: function(results) {
            var object = results[0];
                that.setData({
                  stu_name : object.get('Student_Name'),
                  stu_class : object.get('Student_Class'),
                  fenshu : object.get('Grade_TotalScore')
                })
        },
        error: function(error) {
            console.log("查询失败: " + error.code + " " + error.message);
        }
    });

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