function wxLogin(that,param){
  wx.request({
    url: 'https://libo.mx5918.com/api/user/login', //仅为示例，并非真实的接口地址
    data: param,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success(res) {
      if (res.data.status){
        wx.setStorage({
          key: "user",
          data: res.data.data,
          success:function(){
            //授权成功后，跳转进入小程序首页
            wx.reLaunch({
              url: '/pages/index/index'
            })
          }
        });
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          confirmText: '返回授权'
        })
      }
    }
  })
}

// pages/Gifts/Gifts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var isShow = wx.canIUse('button.open-type.getUserInfo');
    var that =this;
    that.setData({
      canIUse: isShow
    })
    wx.login({
      success(res) {
        var code = res.code;
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  var param = {
                    code: code,
                    encryptedData: res.encryptedData,
                    iv: res.iv,
                    rawData: res.rawData,
                    signature: res.signature
                  };
                  wxLogin(that,param);
                }
              });
            }
          }
        })
      }
    })
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
  bindGetUserInfo: function (e) {
    var that = this;
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      //插入登录的用户的相关信息到数据库

      wx.login({
        success(res) {
          var code = res.code;
          var wxData = e.detail;
          var param = {
            code:code,
            encryptedData: wxData.encryptedData,
            iv: wxData.iv,
            rawData: wxData.rawData,
            signature: wxData.signature
          };
          wxLogin(that, param);
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
        }
      })
    }
  }
})