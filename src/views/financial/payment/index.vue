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
          <button @click="addBtn" :class="tab === 'addTab' ? 'is-active' : ''">
            <i class="iconfont icon-add"></i>
            <span>新增</span>
          </button>
          <!-- <button>
            <i class="iconfont icon-delete"></i>
            <span>删除</span>
          </button> -->
        </div>
        <div class="export-btn fr">
          <button @click="dataImpore" :class="tab === 'importTab' ? 'is-active' : ''">
            <i class="iconfont icon-import"></i>
            <span>数据导入</span>
          </button>
          <button @click="handleDownload()" :loading="downloadLoading" :class="tab === 'loadDownTab' ? 'is-active' : ''">
            <i class="iconfont icon-download"></i>
            <span>模版下载</span>
          </button>
          <button @click="handleDownload()" :loading="downloadLoading" :class="tab === 'exportTab' ? 'is-active' : ''">
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
import { parseTime } from '@/utils'
import AddComponent from './components/add'
import ListComponent from './components/list'
import SearchComponent from './components/search'
import ImportComponent from './components/import'
export default {
  name: 'contrctInvoice',
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
    toggleTab(tab) {
      this.tab = tab
    },
    addBtn() {
      this.tab = 'addTab'
      this.editData = {
        editData: {},
        tabState: 'addTab'
      }
    },
    editRow(data) {
      this.tab = 'addTab'
      this.editData = {
        editData: data,
        tabState: 'editTab'
      }
    },
    search(data) {
      this.searchData = data
      this.tab = 'listTab'
    },
    dataImpore() {
      this.tab = 'importTab'
      // this.togglePath('import')
    },
    handleDownload() {
      this.tab = 'loadDownTab'
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.list
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, this.filename)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  },
  computed: {
  },
  watch: {
  }
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
</style>
