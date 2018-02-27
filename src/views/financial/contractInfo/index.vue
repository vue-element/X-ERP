<template>
  <div class="contract-container">
    <div class="form-head-attached">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button :class="tab === 'searchTab' ? 'is-active' : ''" @click="toggleTab('searchTab')">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </button>
          <button :class="tab === 'listTab' ? 'is-active' : ''" @click="toggleTab('listTab')">
            <i class="iconfont icon-seeAll"></i>
            <span>查看明细</span>
          </button>
          <button :class="tab === 'addTab' ? 'is-active' : ''" @click="addBtn">
            <i class="iconfont icon-add"></i>
            <span>新增</span>
          </button>
          <button :class="tab === 'delTab' ? 'is-active' : ''">
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
      <searchComponent v-if="tab === 'searchTab'" @search="search"></searchComponent>
      <listComponent v-if="tab === 'listTab'" :searchData="searchData" @editRow="editRow"></listComponent>
      <addComponent v-if="tab === 'addTab'" :rowDetail="rowDetail" :editData="editData"></addComponent>
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
      tab: 'listTab',
      rowDetail: '',
      searchData: {},
      editData: {}
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    toggleTab(tab) {
      this.tab = tab
    },
    // 点击新增
    addBtn() {
      this.tab = 'addTab'
      this.editData = {
        editData: {},
        tabState: 'addTab'
      }
    },
    // 点击查看
    editRow(data) {
      this.tab = 'addTab'
      this.editData = {
        editData: data,
        tabState: 'seeTab'
      }
    },
    search(data) {
      this.tab = 'listTab'
      this.searchData = data
    },
    cancel() {
      this.tab = 'listTab'
    }
  },
  computed: {
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.contract-container {
  width: 100%;
  @include scrolling;
  .contract-list{
    margin-top:60px;
  }
}
.basic-form {
  .el-table__fixed-body-wrapper {
    margin: 28px 0;
  }
}
</style>
