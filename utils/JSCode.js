var Bmob = require('./bmob.js')

//注册
function Register(Object_Student_Id) {
    var Student = Bmob.Object.extend("Student");
    var query = new Bmob.Query(Student);
    query.equalTo("Student_Id", Object_Student_Id);
    // 查询所有数据
    query.find({
        success: function (results) {
            console.log("共查询到 " + results.length + " 条记录");
            if (results.length > 0) {
                // 循环处理查询到的数据
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    console.log(object.id + ' - ' + object.get('Student_Id') + ' - ' + object.get('Student_Name'));
                }
                //微信注册
                wx.login({
                    success: function (res) {
                        if (res.code) {
                            Bmob.User.requestOpenId(res.code, {//获取userData(根据个人的需要，如果需要获取userData的需要在应用密钥中配置你的微信小程序AppId和AppSecret，且在你的项目中要填写你的appId)
                                success: function (userData) {
                                    wx.getUserInfo({
                                        success: function (result) {
                                            var userInfo = result.userInfo
                                            var nickName = userInfo.nickName

                                            var user = new Bmob.User();//开始注册用户
                                            user.set("username", nickName);
                                            user.set("password", userData.openid);//因为密码必须提供，但是微信直接登录小程序是没有密码的，所以用openId作为唯一密码
                                            user.set("userData", userData);
                                            //user.set("Student_Id", Object_Student_Id);//添加学号到_User表
                                            user.signUp(null, {
                                                success: function (res) {
                                                    console.log("注册成功!");
                                                },
                                                error: function (userData, error) {
                                                    console.log(error)
                                                }
                                            });
                                        }
                                    })
                                },
                                error: function (error) {
                                    // Show the error message somewhere
                                    console.log("Error: " + error.code + " " + error.message);
                                }
                            });

                        } else {
                            console.log('获取用户登录态失败！' + res.errMsg)
                        }
                    }
                });
                console.log("欢迎使用！");
                return true;
            } else {
                console.log("学号输入错误");
                return false;
            }
        },
        error: function (error) {
            consolg.log("查询失败: " + error.code + " " + error.message);
            return "学号匹配失败，请稍后再试";
        }
    });
}


//显示本次为第几次课
function Lesson_NO() {
    var date = new Date((new Date().getFullYear()), (new Date().getMonth()), (new Date().getDate()));  //获取今日日期
    var Lesson = Bmob.Object.extend("Lesson");
    var query = new Bmob.Query(Lesson);
    query.equalTo("Lesson_Date", date);
    // 查询所有数据
    query.find({
        success: function (results) {
            //console.log("共查询到 " + results.length + " 条记录");
            // 循环处理查询到的数据
            if (results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    //console.log(object.id + ' - ' + object.get('Lesson_NO'));
                }
                console.log("本次课程为" + object.get('Lesson_NO') + "程");
                return "本次课程为" + object.get('Lesson_NO') + "程";  //上课日期返回值
            } else {
                console.log("今日非本门课程上课日期");
                return "今日非本门课程上课日期";  //非上课日期返回值
            }
        },
        error: function (error) {
            console.log("查询失败: " + error.code + " " + error.message);
            return "404 /(ㄒoㄒ)/~~";  //数据库查询失败返回值
        }
    });
}


//查询签到结果
function SignInResult(SignType) {
    var Attendance = Bmob.Object.extend("Attendance");
    var query = new Bmob.Query(Attendance);
    query.equalTo("Attendance_Type", SignType);
    // 查询所有数据
    query.find({
        success: function (results) {
            conosole.log("共查询到 " + results.length + " 条记录");
            // 循环处理查询到的数据
            for (var i = 0; i < results.length; i++) {
                var object = results[i];
                console.log(object.id + ' - ' + object.get('Attendance_Type'));
                return Attendance_Type;
            }
        },
        error: function (error) {
            console.log("查询失败: " + error.code + " " + error.message);
        }
    });
}
module.exports = {
    Register: Register,  //注册
    Lesson_NO: Lesson_NO,  //显示本次为第几次课
};