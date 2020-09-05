# Nuxt.js

## 概述
- vue2 支持vue文件
- vue router 包含router
- vuex 支持vuex，简单配置
- vue server renderer 整合ssr
- vue-meta 配置文件，管理meta

## 安装

nuxt with koa:
> vue init nuxt-community/koa-template <project-name> // 低版本vue-cli脚手架 npm i -g @vue/cli-init

官网默认安装，不带koa:
> npx create-nuxt-app <project-name>

**nrm 使用：**
```
npm i -g nrm // 安装

nrm current
nrm ls
nrm use npm
nrm add cpm http://192.168.22.11:8888/repository/npm-public/
nrm test npm
```

taobao源安装启动失败，切换yarn源`nrm use yarn`，使用`yarn`安装

## 使用路由

> yarn add koa-router

*报错：Plugin/Preset files are not allowed to export objects, only functions. *
降低nuxt版本：
```
-"nuxt": "latest",
+"nuxt": "^1.4.2",
```

测试·/city/list·接口：
```bash
curl http://localhost:3000/city/list
```

## 使用vuex
创建即配置，创建store目录，就可以使用vuex

