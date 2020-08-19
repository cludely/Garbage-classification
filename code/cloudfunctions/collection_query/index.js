
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

const wxContext = cloud.getWXContext()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
      return await db.collection('mycollection').where({
      _openid: event._id,   
      title: event.title
    }).get({
      success: function (res) {
        return res
      }
    });
  } catch (e) {
    console.error(e);
  }
}