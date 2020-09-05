// ctx: app中用来保存request, response信息的全局对象
function pv(ctx) {
  // 使用seesion，此时cookies中会多出koa.sid,koa.sid.sig两个键值对
  // 通过中间件实现操作session使用redis存储
  ctx.session.count++

  global.console.log('pv-------', ctx.path)
}

// 导出一个函数(异步函数)
module.exports = function () {
  return async function (ctx, next) {
    pv(ctx)
    // 给下一个中间件处理
    await next()
  }
}