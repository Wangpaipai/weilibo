// pages/index/prensent.js
//定义索引字母数组
var indexArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","#"];
var y = 0;
//获取touchstart字母数组角标
function getArrIndex(english) {
  // console.log(Page)
  for (var x = 0; x < indexArr.length; x++) {
    if (english == indexArr[x]) {
      return x;
    }
  }
}
//num 移动了多少位 index 当前字母,返回当前触摸位置节点的字母
function getArrEnglish(num, index) {
  var english = indexArr[index + num];
  if (!(1 > num + index > 26)) {
    return english;
  } else {
    return AAA;
  }
}
Page({
  data: {
    rightShow: false,
    dropShow: false,
    indexShow: false,
    toView: "e",
    scrollTop: 1000,
    indexId: "",
    indexy: "",
    indexEnglish: "",
    arrId: indexArr,
    money:0,//送礼统计
    count:0,//送礼个数
    userInfo: [],
    this_data:[]
  },
  touchstart: function (e) {
    this.setData({
      indexId: e.target.id,
      toView: e.target.id,
      indexy: e.touches[0].pageY,
      indexShow: true,
      indexEnglish: e.target.id
    })
  },
  touchmove: function (e) {
    console.log(e)
    y = getArrIndex(e.target.id);
    var indexY = e.touches[0].pageY;
    if (getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y)) {
      this.setData({
        toView: getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y),
        indexEnglish: getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y)
      })
    }
  },
  touchend: function (e) {
    this.setData({
      indexShow: false
    })
  },
  showRequire(e){
    var give = JSON.stringify(e.currentTarget.dataset.ctn);
    wx.navigateTo({
      url: 'addPrensent?give=' + give,
    })
  },
  onLoad: function (event) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: 810,
          indexTop: 338
        });
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        wx.request({
          url: 'https://libo.mx5918.com/api/giftgive/giftGiveList',
          data: {
            uid: res.data.uid
          },
          header: {
            'content-type': 'application/json'
          },
          success(data) {
            var result = data.data;
            if (result.status) {
              that.setData({
                money:result.data.money,
                count:result.data.count,
                userInfo: result.data.gift_give
              })
            } else {
              wx.showToast({
                title: '加载失败',
                icon: "none"
              })
            }
          }
        })
      }
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})