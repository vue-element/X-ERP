 <template>
  <div class="contract-list">
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" v-loading.body="listLoading" border>
        <el-table-column label="序号" fixed width="60">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="name" label="供应商名称" fixed width="100"></el-table-column>
        <el-table-column prop="cooperativeType" label="合作商类别" fixed width="100"></el-table-column>
        <el-table-column prop="type" label="供应商类别" width="120"></el-table-column>
        <el-table-column prop="category" label="供应商类型" width="120"></el-table-column>
        <el-table-column prop="licenseNumber" label="营业执照号" width="120"></el-table-column>
        <el-table-column prop="enterpriseNature" label="企业性质" width="80"></el-table-column>
        <el-table-column prop="region" label="供货区域" width="100"></el-table-column>
        <el-table-column prop="materialCategory" label="物质类别" width="80"></el-table-column>
        <el-table-column prop="reviewState" label="评审状态" width="80"></el-table-column>
        <el-table-column prop="bank" label="开户银行" width="120"></el-table-column>
        <el-table-column prop="bankAccount" label="银行账号" width="140"></el-table-column>
        <el-table-column prop="invoiceType" label="发票类型" width="120"></el-table-column>
        <el-table-column prop="taxRate" label="税率" width="80"></el-table-column>
        <el-table-column prop="enterprisePerson" label="企业法人" width="80">></el-table-column>
        <el-table-column prop="person" label="联系人" width="80"></el-table-column>
        <el-table-column prop="phone" label="联系人电话" width="100"></el-table-column>
        <el-table-column prop="regAddress" label="注册地址" width="200"></el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
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
  name: 'supplierList',
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
      var url = '/supply/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then(res => {
        if (res.data.success === true) {
          this.listLoading = false
          var data = res.data.data
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.tableData = data.content
          this.$emit('exportData', data.content)
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
      this.$post('/supply/delete', projectID).then(res => {
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
      this.$get('/supply/findUpdateData/' + id).then((res) => {
        if (res.data.success === true) {
          var data = res.data.data
          this.$emit('editRow', data)
        }
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
