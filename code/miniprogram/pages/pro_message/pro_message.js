var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},    // 用户信息
    db_userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.userInfo,
      db_userInfo: app.globalData.db_userInfo
    });
    var that = this
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: 'query',
      data: {
        _id: app.globalData._id
      },
      success: res => {
        that.setData({
          db_userInfo: res.result.data[0]
        })
        wx.hideLoading()
      }
    });     
  }
})