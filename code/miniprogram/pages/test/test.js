// miniprogram/pages/test/test.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    db_userInfo: {}
  },

// 跳转到答题界面
  go_to_answer: function () {
    wx.navigateTo({
      url: '../Answer/Answer',
    })
  },
// 跳转到收藏界面
  go_to_collection: function () {
    wx.navigateTo({
      url: '../collection/collection',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      db_userInfo: app.globalData.db_userInfo   // 加载用户数据
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作————下拉刷新页面
   */
  onPullDownRefresh: function () {
    var that = this
    wx.cloud.callFunction({ // 更新页面数据
      name: 'query',
      data: {
        _id: app.globalData._id
      },
      success: res => {
        that.setData({
          db_userInfo: res.result.data[0]
        })
      }
    });     
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.cloud.callFunction({ // 更新页面数据
      name: 'query',
      data: {
        _id: app.globalData._id
      },
      success: res => {
        that.setData({
          db_userInfo: res.result.data[0]
        })
      }
    });     
  }
})