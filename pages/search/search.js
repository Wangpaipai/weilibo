// pages/search/search.js
function setLishi(that){
  wx.getStorage({
    key: 'search',
    success: function (res) {
      var search = res.data;
      let a = search.length
      let b = a / 4
      let int = parseInt(b)
      if (b < 1 && b > 0) {
        b = 1;
        int = parseInt(b)
      } else if (b % 1 != 0) {
        int = parseInt(b + 1)
      }
      that.setData({
        style: "height:" + (78 * int) + "rpx",
        lishi: search
      })
    }
  })
}

function sendCurl(that,param){
  wx.getStorage({
    key: 'user',
    success(res) {
      param.uid = res.data.uid
      wx.request({
        url: 'https://libo.mx5918.com/api/ritualthin/search',
        data:param,
        header: {
          'content-type': 'application/json'
        },
        success(data) {
          var result = data.data;
          if (result.status) {
            that.setData({
              receive: result.data.gift_give,
              give: result.data.gift_receive
            })
          }
        }
      })
    }
  })
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    style:"",
    lishi:[],
    receive:[],
    give:[],
    name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    setLishi(that);
  },
  //点击收礼跳转
  receiveUrl:function(e){
    var receive = JSON.stringify(e.currentTarget.dataset.ctn);
    wx.navigateTo({
      url: '../Gifts/Gifts?rt_id=' + receive.rt_id + '&receive=' + receive,
    })
  },
  //点击送礼跳转
  giveUrl:function(e){
    var give = JSON.stringify(e.currentTarget.dataset.ctn);
    wx.navigateTo({
      url: '../index/addPrensent?give=' + give,
    })
  },

  //点击历史记录搜索
  history:function(e){
    var name = e.currentTarget.dataset.name;
    if(!name){
      return false;
    }
    var that = this;
    var param = {
      name: name
    };
    sendCurl(that, param);
    that.setData({
      name: name
    })
  },

  //输入框搜索
  sarechRequest:function(e){
    var that = this;
    var name = e.detail.value;
    if (!name) {
      return false;
    }
    var param = {
      name:name
    };
    sendCurl(that, param);
    that.setData({
      name: name
    })
  },

  //缓存搜索记录
  setStorage:function(e){
    var that = this;
    if (!e.detail.value){
      return false;
    }
    wx.getStorage({
      key: 'search',
      success(res) {
        var search = res.data;
        var name = e.detail.value;
        var data = { name: name };
        var has_name = false;
        for (var i = 0; i < search.length;i++){
          if (name == search[i]['name']){
            search.splice(i,1);
            search.unshift(data);
            has_name = true;
          }
        }
        if(!has_name){
          search.unshift(data);
        }
        search = search.slice(0,8);
        wx.setStorage({
          key: "search",
          data: search,
          success:function(){
            setLishi(that);
          }
        })
      },
      fail:function(){
        var search = [
          { name: e.detail.value }
        ];
        wx.setStorage({
          key: "search",
          data: search,
          success: function () {
            setLishi(that);
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
    var that = this;
    var name = that.data.name;
    if (!name) {
      return false;
    }
    var that = this;
    var param = {
      name: name
    };
    sendCurl(that, param);
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