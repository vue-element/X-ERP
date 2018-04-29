 <template>
  <div class="contract-list">
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" v-loading.body="listLoading" border>
        <el-table-column prop="0" label="序号" fixed width="60" fixed="left">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="paymentContract.orderCode" label="订单编号" min-width="160"></el-table-column>
        <el-table-column prop="paymentContract.code" label="付款合同编号/入库单编号" min-width="180"></el-table-column>
        <el-table-column prop="paymentContract.department" label="使用部门" min-width="120"></el-table-column>
        <el-table-column prop="paymentContract.supply.name" label="供应商" min-width="160"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="hasPerm('inboundList:findUpdateData')" @click.native.prevent="seeRow(scope.row.id)" type="text">查看</el-button>
            <!-- <el-button @click.native.prevent="checkRow(scope.row.id)" type="text">审核</el-button> -->
            <!-- <el-button @click.native.prevent="exportRow(scope.row.id)" type="text">导出</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
       @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { winHeight } from '@/utils'
export default {
  name: 'paymentContractList',
  props: ['searchData', 'pageObj'],
  data() {
    return {
      listLoading: false,
      height: 100,
      total: 5,
      currentPage: 1,
      pageSizes: [2, 3, 16],
      pageSize: 2,
      tableData: []
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
      this.searchData.role_code = this.roleCode
      var url = '/inboundList/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then(res => {
      // var url = '/inboundList/findAllByPage/' + this.roleCode + '?size=' + pageSize + '&page=' + page
      // this.$get(url).then(res => {
        this.listLoading = false
        if (res.data.success === true) {
          var data = res.data.data
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.tableData = data.content
          // console.log('this.tableData', this.tableData)
          this.$emit('exportData', this.tableData)
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
      this.$post('/inboundList/delete', projectID).then(res => {
        if (res.data.success === true) {
          this.getSupplierData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    exportRow() {},
    seeRow(id) {
      this.$get('/inboundList/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        data.currentPage = this.currentPage
        data.pageSize = this.pageSize
        this.$emit('editRow', data)
      })
    }
  },
  watch: {
  },
  computed: {
    ...mapGetters([
      'roleCode'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>
