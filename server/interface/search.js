import Router from 'koa-router'
import Poi from '../dbs/models/poi'

let router = new Router({prefix: '/search'})

// 实时搜索列表
router.get('/top', async ctx => {
  try {
    let top = await Poi.find({
      'name': new RegExp(ctx.query.input),
      city: ctx.query.city
    })
    ctx.body = {
      code: 0,
      top: top.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      }),
      type: top.length ? top[0].type : ''
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      top: []
    }
  }
})

// 热门搜索
router.get('/hotPlace', async ctx => {
  let city = ctx.store ? ctx.store.state.geo.position.city : ctx.query.city
  try {
    let result = await Poi.find({
      city,
      type: ctx.query.type || '丽人'
    }).limit(10)
    ctx.body = {
      code: 0,
      result: result.map(item => {
        return {
          name: item.name,
          type: item.type
        }
      })
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: []
    }
  }
})

export default router