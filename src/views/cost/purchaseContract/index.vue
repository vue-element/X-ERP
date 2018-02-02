<template>
  <div class="app-container">
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
          <button @click="addBtn" :class="tab === 'addTab' ? 'is-active' : ''">
            <i class="iconfont icon-add"></i>
            <span>新增</span>
          </button>
        </div>
        <div class="export-btn fr">
          <button @click="handleDownload()" :loading="downloadLoading" v-show="tab === 'listTab'">
            <i class="iconfont icon-export"></i>
            <span>数据导出</span>
          </button>
        </div>
      </div>
    </div>
    <div class="compotent-tab">
      <AddComponent v-if="tab === 'addTab'" :editData="editData" @toggleTab="toggleTab('listTab')"></AddComponent>
      <ListComponent v-if="tab === 'listTab'" @editRow="editRow" :searchData="searchData"></ListComponent>
      <SearchComponent v-if="tab === 'searchTab'" @search="search"></SearchComponent>
      <ImportComponent v-if="tab === 'importTab'"></ImportComponent>
    </div>
  </div>
</template>

<script>
import AddComponent from './components/add'
import ListComponent from './components/list'
import SearchComponent from './components/search'
import ImportComponent from './components/import'
export default {
  name: 'purchaseContract',
  components: {
    AddComponent,
    ListComponent,
    SearchComponent,
    ImportComponent
  },
  data() {
    return {
      path: 'listTab',
      downloadLoading: false,
      tab: 'listTab',
      editData: {},
      searchData: {},
      list: [
        {
          id: 1,
          title: '头条信息',
          author: '作者',
          pageviews: 200,
          display_time: '2018-01-22'
        },
        {
          id: 2,
          title: '头条信息',
          author: '作者',
          pageviews: 200,
          display_time: '2018-01-22'
        },
        {
          id: 3,
          title: '头条信息',
          author: '作者',
          pageviews: 200,
          display_time: '2018-01-22'
        }
      ]
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    addBtn() {
      this.tab = 'addTab'
      this.editData = {
        editData: {},
        tabState: 'addTab'
      }
    },
    editRow(data) {
      this.editData = {
        editData: data,
        tabState: 'editTab'
      }
      console.log('editData', this.editData)
      this.tab = 'addTab'
    },
    search(data) {
      this.searchData = data
      this.tab = 'listTab'
    },
    toggleTab(tab) {
      this.tab = tab
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  },
  watch: {
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
