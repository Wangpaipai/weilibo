// pages/Gifts/Gifts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    money:'',
    relation:'',
    changeArr: ["亲人", "朋友","同学","同事"],
    hidden: false,          //判断是否显示弹框       
    modification: false,     //判断修改按钮是否显示
    Delete: false,          //判断删除按钮是否显示
    disabled: false,
    status: 0
  },
  relationChange:function(e){
    console.log(e._relatedInfo.anchorRelatedText);
    console.log(e.currentTarget.dataset.index);
    let index = e.currentTarget.dataset.index;
    let val = e._relatedInfo.anchorRelatedText
    this.setData({
      status:index,
      relation:val
    })
  },
  // 获取姓名
  getName:function(e){
    console.log(e.detail.value)
    let val = e.detail.value;
    this.setData({
      name:val
    })
  },
  // 获取金额
  getMoney:function(e){
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
 relationClick:function(e){
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
    this.setData({
      name: '',
      money: '',
      relation: '',
      hidden: false
    })
  },
  //点击保存
  saveBtn: function () {
    let that = this
    that.setData({
      name: that.data.name,
      money: that.data.money,
      relation:that.data.relation,
    })
    wx.setNavigationBarTitle({
      title: '添加收礼'
    })
    if (this.data.money != "" && this.data.name != "" && this.data.relation!='') {
      let money = /^[0-9]*$/;
      let userName = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      if (!money.test(this.data.money)){
        wx.showToast({
          title: '金额只能是数字',
          image: '../../images/error.png'
        })
      } else if (userName.test(this.data.name)){
        console.log(!userName.test(this.data.name))
        wx.showToast({
          title: '姓名格式有误',
          image: '../../images/error.png'
        })
      }
      else{
        this.setData({
          modification: !this.data.modification,
          Delete: false,
          disabled: true
        })
        wx.showToast({
          title: '保存成功',
          icon: "success"
        })
        setTimeout(function () {
          wx.redirectTo({
            url: 'Gifts',
          })
        }, 1000)
      }
    } else {
      wx.showToast({
        title: '内容不能为空',
        image: '../../images/error.png'
      })
    }
  },
  //点击修改
  modificationBtn: function () {
    wx.setNavigationBarTitle({
      title: '结婚宴'
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
      hidden: true
    })
  },
})