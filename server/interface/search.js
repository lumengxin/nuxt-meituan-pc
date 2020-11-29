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

// 景点详情
router.get('/resultsByKeyword', async ctx => {
  ctx.body = {
    count: 1,
    pois: [
      {
        id: '348nfq34u5',
        parent: [],
        tag: ['名胜', '古迹'],
        name: '北京圣泉景区',
        type: '风景名胜；AAAA级景区',
        typecode: '110200',
        biz_type: 'tour',
        location: '115.974659,40.047914',
        tel: '18672148980',
        biz_ext: {
          rating: '4.3',
          cost: '25.00'
        },
        photos: [
          {
            size: 'small',
            url: 'http://p0.meituan.net/auditimage/4c0a69a55df52b0d615b6dce8c545de297206.jpg'
          }
        ]
      }
    ]
  }
})

export default router