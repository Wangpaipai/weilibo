// pages/index/feast.js
  //定义索引字母数组
  var indexArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
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
    Toptitle: "结婚宴", //宴席名称
    time: "2018-01-01",
    moneyCountNum: "1552421",
    peopleCountNum: "25",
    rightShow: false,
    dropShow: false,
    indexShow: false,
    toView: "e",
    scrollTop: 1000,
    indexId: "",
    indexy: "",
    indexEnglish: "",
    arrId: indexArr,
    userInfo: [
      {
        englis_id: 0,
        ENG: "A",
        data: [
          {
            user_id: 0,
            name: "阿丹",
            money: 600,
            matter: "结婚",
            date: "2018.10.12"
          },
          {
            user_id: 1,
            name: "阿丹",
            money: 600,
            matter: "结婚",
            date: "2018.10.12"
          }
        ]
      },
      {
        englis_id: 1,
        ENG: "B",
        data: [
          {
            user_id: 0,
            name: "巴丹",
            money: 600,
            matter: "结婚",
            date: "2018.10.12"
          },
          {
            user_id: 1,
            name: "巴丹",
            money: 600,
            matter: "结婚",
            date: "2018.10.12"
          }
        ]
      }
    ],
    this_data: []
  },
  touchstart: function (e) {
    this.setData({
      indexId: e.target.id,
      toView: e.target.id.toLowerCase(),
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
        toView: getArrEnglish(Math.round((indexY - this.data.indexy) / 15), y).toLowerCase(),
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
    wx.navigateTo({
      url: 'addPrensent',
    })
  },
  onLoad: function (event) {
    var rt = JSON.parse(event.content);
    rt.start_time = rt.start_time.replace(/\./g, '-');
    let this_data = this.data.userInfo[0].data;
    var that = this;
    this.setData({
      this_data: this_data,
      Toptitle:rt.name,
      time: rt.start_time,
      moneyCountNum:rt.money,
      peopleCountNum:rt.count
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
    wx.navigateTo({
      url: 'addFeast',
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})