<template>
  <div class="contract-list">
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" ref="multipleTable" border>
        <el-table-column align="center" prop="0" label="序号" width="60" fixed>
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="contractInfo.code" label="合同编号"></el-table-column>
        <el-table-column align="center" prop="contractInfo.name" label="合同名称" width="200"></el-table-column>
        <el-table-column align="center" prop="contractInfo.region.name" label="所属办事处" width="120"></el-table-column>
        <el-table-column align="center" prop="artificialCost" label="人工成本投入" width="120"></el-table-column>
        <el-table-column align="center" prop="materialCost" label="材料成本投入" width="120"></el-table-column>
        <el-table-column align="center" prop="comprehensiveCost" label="综合成本投入" width="120"></el-table-column>
        <el-table-column align="center" prop="manageCost" label="管理费用" width="120"></el-table-column>
        <el-table-column align="center" prop="tax" label="税金" width="120"></el-table-column>
          <el-table-column align="center" prop="inputDate" label="投入日期" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作">
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
  name: 'paymentList',
  props: ['searchData'],
  data() {
    return {
      height: 100,
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      tableData: [{
        id: '1',
        number: '2018001176',
        name: '深圳市中海华庭电梯监管服务合同',
        area: '深圳办事处',
        date: '2018-01',
        changeMoney: '1,000,000',
        payMoney: '1,100,000',
        returnMoney: '500,000',
        payNoReturn: '300,000'
      }, {
        id: '2',
        number: '2018001177',
        name: '深圳市中海华庭电梯监管服务合同',
        area: '深圳办事处',
        date: '2018-01',
        changeMoney: '1,000,000',
        payMoney: '1,100,000',
        returnMoney: '500,000',
        payNoReturn: '300,000'
      }]
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
      console.log('searchData', this.searchData)
      var url = '/ContractPayment/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then(res => {
        if (res.data.success === true) {
          var data = res.data.data
          console.log('data', data)
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
      this.getPaymentData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getPaymentData()
    },
    deleteRow(id) {
      var projectID = { id: [id] }
      this.$post('/ContractPayment/delete', projectID).then(res => {
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
      this.$get('/ContractPayment/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        console.log('data', data)
        this.$emit('editRow', data)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>
