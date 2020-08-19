
// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    //这里的update依据是event.openid
    return await db.collection("base").doc(event._id).update({
      data: {
        signature: event.signature
      }
    })
  } catch (e) {
    console.error(e)
  }
 
}