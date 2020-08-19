const recorderManager = wx.getRecorderManager()
var app = getApp()

Page({
  /**
  * 页面的初始数据
  */
  data: {
    inputVal: "",       // 搜索文本框的内容
    inputShowed: false, // 是否显示取消按钮
    result: null,         // 搜索或语音识别的结果
    isDot: "block",
    isTouchStart: false,  // 是否开始点击语音识别按钮
    isTouchEnd: false,    // 是否结束点击语音识别按钮
    sayWords: '',         // 用户语音输入的话
    is_voice: true,       // 当前是否正在语音识别界面
    photo_result: null    // 图片识别的结果
  },

  showInput: function () {
    this.setData({
    inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
    inputVal: "",
    inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
    inputVal: ""
    });
  },
  inputTyping: function (e) {
    //搜索数据
    this.setData({
    inputVal: e.detail.value
    });
  },


// 文本框搜索
  search_submit: function (key) {
    wx.showLoading({
      title: '正在搜索',
    })
    var that = this
    var search_url = 'http://www.hzuljfl.cn:3000/getDataByName?name=' // 服务器地址
    wx.cloud.callFunction({
      name: 'search',          // 云函数的名称
      data: {
        url: search_url,
        name: key.detail.value  // 搜索框内的值
       },
      success: (res) => {
        // console.log(res.result)
        that.setData({
          result: JSON.parse(res.result),
          sayWords: key.detail.value
        })
        wx.hideLoading()
    }
  })
  },

// 录音开始处理函数
recordStart: function (e) {
    this.setData({
      inputVal:"",     //清空文本框的内容
      isTouchStart: true, // 开始点击语音识别按钮
      isTouchEnd: false
    })
    // 录音的格式
    const options = {
        duration: 10000,      //指定录音的时长，单位 ms, 百度最多支持60s语音
        sampleRate: 16000,    //采样率
        numberOfChannels: 1,  //录音通道数
        encodeBitRate: 64000, //编码码率
        format: 'mp3',        //音频格式，有效值 aac/mp3
        frameSize: 50         //指定帧大小，单位 KB
    }
    recorderManager.start(options);     //开始录音
    // 监听录音开始事件
    recorderManager.onStart(function () {
      // console.log('录音开始')
    });
    // 错误回调
    recorderManager.onError(function (err) {
      console.log(err)
    })
  },


  // 录音结束处理函数
  recordEnd: function (e) {
    let that=this;
    recorderManager.stop();   //停止录音
    // 监听停止录音事件
    recorderManager.onStop((res)=>{
      this.setData({
        isTouchStart:false,
        isTouchEnd:true   // 结束点击语音识别按钮
      })
      wx.showLoading({
        title: "正在识别..."
      });
      const { tempFilePath } = res;
      //上传录音文件给服务器，服务器进行转码处理
      wx.uploadFile({
        url: 'https://www.hzuljfl.cn/recognition',   //服务器地址
        filePath: tempFilePath,                   //要上传文件资源的路径
        name: 'file',                             //文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
        success(res){
          // console.log(res)
          let data=typeof res.data==='string'? JSON.parse(res.data) : res.data;
          if(data.ret==0){  // res.data 为服务器处理后返回的数据
            that.setData({
              result: JSON.parse(data.data.data[0]),
              sayWords: JSON.parse(data.data.sayWords)
            });
          }else{
            that.setData({
              result: JSON.parse('{"msg": "我不知道你在说什么"}')
            });
          }
          wx.hideLoading()
        },
        fail(err){
          console.log(err);
        }
      });
    })
  },

  /**
   * 切换成语音识别
   */
  switch_voice: function () {
    this.setData({
      is_voice: true
    })
  },
  /**
   * 切换成拍照识别
   */
  switch_photo: function () {
    this.setData({
      is_voice: false
    })
  },





// 显示弹窗
showWindows: function () {
  var that = this
  wx.showActionSheet({
    itemList: ['从相册选择', '拍照'],
    success (res) {
      // console.log(res.tapIndex)
      if(res.tapIndex === 0){   // 从相册选择图片
        that.getLocalImage();
      }else  { // 拍照
        // that.takePhotoe();
        wx.navigateTo({
          url: '../camres/camres',
        })
      }
    },
    fail (res) {
      wx.showToast({
        title: '取消',
        icon: 'none',
        duration: 1000
      })
    }
  })
},



  // 从相册选择照片功能
  getLocalImage:function(){
    var that=this;
    wx.chooseImage({
      count:1,            // 选择图片数量
      success:function(res){
        // 这里无论用户是从相册选择还是直接用相机拍摄，拍摄完成后的图片临时路径都会传递进来
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
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
                    // console.log(res)
                    that.setData({
                      photo_result: res.data.newslist
                    })
                }else{
                    // console.log(res)
                    wx.showToast({
                      title: '服务器错误',
                      icon: 'none',
                      duration: 1000
                    })
                }
              },
              fail: function (err) {
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
      fail:function(error){
        wx.showToast({
          title: '调用本地相册文件时出错',
          icon: 'none',
          duration: 1000
        })
      }
    })
  },


  onLoad: function (options ) {
    // console.log(options)
    this.setData({
      photo_result: JSON.parse(options.photo_result)
    })
  }

 



  })