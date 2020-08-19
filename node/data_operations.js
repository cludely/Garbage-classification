const fs = require('fs')

//索引参考链接：https://github.com/hotoo/pinyin
const pinyin = require('pinyin')
//数据文件所在路径
const dataPath = './data.json'


/**
 * 查询所有的垃圾分类数据
 * @param callback 回调函数
 */
exports.getAllData = function (callback){
	fs.readFile(dataPath, 'utf8', function (err, data){
		if(err){
			return callback(err)
		}
		callback(null, data)	
	})
}



/**
 * 随机获取单个垃圾分类数据
 * @param callback 回调函数
 */
exports.getRandomData = function (callback) {
	this.getAllData(function (err, data) {
		if (err) {
			callback(err)
		}
		var bufferData = JSON.parse(data)
		var num = Math.floor(Math.random() * bufferData.length);
		var randomData = bufferData[num]
		callback(null, JSON.stringify(randomData))
	})
}



/**
 * 通过名字查询单个的垃圾分类数据
 * @param name 垃圾的名字
 * @param callback 回调函数
 */
exports.getDataByName = function (name, callback) {
	this.getAllData(function (err, data) {
		if(err){
			callback(err)
		}
		var bufferData = JSON.parse(data)
		var unknow = true
		for (var key in bufferData) {
			// if (bufferData[key].name === name){
			if (JSON.stringify(name).match(bufferData[key].name) !== null){
				unknow = false
				callback(null, JSON.stringify(bufferData[key]))
				break;
			}
		}
		if (unknow) {
			callback(null, '{"msg": "┗|｀O′|┛ 嗷~~!我找不到你要的东西啦~"}') 
		}
	})
}



/**
 * 根据category的值,查找对应的数据
 * @param category 垃圾分类类别	number类型的
 */
exports.getDataByCategory = function (category, callback){
	fs.readFile(dataPath, 'utf8', function (err, data){
		if(err){
			return callback(err)
		}
		//查找匹配项
		var findData = []
		//解析为对象
		var bufferData = JSON.parse(data)
		//遍历对象，查找匹配项
		for(var key in bufferData){
			if( bufferData[key].category === category ){
				// console.log('debugger')
				// 添加进目标数组
				findData.push(bufferData[key])
			}
		}
		
		callback(null, JSON.stringify(findData))
	})
}



/**
 * 为数据分组
 * @param data 要分组的数据 数组类型的
 * return group_data  Object类型
 */
exports.groupChar = function (data) {
	//存放分组数据
	var group_data = {
		"A":[],"B":[],"C":[],"D":[],"E":[],"F":[],"G":[],"H":[],"I":[],"J":[],"K":[],"L":[],"M":[],
		"N":[],"O":[],"P":[],"Q":[],"R":[],"S":[],"T":[],"U":[],"V":[],"W":[],"X":[],"Y":[],"Z":[],"$":[]
	}
 	for(var key in data) {
 		var switchdata = pinyin(data[key].name, {
 			style: pinyin.STYLE_FIRST_LETTER	//首字母格式
 				})[0][0] ;
 		switch( switchdata && switchdata[0]) {
		     case 'a': 
		        group_data.A.push(data[key])
		        break;
		     case 'A': 
		        group_data.A.push(data[key])
		        break;
		     case 'b': 
		        group_data.B.push(data[key])
		        break;
		      case 'B': 
		        group_data.B.push(data[key])
		        break;
		     case 'c': 
		        group_data.C.push(data[key])
		        break;
		     case 'C': 
		        group_data.C.push(data[key])
		        break;
		     case 'd': 
		        group_data.D.push(data[key])
		        break;
		     case 'D': 
		        group_data.D.push(data[key])
		        break;
		     case 'e': 
		        group_data.E.push(data[key])
		        break;
		     case 'E': 
		        group_data.E.push(data[key])
		        break;
		     case 'f': 
		        group_data.F.push(data[key])
		        break;
		     case 'F': 
		        group_data.F.push(data[key])
		        break;
		     case 'g': 
		        group_data.G.push(data[key])
		        break;
		     case 'G': 
		        group_data.G.push(data[key])
		        break;
		     case 'h': 
		        group_data.H.push(data[key])
		        break;
		     case 'H': 
		        group_data.H.push(data[key])
		        break;
		     case 'i': 
		        group_data.I.push(data[key])
		        break;
		     case 'I': 
		        group_data.I.push(data[key])
		        break;
		     case 'j': 
		        group_data.J.push(data[key])
		        break;
		     case 'J': 
		        group_data.J.push(data[key])
		        break;
		     case 'k': 
		        group_data.K.push(data[key])
		        break;
		     case 'K': 
		        group_data.K.push(data[key])
		        break;
		     case 'l': 
		        group_data.L.push(data[key])
		        break;
		     case 'L': 
		        group_data.L.push(data[key])
		        break;
		     case 'm': 
		        group_data.M.push(data[key])
		        break;
		     case 'M': 
		        group_data.M.push(data[key])
		        break;
		     case 'n': 
		        group_data.N.push(data[key])
		        break;
		     case 'N': 
		        group_data.N.push(data[key])
		        break;
		     case 'o': 
		        group_data.O.push(data[key])
		        break;
		     case 'O': 
		        group_data.O.push(data[key])
		        break;
		     case 'p': 
		        group_data.P.push(data[key])
		        break;
		     case 'P': 
		        group_data.P.push(data[key])
		        break;
		     case 'q': 
		        group_data.Q.push(data[key])
		        break;
		     case 'Q': 
		        group_data.Q.push(data[key])
		        break;
		     case 'r': 
		        group_data.R.push(data[key])
		        break;
		     case 'R': 
		        group_data.R.push(data[key])
		        break;
		     case 's': 
		        group_data.S.push(data[key])
		        break;
		     case 'S': 
		        group_data.S.push(data[key])
		        break;
		     case 't': 
		        group_data.T.push(data[key])
		        break;
		     case 'T': 
		        group_data.T.push(data[key])
		        break;
		     case 'u': 
		        group_data.U.push(data[key])
		        break;
		     case 'U': 
		        group_data.U.push(data[key])
		        break;
		     case 'v': 
		        group_data.V.push(data[key])
		        break;
		     case 'V': 
		        group_data.V.push(data[key])
		        break;
		     case 'w': 
		        group_data.W.push(data[key])
		        break;
		     case 'W': 
		        group_data.W.push(data[key])
		        break;
		     case 'x': 
		        group_data.X.push(data[key])
		        break;
		     case 'X': 
		        group_data.X.push(data[key])
		        break;
		     case 'y': 
		        group_data.Y.push(data[key])
		        break;
		     case 'Y': 
		        group_data.Y.push(data[key])
		        break;
		     case 'z': 
		        group_data.Z.push(data[key])
		        break;
		     case 'Z': 
		        group_data.Z.push(data[key])
		        break;
		     default:
		     	group_data.$.push(data[key])
		     	break;
		} 
 	}

 	return group_data

}
