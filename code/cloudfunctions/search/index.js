// 云函数入口文件
const cloud = require('wx-server-sdk')
//引入request-promise用于做网络请求
//需要安装依赖包request、request-promise
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //url解析
  var param = encodeURIComponent(event.name)
  var options = {
    method: 'GET',
    uri: event.url + param
  }
  return await rp(options)
    .then(function (res) {
      return res
    })
    .catch(function (err) {
      return '失败'
    });
}