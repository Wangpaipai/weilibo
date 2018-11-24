// pages/index/index.js
Page({
  data: {
    contentHide:true,
    imageText:"",
    name: "",
    matter: "",
    timer:"",
    txHidden:true,
    remind:{},
    banner:[],
    gift_give_total:0,
    gift_receive_total:0,
    ritualthin:[],
    user:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  onShow:function(){
    var that = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        wx.request({
          url: 'https://libo.mx5918.com/api/ritualthin/index',
          data: {
            uid: res.data.uid
          },
          header: {
            'content-type': 'application/json'
          },
          success(data) {
            var result = data.data;
            for (var i = 0; i < result.data.ritualthin.length; i++) {
              var str = result.data.ritualthin[i]['name'];
              result.data.ritualthin[i].index = str.charAt(str.length - 1)
            }
            that.setData({
              user: res.data,
              banner: result['data']['banner'],
              gift_give_total: result['data']['gift_give_total'],
              gift_receive_total: result['data']['gift_receive_total'],
              ritualthin: result['data']['ritualthin'],
              remind: result['data']['remind'][0]
            });
          }
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 点击礼薄跳转页面
   */
  navigator:function(event){
    //获取参数
    var data = event.currentTarget.dataset['id'];
    wx.navigateTo({
      url: 'feast?id=' + data
    })
  }
})