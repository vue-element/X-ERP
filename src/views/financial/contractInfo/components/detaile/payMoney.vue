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
    <div class="list form-module">
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
        <el-pagination class="page" background :current-page="currentPage" :page-sizes="[1, 2, 3, 4]"
    :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="10"></el-pagination>
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
      paymentData: [],
      height: 100,
      currentPage: 1,
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
      this.height = winHeight() - 562
    },
    getContractPayment() {
      var paymentID = this.editData.editData.id
      this.$get('/contractPayment/findAllByContractInfo/' + paymentID).then((res) => {
        this.paymentData = res.data.data.contractPaymentList.content
        this.contractPayment.totalProAmount = res.data.data.totalProAmount
        this.contractPayment.totalMaterialCost = res.data.data.totalMaterialCost
        this.contractPayment.totalArtificialCost = res.data.data.totalArtificialCost
        this.contractPayment.totalComprehensiveCost = res.data.data.totalComprehensiveCost
        this.contractPayment.totalManageCost = res.data.data.totalManageCost
        this.contractPayment.totalTax = res.data.data.totalTax
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.contractPayment-container.form-container{
  border:none;
  margin-top:140px;
  &::-webkit-scrollbar{
    width: 0;
  }
  .total.form-module{
    .el-row{
      margin-bottom:10px;
      .el-col{
        .item {
          margin-top: 20px;
          label {
            // color: #000;
            // width: 18%;
            // line-height: 16px;
            // word-wrap: wrap;
            // font-size: 14px;
            // vertical-align:middle;
            // display:inline-block;
            // text-align:right;
          }
          input {
            width: 50%;
            height: 32px;
            border: 1px solid #828282;
            @include borderRadius(4px);
            text-indent: 12px;
            vertical-align:middle;
          }
        }
      }
    }
  }
}
</style>
