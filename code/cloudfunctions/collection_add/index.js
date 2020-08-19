// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();// 不是wx.cloud.database()，这种是小程序端操作数据库的写法。云端没有“wx.”
 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()//目的：获取_openid
 
  try {
    return await db.collection("mycollection").add({
      data: {
        _openid: wxContext.OPENID,//获取操作者_openid的方法
        title: event.title,
        content: event.content,
        daan: event.daan
      }, success: res => {
        return res
      }, fail: err => {
        return err
      }
    })
  } catch (e) {
    return e
  }
}