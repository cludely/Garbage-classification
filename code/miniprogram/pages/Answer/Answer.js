var postData = require("../../data/post-data.js");
var app = getApp();
Page({
  data: {
    postList: postData.postList,
    index:0,
    bc_default: '#FBFBFB',
    bc_right: '#98FB98',
    bc_wrong: '#c0c0c0 ',
    bcA: '#ffffff',
    bcB: '#ffffff',
    bcC: '#ffffff',
    bcD: '#ffffff',
    ny: '答案',
    defen: null,           // 当前分数
    db_userInfo: {},      // 数据库中的用户信息
    is_collected: false   // 是否收藏
  },

  nextQuestion: function () {
    var that = this;
    var buff_title = this.data.postList[this.data.index + 1].name;
    if (that.data.index < postData.postList.length - 1) {
      this.setData({
        index: that.data.index + 1,
        bcA: that.data.bc_default,
        bcB: that.data.bc_default,
        bcC: that.data.bc_default,
        bcD: that.data.bc_default,
        ny:'答案'
      });
    }
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: 'collection_query',
      data: {
        _id: app.globalData._id,
        title: buff_title
      },
      success: res => {
        wx.hideLoading()
        if(res.result.data[0]){
          that.setData({
            is_collected: true
          })
        }else {
          that.setData({
            is_collected: false
          })
        }
      }
    })
  },
  lastQuestion: function () {
    var that = this;
    var buff_title = this.data.postList[this.data.index - 1].name;
    if (that.data.index > 0) {
      this.setData({
        index: that.data.index - 1,
        ny:'答案'
      });
    }
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
      name: 'collection_query',
      data: {
        _id: app.globalData._id,
        title: buff_title
      },
      success: res => {
        wx.hideLoading()
        if(res.result.data[0]){
          that.setData({
            is_collected: true
          })
        }else {
          that.setData({
            is_collected: false
          })
        }
      }
    })
  },
  btnOpClick: function(e){
    var that = this;
    var select = e.currentTarget.id;
    var jieg = postData.postList[that.data.index].daan;
    if (select==jieg){
      if (that.data.index < postData.postList.length-1){
        if (select == 'A') {
          this.setData({ bcA: that.data.bc_right });
        }
        else if (select == 'B') {
          this.setData({ bcB: that.data.bc_right });
        }
        else if (select == 'C') {
          this.setData({ bcC: that.data.bc_right });
        }
        else if (select == 'D') {
          this.setData({ bcD: that.data.bc_right });
        }
        that.nextQuestion();
        this.setData({
          defen: this.data.defen + 2
        })
        // this.data.db_userInfo.garde = this.data.db_userInfo.garde + 2
        app.globalData.db_userInfo.garde = app.globalData.db_userInfo.garde + 2
      }
      else{
        if (select == 'A') {
          this.setData({ bcA: that.data.bc_right });
        }
        else if (select == 'B') {
          this.setData({ bcB: that.data.bc_right });
        }
        else if (select == 'C') {
          this.setData({ bcC: that.data.bc_right });
        }
        else if (select == 'D') {
          this.setData({ bcD: that.data.bc_right });
        }
        that.gotonext();    
      }
    }
    else {
      if (select == 'A') {
        this.setData({ bcA: that.data.bc_wrong });
      }
      else if (select == 'B') {
        this.setData({ bcB: that.data.bc_wrong });
      }
      else if (select == 'C') {
        this.setData({ bcC: that.data.bc_wrong });
      }
      else if (select == 'D') {
        this.setData({ bcD: that.data.bc_wrong });
      }
      else if (select == 'E') {
        this.setData({ bcE: that.data.bc_wrong });
      }
    }
  },
  
  xianshi: function(){
    var that=this;
    this.setData({
      ny: that.data.postList[that.data.index].daan
    })
  },

 /**
   * 收藏题目
   */
  collection: function () {
    var that = this;
    var buff_content = this.data.postList[this.data.index].content;
    var buff_title = this.data.postList[this.data.index].name;
    var buff_daan = this.data.postList[this.data.index].daan;
    wx.showLoading({
      title: '请稍等...'
    })
    that.setData({
      is_collected: !this.data.is_collected
    })
    if(this.data.is_collected){ //判断是否收藏
      // 查询是否已收藏
      wx.cloud.callFunction({
        name: 'collection_query',
        data: {
          _id: app.globalData._id,
          title: buff_title
        },
        success: res => {
          // console.log(that.data.is_collected)
          // 若未收藏则将其加入数据库中
          if(!res.result.data[0]){
            wx.cloud.callFunction({
              name: 'collection_add',
              data: {
                title: buff_title,
                content: buff_content,
                daan: buff_daan
              },
              success: res => {
                wx.hideLoading()
                wx.showToast({
                  title: '已收藏',
                  icon: 'success',
                  duration: 800
                })
              },
              fail: err => {
                wx.showToast({
                  title: '收藏失败',
                  icon: 'fail',
                  duration: 800
                })
              }
            });
          }
        },
        fail: err => {
          console.log(err)
        }
      });
    }else{  //若为收藏则删除该记录
      wx.cloud.callFunction({
        name: 'collection_query',
        data: {
          _id: app.globalData._id,
          title: buff_title
        },
        success: res => {
          // console.log(res)
          wx.hideLoading()
          var db_collection = wx.cloud.database()
          db_collection.collection('mycollection').doc(res.result.data[0]._id).remove()
          wx.showToast({
            title: '取消收藏',
            icon: 'success',
            duration: 800
          })
        }
      })
    }   
  },


  onLoad: function () {
    var that = this;
    var buff_title = this.data.postList[this.data.index].name;
    this.setData({
      db_userInfo: app.globalData.db_userInfo,
      defen: app.globalData.db_userInfo.garde
    });
    wx.showLoading({
      title: '请稍等...',
    })
    wx.cloud.callFunction({
        name: 'collection_query',
        data: {
          _id: app.globalData._id,
          title: buff_title
        },
        success: res => {
          // console.log(that.data.is_collected)
          wx.hideLoading()
          if(!res.result.data[0]){
            that.setData({
              is_collected: false
            })
          }else{
            that.setData({
              is_collected: true
            })
          }
        },
        fail: err => {
          console.log(err)
        }
      });
  },

    /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.cloud.callFunction({
      name: 'updata_garde',
      data: {
        garde: this.data.defen,
        _id: app.globalData._id
      },
      success: res => {
   
      },
      fail: err => {
        console.log(err)
      }
    });
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.cloud.callFunction({
      name: 'updata_garde',
      data: {
        garde: this.data.defen,
        _id: app.globalData._id
      },
      success: res => {
       
      },
      fail: err => {
        console.log(err)
      }
    });
  },
})