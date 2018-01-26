<template>
<scroll-bar>
  <el-menu mode="vertical" :default-active="defaultActive" :collapse="isCollapse" background-color="#304156" text-color="#d3d3d3" active-text-color="#fff" @open="handleOpen">
    <sidebar-item :routes="permission_routers"></sidebar-item>
  </el-menu>
</scroll-bar>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: {
    SidebarItem,
    ScrollBar
  },
  data() {
    return {
      defaultActive: ''
    }
  },
  created() {
    console.log('this.$route.path', this.$route.path)
    this.setDefaultActive()
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    setDefaultActive() {
      var path = this.$route.path
      if (this.$route.meta.pName) {
        var arr = path.split('/')
        arr.pop()
        this.defaultActive = arr.join('/')
      } else {
        this.defaultActive = path
      }
    }
  },
  watch: {
    $route() {
      this.setDefaultActive()
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
