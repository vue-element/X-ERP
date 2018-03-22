<template>
  <div class="contract-container">
    <div class="form-head-attached">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button @click="toggleTab('searchTab')" :class="tab === 'searchTab' ? 'is-active' : ''">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </button>
          <button :class="tab === 'listTab' ? 'is-active' : ''" @click="listBtn">
            <i class="iconfont icon-seeAll"></i>
            <span>查看</span>
          </button>
          <button :class="(tab === 'addTab' && editData.tabState ==='addTab') ? 'is-active' : ''" @click="addBtn">
            <i class="iconfont icon-add"></i>
            <span>新增</span>
          </button>
          <button v-show="tab === 'addTab' && editData.tabState ==='editTab'" :class="(tab === 'addTab' && editData.tabState ==='editTab')? 'is-active' : ''">
            <i class="iconfont icon-seeAll"></i>
            <span>查看明细</span>
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
          <button @click="handleDownload()" :loading="downloadLoading">
            <i class="iconfont icon-download"></i>
            <span>模版下载</span>
          </button>
          <button @click="handleDownload()" :loading="downloadLoading">
            <i class="iconfont icon-export"></i>
            <span>数据导出</span>
          </button>
        </div>
      </div>
    </div>
    <div class="compotent-tab">
      <AddComponent v-if="tab === 'addTab'" :editData="editData" @toggleTab="listBtn" @changeObj='changeObj'></AddComponent>
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
      if (this.tab === 'addTab' && this.isChange === true) {
        this.showPopWin(() => {
          this.tab = tab
        })
        return
      }
      this.tab = tab
    },
    listBtn() {
      this.toggleTab('listTab')
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
      this.searchData.date = parseTime(this.searchData.date, '{y}-{m}-{d}')
      this.tab = 'listTab'
    },
    addBtn() {
      if (this.editData.tabState === 'editTab') { // 编辑状态点击新增
        if (this.isChange === true) { // 有值的变化
          this.showPopWin(() => {
            this.tab = '' // tab为空，在变为 ‘addTab’重新渲染add组件
            setTimeout(() => {
              this.tab = 'addTab'
            }, 50)
            this.editData.tabState = 'addTab'
          })
        } else { // 没有值的变化
          this.tab = ''
          setTimeout(() => {
            this.tab = 'addTab'
          }, 50)
          this.editData.tabState = 'addTab'
        }
      } else {
        this.tab = 'addTab'
        this.editData.tabState = 'addTab'
      }
    },
    showPopWin(callback) {
      this.$confirm('信息未保存，是否离开当前页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        callback()
        this.isChange = false
      }).catch(() => {
        this.isChange = true
      })
    },
    changeObj(status) {
      this.isChange = status
    },
    dataImpore() {
      this.toggleTab('importTab')
    },
    handleDownload() {
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
