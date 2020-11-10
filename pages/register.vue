<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"> </a>
        <span class="login"
          ><em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small"> 登录</el-button>
          </a></span
        >
      </header>
    </article>
    <section>
      <el-form ref="ruleForm" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">
            {{ statusMsg }}
          </span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="form.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="form.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="form.cpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register"
            >同意以下协议并注册</el-button
          >
          <div class="error">{{ error }}</div>
        </el-form-item>
        <el-form-item>
          <a
            class="f1"
            href="https://rules-center.meituan.com/rules-detail/4"
            target="_blank"
            >《美团点评用户服务协议》</a
          >
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  layout: 'blank',
  data: () => {
    return {
      form: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      statusMsg: '',
      error: '',
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '创建密码',
            trigger: 'blur'
          }
        ],
        cpwd: [
          {
            required: true,
            message: '确认密码',
            trigger: 'blur'
          }
          // {
          //   validator: (rule, value, callback) => {
          //     if (value === '') {
          //       callback(new Error('请再次输入密码'))
          //     } else if (value !== this.form.pwd) {
          //       callback(new Error('两次输入密码不一致'))
          //     } else {
          //       callback()
          //     }
          //   },
          //   trigger: 'blur'
          // }
        ]
      }
    }
  },
  methods: {
    sendMsg() {
      const self = this
      let namePass, emailPass
      if (self.timerid) {
        return false
      }
      // 验证用户名是否通过校验
      this.$refs.ruleForm.validateField('name', (valid) => {
        namePass = valid
      })
      self.statusMsg = ''
      // 有值，表示没有通过
      if (namePass) {
        return false
      }
      this.$refs.ruleForm.validateField('email', (valid) => {
        emailPass = valid
      })
      if (!namePass && !emailPass) {
        self.$axios
          .post('/users/verify', {
            // 中文编码
            username: encodeURIComponent(self.form.name),
            email: self.form.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              let count = 60
              self.statusMsg = `验证码已经发送，剩余${count--}秒`
              self.timerid = setInterval(function() {
                self.statusMsg = `验证码已经发送，剩余${count--}秒`
                if (count === 0) {
                  clearInterval(self.timerid)
                }
              }, 1000)
            } else {
              self.statusMsg = data.msg
            }
          })
      }
    },
    register() {
      let self = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          self.$axios
            .post('/users/signup', {
              username: window.encodeURIComponent(self.form.name),
              password: CryptoJS.MD5(self.form.pwd).toString(), // 返回数组，toString装换
              email: self.form.email,
              code: self.form.code
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  location.href = '/login'
                } else {
                  self.error = data.msg
                }
              } else {
                self.error = `服务器错误，错误码：${status}`
              }
              // 定时清空之前的错误提示
              setTimeout(function() {
                self.error = ''
              }, 1500)
            })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/register/index.scss';
</style>
