<template>
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="contractInfoData" :height="height" >
        <el-table-column align="center" prop="0" label="序号">
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="合同编码"></el-table-column>
        <el-table-column prop="name" label="合同名称"></el-table-column>
        <el-table-column prop="region.name" label="所属办事处"></el-table-column>
        <el-table-column prop="term" label="合同所属年月"></el-table-column>
        <el-table-column prop="changeAmount" label="变更后合同金额"></el-table-column>
        <el-table-column prop="invoicedAmount" label="已开票金额"></el-table-column>
        <el-table-column prop="receivedAmount" label="已回款金额"></el-table-column>
        <el-table-column prop="payNoReturn" label="已开票未回款金额"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="seeRow(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes"
:page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  data() {
    return {
      height: 100,
      currentPage: 1,
      total: 5,
      pageSizes: [10, 12, 15],
      pageSize: 10,
      contractInfoData: []
    }
  },
  created() {
    this.getContractInfoData()
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 220
    },
    getContractInfoData() {
      var pageSize = this.pageSize || 12
      var page = this.currentPage - 1 || 0
      var url = 'http://202.105.96.131:8081/contractInfo/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then((res) => {
        var data = res.data.data
        this.contractInfoData = data.content
        this.total = data.totalElements
        this.currentPage = data.number + 1
        this.pageSize = data.size
      })
    },
    seeRow(row) {
      this.$emit('seeRow', row)
      // this.$router.push({ path: '/financial/contract-info?status=add' })
    },
    deleteRow(id) {
      // var contractID = id
      // this.$post('/contractInfo/delete', contractID).then((res) => {
      //   console.log(res)
      // })
    },
    editRow() {
      // this.$router.push({ path: '/financial/detaileInfo' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>
