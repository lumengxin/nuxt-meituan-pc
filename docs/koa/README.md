# koa2基础

## koa-generator

```bash
$ npm i -g koa-generator  // 安装脚手架
$ koa2 project [-e]  // 创建项目(ejs模板)
```

## async和await语法

await使用，函数必须是异步函数即用async声明。await后面是一个promise对象，
如果不是会自动转换。

同步写法完成异步任务。

## koa2中间件

## koa2路由

## cookie和session

## mongoose基础

### 安装mongoose

> npm i mongoose

### 测试`/addPerson`接口
1. postman测试

2. 利用curl在终端发送post请求
> curl -d 'name=xin&age=23' http://localhost:3000/users/addPerson

报错：
<p style="color: red;">Invoke-WebRequest : 找不到与参数名称“X”匹配的参数。</p>
```
// 获取帮助文档
Get-Help Invoke-WebRequest
Update-Help   

// 调整命令
curl -Uri 'http://localhost:3000/users/addPerson' -Body 'name=xin&age=23' -Method 'POST'
```

## redis基础

前言：http无状态，服务器无法识别两次访问是否是同一个。服务器seesion用来存储用户信息，客户端（浏览器）用cookie保存seesion。
服务器端将cookie种植到客户端，客户端下次访问时携带seesion，达到身份认证。

应用程序复杂时，seesion过于庞大。可以借用redis数据库来储存，使用简单 key-value

### 安装

官网：[https://redis.io/download](https://redis.io/download)
window版本(略后)：[https://github.com/tporadowski/redis/releases](https://github.com/tporadowski/redis/releases)

window安装，下载解压到指定目录，进入该目录
```bash
redis-server.exe redis.windows.conf  // 开启服务（可以添加到环境变量）

redis-cli  // 启动客户端程序
127.0.0.1:6379> keys *  // 查看redis存储的所有key值
127.0.0.1:6379> get mtpr5QqfEn3TtqmUQnJ5xV7flqypOT8_MAcA // 查看指定key存储的信息
```

测试`/fixRedis`接口：
```
// 访问
curl http://localhost:3000/users/fixRedis

// redis客户端查看
127.0.0.1:6379> keys *
127.0.0.1:6379> hget fix name
```

安装相应中间件：
> npm i koa-generic-session koa-redis


