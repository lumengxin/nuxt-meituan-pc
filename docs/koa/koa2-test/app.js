/* eslint-disable no-path-concat */
const Koa = require('koa')
const app = new Koa()

// 中间件，使用 app.use(xxx)
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const mongoose = require('mongoose')
const session = require('koa-generic-session')
const Redis = require('koa-redis')

const pv = require('./middleware/koa-pv')
const m1 = require('./middleware/m1')
const m2 = require('./middleware/m2')

const dbConfig = require('./dbs/config')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler
onerror(app)

// 对session加密处理，名字随意取的
app.keys = ['keys', 'keyskeys']
app.use(session({
  // 改变默认cookies默认存储名称
  key: 'mt',
  prefix: 'mtpr',
  // 会按照默认配置连接本机redis服务
  store: new Redis()
}))

// 中间件和顺序无关,一进一出，都会执行到（环状洋葱，request进response出）
app.use(m2())
app.use(pv())
app.use(m1())

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
