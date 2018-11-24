// pages/index/addRemind.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
var nowDate=require("../../utils/util.js");
var TIME = nowDate.formatTime(new Date());
var name, days, matter, site, phone, time;

function checkData(that){

  var userName = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
  var thisName = that.data.name;
  var phoneNumber = /^1[3|4|5|7|8|9]{1}[0-9]{1}\d{8}$/;
  var thisPhone = that.data.phone;
  name = that.data.name.length;
  matter = that.data.matter.length;
  days = that.data.days.length;
  if (days == 0 || matter == 0 || name == 0) {
    wx.showToast({
      title: '内容不能为空',
      image: '../../images/error.png'
    })
    return false;
  } else if (!phoneNumber.test(thisPhone)) {
    wx.showToast({
      title: '手机格式不正确',
      image: '../../images/error.png'
    })
    return false;
  } else if (!userName.test(thisName)) {
    wx.showToast({
      title: '姓名格式有误',
      image: '../../images/error.png'
    })
    return false;
  } else if (name < 2) {
    wx.showToast({
      title: '姓名格式不正确',
      image: '../../images/error.png'
    })
    return false;
  } else if (site == 0) {
    wx.showToast({
      title: '地址格式不正确',
      image: '../../images/error.png'
    })
    return false;
  } else if (phone == 0) {
    wx.showToast({
      title: '手机格式不正确',
      image: '../../images/error.png'
    })
    return false;
  } else {
    return true;
  }
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TIME:"",
    // 验证码样式
    style:"",
    color:"#fff",
    // 验证码倒计时
    code_status: true,
    currentTime: 60,
    // 
    siteShow:true,
    phoneShow:true,
    show:false, //是否显示验证码输入框
    createShow:true,
    modificationShow:false,
    DeleteShow:false,
    disabled:false,
    hidden:false,
    saveShow:false,
    name:"",    //姓名
    days:"",    //日期
    matter:"",  //事项
    site:"",    //地址
    phone:"",    //电话
    code:"", //验证码
    remind_id:'',
    btn_value:'获取验证码',
    // 日期时间组件
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050,
    mobile:'', //默认电话  判断是否和输入一致，不一致需要验证码
    editMobile:'',//修改接收到的的手机号码
  },
  // 创建
  formSubmit:function(e){
  },
  //创建
  createRemind:function(e){
    var that = this;
    that.setData({
      disabled: true
    })
    if (checkData(that)) {
      //根据情况生成请求参数
      var param = {
        name: that.data.name,
        start_time: that.data.days,
        event: that.data.matter,
        address: that.data.site,
        phone: that.data.phone
      };
      if (that.data.show) {
        if (that.data.code.length != 6) {
          wx.showToast({
            title: '验证码错误',
            image: '../../images/error.png'
          })
          return;
        } else {
          param.code = that.data.code;
        }
        param.is_check = 1;
      } else {
        param.is_check = 0;
      }
      wx.getStorage({
        key: 'user',
        success(res) {
          param.uid = res.data.uid;
          wx.request({
            url: 'https://libo.mx5918.com/api/remind/remindCreate',
            data: param,
            header: {
              'content-type': 'application/json'
            },
            success(data) {
              var result = data.data;
              if (result.status) {
                wx.showToast({
                  title: '创建成功',
                  icon: "success"
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              } else {
                that.setData({
                  disabled: false
                })
                wx.showToast({
                  title: '创建失败',
                  image: '../../images/error.png'
                })
              }
            }
          })
        }
      })
    }
  },
  //修改
  modification:function(){
    var that = this;
    that.setData({
      disabled:true
    })
    if(checkData(that)){
      //根据情况生成请求参数
      var param = {
        id:that.data.remind_id,
        name:that.data.name,
        start_time:that.data.days,
        event:that.data.matter,
        address:that.data.site,
        phone:that.data.phone
      };
      if(that.data.show){
        if(that.data.code.length != 6){
          wx.showToast({
            title: '验证码错误',
            image: '../../images/error.png'
          })
          return;
        }else{
          param.code = that.data.code;
        }
        param.is_check = 1;
      }else{
        param.is_check = 0;
      }
      wx.getStorage({
        key: 'user',
        success(res) {
          param.uid = res.data.uid;
          wx.request({
            url: 'https://libo.mx5918.com/api/remind/remindUpdate',
            data: param,
            header: {
              'content-type': 'application/json'
            },
            success(data) {
              var result = data.data;
              if (result.status) {
                wx.showToast({
                  title: '修改成功',
                  icon: "success"
                })
                setTimeout(function(){
                  wx.navigateBack({
                    delta: 1
                  })
                },1000)
              } else {
                that.setData({
                  disabled: true
                })
                wx.showToast({
                  title: '修改失败',
                  image: '../../images/error.png'
                })
              }
            }
          })
        }
      })
    }
  },
  //保存
  save:function(){
      wx.showToast({
        title: '保存成功',
        icon: "success"
      })
      setTimeout(function () {
        wx.navigateTo({
          url: 'remind'
        })
      }, 1000)
  },
  //删除
  Delete: function () {
    this.setData({
      hidden: true
    })
  },
  // 点击取消的回调函数
  cancel: function () {
    this.setData({
      hidden: false
    });
  },
  // 点击确认的回调函数
  confirm: function () {
    var that = this;
    wx.getStorage({
      key: 'user',
      success: function(res) {
        wx.request({
          url: 'https://libo.mx5918.com/api/remind/remindRemove',
          data: {
            uid: res.data.uid,
            id: that.data.remind_id
          },
          header: {
            'content-type': 'application/json'
          },
          success(data) {
            var result = data.data;
            that.setData({
              hidden: false
            });
            if (result.status) {
              wx.showToast({
                title: '删除成功',
                icon: "success"
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            } else {
              wx.showToast({
                title: '删除失败',
                image: '../../images/error.png'
              })
            }
          }
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var phone = '';
    //获取参数并设置参数
    if(options.remind){
      var remind = JSON.parse(options.remind);
      remind.start_time = remind.start_time.replace(/\./g,"-");
      phone = remind.phone;
      that.setData({
        name: remind.name,
        days: remind.start_time,
        matter: remind.event, 
        site: remind.address,
        phone: remind.phone,
        editMobile: remind.phone,
        remind_id: remind.id,
        createShow: false,
        modificationShow: true,
        DeleteShow: true,
        show:false
      })
      wx.setNavigationBarTitle({
        title: '修改提醒'
      })
    }
    //获取默认手机号码
    wx.getStorage({
      key: 'user',
      success(res) {
        wx.request({
          url: 'https://libo.mx5918.com/api/site/getDefaultPhone',
          data: {
            uid: res.data.uid,
            rt_id: that.data.rt_id
          },
          header: {
            'content-type': 'application/json'
          },
          success(data) {
            var result = data.data;
            if (result.status) {
              //设置默认手机号码
              that.setData({
                mobile:result.data.phone
              })
            }
          }
        })
      }
    })

    this.setData({
      TIME: TIME
    })
    // 获取完整的年月日 时分秒，以及默认显示的数组
    var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
    // 精确到分的处理，将数组的秒去掉
    var lastArray = obj1.dateTimeArray.pop();
    var lastTime = obj1.dateTime.pop();

    this.setData({
      dateTime: obj.dateTime,
      dateTimeArray: obj.dateTimeArray,
      dateTimeArray1: obj1.dateTimeArray,
      dateTime1: obj1.dateTime
    })
  },
  // 日期时间判断=====================================
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
    let date = this.data.dateTime1;
    let arr = this.data.dateTimeArray1;
    let test = arr[0];
    let a1,b1,c1,d1,f1;
    a1=arr[0];b1=arr[1];c1=arr[2];d1=arr[3];f1=arr[4]
    var a = date[0];
    var b=date[1];
    var c = date[2];
    var d = date[3];
    var f = date[4];
    let thisDate = a1[a] + "-" + b1[b] + "-" + c1[c] + " " + d1[d] + ":" + f1[f]
    this.setData({
      days: thisDate
    })
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, 
    dateArr = this.data.dateTimeArray1;
    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
    this.setData({
      dateTimeArray1: dateArr
    });
    console.log(dateArr[2])
  },
  // ===========================================
  PhoneNum:function(e){
    let val=e.detail.value;
    if(val==""){
      this.setData({
        show:false
      })
    }
  },
  //一下edit事件为input值改变时设置data
  codeEdit: function (e) {
    var code = e.detail.value;
    this.setData({
      code: code
    })
  },
  nameEdit: function (e) {
    var name = e.detail.value;
    this.setData({
      name: name
    })
  },
  eventEdit: function (e) {
    var event = e.detail.value;
    this.setData({
      matter: event
    })
  },
  eventEdit: function (e) {
    var event = e.detail.value;
    this.setData({
      matter: event
    })
  },
  addressEdit:function(e){
    var site = e.detail.value;
    this.setData({
      site: site
    })
  },
  thisPhone:function(e){
    var phone = e.detail.value;
    this.setData({
      phone: phone
    })
    //如果手机号和默认手机以及传参的手机不一致则需要输入验证码
    if(phone.length == 11 && phone != this.data.mobile && phone != this.data.editMobile){
      this.setData({
        show: true
      })
    } else if (phone == this.data.mobile || phone != this.data.editMobile){
      this.setData({
        show: false
      })
    }
  },
  //验证 定时器
  getCode: function (options) {
    let that = this;
    let currentTime = that.data.currentTime;
    let code_status = that.data.code_status;
    if (!code_status) {
      return;
    }
    that.setData({
      btn_value: currentTime + '秒',
      color: "#999",
      currentTime: currentTime,
      code_status: false
    })
    let interval = setInterval(function () {
      currentTime--;
      console.log(currentTime);
      that.setData({
        btn_value: currentTime + '秒',
        currentTime: currentTime,
      })
      if (currentTime < 1) {
        clearInterval(interval)
        that.setData({
          btn_value: '重新发送',
          currentTime: 60,
          disabled: false,
          color: "#fff",
          style: "background-color:#F53636;",
          code_status: true,
        })
      }
    }, 1000)
  },
  //发送验证码
  getVerificationCode() {
    var that = this
    wx.getStorage({
      key: 'user',
      success(res) {
        wx.request({
          url: 'https://libo.mx5918.com/api/site/getMessage',
          data: {
            uid: res.data.uid,
            phone: that.data.phone
          },
          header: {
            'content-type': 'application/json'
          },
          success(data) {
            var result = data.data;
            if (result.status) {
              var time = that.data.currentTime;
              if (time != 60) {
                return;
              }
              var code_status = that.data.code_status;
              if (!code_status) {
                return;
              }
              that.getCode();

              that.setData({
                disabled: false,
                style: "background-color:#dedede;"
              })
            } else {
              wx.showToast({
                title: '发送失败',
                image: '../../images/error.png'
              })
            }
          }
        })
      }
    })
  },
})