// pages/index/remind.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    changeColor1:"color:#F53636;border-color:#F53636",
    changeColor2:"",
    Matter:"结婚",
    time: "2018.10.20 11: 58",
    name:"李萌",
    address:"建兴北路金源大饭店",
    standByshow:true   //判断显示待提醒页还是已过期页
  },
  changeColor1:function(){
    this.setData({
      changeColor1:"color:#F53636;border-color:#F53636",
      changeColor2:"",
      standByshow: true
    })
  },
  changeColor2: function () {
    this.setData({
      changeColor2: "color:#F53636;border-color:#F53636",
      changeColor1: "",
      standByshow: false
    })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})