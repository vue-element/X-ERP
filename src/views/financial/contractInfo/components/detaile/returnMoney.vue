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
              <el-input v-model="contractReceived.amount"></el-input>
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
        <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" ref="multipleTable">
          <el-table-column align="center" prop="0" label="序号">
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="1" label="回款金额"></el-table-column>
          <el-table-column align="center" prop="2" label="回款日期"></el-table-column>
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
  data() {
    return {
      tableData: [{
        1: '300，000',
        2: '2018-01-18',
        3: '16808930',
        4: '紫御华府智慧社区建设技术服务款'
      }, {
        1: '100，000',
        2: '2018-01-18',
        3: '16808930',
        4: '紫御华府智慧社区建设技术服务款'
      }, {
        1: '500，000',
        2: '2018-01-18',
        3: '16808930',
        4: '紫御华府智慧社区建设技术服务款'
      }],
      height: 100,
      currentPage: 1,
      contractReceived: {
        amount: ''
      }
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 475
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

