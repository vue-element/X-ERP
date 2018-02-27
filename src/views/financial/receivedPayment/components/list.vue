<template>
  <div class="contract-list">
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" ref="multipleTable">
        <el-table-column align="center" prop="0" label="序号">
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="contractBilling.contractInfo.code" label="合同编号"></el-table-column>
        <el-table-column prop="contractBilling.contractInfo.name" label="合同名称"></el-table-column>
        <el-table-column prop="contractBilling.contractInfo.region.name" label="所属办事处"></el-table-column>
        <el-table-column prop="contractBilling.number" label="发票号码"></el-table-column>
        <el-table-column prop="amount" label="回款金额"></el-table-column>
        <el-table-column prop="date" label="回款日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click="seeRow(scope.row)" type="text" size="small">查看</el-button> -->
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
  name: 'receivedPaymentList',
  props: ['searchData'],
  data() {
    return {
      listLoading: false,
      height: 100,
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      tableData: [
        {
          contractBilling: {
            contractInfo: {}
          }
        }
      ]
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    this.getPaymentData()
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
    },
    getPaymentData() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/ContractReceived/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then(res => {
        if (res.data.success === true) {
          this.listLoading = false
          var data = res.data.data
          console.log('data', data)
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.tableData = data.content
        }
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPaymentData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getPaymentData()
    },
    deleteRow(id) {
      var projectID = { id: [id] }
      this.$post('/ContractReceived/delete', projectID).then(res => {
        if (res.data.success === true) {
          this.getPaymentData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    editRow(id) {
      this.$get('/ContractReceived/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        this.$emit('editRow', data)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>
