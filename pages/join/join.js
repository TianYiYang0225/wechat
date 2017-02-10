// pages/join/join.js
var Bmob = require('../../utils/bmob.js');
var JSCode = require('../../utils/JSCode.js');
var app = getApp();
Page({
  data:{
    userInfo: {},
    stu_input:'',
    state:'提交'
  },
  bindViewTapJoin:function(e){
    var that = this
    this.setData({
        state : '加载中，请稍后'
    })
    var stu_id = this.data.stu_input;
    var reg = /^\d{9}$/;
    if (stu_id<=0 || !reg.test(stu_id)){
      wx.showModal({
      title: '输入错误',
      content: '请输入正确的学号',
      success: function(res) {
        if (res.confirm) {
            that.setData({
                state : '提交'
            })
        }
      }
    });
    }else{
        wx.login({
        success: function(res) {
            if (res.code) {
                Bmob.User.requestOpenId(res.code, {//获取userData(根据个人的需要，如果需要获取userData的需要在应用密钥中配置你的微信小程序AppId和AppSecret，且在你的项目中要填写你的appId)
                success: function(userData) { 
                    wx.getUserInfo({
                        success: function(result) {
                            var userInfo = result.userInfo
                            var nickName = userInfo.nickName
                            var open_id = userData.openid
                            var Object_Student_Id = stu_id;
                            var Student = Bmob.Object.extend("Student");
                            var query = new Bmob.Query(Student);
                            query.equalTo("Student_Id", Object_Student_Id);
                            // 查询所有数据
                            query.find({
                            success: function(results) {
                                console.log("共查询到 " + results.length + " 条记录");
                                // 循环处理查询到的数据
                                if(results.length<=0){
                                    wx.showModal({
                                    title: '学号错误',
                                    content: '你没有报这门课！请重新输入正确的学号',
                                    success: function(res) {
                                        if (res.confirm) {
                                            that.setData({
                                                state : '提交'
                                            })
                                        }
                                    }
                                    });
                                    return 0
                                }else{
                                    var query = new Bmob.Query(Bmob.User);
                                    query.equalTo('username', stu_id);  // find all the women
                                    query.find({
                                    success: function(res) {
                                        if(res.length<=0){
                                            var user = new Bmob.User();//开始注册用户
                                            user.set("username", stu_id);
                                            user.set("password", open_id);//因为密码必须提供，但是微信直接登录小程序是没有密码的，所以用openId作为唯一密码
                                            user.set("userData", userData);
                                            user.signUp(null, {
                                                success: function(res) {
                                                    wx.showModal({
                                                    title: '提示',
                                                    content: '你已注册成功，该学号和该微信唯一绑定，请以后都使用该微信登录',
                                                    success: function(res) {
                                                        if (res.confirm) {
                                                            wx.setStorage({
                                                            key: 'stu_id',
                                                            data: stu_id,
                                                            })
                                                            wx.switchTab({
                                                            url: '../courseIndex/courseIndex'
                                                            })
                                                        }
                                                    }
                                                    });
                                                },
                                                error: function(userData, error) {
                                                console.log(error)
                                                }
                                            });
                                        }else{
                                            Bmob.User.logIn(stu_id, open_id, {
                                            success: function(user) {
                                                    wx.setStorage({
                                                        key: 'stu_id',
                                                        data: stu_id,
                                                    })
                                                wx.switchTab({
                                                url: '../courseIndex/courseIndex'
                                                })
                                            },
                                            error: function(user, error) {
                                                wx.showModal({
                                                title: '登录错误',
                                                content: '你的学号已绑定对应的微信号，请使用第一次绑定的微信号登录',
                                                success: function(res) {
                                                    if (res.confirm) {
                                                        that.setData({
                                                            state : '提交'
                                                        })
                                                    }
                                                }
                                                });
                                            }
                                            });
                                        }
                                    },
                                    });
                                }
                            },
                            error: function(error) {
                                alert("查询失败: " + error.code + " " + error.message);
                            }
                            });
                        }
                    })                       
                },
                error: function(error) {
                    // Show the error message somewhere
                    console.log("Error: " + error.code + " " + error.message);
                }
            });

            } else {
            console.log('获取用户登录态失败！' + res.errMsg)
            }
        }
        });
    }
  },
  listen:function(e){
    this.data.stu_input = e.detail.value
    console.log(this.data.stu_input);
  },
  onLoad:function(){
    // var that = this;
    // app.getUserInfo(function(userInfo){
    //   //更新数据
    //   that.setData({
    //     userInfo:userInfo
    //   })
    // })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
})