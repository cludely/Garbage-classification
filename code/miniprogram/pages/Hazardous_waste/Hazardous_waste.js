// pages/Hazardous_waste/Hazardous_waste.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    harmList: [],       // 列表数据
    isShowLayer: false, // 是否显示提示框
    layerLetter: null,  // 提示框内容
    to_list_title: "A",
    window_height: 500
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.harmList) {
      wx.showLoading({
        title: '加载中',
      })
    }
    wx.cloud.callFunction({
      name: 'http',          // 云函数的名称
      data: {
        url: 'http://www.hzuljfl.cn:3000/getDataByCategory2'
      },
      success: (res) => {
        this.setData({
            harmList: JSON.parse(res.result),
            window_height: wx.getSystemInfoSync().windowHeight
        });
        wx.hideLoading()
    }
    });
  },

  /**
   * 点击右边导航栏显示提示框
   */
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