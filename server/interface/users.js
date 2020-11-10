import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Eamil from '../dbs/config'
import Passport from './utils/passport'
import axios from './utils/axios'

const router = new Router({
  prefix: '/users'
})

// 获取redis客户端
let Store = new Redis().client

// 注册接口
router.post('/signup', async (ctx) => {
  const { username, password, email, code } = ctx.request.body

  if (code) {
    // redis中取出验证码(发邮件时存入redis)
    const saveCode = await Store.hget(`nodemail: ${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail: ${username}`, 'expire')
    console.log("saveCode", code, saveCode, saveExpire)
    console.log(new Date().getTime() - saveExpire)
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        console.log("验证码已过期，请重新尝试")
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
      console.log("请填写正确的验证码")
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }

  // 验证码无异常，查询用户
  let user = await User.find({
    username
  })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    console.log("已被注册")
    return
  }
  // 用户入库
  let nuser = await User.create({
    username,
    password,
    email
  })
  // 入库成功，自动登录
  if (nuser) {
    console.log("入库成功")
    let res = await axios.post('/users/signin', { username, password })
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
      console.log("注册成功")
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

// 登录接口
router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

// 验证码接口
router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const savaExpire = await Store.hget(`nodemail: ${username}`, 'expire')
  const delayTime = new Date().getTime() - savaExpire
  console.log("savaExpire", savaExpire, delayTime)
  if (savaExpire && delayTime < 0) {
    ctx.body = {
      code: -1,
      msg: '请求过于频繁，1分钟1次'
    }
    return false
  }
  let transporter = nodeMailer.createTransport({
    host: Eamil.smtp.host,
    port: 587,
    secure: false,
    // service: 'qq',
    auth: {
      user: Eamil.smtp.user,
      pass: Eamil.smtp.pass
    }
  })
  let ko = {
    // 验证码
    code: Eamil.smtp.code(),
    // 有效期
    expire: Eamil.smtp.expire(),
    // 发送邮箱
    email: ctx.request.body.email,
    // 发送用户
    user: ctx.request.body.username
  }
  let mailOptions = {
    from: `"认证邮箱" <${Eamil.smtp.user}>`,
    to: ko.email,
    subject: '<<慕课高仿美团全栈实战>> - 注册码',
    html: `您在<<慕课高仿美团全栈实战>>课程中注册，您的邀请码是: ${ko.code}`
  }
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    } else {
      Store.hmset(
        `nodemail: ${ko.user}`,
        'code',
        ko.code,
        'expire',
        ko.expire,
        'email',
        ko.email
      )
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送，可能会有延迟，有效期为1分钟'
  }
})

// 获取用户接口
router.get('/getUser', (ctx) => {
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

// 退出接口
router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  // passport提供的方法
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

export default router
