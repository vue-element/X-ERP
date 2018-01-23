<template>
  <scroll-bar>
    <el-menu mode="vertical" :default-active="defaultActive" :collapse="isCollapse" background-color="#304156" text-color="#d3d3d3" active-text-color="#fff"  @open="handleOpen">
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  data() {
    return {
      defaultActive: ''
    }
  },
  created() {
    console.log(this.$route.path)
    this.defaultActive = this.$route.path
    // console.log(this.permission_routers)
  },
  methods: {
     handleOpen(key, keyPath) {
       // console.log(key, keyPath);
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
