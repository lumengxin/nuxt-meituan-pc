# vue-meituan-pc

高仿美团项目，pc端版本。包括nuxt,ssr,koa,mogoose,redis...知识

由于nuxt的模板安装已经到了3.X版本，而该版本的server framework被否决了，
所以如果想带有server framework选项的模板的话可以安装2.15.0的版本指令如下：
> npx create-nuxt-app@2.15.0 <my-project>

## 项目开始

```bash
# 脚手架初始化项目
$ yarn create nuxt-app vue-meituan-pc | npx create-nuxt-app vue-meituan-pc

# 在本地主机：3000上进行热重载
$ yarn dev

# 为生产和启动服务器构建 
$ yarn build
$ yarn start

# 生成静态项目 
$ yarn generate 
```

有关工作原理的详细说明，请查看 [Nuxt.js docs](https://nuxtjs.org).


## 安装工具

### koa框架
> yarn add koa koa-router

手动创建server目录，创建服务（参考docs/nuxt/nuxt-test)

### 配置babel
node本身不支持es6中import等语法

> yarn add babel-preset-es2015
> yarn add babel-cli -S

package.json
```
"dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server --exec babel-node"
```

配置.babelrc



### 使用scss
> yarn add sass-loader node-sass

### 辅助工具
MongoDb, redis, Robo 3T软件安装

## 需求分析

### 模板设计

### 组件设计

### 数据结构设计

### 接口设计




