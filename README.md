```shell
# node为后台代码
# code为小程序端代码
```

# 小程序码

![小程序码](./参考图/1.jpg)

# bug

从测试页面返回答题页面时，积分会清零

# 数据接口

数据获取链接：https://github.com/alexayan/garbage-classification-data

## 获取所有数据
http://47.96.156.119:3000/getAllData

## 通过垃圾的名字获取数据
http://47.96.156.119:3000/getDataByName?name=XXX

name参数为要获取的垃圾名字

## 随机获取一个数据
http://47.96.156.119:3000/getRandomData

## 获取分类为1的数据，即可回收垃圾数据
http://47.96.156.119:3000/getDataByCategory1
http://47.96.156.119:3000/getDataByCategory2
http://47.96.156.119:3000/getDataByCategory4
http://47.96.156.119:3000/getDataByCategory8
http://47.96.156.119:3000/getDataByCategory16

## 查看public目录下的所有文件
http://47.96.156.119:3000/public

## 获取xxx.png图片
http://47.96.156.119:3000/public/img/xxx.png



