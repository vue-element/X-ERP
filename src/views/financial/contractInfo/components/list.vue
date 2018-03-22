<template>
  <div class="table">
    <el-table class="basic-form" style="width: 100%" :data="contractInfoData" :height="height" v-loading.body="listLoading" element-loading-text="拼命加载中" border>
      <el-table-column prop="0" label="序号" width="80" fixed>
        <template slot-scope="scope">
         {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="code" label="合同编码" width="140"></el-table-column>
      <el-table-column prop="name" label="合同名称" width="240"></el-table-column>
      <el-table-column prop="business.region.name" label="所属办事处" width="140"></el-table-column>
      <el-table-column prop="term" label="合同所属期" width="140"></el-table-column>
      <el-table-column prop="changeAmount" label="变更后合同金额"></el-table-column>
      <el-table-column prop="invoicedAmount" label="已开票金额"></el-table-column>
      <el-table-column prop="receivedAmount" label="已回款金额"></el-table-column>
      <el-table-column prop="invoiceNoReceive" label="已开票未回款金额"></el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button @click="seeRow(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
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
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/contractInfo/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then((res) => {
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
      this.$get('/contractInfo/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        data.id = id
        this.$emit('editRow', data)
      })
    },
    deleteRow(id) {
      this.$confirm('此操作将删除该条信息, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var contractInfoID = { id: [id] }
        this.$post('/contractInfo/delete', contractInfoID).then((res) => {
          if (res.status === 200) {
            this.getContractInfoData()
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
