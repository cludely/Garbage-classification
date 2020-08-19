const express = require('express')
//创建路由容器
const router = express.Router()

const data_operations = require('./data_operations.js')

const fs = require('fs')

const path = require('path')


var base_wwwDir = path.join(__dirname, 'public')

// 文件传输模块
const Multiparty = require('multiparty');
// 转码工具
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);


const AipSpeechClient = require("baidu-aip-sdk").speech;

// #region 创建百度授权 
// 设置APPID/AK/SK
const API_KEY = "gnzxMAGgwOr87E75V1LPfUzy";
const APP_ID = "19666447";
const SECRET_KEY = "D9K2q5wsyrs0LbKAOAjR3TpCGmXi6Rev";

// 新建一个百度请求对象
const client = new AipSpeechClient(APP_ID, API_KEY, SECRET_KEY);


router.get('/',function (req, res) {
	console.log('hahah ')
})



/**
 * 查看public目录下的所有文件
 */
router.use('/public', function (req, res) {
	base_wwwDir = path.join(base_wwwDir, req.url)
	fs.readdir(base_wwwDir, function (err, files) {
      if (err) {
        return res.render('Can not find www dir.')
      }
      base_wwwDir = path.join(__dirname, 'public')
      res.render('public.html',{
        title: 'public文件夹下的目录',
        files: files,
        currentUrl: base_wwwDir + req.url,
        myUrl: req.url
      })
    })
})



/**
 * 查询所有数据
 */
router.get('/getAllData', function (req, res) {
	// console.log(req.url)
	data_operations.getAllData(function (err, data){
		if(err){
			// return res.status(500).send('Server error.')
			next(err)
		}
		//需要先解析为对象
		var group_data = data_operations.groupChar(JSON.parse(data))
		res.setHeader('Content-Type', 'text/plain; charset=utf-8')
		res.end(JSON.stringify(group_data))
		// console.log(typeof(group_data))	
	})
})


/**
 * 查询单个数据
 */
router.get('/getDataByName', function (req, res) {
	data_operations.getDataByName(req.query.name, function (err, data) {
		if(err){
			next(err)
		}
		res.setHeader('Content-Type', 'text/plain; charset=utf-8')
		res.end(data)
	})
	// console.log(req.query.name)
})


/**
 * 返回一个随机数据
 */
router.get('/getRandomData', function (req, res) {
	data_operations.getRandomData(function (err, data) {
		if (err) {
			next(err)
		}
		res.setHeader('Content-Type', 'text/plain;charset=utf-8')
		res.end(data)
	})
})



/**
 * 查询垃圾分类1的数据——可回收垃圾
 */
router.get('/getDataByCategory1', function (req, res) {
	data_operations.getDataByCategory(1, function (err, data) {
		if(err){
			// return res.status(500).send('Server error.')
			next(err)
		}
		var group_data = data_operations.groupChar(JSON.parse(data))
		res.setHeader('Content-Type', 'text/plain; charset=utf-8')
		res.end(JSON.stringify(group_data))
	})
})


/**
 * 查询垃圾分类2的数据——有害垃圾
 */
router.get('/getDataByCategory2', function (req, res) {
	data_operations.getDataByCategory(2, function (err, data) {
		if(err){
			// return res.status(500).send('Server error.')
			next(err)
		}
		var group_data = data_operations.groupChar(JSON.parse(data))
		res.setHeader('Content-Type', 'text/plain; charset=utf-8')
		res.end(JSON.stringify(group_data))
	})
})


/**
 * 查询垃圾分类4的数据——湿垃圾
 */
router.get('/getDataByCategory4', function (req, res) {
	data_operations.getDataByCategory(4, function (err, data) {
		if(err){
			// return res.status(500).send('Server error.')
			next(err)
		}
		var group_data = data_operations.groupChar(JSON.parse(data))
		res.setHeader('Content-Type', 'text/plain; charset=utf-8')
		res.end(JSON.stringify(group_data))
	})
})


