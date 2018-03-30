<template>
  <div class="returnMoney-container form-container">
    <el-form :model="contractReceived" ref="contractReceived">
      <div class="form-module">
        <h4 class="module-title">
          <p>汇总信息</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="累计回款金额：">
              <p>{{contractReceived.totalAmount}}</p>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div class="form-module">
      <h4 class="module-title">
        <p>回款详情</p>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="contractReceivedData" :height="height" ref="multipleTable" border>
          <el-table-column prop="0" label="序号" width="180" fixed>
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="回款金额"></el-table-column>
          <el-table-column prop="date" label="回款日期"></el-table-column>
        </el-table>
        <el-pagination class="page" background :current-page="currentPage" :page-sizes="[1, 2, 3]"
  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="10"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { winHeight, formatDate } from '@/utils'
export default {
  props: ['editData'],
  data() {
    return {
      contractReceivedData: [],
      height: 100,
      currentPage: 1,
      contractReceived: {
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
      this.getContractReceived()
    } else {
      this.contractReceived = {
        totalAmount: ''
      }
    }
  },
  methods: {
    resize() {
      this.height = winHeight() - 475
    },
    getContractReceived() {
      var contractReceivedID = this.editData.editData.id
      this.$get('/contractReceived/findAllByContractInfo/' + contractReceivedID).then((res) => {
        console.log(res)
        var data = res.data.data.contractReceivedList
        for (var i = 0; i < data.length; i++) {
          var date = formatDate(data[i].date)
          console.log(date)
          data[i].date = date
        }
        this.contractReceived.totalAmount = res.data.data.totalAmount
        this.contractReceivedData = res.data.data.contractReceivedList
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.returnMoney-container.form-container{
  border:none;
  margin-top:140px;
  &::-webkit-scrollbar{
    width: 0;
  }
}
</style>

