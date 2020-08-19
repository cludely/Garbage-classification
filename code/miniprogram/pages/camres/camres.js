// miniprogram/pages/camres/camres.js
Page({


// 点击拍照按钮
  takePhoto: function () {
    var that = this;
    var ctx = wx.createCameraContext();   //创建摄像头对象
    ctx.takePhoto({       // 拍照
      quality: 'normal',      // 图片质量  正常
      success: (res) => {
        wx.showLoading({
          title: '正在识别',
        })
        wx.getFileSystemManager().readFile({      // 读取照片
          filePath: res.tempImagePath, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            // console.log(res.data)
            wx.request({
              url: 'https://api.tianapi.com/txapi/imglajifenlei/index', 
              data: {
                key: '66650b095d53acd07b783f97ca0ce217',    // key参数
                img: res.data                   // 解码的base64图片
              },
              header:{
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
              },
              method:'POST',
              success: function (res) {
                if(res.data.code == 200){
                    console.log(res)
                    wx.reLaunch({
                      url: '../search/search?photo_result=' + JSON.stringify(res.data.newslist)
                     })
                }else{
                    console.log('失败')
                }
                wx.hideLoading()
              },
              fail: function (err) {
                console.log('...')
                wx.showToast({
                  title: '服务器错误',
                  icon: 'none',
                  duration: 1000
                })
              }
            })
          }
        })
      },
      fail: function (err) {
        console.log(err)
      }
    })
  }
})