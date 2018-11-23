// pages/index/addFeast.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rt_id:'',
    feastNameText:"",
    feastDaysText:"",
    hidden: true,          //判断是否显示弹框       
    modification:false,     //判断修改按钮是否显示
    Delete: false,          //判断删除按钮是否显示
    btn_style:"",
    date: '',
    disabled:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myDate = new Date().toLocaleDateString();
    console.log(myDate);
    this.setData({
      date: myDate
    })
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
      icon:"success"
    })
    setTimeout(function () {
      wx.switchTab({
        url: 'index'
      })
    },1000)
  },
  //点击保存
  saveBtn:function(){
    if(this.data.feastDaysText!=""&&this.data.feastNameText!=""){
      this.setData({
        modification: true,
        Delete: true,
        feastNameText: this.data.feastNameText,
        feastDaysText: this.data.feastDaysText,
        disabled: true
      })
      wx.setNavigationBarTitle({
        title: '添加礼簿'
      })
      wx.showToast({
        title: '保存成功',
        icon: "success"
      })
      setTimeout(function(){
        wx.redirectTo({
          url: 'feast'
        })
      },1000)
    }else{
      wx.showToast({
        title: '内容不能为空',
        image:'../../images/error.png'
      })
    }
  },
  //点击修改
  modificationBtn:function(){
    wx.setNavigationBarTitle({
      title: '修改礼簿'
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
  deleteBtn:function(){
    this.setData({
      hidden:false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      hidden: true,
      Delete: false
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  getFeastName:function(e){
    let val=e.detail.value
    this.setData({
      feastNameText:val
    })
  },
  getFeastDays:function(e){
    let val = e.detail.value
    this.setData({
      feastDaysText: val
    })
  }
})