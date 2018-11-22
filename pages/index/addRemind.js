// pages/index/addRemind.js
var dateTimePicker = require('../../utils/dateTimePicker.js');
var nowDate=require("../../utils/util.js");
var TIME = nowDate.formatTime(new Date());
console.log(TIME);
var name, days, matter, site, phone, time;
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
    show:true,
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
    btn_value:'获取验证码',
    // 日期时间组件
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050
  },
  // 创建
  formSubmit:function(e){
    let userName = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
    let thisName = e.detail.value["name"];
    let phoneNumber = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    let thisPhone = e.detail.value.phoneNumber;
    name = e.detail.value["name"].length;
    matter = e.detail.value["matter"].length;
    days = e.detail.value["days"].length;
    phone = e.detail.value["phoneNumber"].length;
    if (days  == 0 || matter == 0  || name == 0 ){
      wx.showToast({
        title: '内容不能为空',
        image: '../../images/error.png'
      })
      return;
    }else if (phone != 11) {
        wx.showToast({
          title: '手机格式不正确',
          image: '../../images/error.png'
        })
        return;
      } else if (!phoneNumber.test(thisPhone)) {
        wx.showToast({
          title: '手机格式不正确',
          image: '../../images/error.png'
        })
        return;
    }else if (!userName.test(thisName)){
      wx.showToast({
        title: '姓名格式有误',
        image: '../../images/error.png'
       })
       return;
    }else if(name<2){
      wx.showToast({
        title: '姓名格式不正确',
        image: '../../images/error.png'
      })
      return;
    } else if (site == 0) {
      this.setData({
        siteShow: false
      })
    } else if (phone == 0) {
      this.setData({
        phoneShow: false,
        show: false
      })
    }else {
      this.setData({
        createShow: false,
        DeleteShow: true,
        disabled: true,
        modificationShow:true
      })
      wx.showToast({
        title: '创建成功',
        icon: "success"
      })
      wx.setNavigationBarTitle({
        title: '提醒详情'
      })
      wx.redirectTo({
        url: 'remind'
      })
    }
  },
  //修改
  modification:function(){
    this.setData({
      disabled:false,
      modificationShow:false,
      saveShow:true,
      siteShow: true,
      phoneShow: true,
      show:true
    })
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
    this.setData({
      hidden: false
    });
    wx.showToast({
      title: '删除成功',
      icon: "success"
    })
    setTimeout(function () {
      wx.switchTab({
        url: 'index'
      })
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
  thisPhone:function(e){
    this.setData({
      show:true
    })
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
  getVerificationCode() {
    let that = this
    let time = that.data.currentTime;
    if (time != 60) {
      return;
    }
    let code_status = that.data.code_status;
    if (!code_status) {
      return;
    }
    this.getCode();

    that.setData({
      disabled: false,
      style: "background-color:#dedede;"
    })
  },
})