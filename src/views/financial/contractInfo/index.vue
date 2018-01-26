<template>
  <div class="contract-container">
    <div class="form-head-attached">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button @click="toggleTab('searchTab')" :class="tab === 'searchTab' ? 'is-active' : ''">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </button>
          <button @click="toggleTab('listTab')" :class="tab === 'listTab' ? 'is-active' : ''">
            <i class="iconfont icon-seeAll"></i>
            <span>查看明细</span>
          </button>
          <button @click="toggleTab('addTab')" :class="tab === 'addTab' ? 'is-active' : ''">
            <i class="iconfont icon-add"></i>
            <span>新增</span>
          </button>
          <button @click="toggleTab('delTab')" :class="tab === 'delTab' ? 'is-active' : ''">
            <i class="iconfont icon-delete"></i>
            <span>删除</span>
          </button>
        </div>
        <div class="export-btn fr">
          <button @click="dataExport">
            <i class="iconfont icon-export"></i>
            <span>数据导出</span>
          </button>
        </div>
      </div>
    </div>
    <div class="contract-list" >
      <searchComponent v-if="tab === 'searchTab'" ></searchComponent>
      <listComponent v-if="tab === 'listTab'" @seeRow="seeRow"></listComponent>
      <addComponent v-if="tab === 'addTab'" :rowDetail="rowDetail"></addComponent>
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
  created() {
  },
  mounted() {},
  methods: {
    toggleTab(tab) {
      this.tab = tab
    },
    seeRow(data) {
      this.tab = 'addTab'
      this.rowDetail = {
        RowDetail: data,
        tabState: 'editTab'
      }
    },
    dataExport() {
      alert(123)
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
