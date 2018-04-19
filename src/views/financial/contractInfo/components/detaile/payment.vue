<template>
  <div class="contractPayment-container form-container">
    <el-form :model="contractPayment" ref="contractPayment">
      <div class="form-module">
        <h4 class="module-title">
          <p>汇总信息</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="项目累计投入：">
              <p>{{contractPayment.totalProAmount}}</p>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="材料累计投入：">
              <p>{{contractPayment.totalMaterialCost}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="人工累计投入：">
              <p>{{contractPayment.totalArtificialCost}}</p>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="综合累计投入：">
              <p>{{contractPayment.totalComprehensiveCost}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="管理累计投入：">
              <p>{{contractPayment.totalManageCost}}</p>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="税金累计投入：">
              <p>{{contractPayment.totalTax}}</p>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div class="form-module table">
      <h4 class="module-title">
        <p>成本详情</p>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="paymentData" :height="height" ref="multipleTable" border>
          <el-table-column align="center" prop="0" label="序号" width="100">
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="totalAmount" label="投入金额"></el-table-column>
          <el-table-column prop="inputDate" label="投入日期"></el-table-column>
          <el-table-column prop="materialCost" label="材料投入金额"></el-table-column>
          <el-table-column prop="artificialCost" label="人工投入金额"></el-table-column>
          <el-table-column prop="comprehensiveCost" label="综合投入金额"></el-table-column>
          <el-table-column prop="manageCost" label="管理费用"></el-table-column>
          <el-table-column prop="tax" label="税金"></el-table-column>
        </el-table>
        <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes"
  :page-size="pageSize" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  props: ['editData'],
  data() {
    return {
      height: 100,
      currentPage: 1,
      total: 5,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      paymentData: [],
      contractPayment: {
        totalAmount: '',
        totalMaterialCost: '',
        totalArtificialCost: '',
        totalComprehensiveCost: '',
        totalManageCost: '',
        totalTax: ''
      }
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    if (this.editData.tabState === 'editTab') {
      this.getContractPayment()
    } else {
      this.contractPayment = {
        totalProAmount: '',
        totalMaterialCost: '',
        totalArtificialCost: '',
        totalComprehensiveCost: '',
        totalManageCost: '',
        totalTax: ''
      }
    }
  },
  methods: {
    resize() {
      this.height = winHeight() - 545
    },
    getContractPayment() {
      var paymentID = this.editData.editData.id
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      this.$get('/contractPayment/findAllByContractInfo/' + paymentID + '?size=' + pageSize + '&page=' + page).then((res) => {
        var data = res.data.data
        this.paymentData = data.contractPaymentList.content
        this.contractPayment.totalProAmount = data.totalProAmount
        this.contractPayment.totalMaterialCost = data.totalMaterialCost
        this.contractPayment.totalArtificialCost = data.totalArtificialCost
        this.contractPayment.totalComprehensiveCost = data.totalComprehensiveCost
        this.contractPayment.totalManageCost = data.totalManageCost
        this.contractPayment.totalTax = data.totalTax
        this.total = data.contractPaymentList.totalElements
        this.currentPage = data.contractPaymentList.number + 1
        this.pageSize = data.contractPaymentList.size
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getContractPayment()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getContractPayment()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.contractPayment-container.form-container{
  &::-webkit-scrollbar{
    width: 0;
  }
  h4.module-title{
    padding: 5px 0;
  }
  .table.form-module{
    margin-bottom: 0;
  }
}
</style>
