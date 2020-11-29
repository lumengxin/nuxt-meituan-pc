import Router from 'koa-router'
import Categroy from '../dbs/models/categroy'

let router = new Router({ prefix: '/categroy' })

router.get('/crumbs', async (ctx) => {
  let result = await Categroy.findOne({
    city: ctx.query.city.replace('市', '') || '宜昌'
  })
  if (result) {
    ctx.body = {
      areas: result.areas,
      types: result.types
    }
  } else {
    ctx.body = {
      areas: [],
      types: []
    }
  }
})

export default router
