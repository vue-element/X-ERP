<template>
  <div class="app-container">
    <div class="form-head-attached">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button v-if="hasPerm('paymentContract:search')" @click="toggleTab('searchTab')" :class="tab === 'searchTab' ? 'is-active' : ''">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </button>
          <button v-if="hasPerm('paymentContract:findAllByPage')" @click="toggleTab('listTab')" :class="tab === 'listTab' ? 'is-active' : ''">
            <i class="iconfont icon-seeAll"></i>
            <span>查看明细</span>
          </button>
        </div>
        <div class="export-btn fr">
          <button v-if="hasPerm('paymentContract:export')" @click="handleDownload()" :loading="downloadLoading">
            <i class="iconfont icon-export"></i>
            <span>数据导出</span>
          </button>
        </div>
      </div>
    </div>
    <div class="compotent-tab">
      <AddComponent v-if="tab === 'addTab'" :editData="editData" @toggleTab="toggleTab('listTab')"></AddComponent>
      <ListComponent v-if="tab === 'listTab'" @editRow="editRow" :searchData="searchData" @exportData="exportData"></ListComponent>
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
  name: 'inbound',
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
      searchData: {
        amount: 0,
        amount1: 0
      },
      list: [],
      exprotList: []
    }
  },
  created() {
    // console.log('inbound')
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
      this.tab = 'addTab'
    },
    search(data) {
      this.searchData = data
      this.tab = 'listTab'
    },
    toggleTab(tab) {
      this.tab = tab
    },
    dataImpore() {
      this.toggleTab('importTab')
    },
    exportData(data) {
      this.exprotList = data
    },
    handleDownload() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '订单编号', '付款合同编号/入库单编号', '使用部门', '供应商', '状态']
        const filterVal = ['index', 'orderCode', 'code', 'department', 'supplyName', 'state']
        var list = this.exprotList
        var i = 1
        // console.log('list', list)
        // return
        list.forEach((item) => {
          item.index = i
          item.orderCode = item.paymentContract.orderCode
          item.code = item.paymentContract.code
          item.department = item.paymentContract.department
          item.supplyName = item.paymentContract.supply.name
          i++
        })
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '入库管理数据')
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j.indexOf('.') !== -1) {
            var arr = j.split('.')
            var m = arr[0]
            var n = arr[1]
            return v[m]['' + n]
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
</style>
