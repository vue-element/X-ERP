 <template>
  <div class="contract-list">
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="invoiceData" :height="height" v-loading.body="listLoading" border>
        <el-table-column prop="0" label="序号" width="80" fixed>
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="ciCode" label="合同编号" width="160"></el-table-column>
        <el-table-column prop="ciName" label="合同名称" width="260"></el-table-column>
        <el-table-column prop="region" label="所属办事处" width="130"></el-table-column>
        <el-table-column prop="name" label="发票抬头名称" width="260"></el-table-column>
        <el-table-column prop="amount" label="开票金额(含税)" width="140"></el-table-column>
        <el-table-column prop="taxRate" label="税率"></el-table-column>
        <el-table-column prop="tax" label="税金" width="120"></el-table-column>
        <el-table-column prop="income" label="收入(不含税)" width="120"></el-table-column>
        <el-table-column prop="date" label="开票日期" width="140"></el-table-column>
        <el-table-column prop="number" label="开票号码" width="140"></el-table-column>
        <el-table-column prop="content" label="开票内容" width="300"></el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <el-button @click="editRow(scope.row.id)" type="text" size="small" v-if="hasPerm('contractBilling:findAllByPage')">查看</el-button>
            <el-button @click="deleteRow(scope.row.id)" type="text" size="small" v-if="hasPerm('contractBilling:delete')">删除</el-button>
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
  name: 'invoiceList',
  props: ['searchData', 'pageObj'],
  data() {
    return {
      listLoading: false,
      height: 100,
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      invoiceData: []
    }
  },
  created() {
    if (this.pageObj.currentPage) {
      this.currentPage = this.pageObj.currentPage
      this.pageSize = this.pageObj.pageSize
    }
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
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/contractBilling/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then(res => {
        if (res.data.success === true) {
          var data = res.data.data
          for (var i = 0; i < data.content.length; i++) {
            var region = data.content[i].contractInfo.business.region.name
            var ciCode = data.content[i].contractInfo.code
            var ciName = data.content[i].contractInfo.name
            var index = i + 1
            data.content[i].region = region
            data.content[i].index = index
            data.content[i].ciCode = ciCode
            data.content[i].ciName = ciName
          }
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.invoiceData = data.content
          this.$emit('exportData', data.content)
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
      this.$confirm('此操作将删除该条信息, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editRow(id) {
      this.$get('/contractBilling/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        data.currentPage = this.currentPage
        data.pageSize = this.pageSize
        this.$emit('editRow', data)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>
