// pages/index/addPrensent.js
var name,days,relation,matter,money;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    name: '',
    money: '',
    days:'',
    relation: '',
    matter:"",
    changeArr: ["亲人", "朋友", "同学", "同事"],
    hidden: true,          //判断是否显示弹框       
    modification: false,     //判断修改按钮是否显示
    Delete: false,          //判断删除按钮是否显示
    disabled: false,
    status: 0
  },
  prensentChange:function(e){
    let index=e.currentTarget.dataset.index;
    let val=e._relatedInfo.anchorRelatedText;
    this.setData({
      status:index,
      relation:val
    })
  },
  thisText: function (e) {
    console.log(e.detail.value)
    let val = e.detail.value;
    this.setData({
      relation: val
    })
  },
  // 获取姓名
  getName: function (e) {
    console.log(e.detail.value)
    let val = e.detail.value;
    this.setData({
      name: val
    })
  },
  // 获取金额
  getMoney: function (e) {
    let val = e.detail.value;
    this.setData({
      money: val
    })
  },
  //获取关系
  getRelation: function (e) {
    console.log(e.detail.value)
    let val = e.detail.value;
    this.setData({
      relation: val
    })
  },
  relationClick: function (e) {
    console.log(e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 点击取消的回调函数
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  // 点击确认的回调函数
  confirm: function () {
    this.setData({
      hidden: true
    });
    wx.showToast({
      title: '删除成功',
      icon: "success"
    })
    setTimeout(function () {
      wx.switchTab({
        url: '../index/index'
      })
    }, 1000)
  },
  //点击保存
  formSubmit: function (e) {
    console.log(e.detail.value)
    name = e.detail.value["name"].length;
    matter = e.detail.value["matter"].length;
    days = e.detail.value["days"].length;
    relation = e.detail.value["relation"].length;
    money = e.detail.value["money"].length;
    wx.setNavigationBarTitle({
      title: '添加送礼'
    })
    if (name != 0 && relation !=0 &&matter != 0 && relation != 0 && days!=0) {
      let thismoney = /^[0-9]*$/;
      let userName = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      let Name=e.detail.value["name"];
      let Money=e.detail.value["money"];
      if (!thismoney.test(Money)) {
        wx.showToast({
          title: '金额只能是数字',
          image: '../../images/error.png'
        })
      } else if (userName.test(Name)){
        wx.showToast({
          title: '姓名格式有误',
          image: '../../images/error.png'
        })
      } else if (name < 2){
        console.log(name)
        wx.showToast({
          title: '姓名至少两位',
          image: '../../images/error.png'
        })
      }else{
        this.setData({
          modification: !this.data.modification,
          Delete: false,
          disabled: true
        })
        wx.showToast({
          title: '保存成功',
          icon: "success"
        })
        setTimeout(function(){
          wx.switchTab({
            url: 'prensent',
          })
        },1000)
       }
    }else {
      wx.showToast({
        title: '内容不能为空',
        image: '../../images/error.png'
      })
    }
  },
  //点击修改
  modificationBtn: function () {
    wx.setNavigationBarTitle({
      title: '送礼详情'
    })
    this.setData({
      feastBtnShow: !this.data.feastBtnShow,
      modification: false,
      Delete: true,
      btn_style: "margin-top:30rpx",
      disabled: false
    })
  },
  //点击删除
  deleteBtn: function () {
    this.setData({
      hidden: false
    })
  },
  getPrensentDays:function(e){
    console.log(e.detail.value)
    let val = e.detail.value
    this.setData({
      days: val
    })
  }
})