<template>
  <div class="contract-container">
    <div class="form-head-attached">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button @click="searchItem('searchTab')" :class="tab === 'searchTab' ? 'is-active' : ''">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </button>
          <button @click="show('listTab')" :class="tab === 'listTab' ? 'is-active' : ''">
            <i class="iconfont icon-seeAll"></i>
            <span>查看明细</span>
          </button>
          <button @click="addItem('addTab')" :class="tab === 'addTab' ? 'is-active' : ''">
            <i class="iconfont icon-add"></i>
            <span>新增</span>
          </button>
          <button @click="delItem('delTab')" :class="tab === 'delTab' ? 'is-active' : ''">
            <i class="iconfont icon-delete"></i>
            <span>删除</span>
          </button>
        </div>
        <div class="export-btn fr">
          <button>
            <i class="iconfont icon-export"></i>
            <span>数据导出</span>
          </button>
        </div>
      </div>
    </div>
    <div class="contract-list" >
      <searchComponent v-if="tab === 'searchTab'"></searchComponent>
      <listComponent v-if="tab === 'listTab'"></listComponent>
      <addComponent v-if="tab === 'addTab'"></addComponent>
    </div>
  </div>
</template>

<script>
import searchComponent from './components/search'
import listComponent from './components/list'
import addComponent from './components/add'
export default {
  components: {
    searchComponent,
    listComponent,
    addComponent
  },
  data() {
    return {
      tab: 'listTab'
    }
  },
  mounted() {},
  created() {},
  methods: {
    // 搜索条件
    searchItem(tab) {
      this.tab = tab
    },
    // 查看明细
    show(tab) {
      this.tab = tab
    },
    // 新增
    addItem(tab) {
      this.tab = tab
    },
    // 删除
    delItem(tab) {
      this.tab = tab
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.contract-container {
  width: 100%;
  @include scrolling
}
.basic-form {
  .el-table__fixed-body-wrapper {
    margin: 28px 0;
  }
}
.contract-list {
  margin-top: 50px;
}
</style>
