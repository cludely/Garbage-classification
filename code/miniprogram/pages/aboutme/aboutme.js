var app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../assets/images/avatar.png',
    userInfo: {},
    db_userInfo: {},
    showDialog: false   //控制弹窗的打开关闭
  },

  /**
  * 控制弹窗的打开关闭
  */
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  /**
  * 弹窗的取消事件
  */
  unsure: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  /**
  * 弹窗的确定事件
  */
  sure: function (e) {
    var that = this
    // console.log(e.detail.value.signature)
    this.setData({
      showDialog: !this.data.showDialog     // 隐藏弹窗
    });
    wx.showLoading({
      title: '更新签名...',
    })
    //  将新个性签名存进数据库中
     wx.cloud.callFunction({
      name: 'update',
      data: {
        signature: e.detail.value.signature,
        _id: app.globalData._id
      },
      success: res => {
        // 更新页面中的签名
        wx.cloud.callFunction({
          name: 'query',
          data: {
            _id: app.globalData._id
          },
          success: res => {
            that.setData({
              db_userInfo: res.result.data[0]
            })
            app.globalData.userInfo.signature = res.result.data[0].signature;
            wx.hideLoading();
            wx.showToast({
              title: '更新成功',
              icon: 'success',
              duration: 800
            })
          }
        });
      },
      fail: err => {
        wx.hideLoading();
            wx.showToast({
              title: '更新失败',
              icon: 'fail',
              duration: 800
            })
      }
    });

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl: app.globalData.userInfo.avatarUrl,
      userInfo: app.globalData.userInfo,
      db_userInfo: app.globalData.db_userInfo
    })
  },

  onShow: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  }

})