/**
 * 查询垃圾分类8的数据——干垃圾
 */
router.get('/getDataByCategory8', function (req, res) {
	data_operations.getDataByCategory(8, function (err, data) {
		if(err){
			// return res.status(500).send('Server error.')
			next(err)
		}
		var group_data = data_operations.groupChar(JSON.parse(data))
		res.setHeader('Content-Type', 'text/plain; charset=utf-8')
		res.end(JSON.stringify(group_data))
	})
})


/**
 * 查询垃圾分类16的数据——大件垃圾
 */
router.get('/getDataByCategory16', function (req, res) {
	data_operations.getDataByCategory(16, function (err, data) {
		if(err){
			// return res.status(500).send('Server error.')
			next(err)
		}
		var group_data = data_operations.groupChar(JSON.parse(data))
		res.setHeader('Content-Type', 'text/plain; charset=utf-8')
		res.end(JSON.stringify(group_data))
	})
})





/**
 * 语音搜索
 */
router.post('/recognition', function(req, res, next){
	console.log('语音搜索')
  //生成multiparty对象，并配置上传目标路径
  var form = new Multiparty.Form({ 
    uploadDir: './public/audio'
  });
  //上传完成后处理
  form.parse(req, function (err, fields, files) {
    var filesTemp = JSON.stringify(files, null, 2);
    if (err) {
      console.log('parse error: ' + err);
      res.json({
        ret: -1,
        data:{},
        msg: '未知错误'
      });
    } else {
      //console.log('parse files: ' + filesTemp);
      var inputFile = files.file[0];
      var uploadedPath = inputFile.path;
      var command = ffmpeg();
      command.addInput(uploadedPath)
      //保存编码文件到文件夹
      .saveToFile('./public/audio/16k.wav')
      .on('error', function(err){
        console.log(err)
      })
      .on('end', function(){
        //调用百度语音合成接口
        var voice = fs.readFileSync('./public/audio/16k.wav');
        var voiceBuffer = new Buffer.alloc(voice.length, voice);
        client.recognize(voiceBuffer, 'wav', 16000).then(function (result) {
          var data = [];			// 搜索出来的数据
          var sayWords = '';		// 用户说的话
          if ( result.err_no === 0 ) {
            data = result.result;
            sayWords = JSON.stringify(result.result);		// 新建对象,用于存放用户说的话
          }
          // console.log(sayWords)
          // console.log(data)
          //搜索数据
          data_operations.getDataByName(data, function (err, getdata) {
			if(err){
				next(err)
			}
			data[0] = getdata;
		 })
          // 返回客户端的数据,异步等待0.01秒
         var timer = setTimeout(function () {
         	console.log(data)
         	res.json({
	            ret: result.err_no,
	            data: {
	              data: data,
	              sayWords: sayWords
	            },
	            msg: result.err_msg
          	});
         }, 10)
        }, function(err){
          console.log(err);
        });
        //语音识别 end
        setTimeout(function () {
        	// 删除上传的临时音频文件
	        fs.unlink(uploadedPath, function(err){
	          if(err){
	            console.log(uploadedPath + '文件删除失败');
	          }else{
	            console.log(uploadedPath + '文件删除成功');
	          }
	        });
	        // 删除mp3转成wav格式的音频
	        fs.unlink('./public/audio/16k.wav', function (err) {
	          if (err) {
	            console.log('16k.wav文件删除失败');
	          } else {
	            console.log('16k.wav文件删除成功');
	          }
	        });
        },2000)
        	
      });
    }
  });
});






/**
 * 路劲错误处理
 */
router.use(function (req, res) {
	res.setHeader('Content-Type', 'text/plain; charset=utf-8')
	res.end('404 Not Found! ')
})

/**
 * 全局错误处理
 */
// router.use(function (err, req, res, next) {
//   res.status(500).send('Server error! Please try it again.')
// })



module.exports = router
