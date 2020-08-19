//app.js

App({
  globalData: {
    _id: "",     // 用户唯一标识符 openid
    userInfo: {},    // 用户基本信息
    db_userInfo: {} //  用户个性签名和分数等信息
  },


  onLaunch: function () {
    wx.showLoading({
      title: '正在加载...',
    })
    var that = this;
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // 获取openid
    this.onGetOpenid();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo;
              // 查询用户是否曾经登录过此小程序
              wx.cloud.callFunction({
                name: 'query',
                data: {
                  _id: this.globalData._id
                },
                success: res => {
                  // console.log(res)
                  // 若没有登陆过则将用户的信息保存到云数据库
                  if(!res.result.data[0]){
                    wx.cloud.callFunction({
                      name: 'add',
                      data: {
                        signature : "生活就像海洋，只有意志坚强的人才能到达彼岸。",   //个性签名
                      }, 
                      // 初始化第一次登录用户的信息
                      success: res => {
                        that.globalData.db_userInfo = {   //获取用户个性签名和分数等信息
                          "_id": that.globalData._id,
                          "garde": 0,
                          "signature":"生活就像海洋，只有意志坚强的人才能到达彼岸。"
                        }
                          wx.hideLoading()
                      }, 
                      fail: err => {
                        console.error
                      }
                    })
                  }else{// 若用户曾经登陆过此小程序，则获取用户签名等信息
                    that.globalData.db_userInfo = res.result.data[0]
                      wx.hideLoading()
                    // console.log(that.globalData.db_userInfo)
                  }
                }
              });
            }
          })
        }
      }
    }); 

  },

    /**
     * 获取用户openid
     */
    onGetOpenid: function() {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          this.globalData._id = res.result.openid
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
    }
})
