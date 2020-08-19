const express = require("express")

const app = express()

const router = require('./router.js')

const fs = require('fs')

const https = require("https");




//开放静态资源目录./public
app.use('/public/', express.static('./public/'))
//配置模板引擎
app.engine('html', require('express-art-template'))
// 配置https
const httpsOption = {
    key : fs.readFileSync("./https/3890293_www.hzuljfl.cn.key"),
    cert: fs.readFileSync("./https/3890293_www.hzuljfl.cn.pem")
}


//路由挂载
app.use(router)



// 监听3000端口——http
app.listen(3000,function () {
	console.log('The server is running at port 3000...')
})
// http.createServer(app).listen(3000)


// 监听443端口——https
https.createServer(httpsOption, app).listen(443)