// pages/index/feast.js
  //定义索引字母数组
  var indexArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","#"];
  var y = 0;
  //获取touchstart字母数组角标
  function getArrIndex(english) {
    // console.log(Page)
    for(var x = 0; x<indexArr.length; x++) {
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
/**
 * 页面的初始数据
 */
Page({
  data: {
    Toptitle: "", //宴席名称
    time: "",
    moneyCountNum: "",
    peopleCountNum: "",
    rightShow: false,
    dropShow: false,
    indexShow: false,
    user:{},//用户信息
    rt_id:'',//礼薄id
    rt:{},//礼薄信息
    toView: "Z",
    scrollTop: 1000,
    indexId: "",
    indexy: "",
    indexEnglish: "",
    arrId: indexArr,
    userInfo: []
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
  showRequire(e) {
    var that = this;
    var receive = JSON.stringify(e.currentTarget.dataset.ctn);
    wx.navigateTo({
      url: '../Gifts/Gifts?rt_id=' + that.data.rt_id + '&receive=' + receive,
    })
  },
  onLoad: function (event) {
    var rt_id = event.id;
    var that = this;
    that.setData({
      rt_id: rt_id
    })
    
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          windowHeight: 810,
          indexTop: 338
        });
      }
    })
  },
  tj_feast: function () {
    var rt = JSON.stringify(this.data.rt);
    wx.navigateTo({
      url: 'addFeast?rt=' + rt,
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
          url: 'https://libo.mx5918.com/api/ritualthin/getGiftReceiveDetail',
          data: {
            uid: res.data.uid,
            rt_id: that.data.rt_id
          },
          header: {
            'content-type': 'application/json'
          },
          success(data) {
            var result = data.data;
            if(result.status){
              that.setData({
                moneyCountNum: result.data.money,
                peopleCountNum: result.data.count,
                userInfo: result.data.receive,
                Toptitle: result.data.rt.name,
                time: result.data.rt.start_time,
                rt: result.data.rt
              })
              wx.setNavigationBarTitle({
                title: result.data.rt.name
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