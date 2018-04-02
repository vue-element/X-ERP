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
        </div>
        <div class="export-btn fr">
          <button @click="handleDownload('Arr')" :loading="downloadLoading" v-show="tab === 'listTab'">
            <i class="iconfont icon-export"></i>
            <span>数据导出</span>
          </button>
        </div>
      </div>
    </div>
    <div class="contract-list" >
      <searchComponent v-if="tab === 'searchTab'" @search="search"></searchComponent>
      <listComponent v-if="tab === 'listTab'" :searchData="searchData" @editRow="editRow" @exportData="exportData"></listComponent>
      <addComponent v-if="tab === 'addTab'" :rowDetail="rowDetail" :editData="editData" @cancel="cancel" @back="back('listTab')"></addComponent>
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
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
      downloadLoading: false,
      exprotList: [],
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
    addBtn() {
      this.tab = 'addTab'
      this.delSession()
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
      this.tab = 'listTab'
      this.searchData = data
    },
    cancel() {
      this.tab = 'listTab'
    },
    delSession() {
      sessionStorage.removeItem('contractMsg')
    },
    back(tab) {
      this.tab = tab
    },
    exportData(data) {
      this.exprotList = data
    },
    handleDownload(Arr) {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '合同编号', '合同名称', '所属办事处', '合同所属期', '变更后合同金额', '已开票金额', '已回款金额', '已开票未回款金额']
        const filterVal = ['index', 'code', 'name', 'region', 'term', 'changeAmount', 'invoicedAmount', 'receivedAmount', 'invoiceNoReceive']
        var list = []
        if (Arr) {
          list = this.exprotList
        } else {
          list = []
        }
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '合同信息')
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      console.log(filterVal, 'filterVal')
      console.log(jsonData, 'jsonData')
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
