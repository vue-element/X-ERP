<template>
<div class="app-container modifyPassword-container" :style="{height: height + 'px'}">
  <el-form :model="userInfo" :rules="rules" ref="userInfo" class="modifyPassword-form" style="margin:0 auto;">
     <el-form-item label="用户名" label-width="120px">
       <el-input v-model="userInfo.accountName" placeholder="请输入用户名" disabled></el-input>
     </el-form-item>
     <el-form-item label="姓名" label-width="120px">
       <el-input v-model="userInfo.username" placeholder="请输入姓名" disabled></el-input>
     </el-form-item>
      <el-form-item label="密码" label-width="120px" prop="password" class="password-item">
        <el-input v-model="userInfo.password" placeholder="请输入密码" :type="passwordType" autoComplete="off"></el-input>
        <span class="show-pwd el-icon-view" @click.prevent="showPwd"></span>
      </el-form-item>
      <el-form-item label="确认密码" label-width="120px" prop="confirmPassword">
        <el-input v-model="userInfo.confirmPassword" placeholder="请再次输入密码"  :type="passwordType" autoComplete="off"></el-input>
      </el-form-item>
     <div class="commont-btn">
       <el-button @click="savePassword" :loading="loading">保存</el-button>
       <!-- <el-button @click="reset">重置</el-button> -->
       <el-button @click="cancel('userInfo')">取消</el-button>
     </div>
  </el-form>
</div>
</template>

<script>
import Cookies from 'js-cookie'
import { winHeight } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'role',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '' || (value.length < 6)) {
        callback(new Error('请输入密码，不小于6位'))
      } else {
        if (this.userInfo.password !== '' && (value.length >= 6)) {
          this.$refs.userInfo.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再输入密码'))
      } else if (value !== this.userInfo.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      height: 100,
      loading: false,
      passwordType: 'password',
      userInfo: {
        accountName: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      rules: {
        // username: [{ required: true, validator: validateUsername, trigger: 'blur' }],
        // name: [{ required: true, validator: validateEmail, trigger: 'blur' }],
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: validateConfirmPassword, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.userInfo.accountName = this.accountName
    this.userInfo.username = this.userName
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  mounted() {
  },
  methods: {
    resize() {
      this.height = winHeight() - 160
    },
    savePassword(valid) {
      this.$refs.userInfo.validate(valid => {
        if (valid) {
          this.loading = true
          var obj = {
            id: this.accountId,
            password: this.userInfo.password
          }
          this.$post('/account/password', obj, false).then((res) => {
            this.loading = false
            if (res.data.success === true) {
              this.$message({
                message: '修改成功',
                type: 'warning'
              })
              Cookies.remove('username')
              Cookies.remove('password')
              setTimeout(() => {
                this.$post('/shiro/logout').then((res) => {
                  this.$store.dispatch('logout').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                  })
                })
              }, 200)
            }
          })
        } else {
          this.$message({
            message: '信息未填写完整',
            type: 'warning'
          })
          // return false
        }
      })
    },
    cancel() {
      this.$refs.userInfo.resetFields()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    }
  },
  computed: {
    ...mapGetters([
      'accountId',
      'accountName',
      'userName'
    ])
  },
  watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.modifyPassword-container {
  width: 100%;
  position: relative;
  overflow-y: auto;
  margin-top: 12vh;
  text-align: center;
  .modifyPassword-form {
    width: 60%;
    margin-bottom: 40px;
    .el-form-item {
      .el-form-item__label {
        width: 16%!important;
      }
    }
  }
  .password-item {
    .el-form-item__content {
      position: relative;
      .show-pwd {
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
      }
    }
  }
}
</style>
<style  rel="stylesheet/scss" lang="scss" >
@import "src/styles/mixin.scss";
.modifyPassword-container {
  .modifyPassword-form {
    .el-form-item {
      .el-form-item__label {
        width: 18%!important;
      }
      .el-form-item__content {
        width: 56%!important;
      }
    }
    .commont-btn {
      margin: 30px 0;
      margin-left: 50px;
    }
  }
}
</style>
