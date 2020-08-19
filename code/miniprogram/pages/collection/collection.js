// miniprogram/pages/collection/collection.js
const app = getApp();
const db = wx.cloud.database({
  env:'wx7c6c05537a19ac4f-tll50'
}) 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectList: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this
    db.collection('mycollection').where({
      _openid: app.globalData._id
  })
      .get({
          success(res) {
              // console.log(res.data)
              that.setData({
                collectList: res.data
              })
              wx.hideLoading()
          }
      })
  }


})