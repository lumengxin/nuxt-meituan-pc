const router = require('koa-router')()
const Redis = require('koa-redis')
const Person = require('../dbs/models/person')

const Store = new Redis().client

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// 保存一些非session信息到redis中
router.get('/fixRedis', async function (ctx) {
  const st = await Store.hset('fix', 'name', Math.random())
  ctx.body = {
    code: 0
  }
})

router.post('/addPerson', async function (ctx) {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    await person.save()
    code = 0
  } catch (e) {
    code = -1
  }
  ctx.body = {
    code: code
  }
})

router.post('/getPerson', async function(ctx) {
  const result = await Person.findOne({
    name: ctx.request.body.name
  })
  ctx.body = {
    code: 0,
    result
  }
})

router.post('/updatePerson', async function(ctx) {
  const result = await Person.where({
    name: ctx.request.body.name
  }).update({
    age: ctx.request.body.age
  })
  ctx.body = {
    code: 0,
    result
  }
})

module.exports = router
