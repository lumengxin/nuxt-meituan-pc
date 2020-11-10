export default {
  dbs: 'mongodb://127.0.0.1:27017/nuxt-meituan-pc',
  // redis配置，只读
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  // 腾讯邮箱配置
  /* qq邮箱 - 设置 - 账号
  开启POP3服务(kmiizmcdgzemdchi)、IMAP服务(scnccxqquufsdcgd)，生成授权码 (djmqvqhrnpjmdeeg)
  才能在node服务中写邮件
  */
  smtp: {
    get host() {
      // 主机
      return 'smtp.qq.com'
    },
    get user() {
      // 账号
      return '2735146963@qq.com'
    },
    get pass() {
      // 授权码
      return 'cmmwabgefdazdebc'
    },
    // 邮箱验证码
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase()
      }
    },
    // 有效时间
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}
