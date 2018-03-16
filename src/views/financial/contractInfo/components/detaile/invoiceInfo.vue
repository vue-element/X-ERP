<template>
  <div class="invoice-info-container form-container">
    <el-form :model="invoceInfo" ref="invoceInfo">
      <div class="form-module">
        <h4 class="module-title">
          <p>汇总信息</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="开票抬头名称">
              <p>{{invoceInfo.name}}</p>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="累计开票金额">
              <p>{{invoceInfo.totalAmount}}</p>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div class="form-module">
      <h4 class="module-title">
        <p>开票详情</p>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="invoceInfoData" :height="height" ref="multipleTable" border>
          <el-table-column align="center" prop="0" label="序号" width="60" fixed>
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="开票金额"></el-table-column>
          <el-table-column prop="date" label="开票日期"></el-table-column>
          <el-table-column prop="number" label="发票号码"></el-table-column>
          <el-table-column prop="content" label="开票内容" width="400"></el-table-column>
        </el-table>
        <el-pagination class="page" background :current-page="currentPage" :page-sizes="[1, 2, 3]"
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
      invoceInfoData: [],
      height: 100,
      currentPage: 1,
      total: 5,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      invoceInfo: {
        name: '',
        totalAmount: ''
      }
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    if (this.editData.tabState === 'editTab') {
      this.getInvoceInfo()
    } else {
      this.invoceInfo = {
        name: '',
        totalAmount: ''
      }
    }
  },
  methods: {
    resize() {
      this.height = winHeight() - 475
    },
    getInvoceInfo() {
      var basicInfoID = this.editData.editData.id
      this.$get('/contractBilling/findAllByContractInfo/' + basicInfoID).then((res) => {
        this.invoceInfoData = res.data.data.contractBillingList.content
        this.invoceInfo.totalAmount = res.data.data.totalAmount
      })
    },
    getInvoceInfoData() {
      // var basicInfoID = this.editData.editData.id
      // var pageSize = this.pageSize || 15
      // var page = this.currentPage - 1 || 0
      // var url = '/contractBilling/search?size=' + pageSize + '&page=' + page
      // this.$post(url, basicInfoID, false).then((res) => {
      //   console.log(res)
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.invoice-info-container.form-container{
  border:none;
  margin-top:140px;
}
</style>
