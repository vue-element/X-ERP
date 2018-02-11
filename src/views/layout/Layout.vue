<template>
<div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
  <navbar></navbar>
  <div class="show-container">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <tags-view></tags-view>
      <app-main></app-main>
    </div>
  </div>
</div>
</template>

<script>
import Cookies from 'js-cookie'
import {
  mapActions
} from 'vuex'
import {
  Navbar,
  Sidebar,
  AppMain,
  TagsView
} from './components'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  methods: {
    getUserInfo() {
      var name = Cookies.get('username')
      var password = Cookies.get('password')
      var userInfo = {
        name,
        password
      }
      console.log('userInfo', userInfo)
      this.$post('/login', userInfo, false).then((res) => {
        if (res.data.success === true) {
          this.setToken('11111')
          this.$store.commit('login', userInfo)
        }
      })
    },
    ...mapActions([
      'setToken',
      'login'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>@import "src/styles/mixin.scss";
.app-wrapper {
    @include clearfix;
    ::-webkit-scrollbar {
        width: 0;
        height: 0;
        background-color: #fff;
    }
    position: relative;
    height: 100%;
    width: 100%;
}
.main-container {
    position: fixed;
    top: 50px;
    left: 210px;
    right: 0;
    bottom: 0;
    border: 10px solid #d2d2d2;
}
.app-main {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding-top: 40px;
    overflow-y: scroll;
    @include boxSizing;
    @include scrolling;
    margin: 0 20px;
}
.hideSidebar .main-container {
    left: 0;
}
.hideSidebar .tags-view-container {
    left: 46px;
}
#app .tags-view-container .tags-view-wrapper {
    -webkit-transition: margin-left 0.28s;
    transition: margin-left 0.28s;
}
</style>
