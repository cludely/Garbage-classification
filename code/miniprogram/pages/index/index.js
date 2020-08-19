var app = getApp();
Page({
  data: {
    canIUse: false,    // 用户是否有权限登录小程序，默认为没有
  },
  onLoad(e) {
    console.log(e.title)
    this.setData({
      msgList: [
        { url: "url", title: "垃圾分类开头难，养成习惯成自然。" },
        { url: "url", title: "残羹剩饭瓜果皮，菜叶内脏绿桶进。" },
        { url: "url", title: "玻璃金属可乐瓶，纸盒塑料蓝桶进。" },
        { url: "url", title: "电池药品杀虫剂，日化用品红桶进。" },
        { url: "url", title: "尿片瓷片香烟蒂，快餐用品灰桶进。" }]
    });
  },
//  跳转到有害垃圾界面
  onclick1(){
    wx.navigateTo({
      url: '/pages/Hazardous_waste/Hazardous_waste',
    })
  },
  // 跳转到其他垃圾界面
  onclick2(){
    wx.navigateTo({
      url: '/pages/Other_waste/Other_waste',
    })
  },
  // 跳转到可回收物界面
  onclick3(){
    wx.navigateTo({
      url: '/pages/Recyclables/Recyclables',
    })
  },
  // 跳转到厨余垃圾界面
  onclick4(){
    wx.navigateTo({
      url: '/pages/Kitchen_waste/Kitchen_waste',
    })
  },

  // 绑定再授权登录按钮上，用于获取用户登录权限
  bindGetUserInfo: function (e) {
    // console.log(e.detail.userInfo)
    this.setData({
      canIUse: true   // 改变用户登录权限
    })
    app.globalData.userInfo = e.detail.userInfo;   // 获取用户信息
    // 查询数据库，查询用户是否曾经登录过此小程序
    wx.cloud.callFunction({
      name: 'query',
      data: {
        _id: app.globalData._id
      },
      success: res => {
        // console.log(res)
        // 若没有登陆过则将用户的信息保存到云数据库
        // 如果 res.result.data[0] 为空，则说明用户此前未登录过此小程序，将获取到的用户信息保存到数据库中
        if(!res.result.data[0]){  
          wx.cloud.callFunction({
            name: 'add',
            data: {
              signature : "生活就像海洋，只有意志坚强的人才能到达彼岸。",   //个性签名
            }, 
            // 初始化第一次登录用户的信息
            success: res => {
              app.globalData.db_userInfo = {   //获取用户个性签名和分数等信息
                "_id": app.globalData._id,
                "garde": 0,
                "signature":"生活就像海洋，只有意志坚强的人才能到达彼岸。"
              }
                wx.hideLoading()
            }, 
            fail: err => {
              console.error
            }
          })
        }else{  // 如果 res.result.data[0] 不为空，则说明用户此前登录过此小程序，从数据库中查询用户的信息，个性签名等
          // 若用户曾经登陆过此小程序，则获取用户签名等信息
          app.globalData.db_userInfo = res.result.data[0]
            wx.hideLoading()
          // console.log(that.globalData.db_userInfo)
        }
      }
    });
  },

  onReady: function () {
    var that = this
    // 获取用户已授予的权限
    wx.getSetting({
      success: function (res) {
        // 如果 res.authSetting['scope.userInfo'] 不为空，则说明用户拥有登录权限
        if(res.authSetting['scope.userInfo']){
          that.setData({
            canIUse: true
          })
        }
      }
    })
  }
})