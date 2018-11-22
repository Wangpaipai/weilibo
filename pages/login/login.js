function wxLogin(that){
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.userInfo']){
        wx.getUserInfo({
          success: function (res) {
            console.log(res);
            //var userInfo = res.userInfo
            //var nickName = userInfo.nickName
            //var avatarUrl = userInfo.avatarUrl
            //var gender = userInfo.gender //性别 0：未知、1：男、2：女
            //var province = userInfo.province
            //var city = userInfo.city
            //var country = userInfo.country
          },
          fail: function (err) {
            console.log(err);
            openLogin(that);
          }
        })
      }else{

      }
    }
  })
}

function openLogin(that){
  wx.openSetting({
    success(res) {
      console.log(res.authSetting)
      // res.authSetting = {
      //   "scope.userInfo": true,
      //   "scope.userLocation": true
      // }
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
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://libo.mx5918.com/api/user/login',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail: function () {
        wxLogin(that);
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