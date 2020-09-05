/* eslint-disable prettier/prettier */
/* eslint-disable require-await */
const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  global.console.log('----start----')

  ctx.cookies.set('pid', Math.random())

  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
    cookies: ctx.cookies.get('pid')
  }
})

router.get('/testAsync', async ctx => {
  global.console.log('start', new Date().getTime())

  const a = await new Promise((resolve, reject) => {
    setTimeout(function () {
      global.console.log('async a', new Date().getTime())
      resolve('aaa')
    }, 1000)
  })
  const b = await 23

  ctx.body = {
    a,
    b
  }
})

module.exports = router
