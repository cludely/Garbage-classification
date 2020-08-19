
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

const wxContext = cloud.getWXContext()
// 云函数入口函数
exports.main = async (event, context) => {
  try {
      return await db.collection('mycollection').where({
      _openid: wxContext.OPENID,   // 筛选条件
    }).get({
      success: function (res) {
        return res
      }
    });
  } catch (e) {
    console.error(e);
  }
}