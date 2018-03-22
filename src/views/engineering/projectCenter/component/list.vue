<template>
  <div class="table">
    <el-table class="basic-form" style="width: 100%" :height="height" v-loading.body="listLoading" element-loading-text="拼命加载中" border>
      <el-table-column prop="0" label="序号" width="80" fixed>
        <template slot-scope="scope">
         {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="商机号/合同号" width="140"></el-table-column>
      <el-table-column prop="" label="项目名称" width="240"></el-table-column>
      <el-table-column prop="" label="区域" width="140"></el-table-column>
      <el-table-column prop="" label="业务分类" width="140"></el-table-column>
      <el-table-column prop="" label="原合约额"></el-table-column>
      <el-table-column prop="" label="增补合约金额"></el-table-column>
      <el-table-column prop="" label="开工时间"></el-table-column>
      <el-table-column prop="" label="竣工时间"></el-table-column>
      <el-table-column prop="" label="项目经理"></el-table-column>
      <el-table-column fixed="" label="操作" width="140">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes"
:page-size="pageSize" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listLoading: false,
      currentPage: 1,
      total: 5,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      height: 100
    }
  },
  created() {
  },
  methods: {
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
