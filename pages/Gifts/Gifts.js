// pages/Gifts/Gifts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    money:'',
    relation:'亲人',
    changeArr: ["亲人", "朋友","同学","同事"],
    hidden: false,          //判断是否显示弹框       
    modification: false,     //判断修改按钮是否显示
    Delete: false,          //判断删除按钮是否显示
    disabled: false,
    status: 0,
    rt_id:'',//礼薄id
    receive_id:''//收礼id
  },
  relationChange:function(e){
    let index = e.currentTarget.dataset.index;
    let val = e._relatedInfo.anchorRelatedText
    this.setData({
      status:index,
      relation:val
    })
  },
  // 获取姓名
  getName:function(e){
    let val = e.detail.value;
    this.setData({
      name:val
    })
  },
  // 获取金额
  getMoney:function(e){
    let val = e.detail.value;
    this.setData({
      money: val
    })
  },
  //获取关系
  getRelation: function (e) {
    let val = e.detail.value;
    this.setData({
      relation: val
    })
  },
 relationClick:function(e){
   console.log(e.detail.value)
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      rt_id:options.rt_id
    })
    if (options.receive) {
      var data = JSON.parse(options.receive);
      var index = '';
      for (var i = 0; i < that.data.changeArr.length;i++){
        if (data.relation == that.data.changeArr[i]){
          index = i;
        }
      }
      that.setData({
        modification: true,
        Delete: true,
        name: data.name,
        money: data.money,
        relation: data.relation,
        receive_id: data.id,
        status: index
      })
      wx.setNavigationBarTitle({
        title: '修改收礼'
      })
    }else{
      wx.setNavigationBarTitle({
        title: '添加收礼'
      })
    }
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
  // 点击取消的回调函数
  cancel: function () {
    this.setData({
      hidden: false
    });
  },
  // 点击确认的回调函数
  confirm: function () {
    var that = this;
    wx.getStorage({
      key: 'user',
      success(res) {
        wx.request({
          url: 'https://libo.mx5918.com/api/giftreceive/giftReceiveRemove',
          data: {
            uid: res.data.uid,
            id:that.data.receive_id
          },
          header: {
            'content-type': 'application/json'
          },
          success(data) {
            that.setData({
              hidden: false
            })
            var result = data.data;
            if (result.status){
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
  saveBtn: function () {
    var that = this;
    that.setData({
      disabled: true
    })
    if (this.data.money != "" && this.data.name != "" && this.data.relation!='') {
      let money = /^[0-9]*$/;
      let userName = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      if (!money.test(this.data.money)){
        wx.showToast({
          title: '金额只能是数字',
          image: '../../images/error.png'
        })
      } else if (!userName.test(this.data.name)){
        wx.showToast({
          title: '姓名格式有误',
          image: '../../images/error.png'
        })
      }else{
        wx.getStorage({
          key: 'user',
          success(res) {
            wx.request({
              url: 'https://libo.mx5918.com/api/giftreceive/giftReceiveCreate',
              data: {
                uid: res.data.uid,
                name: that.data.name,
                money: that.data.money,
                relation: that.data.relation,
                rt_id:that.data.rt_id
              },
              header: {
                'content-type': 'application/json'
              },
              success(data) {
                var result = data.data;
                if(result.status){
                  wx.showToast({
                    title: '保存成功',
                    icon: "success"
                  })
                  setTimeout(function () {
                    wx.redirectTo({
                      url: 'Gifts?rt_id=' + that.data.rt_id,
                    })
                  }, 1000)
                } else {
                  that.setData({
                    disabled: false
                  })
                  wx.showToast({
                    title: '保存失败',
                    image: '../../images/error.png'
                  })
                }
              }
            })
          }
        })
      }
    } else {
      wx.showToast({
        title: '内容不能为空',
        image: '../../images/error.png'
      })
    }
  },
  //点击修改
  modificationBtn: function () {
    var that = this;
    that.setData({
      disabled: true
    })
    if (this.data.money != "" && this.data.name != "" && this.data.relation != '') {
      let money = /^[0-9]*$/;
      let userName = /^[a-zA-Z\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      if (!money.test(this.data.money)) {
        wx.showToast({
          title: '金额只能是数字',
          image: '../../images/error.png'
        })
      } else if (!userName.test(this.data.name)) {
        wx.showToast({
          title: '姓名格式有误',
          image: '../../images/error.png'
        })
      } else {
        wx.getStorage({
          key: 'user',
          success(res) {
            wx.request({
              url: 'https://libo.mx5918.com/api/giftreceive/giftReceiveUpdate',
              data: {
                uid: res.data.uid,
                id:that.data.receive_id,
                name: that.data.name,
                money: that.data.money,
                relation: that.data.relation
              },
              header: {
                'content-type': 'application/json'
              },
              success(data) {
                var result = data.data;
                if(result.status){
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
    } else {
      wx.showToast({
        title: '内容不能为空',
        image: '../../images/error.png'
      })
    }
  },
  //点击删除
  deleteBtn: function () {
    this.setData({
      hidden: true
    })
  },
})