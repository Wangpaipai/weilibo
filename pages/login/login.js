function wxLogin(that){
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.userInfo']){
        wx.getUserInfo({
          success: function (res) {
            return res;
          },
          fail: function (err) {
            return openLogin(that);
          }
        })
      }else{

      }
    },
    fail:function(err){
      console.log(123);
    }
  })
}

function openLogin(that){
  wx.openSetting({
    success(res) {
      if (res.authSetting['scope.userInfo']){
        return wxLogin(that);
      }else{
        return openLogin(that);
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
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;

    wx.login({
      success(res) {
        var code = res.code;
        var param = wxLogin(that);
        //var rawData = param.rawData;
        //var signature = param.signature;
        //var encryptedData = param.encryptedData;
        //var iv = param.iv;
        //if (code) {
        //  //发起网络请求
        //  wx.request({
        //    url: 'https://libo.mx5918.com/api/user/login',
        //    data: {
        //      code: code,
        //      rawData: rawData,
        //      signature: signature,
        //      iv: iv,
        //      encryptedData: encryptedData
        //    }
        //  })
        //} else {
        //  console.log('登录失败！' + res.errMsg)
        //}
      },
      fail: function (err) {
        console.log(err);
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

  }
})