// pages/index/addPrensent.js
var name, days, matter, relation, money;
function checkData(that){
  name = that.data.name.length;
  matter = that.data.matter.length;
  days = that.data.days.length;
  relation = that.data.relation.length;
  money = that.data.money.length;
  if (name != 0 && relation != 0 && matter != 0 && relation != 0 && days != 0) {
    let thismoney = /^[0-9]*$/;
    let userName = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
    let Name = that.data.name;
    let Money = that.data.money;
    if (!thismoney.test(Money)) {
      wx.showToast({
        title: '金额只能是数字',
        image: '../../images/error.png'
      })
      return false;
    } else if (name < 2) {
      wx.showToast({
        title: '姓名至少两位',
        image: '../../images/error.png'
      })
      return false;
    } else if (!userName.test(Name)) {
      wx.showToast({
        title: '姓名格式有误',
        image: '../../images/error.png'
      })
      return false;
    }  else {
      return true;
    }
  } else {
    wx.showToast({
      title: '内容不能为空',
      image: '../../images/error.png'
    })
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:"",
    name: '',
    money: '',
    days:'',
    relation: '',
    matter:"",
    changeArr: ["亲人", "朋友", "同学", "同事"],
    hidden: true,          //判断是否显示弹框       
    modification: false,     //判断修改按钮是否显示
    Delete: false,          //判断删除按钮是否显示
    disabled: false,
    status: '',
    give_id:''
  },
  prensentChange:function(e){
    let index=e.currentTarget.dataset.index;
    let val=e._relatedInfo.anchorRelatedText;
    this.setData({
      status:index,
      relation:val
    })
  },
  thisText: function (e) {
    console.log(e.detail.value)
    let val = e.detail.value;
    this.setData({
      relation: val
    })
  },
  // 获取姓名
  getName: function (e) {
    let val = e.detail.value;
    this.setData({
      name: val
    })
  },
  // 获取金额
  getMoney: function (e) {
    let val = e.detail.value;
    this.setData({
      money: val
    })
  },
  //获取关系
  getRelation: function (e) {
    var val = e.detail.value;
    var index = '';
    for (var i = 0; i < this.data.changeArr.length;i++){
      if (val == this.data.changeArr[i]){
        index = i;
      }
    }
    this.setData({
      relation: val,
      status:index
    })
  },
  getMatter: function (e) {
    let val = e.detail.value;
    this.setData({
      matter: val
    })
  },
  relationClick: function (e) {
    console.log(e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if(options.give){
      var give = JSON.parse(options.give);
      give.give_time = give.give_time.replace(/\./g, "-");
      var index = '';
      for (var i = 0; i < that.data.changeArr.length; i++) {
        if (give.relation == that.data.changeArr[i]) {
          index = i;
        }
      }
      this.setData({
        status: index,
        name: give.name,
        money: give.money,
        days: give.give_time,
        relation: give.relation,
        matter: give.matter, 
        modification: true,
        Delete: true, 
        give_id:give.id
      })
      wx.setNavigationBarTitle({
        title: '修改送礼'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 点击取消的回调函数
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  // 点击确认的回调函数
  confirm: function () {
    var that = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        wx.request({
          url: 'https://libo.mx5918.com/api/giftgive/giftGiveRemove',
          data: {
            uid: res.data.uid,
            id: that.data.give_id
          },
          header: {
            'content-type': 'application/json'
          },
          success(data) {
            that.setData({
              hidden: true
            });
            var result = data.data;
            if (result.status) {
              wx.showToast({
                title: '删除成功',
                icon: "success"
              })
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
            } else {
              wx.showToast({
                title: '删除失败',
                image: '../../images/error.png'
              })
            }
          }
        })
      }
    })
  },
  //点击保存
  formSubmit: function (e) {
  },
  //新增送礼
  createGive:function(e){
    var that = this;
    if (checkData(that)) {
      wx.getStorage({
        key: 'user',
        success(res) {
          that.setData({
            disabled: true
          })
          wx.request({
            url: 'https://libo.mx5918.com/api/giftgive/giftGiveCreate',
            data: {
              uid: res.data.uid,
              name: that.data.name,
              money: that.data.money,
              relation: that.data.relation,
              matter: that.data.matter,
              give_time: that.data.days
            },
            header: {
              'content-type': 'application/json'
            },
            success(data) {
              var result = data.data;
              if (result.status) {
                wx.showToast({
                  title: '新增成功',
                  icon: "success"
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              } else {
                that.setData({
                  disabled: false
                })
                wx.showToast({
                  title: '新增失败',
                  image: '../../images/error.png'
                })
              }
            }
          })
        }
      })
    }
  },
  //点击修改
  modificationBtn: function () {
    var that = this;
    if(checkData(that)){
      wx.getStorage({
        key: 'user',
        success(res) {
          that.setData({
            disabled: true
          })
          wx.request({
            url: 'https://libo.mx5918.com/api/giftgive/giftGiveUpdate',
            data: {
              uid: res.data.uid,
              id: that.data.give_id,
              name: that.data.name,
              money: that.data.money,
              relation: that.data.relation,
              matter: that.data.matter,
              give_time: that.data.days
            },
            header: {
              'content-type': 'application/json'
            },
            success(data) {
              var result = data.data;
              if (result.status) {
                wx.showToast({
                  title: '修改成功',
                  icon: "success"
                })
                setTimeout(function () {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 1000)
              } else {
                that.setData({
                  disabled: false
                })
                wx.showToast({
                  title: '修改失败',
                  image: '../../images/error.png'
                })
              }
            }
          })
        }
      })
    }
  },
  //点击删除
  deleteBtn: function () {
    this.setData({
      hidden: false
    })
  },
  getPrensentDays:function(e){
    console.log(e.detail.value)
    let val = e.detail.value
    this.setData({
      days: val
    })
  }
})