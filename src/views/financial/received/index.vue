<template>
  <div class="contract-container">
    <div class="form-head-attached">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button @click="toggleTab('searchTab')" :class="tab === 'searchTab' ? 'is-active' : ''" v-if="hasPerm('contractReceived:search')">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </button>
          <button :class="tab === 'listTab' ? 'is-active' : ''" @click="listBtn" v-if="hasPerm('contractReceived:findAllByPage')">
            <i class="iconfont icon-seeAll"></i>
            <span>查看</span>
          </button>
          <button :class="(tab === 'addTab' && editData.tabState ==='addTab') ? 'is-active' : ''" @click="addBtn" v-if="hasPerm('contractReceived:save')">
            <i class="iconfont icon-add"></i>
            <span>新增</span>
          </button>
          <button v-show="tab === 'addTab' && editData.tabState ==='editTab'" :class="(tab === 'addTab' && editData.tabState ==='editTab')? 'is-active' : ''">
            <i class="iconfont icon-seeAll"></i>
            <span>查看明细</span>
          </button>
        </div>
        <div class="export-btn fr">
          <button @click="dataImpore" :class="tab === 'importTab' ? 'is-active' : ''">
            <i class="iconfont icon-import"></i>
            <span>数据导入</span>
          </button>
          <button @click="handleDownload()" :loading="downloadLoading" v-show="tab === 'listTab'">
            <i class="iconfont icon-download"></i>
            <span>模版下载</span>
          </button>
          <button @click="handleDownload('Arr')" :loading="downloadLoading" v-show="tab === 'listTab'" v-if="hasPerm('contractReceived:export')">
            <i class="iconfont icon-export"></i>
            <span>数据导出</span>
          </button>
        </div>
      </div>
    </div>
    <div class="compotent-tab">
      <AddComponent v-if="tab === 'addTab'" :editData="editData" @toggleTab="listBtn" @changeObj='changeObj'></AddComponent>
      <ListComponent v-if="tab === 'listTab'" @editRow="editRow" :searchData="searchData" @exportData="exportData" :pageObj="pageObj"></ListComponent>
      <SearchComponent v-if="tab === 'searchTab'" @search="search"></SearchComponent>
      <ImportComponent v-if="tab === 'importTab'"  @toggleTab="toggleTab"></ImportComponent>
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
      exportList: [],
      pageObj: {}
    }
  },
  created() {
  },
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
      this.pageObj = {
        currentPage: data.currentPage,
        pageSize: data.pageSize
      }
      this.tab = 'addTab'
      this.editData = {
        editData: data,
        tabState: 'editTab'
      }
    },
    search(data) {
      this.pageObj = {}
      this.searchData = data
      this.searchData.date = parseTime(this.searchData.date, '{y}-{m}-{d}')
      this.tab = 'listTab'
    },
    addBtn() {
      if (this.editData.tabState === 'editTab') {
        if (this.isChange === true) {
          this.showPopWin(() => {
            this.tab = ''
            setTimeout(() => {
              this.tab = 'addTab'
            }, 50)
            this.editData.tabState = 'addTab'
          })
        } else {
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
    exportData(data) {
      this.exportList = data
    },
    handleDownload(Arr) {
      this.$post('/contractReceived/export').then(res => {
        if (res.data.success === true) {
          this.downloadLoading = true
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/vendor/Export2Excel')
            const tHeader = ['序号', '合同编号', '合同名称', '所属办事处', '发票号码', '回款金额', '回款日期']
            const filterVal = ['index', 'code', 'name', 'region', 'number', 'amount', 'date']
            var list = []
            if (Arr) {
              list = this.exportList
            } else {
              list = []
            }
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, '合同回款信息')
            this.downloadLoading = false
          })
        }
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
