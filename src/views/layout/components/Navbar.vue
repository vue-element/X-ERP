<template>
<div class="navbar-container">
  <div class="project-name">X-ERP项目管理系统</div>
  <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
  <ul class="navbar" mode="horizontal">
    <li>欢迎您～</li>
    <li class="department">{{user.name}}</li>
    <li>
      <span class="username">{{user.department}}</span>
      <i class="iconfont icon-username"></i>
    </li>
    <li>
      <span class="help">帮助</span>
      <i class="iconfont icon-help"></i>
    </li>
    <li>
      <span class="setting">设置</span>
      <i class="iconfont icon-setting"></i>
    </li>
    <li @click="logout">
      <span class="logout">退出</span>
      <i class="iconfont icon-out"></i>
    </li>
  </ul>
</div>
</template>

<script>
import Cookies from 'js-cookie'
import { mapActions, mapGetters } from 'vuex'
// import { getUserInfo } from '@/api/login'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    Screenfull
  },
  data() {
    return {
      user: {
        name: '',
        department: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      // 'userInfo',
      'avatar',
      'language'
    ])
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      var name = Cookies.get('username')
      var password = Cookies.get('password')
      var userInfo = {
        name,
        password
      }
      // console.log('getUserInfo', getUserInfo(userInfo))
      this.$post('/login', userInfo, false).then((res) => {
        if (res.data.success === true) {
          var userInfo = res.data.data
          this.setToken('11111')
          this.$store.commit('login', userInfo)
          this.user = {
            name: userInfo.account.role.name,
            department: userInfo.account.name
          }
        }
      })
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('setLanguage', lang)
      this.$message({
        message: 'switch language success',
        type: 'success'
      })
    },
    logout() {
      this.$store.dispatch('logout').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    },
    ...mapActions([
      'setToken',
      'login'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar-container {
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // z-index: 1002;
}
.project-name {
    width: 210px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 18px;
    letter-spacing: 0.9px;
    color: #fff;
    background-color: #35d5ba;
    float: left;
}
.hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
}
.navbar {
    float: right;
    height: 50px;
    line-height: 50px;
    border-bottom: 0;
    border-radius: 0 !important;
    &:focus {
        outline: none;
    }
    .errLog-container {
        display: inline-block;
        vertical-align: top;
    }
    li {
        display: inline-block;
        margin-right: 30px;
        font-size: 16px;
        color: #828282;
    }
}
</style>
