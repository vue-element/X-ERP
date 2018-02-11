 <template>
  <div class="contract-list">
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" v-loading.body="listLoading">
        <el-table-column prop="0" label="序号">
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="applicationTime" label="申请时间"></el-table-column>
        <el-table-column prop="applicationPerson" label="申请人"></el-table-column>
        <el-table-column prop="orderNumber" label="订单编号"></el-table-column>
        <el-table-column prop="business.code" label="商机编号"></el-table-column>
        <el-table-column prop="optCost" label="优化成本"></el-table-column>
        <el-table-column prop="category" label="业务线"></el-table-column>
        <el-table-column prop="department" label="使用部门"></el-table-column>
        <el-table-column prop="business.name" label="使用项目"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="seeRow(scope.row.id)" type="text">查看</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text">删除</el-button>
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
  name: 'paymentContractList',
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
    this.getSupplierData()
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
    },
    getSupplierData() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/paymentContract/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then(res => {
        this.listLoading = false
        if (res.data.success === true) {
          var data = res.data.data
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.tableData = data.content
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSupplierData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getSupplierData()
    },
    deleteRow(id) {
      var projectID = { id: [id] }
      this.$post('/paymentContract/delete', projectID).then(res => {
        if (res.data.success === true) {
          this.getSupplierData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    seeRow(id) {
      this.$get('/paymentContract/findUpdateData/' + id).then((res) => {
        var data = res.data.data
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
