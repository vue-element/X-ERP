<template>
  <div class="contractPayment-container form-container">
    <el-form :model="contractPayment" :rules="rules" ref="contractPayment">
      <div class="form-module">
        <h4 class="module-title">
          <p>汇总信息</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="项目累计投入金额：">
              <el-input v-model="contractPayment.name" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="材料累计投入金额：">
              <el-input v-model="contractPayment.materialCost" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="人工累计投入金额：">
              <el-input v-model="contractPayment.artificialCost" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="综合累计投入金额：">
              <el-input v-model="contractPayment.comprehensiveCost" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <div class="list form-module">
      <h4 class="module-title">
        <p>信息资料</p>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" ref="multipleTable">
          <el-table-column align="center" prop="0" label="序号">
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="1" label="投入金额"></el-table-column>
          <el-table-column align="center" prop="2" label="投入日期"></el-table-column>
          <el-table-column align="center" prop="3" label="材料投入金额"></el-table-column>
          <el-table-column align="center" prop="4" label="人工投入金额"></el-table-column>
          <el-table-column align="center" prop="5" label="综合投入金额"></el-table-column>
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
  data() {
    return {
      tableData: [{
        1: '300,000',
        2: '2018-01-11',
        3: '200,000',
        4: '100,000',
        5: '600,000'
      }, {
        1: '300,000',
        2: '2018-01-11',
        3: '200,000',
        4: '100,000',
        5: '600,000'
      }, {
        1: '300,000',
        2: '2018-01-11',
        3: '200,000',
        4: '100,000',
        5: '600,000'
      }, {
        1: '300,000',
        2: '2018-01-11',
        3: '200,000',
        4: '100,000',
        5: '600,000'
      }, {
        1: '300,000',
        2: '2018-01-11',
        3: '200,000',
        4: '100,000',
        5: '600,000'
      }],
      height: 100,
      currentPage: 1,
      contractPayment: {
        name: '',
        materialCost: '',
        artificialCost: '',
        comprehensiveCost: ''
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
      this.height = winHeight() - 532
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.contractPayment-container.form-container{
  border:none;
  margin-top:140px;
  .total.form-module{
    .el-row{
      margin-bottom:10px;
      .el-col{
        .item {
          margin-top: 20px;
          label {
            color: #000;
            width: 18%;
            line-height: 16px;
            word-wrap: wrap;
            font-size: 14px;
            vertical-align:middle;
            display:inline-block;
            text-align:right;
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
