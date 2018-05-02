<template>
  <div class="contract-container">
    <div class="form-head-attached">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button @click="toggleTab('searchTab')" :class="tab === 'searchTab' ? 'is-active' : ''" v-if="hasPerm('contractSchedule:search')">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </button>
          <button :class="tab === 'listTab' ? 'is-active' : ''" @click="listBtn" v-if="hasPerm('contractSchedule:findAllByPage')">
            <i class="iconfont icon-seeAll"></i>
            <span>查看</span>
          </button>
          <button v-show="tab === 'addTab' && editData.tabState ==='editTab'" :class="tab === 'addTab' ? 'is-active' : ''">
            <i class="iconfont icon-seeAll"></i>
            <span>查看明细</span>
          </button>
        </div>
        <div class="export-btn fr">
          <!-- <button @click="dataImpore" :class="tab === 'importTab' ? 'is-active' : ''" v-show="tab === 'listTab'">
            <i class="iconfont icon-import"></i>
            <span>数据导入</span>
          </button> -->
          <button @click="handleDownload()" :loading="downloadLoading" v-show="tab === 'listTab'">
            <i class="iconfont icon-download"></i>
            <span>模版下载</span>
          </button>
          <button @click="handleDownload('Arr')" :loading="downloadLoading" v-show="tab === 'listTab'" v-if="hasPerm('contractSchedule:export')">
            <i class="iconfont icon-export"></i>
            <span>数据导出</span>
          </button>
        </div>
      </div>
    </div>
    <div class="compotent-tab">
      <AddComponent v-if="tab === 'addTab'" :editData="editData" @toggleTab="listBtn" @changeObj="changeObj"></AddComponent>
      <ListComponent v-if="tab === 'listTab'" @editRow="editRow" :searchData="searchData" @exportData="exportData" :pageObj="pageObj"></ListComponent>
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
  name: 'scheduleManage',
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
      searchData: {},
      editData: {},
      exportList: [],
      pageObj: {}
    }
  },
  created() {
  },
  mounted() {},
  methods: {
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
      // this.searchData.date = parseTime(this.searchData.date, '{y}-{m}-{d}')
      this.tab = 'listTab'
    },
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
      this.$post('/contractSchedule/export').then(res => {
        if (res.data.success === true) {
          this.downloadLoading = true
          require.ensure([], () => {
            const { export_json_to_excel } = require('@/vendor/Export2Excel')
            const tHeader = ['序号', '合同编码', '合同名称', '项目所属阶段', '完工百分比(%)', '项目状态', '回款比例(%)', '回款状态', '材料采购比例(%)', '材料进度匹配度', '人工支出比例(%)', '人工进度匹配度', '综合支出比例(%)', '综合进度匹配', '收入成本差异-收支差额(元)', '收支成本差异-状态', '付现差异-付现差额(元)', '付现差异-状态']
            const filterVal = ['index', 'code', 'name', 'stage', 'finishPercentage', 'projectStatus', 'receivedPercentage', 'receivedStatus', 'materialPercentage', 'materialStatus', 'artificialPercentage', 'artificialStatus', 'comprehensivePercentage', 'comprehensiveStatus', 'paymentBalance', 'paymentBalanceStatus', 'cashBalance', 'cashBalanceStatus']
            var list = []
            if (Arr) {
              list = this.exportList
            } else {
              list = []
            }
            const data = this.formatJson(filterVal, list)
            export_json_to_excel(tHeader, data, '项目进度分析')
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
