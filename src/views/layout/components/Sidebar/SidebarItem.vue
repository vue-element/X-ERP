<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden && item.children && !allChildrenHidden(item)">
      <router-link v-if="item.children.length===1 && !item.children[0].children" :to="item.path+'/'+item.children[0].path" :key="item.children[0].name" @click="ayy(item)">
        <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
          <span v-if="item.children[0].meta&&item.children[0].meta.icon" :class="'iconfont icon-' + item.children[0].meta.icon"></span>
          <span v-if="item.children[0].meta&&item.children[0].meta.title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <span v-if="item.meta&&item.meta.icon" :class="'iconfont icon-' + item.meta.icon"></span>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item class="nest-menu" v-if="!child.hideChildren && child.children && child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else-if="!child.hidden" :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <span v-if="child.meta&&child.meta.icon" :class="'iconfont icon-' + child.meta.icon"></span>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  created() {
  },
  methods: {
    allChildrenHidden(item) {
      var list = item.children.filter(child => !child.hidden)
      return list.length === 0
    },
    ayy(item) {
      // console.log(item.children[0].name)
    }
  }
}
</script>
<style scoped>
</style>
