  <template>
  <div class="contract-container">
    <div class="form-head-attached">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button @click="toggleTab('searchTab')" :class="tab === 'searchTab' ? 'is-active' : ''" v-if="hasPerm('contractInfo:search')">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </button>
          <button :class="tab === 'listTab' ? 'is-active' : ''" @click="listBtn" v-if="hasPerm('contractInfo:findAllByPage')">
            <i class="iconfont icon-seeAll"></i>
            <span>查看</span>
          </button>
          <button :class="(tab === 'addTab' && editData.tabState ==='addTab') ? 'is-active' : ''" @click="addBtn" v-if="hasPerm('contractInfo:save')">
            <i class="iconfont icon-add"></i>
            <span>新增</span>
          </button>
          <button v-show="tab === 'addTab' && editData.tabState ==='editTab'" :class="(tab === 'addTab' && editData.tabState ==='editTab')? 'is-active' : ''">
            <i class="iconfont icon-seeAll"></i>
            <span>查看明细</span>
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
      <listComponent v-if="tab === 'listTab'" :searchData="searchData" @editRow="editRow" @exportData="exportData" ></listComponent>
      <addComponent v-if="tab === 'addTab'" :rowDetail="rowDetail" :editData="editData" @cancel="cancel" @back="back('listTab')" @toggleTab="listBtn" @changeObj='changeObj'></addComponent>
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
      editData: {},
      isChange: false
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
        this.delSession()
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
      this.$post('/contractInfo/export').then(res => {
        if (res.data.success === true) {
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
