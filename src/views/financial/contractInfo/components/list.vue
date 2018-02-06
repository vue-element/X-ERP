<template>
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="contractInfoData" :height="height" v-loading.body="listLoading" element-loading-text="拼命加载中">
        <el-table-column align="center" prop="0" label="序号">
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="合同编码"></el-table-column>
        <el-table-column prop="name" label="合同名称"></el-table-column>
        <el-table-column prop="region.name" label="所属办事处"></el-table-column>
        <el-table-column prop="term" label="合同所属期"></el-table-column>
        <el-table-column prop="changeAmount" label="变更后合同金额"></el-table-column>
        <el-table-column prop="invoicedAmount" label="已开票金额"></el-table-column>
        <el-table-column prop="receivedAmount" label="已回款金额"></el-table-column>
        <el-table-column prop="invoiceNoReceive" label="已开票未回款金额"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="seeRow(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes"
:page-size="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  props: ['searchData'],
  data() {
    return {
      listLoading: false,
      currentPage: 1,
      total: 5,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      contractInfoData: [],
      height: 100
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
      var searchData = this.searchData
      for (var key in searchData) {
        if (searchData[key] === '') {
          delete searchData[key]
        }
      }
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/contractInfo/search?size=' + pageSize + '&page=' + page
      this.$post(url, searchData, false).then((res) => {
        var data = res.data.data
        for (var i = 0; i < data.content.length; i++) {
          var invoiceNoReceive = data.content[i].invoicedAmount - data.content[i].receivedAmount
          data.content[i].invoiceNoReceive = invoiceNoReceive
        }
        this.contractInfoData = data.content
        this.total = data.totalElements
        this.currentPage = data.number + 1
        this.pageSize = data.size
        this.listLoading = false
      })
    },
    seeRow(id) {
      console.log(id)
    },
    deleteRow() {
    },
    editRow() {
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getContractInfoData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getContractInfoData()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>
