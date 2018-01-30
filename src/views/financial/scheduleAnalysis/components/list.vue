 <template>
  <div class="contract-list">
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" v-loading.body="listLoading">
        <el-table-column prop="contractInfo" label="合同信息">
          <el-table-column prop="0" label="序号"><template slot-scope="scope">{{scope.$index + 1}}</template></el-table-column>
          <el-table-column prop="contractInfo.code" label="合同编码"></el-table-column>
          <el-table-column prop="contractInfo.name" label="合同名称"></el-table-column>
        </el-table-column>
        <el-table-column prop="contractInfo" label="进度分析">
          <el-table-column prop="contractInfo.region.name" label="项目所属阶段"></el-table-column>
          <el-table-column prop="name" label="完工百分比"></el-table-column>
          <el-table-column prop="date" label="项目状态"></el-table-column>
        </el-table-column>
        <el-table-column prop="contractInfo" label="回款分析">
          <el-table-column prop="name" label="回款比例"></el-table-column>
          <el-table-column prop="date" label="回款状态"></el-table-column>
        </el-table-column>
        <el-table-column prop="contractInfo" label="支出分析">
          <el-table-column prop="contractInfo" label="材料">
            <el-table-column prop="name" label="回款比例"></el-table-column>
            <el-table-column prop="date" label="回款状态"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="editRow(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
       @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  name: 'scheduleAnalysisList',
  props: ['searchData'],
  data() {
    return {
      listLoading: false,
      height: 100,
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      tableData: []
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    this.getInvoiceData()
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
    },
    getInvoiceData() {
      console.log('searchData', this.searchData)
      // console.log (typeof(this.searchData.date) === object)
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/contractBilling/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then(res => {
        if (res.data.success === true) {
          var data = res.data.data
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.tableData = data.content
          this.listLoading = false
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getInvoiceData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getInvoiceData()
    },
    deleteRow(id) {
      var projectID = { id: [id] }
      this.$post('/contractBilling/delete', projectID).then(res => {
        if (res.data.success === true) {
          this.getInvoiceData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    editRow(id) {
      this.$get('/contractBilling/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        console.log('data', data)
        this.$emit('editRow', data)
      })
    }
  },
  watch: {
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>
