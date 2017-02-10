//app.js
var Bmob = require('utils/bmob.js');
Bmob.initialize("707047c0bccf2b8f22189aa5f1a7d83c", "333e288e2f55eaab65804572567e74d4");
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  loginApp:function(){
        wx.login({
        success: function(res) {
          if (res.code) {
              Bmob.User.requestOpenId(res.code, {//获取userData(根据个人的需要，如果需要获取userData的需要在应用密钥中配置你的微信小程序AppId和AppSecret，且在你的项目中要填写你的appId)
                success: function(userData) { 
                    wx.getUserInfo({
                        success: function(result) {
                          var userInfo = result.userInfo
                          var nickName = userInfo.nickName
                          var user = new Bmob.User();//开始注册用户
                          user.set("username", userData.openid);
                          user.set("password", userData.openid);//因为密码必须提供，但是微信直接登录小程序是没有密码的，所以用openId作为唯一密码
                          user.set("userData", userData);
                          user.signUp(null, {
                              success: function(res) {
                                console.log("注册成功!");
                              },
                              error: function(userData, error) {
                                console.log(error)
                              }
                          });
                        }
                    })                       
                },
                error: function(error) {
                    // Show the error message somewhere
                    wx.showModal({
                      title: '提示',
                      content: "Error: " + error.code + " " + error.message,
                      success: function(res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        }
                      }
                    })
                    console.log("Error: " + error.code + " " + error.message+userData);
                }
            });

          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      });
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      // 调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})