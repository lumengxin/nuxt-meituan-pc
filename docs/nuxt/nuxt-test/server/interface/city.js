import Router from 'koa-router';

const router = new Router({
  // 接口前缀
  prefix: '/city'
})

router.get('/list', async ctx => {
  ctx.body = {
    list: ['beijing', 'wuhan']
  }
})

export default router
