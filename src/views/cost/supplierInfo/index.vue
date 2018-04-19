<template>
  <div class="app-container">
    <div class="form-head-attached">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button v-if="hasPerm('supply:search')" @click="toggleTab('searchTab')" :class="tab === 'searchTab' ? 'is-active' : ''">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </button>
          <button v-if="hasPerm('supply:findAllByPage')" :class="tab === 'listTab' ? 'is-active' : ''"  @click="toggleTab('listTab')">
            <i class="iconfont icon-seeAll"></i>
            <span>查看</span>
          </button>
          <button v-if="hasPerm('supply:save')" :class="(tab === 'addTab' && editData.tabState ==='addTab') ? 'is-active' : ''" @click="addBtn">
            <i class="iconfont icon-add"></i>
            <span>新增</span>
          </button>
          <button v-show="tab === 'addTab' && editData.tabState ==='editTab'" :class="(tab === 'addTab' && editData.tabState ==='editTab')? 'is-active' : ''">
            <i class="iconfont icon-seeAll"></i>
            <span>查看明细</span>
          </button>
        </div>
        <div class="export-btn fr">
          <!-- <button @click="dataImpore" :class="tab === 'importTab' ? 'is-active' : ''">
            <i class="iconfont icon-import"></i>
            <span>数据导入</span>
          </button> -->
          <button @click="handleDownload()" :loading="downloadLoading">
            <i class="iconfont icon-download"></i>
            <span>模版下载</span>
          </button>
          <button @click="handleDownload('Arr')" :loading="downloadLoading">
            <i class="iconfont icon-export"></i>
            <span>数据导出</span>
          </button>
        </div>
      </div>
    </div>
    <div class="compotent-tab">
      <AddComponent v-if="tab === 'addTab'" :editData="editData" @toggleTab="toggleTab('listTab')" @changeObj="changeObj"></AddComponent>
      <ListComponent v-if="tab === 'listTab'" @editRow="editRow" :searchData="searchData"  @exportData="exportData"></ListComponent>
      <SearchComponent v-show="tab === 'searchTab'" @search="search"></SearchComponent>
      <ImportComponent v-if="tab === 'importTab'"></ImportComponent>
    </div>
  </div>
</template>

<script>
// import { parseTime } from '@/utils'
import AddComponent from './components/add'
import ListComponent from './components/list'
import SearchComponent from './components/search'
import ImportComponent from './components/import'
export default {
  name: 'supplier',
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
      isChange: false,
      exprotList: []
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
    editRow(data) {
      this.toggleTab('addTab')
      this.editData = {
        editData: data,
        tabState: 'editTab'
      }
    },
    search(data) {
      this.searchData = data
      this.toggleTab('listTab')
    },
    showPopWin(callback) {
      this.$confirm('信息未保存，是否离开当前页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        callback()
        this.isChange = false // 对象变化，按确定键，isChange还原为false
      }).catch(() => {
        this.isChange = true // 对象变化，弹窗出，取消键，isChange依旧为true
      })
    },
    changeObj(res) {
      this.isChange = res
    },
    exportData(data) {
      this.exprotList = data
    },
    dataImpore() {
      this.toggleTab('importTab')
    },
    handleDownload(Arr) {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '供应商名称', '合作商类别', '企业法人', '营业执照号', '注册资金', '企业性质', '供货周期（天）', '供货区域', '物资类别', '业务联系人', '联系电话',
          'QQ', '注册地址', '现址', '开户银行', '银行账号', '发票类型', '税率（%）', '供应商类别', '供应商类型', '供应商来源', '供应商等级', '评审状态', '结算方式', '等级评审处理']
        const filterVal = ['index', 'name', 'cooperativeType', 'enterprisePerson', 'licenseNumber', 'regCapital', 'enterpriseNature', 'supplyCycle', 'supplyRegion.name', 'materialCategory', 'person',
          'phone', 'qq', 'regAddress', 'address', 'bank', 'bankAccount', 'invoiceType', 'taxRate', 'type', 'category', 'source', 'grade', 'reviewState', 'settlementMethod', 'reviewHandle']
        console.log('exprotList', this.exprotList)
        var list = []
        var i = 1
        if (Arr) {
          list = this.exprotList
          list.forEach((item) => {
            item.index = i
            i++
          })
        } else {
          list = []
        }
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '供应商信息')
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
