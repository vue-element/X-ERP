 <template>
  <div class="contract-list">
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" v-loading.body="listLoading" border>
        <el-table-column prop="0" label="序号" fixed width="60">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="contractInfo.name" label="所属项目" fixed width="140"></el-table-column>
        <el-table-column prop="contractInfo.code" label="关联合同" width="120"></el-table-column>
        <el-table-column prop="businessCategory.name" label="业务线"  width="160"></el-table-column>
        <el-table-column prop="code" label="付款合同编号" fixed width="160"></el-table-column>
        <el-table-column prop="supply.name" label="供应商" width="100"></el-table-column>
        <el-table-column prop="applicationPerson" label="申请人"  width="100"></el-table-column>
        <el-table-column prop="applicationTime" label="申请时间" width="100"></el-table-column>
        <el-table-column prop="department" label="申请部门" width="120"></el-table-column>
        <el-table-column prop="paymentObject" label="支付对象" width="100"></el-table-column>
        <el-table-column prop="amount" label="采购金额" width="100"></el-table-column>
        <el-table-column prop="payableAmount" label="应付金额" width="100"></el-table-column>
        <el-table-column prop="payTime" label="到付时间" width="100"></el-table-column>
        <el-table-column prop="deliveryStatus" label="发货状态" width="100"></el-table-column>
        <el-table-column prop="mention" label="是否自提" width="100"></el-table-column>
        <el-table-column prop="term" label="账期" width="100"></el-table-column>
        <el-table-column label="操作" fixed="right" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="seeRow(scope.row.id)" type="text" v-if="hasPerm('paymentContract:findAllByPage')">查看</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" v-if="hasPerm('paymentContract:delete')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
       @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import { winHeight, outputmoney } from '@/utils'
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
          this.tableData.forEach((item) => {
            item.amount = outputmoney('' + item.amount)
            item.payableAmount = outputmoney('' + item.payableAmount)
          })
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
      this.$confirm('确认删除此信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.confirmDel(id)
      }).catch(() => {
        return false
      })
    },
    confirmDel(id) {
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
