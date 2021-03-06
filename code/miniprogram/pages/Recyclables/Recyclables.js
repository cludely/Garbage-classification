// pages/Recyclables/Recyclables.js
// var Fly=require("../../src/wx.umd.min") //wx.js为您下载的源码文件
// var fly=new Fly();  //创建fly实例
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recycList:[],
    isShowLayer: false,
    layerLetter: null,
    to_list_title: "A",
    window_height: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.recycList) {
      wx.showLoading({
        title: '加载中',
      })
    }
    wx.cloud.callFunction({
      name: 'http',          // 云函数的名称
      data: {
        url: 'http://www.hzuljfl.cn:3000/getDataByCategory1'
      },
      success: (res) => {
        // console.log(typeof(res.result))
        this.setData({
            recycList: JSON.parse(res.result),
            window_height: wx.getSystemInfoSync().windowHeight
        });
        wx.hideLoading()
    }
  })
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getCurrentIndex: function (e) {
    this.setData({ 
      isShowLayer: true,
      layerLetter: e.currentTarget.dataset.index,
      to_list_title: e.currentTarget.dataset.index
     });
     setTimeout(() => {
      this.setData({ isShowLayer: false })
     },500);
  }

})