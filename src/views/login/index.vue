<template>
  <div class="login-container">
    <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title">
        <h3>X-ERP项目管理系统</h3>
        <p>X-ERP PROJECT MANAGEMENT SYSTEM</p>
      </div>
      <el-form-item prop="username" :class="(usernameActive ? 'isActive' : '')">
        <span class="iconfont icon-username"></span>
        <el-input name="username" type="text" @click.native="usernameClick" v-model="loginForm.username" autoComplete="on" placeholder="请输入您的账号" />
      </el-form-item>

      <el-form-item prop="password" :class="(passwordActive ? 'isActive' : '')">
        <span class="iconfont icon-password"></span>
        <el-input name="password" type="password" @click.native="passwordClick"  @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入您的密码" />
      </el-form-item>

      <div class="login-btn">
        <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        <div class="keep-pw">
          <!-- <el-checkbox v-model="checked">一周内自动登录</el-checkbox> -->
          <i :class="'iconfont ' + (isKeepPw ? 'icon-checkon' : 'icon-check')" @click="keepPassword"></i>
          <label>记住密码</label>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import Cookies from 'js-cookie'
import { mapActions, mapGetters } from 'vuex'
import { setToken } from '@/utils/auth'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      showDialog: false,
      usernameActive: false,
      passwordActive: false,
      isKeepPw: false
    }
  },
  created() {
    var username = Cookies.get('username')
    var password = Cookies.get('password')
    if (username && password) {
      this.isKeepPw = true
      this.loginForm.username = username
      this.loginForm.password = password
    } else {
      this.loginForm.username = ''
      this.loginForm.password = ''
    }
  },
  methods: {
    usernameClick() {
      this.usernameActive = true
      this.passwordActive = false
    },
    passwordClick() {
      this.passwordActive = true
      this.usernameActive = false
    },
    keepPassword() {
      this.isKeepPw = !this.isKeepPw
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true

          this.setToken('11111')
          setToken('1111')
          // this.setRoles(['admin'])
          // return
          var username = this.loginForm.username
          var password = this.loginForm.password
          if (this.isKeepPw === true) {
            Cookies.set('username', username, { expires: 7 })
            Cookies.set('password', password, { expires: 7 })
          } else {
            Cookies.remove('username', '')
            Cookies.remove('password', '')
          }
          this.$router.push({ path: '/' })
          // this.loading = true
          // this.$post(url, this.loginForm).then((res) => {
          //   this.loading = false
          //   this.setToken(res.token)
          //   this.$router.push({ path: '/' })
          // }).catch(() => {
          //   this.loading = false
          // })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    ...mapActions([
      'setToken',
      'setRoles'
    ])
  },
  computed: {
    ...mapGetters({
      token: 'token'
    })
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  .login-container {
    @include relative;
    height: 100vh;
    background: url('../../../static/img/login-bg.jpg');
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 404px;
      margin:0 auto;
      // margin-top: 387px;
      margin-top: 35vh;
    }
    .title {
      width: 100%;
      text-align: center;
      h3{
        font-size: 30px;
        line-height: 30px;
        letter-spacing: 4.8px;
        color: #35d5ba;
        }
      p{
        line-height: 12px;
        font-size: 12px;
        letter-spacing: 2.4px;
        color: #fff;
        margin-top:10px;
      }
    }
    .el-form-item {
      margin-top: 30px;
      width: 100%;
      height: 50px;
      opacity: 0.6;
      @include borderRadius (6px);
      background-color: #161621;
      border: solid 2px #ffffff;
      span{
        display: inline-block;
        width: 56px;
        line-height: 50px;
        text-align: center;
        font-size: 26px;
	      background-color: #161621;
        color: #fff;
        vertical-align: middle;
      }
      .el-input{
        display: inline-block;
        width: 330px;
        height: 30px;
        line-height: 30px;
        margin: 10px 0;
        margin-left: 2px;
        border-left: 3px solid #161621;
        vertical-align: middle;
        input{
          height: 20px;
          line-height: 20px;
          font-size: 16px;
          color: #fff;
          letter-spacing: 0.6px;
          margin: 5px 0;
          padding: 0 20px;
          @include boxSizing;
        }
      }
    }
    .el-form-item.isActive{
      border: solid 2px #35d5ba;
      .el-input{
        border-left: 3px solid #35d5ba;
      }
    }
    .login-btn{
      margin-top: 28px;
      .el-button {
        float: left;
        width: 260px;
      	height: 50px;
      	@include borderRadius (6px);
      	background-color: #35d5ba;
        span{
          display: inline-block;
          width: 62px;
          font-size: 22px;
          letter-spacing: 3.5px;
          text-align: justify;
          text-justify: distribute-all-lines;
          text-align-last: justify;
        }
      }
      .keep-pw{
        float: right;
        height: 18px;
        margin: 16px 0;
        color: rgba(255, 255, 255, 0.5);
        opacity: 0.5;
        i{
          display: inline-block;
          width: 16px;
          height: 16px;
          font-size: 18px!important;
          vertical-align: middle;
          margin-top: -2px;
        }
        label {
          display: inline-block;
          line-height: 16px;
          font-size: 16px;
          letter-spacing: 2.6px;
          margin-left: 6px;
          vertical-align: middle;
        }
      }
    }
  }
</style>
