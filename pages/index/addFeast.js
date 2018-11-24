// pages/index/addFeast.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    feastNameText:"",
    feastDaysText:"",
    hidden: true,          //判断是否显示弹框       
    modification:false,     //判断修改按钮是否显示
    del: false,          //判断删除按钮是否显示
    btn_style:"",
    date: '',//默认时间
    disabled:false,
    user:{},//用户信息
    rt_id:''//礼薄id
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
    wx.request({
      url: 'https://libo.mx5918.com/api/ritualthin/rtRemove',
      data: {
        uid: that.data.user.uid,
        id: that.data.rt_id
      },
      header: {
        'content-type': 'application/json'
      },
      success(data) {
        var result = data.data;
        that.setData({
          hidden: true
        });
        if (result.status) {
          wx.showToast({
            title: '删除成功',
            icon: "success"
          })
          setTimeout(function () {
            wx.switchTab({
              url: 'index'
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
  },
  //点击保存
  saveBtn: function () {
    var that = this;
    if (that.data.feastDaysText != "" && that.data.feastNameText != "") {
      that.setData({
        disabled: true
      });
      wx.request({
        url: 'https://libo.mx5918.com/api/ritualthin/rtInsert',
        data: {
          uid: that.data.user.uid,
          name: that.data.feastNameText,
          start_time: that.data.feastDaysText
        },
        header: {
          'content-type': 'application/json'
        },
        success(data) {
          var result = data.data;
          if (result.status) {
            wx.showToast({
              title: '保存成功',
              icon: "success"
            })
            setTimeout(function () {
              wx.redirectTo({
                url: 'feast?id=' + result.data
              })
            }, 1000)
          } else {
            that.setData({
              disabled: false
            });
            wx.showToast({
              title: '保存失败',
              image: '../../images/error.png'
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '内容不能为空',
        image: '../../images/error.png'
      })
    }
  },
  //点击修改
  modificationBtn:function(){
    var that = this;
    if (that.data.feastDaysText != "" && that.data.feastNameText != "" && that.data.rt_id != "") {
      that.setData({
        disabled: true
      });
      wx.request({
        url: 'https://libo.mx5918.com/api/ritualthin/rtUpdate',
        data: {
          uid: that.data.user.uid,
          id: that.data.rt_id,
          name: that.data.feastNameText,
          start_time: that.data.feastDaysText
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
            });
            wx.showToast({
              title: result.msg,
              image: '../../images/error.png'
            })
          }
        }
      })
    } else {
      var title = '内容不能为空';
      if (that.data.rt_id == ""){
        title = '礼薄信息错误,请稍后再试';
      }
      wx.showToast({
        title: '内容不能为空',
        image: '../../images/error.png'
      })
    }
  },
  //点击删除
  deleteBtn:function(){
    this.setData({
      hidden:false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var myDate = new Date().toLocaleDateString();
    if(options.rt){
      //接收参数礼薄信息
      var rt = JSON.parse(options.rt);
      wx.setNavigationBarTitle({
        title: '修改礼簿'
      })
      that.setData({
        modification: true,
        del: true,
        feastNameText: rt.name,
        feastDaysText: rt.start_time,
        rt_id: rt.id
      })
    }else{
      //若没有参数则为添加
      wx.setNavigationBarTitle({
        title: '添加礼簿'
      })
    }

    wx.getStorage({
      key: 'user',
      success(res) {
        that.setData({
          date: myDate,
          user:res.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      hidden: true
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  getFeastName:function(e){
    let val = e.detail.value
    this.setData({
      feastNameText:val
    })
  },
  getFeastDays:function(e){
    let val = e.detail.value
    this.setData({
      feastDaysText: val
    })
  }
})