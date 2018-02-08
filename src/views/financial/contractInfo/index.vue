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
          <!-- <button :class="tab === 'delTab' ? 'is-active' : ''">
            <i class="iconfont icon-delete"></i>
            <span>删除</span>
          </button> -->
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
      <listComponent v-if="tab === 'listTab'" @seeRow="seeRow" :searchData="searchData"></listComponent>
      <addComponent v-if="tab === 'addTab'" :rowDetail="rowDetail"></addComponent>
    </div>
  </div>
</template>

<script>
// import store from '../../../store/index.js'
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
      searchData: {}
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    toggleTab(tab) {
      this.tab = tab
    },
    addBtn() {
      this.tab = 'addTab'
    },
    seeRow(data) {
      this.tab = 'addTab'
      // this.rowDetail = {
      //   RowDetail: data,
      //   tabState: 'editTab'
      // }
    },
    search(data) {
      this.tab = 'listTab'
      this.searchData = data
    }
  },
  computed: {
    // ...mapState(['tab'])
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
