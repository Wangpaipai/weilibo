// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentHide:true,
    imageText:"婚",
    name: "李萌",
    matter: "结婚",
    timer:"2018-10-01 11: 58",
    txHidden:true
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
  navigator:function(){
    wx.navigateTo({
      url: 'feast'
    })
  }
})