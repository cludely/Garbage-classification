# 项目说明

## 文件、文件夹说明

app.js 项目入口文件、配置文件

data_operations.js 封装的函数，数据操作文件

data.json 保存垃圾分类数据的文件

router.js 路由配置文件

https 存放 ssl 证书

node_modules 安装的依赖包

public 存放静态资源

views 存放 HTML 文件

## 数据接口

数据获取链接：https://github.com/alexayan/garbage-classification-data

1、获取所有数据

http://47.96.156.119:3000/getAllData

2、通过垃圾的名字获取数据

http://47.96.156.119:3000/getDataByName?name=垃圾名字

3、随机返回一个数据

http://47.96.156.119:3000/getRandomData

4、获取分类为1的数据，即可回收垃圾数据

http://47.96.156.119:3000/getDataByCategory1
http://47.96.156.119:3000/getDataByCategory2
http://47.96.156.119:3000/getDataByCategory4
http://47.96.156.119:3000/getDataByCategory8
http://47.96.156.119:3000/getDataByCategory16

5、查看public目录下的所有文件
http://47.96.156.119:3000/public

6、获取xxx.png图片

http://47.96.156.119:3000/public/img/xxx.png



## 数据

目前垃圾有 4 个分类：

- 1 (可回收垃圾)

- 2 (有害垃圾)

- 4 (湿垃圾)

- 8 (干垃圾)

- 16 (大件垃圾)

  分类值可以相加，比如 3 表示既属于上海可回收垃圾和上海有害垃圾









