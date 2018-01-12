<template>
  <div class="pay_money">
    <div class="form-module">
      <h4>
        <p>汇总信息</p>
      </h4>
      <div class="inp">
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="8">
            <div class="item">
              <label>项目累计投入金额：</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <div class="item">
              <label>材料累计投入金额：</label>
              <input type="text">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="8">
            <div class="item">
              <label>人工累计投入金额：</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <div class="item">
              <label>综合累计投入金额：</label>
              <input type="text">
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="show">
      <div class="title">
        <p>信息资料</p>
      </div>
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
      height: 100,
      currentPage: 1,
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
      }]
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 378
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.pay_money{
  .form-module{
    // .title{
    //   border-bottom:2px solid #d2d2d2;
    //   padding-bottom:10px;
    //   p{
    //     font-size:14px;
    //     color:#000;
    //     padding-left:10px;
    //     border-left:5px solid #35d5ba;
    //   }
    // }
    .inp{
      margin-bottom:40px;
      .el-row {
        .item {
          margin-top: 20px;
          label {
            color: #000;
            width: 30%;
            line-height: 16px;
            word-wrap: wrap;
            font-size: 14px;
            text-align:right;
            vertical-align:middle;
            display:inline-block;
          }
          input {
            width: 65%;
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
  .show{
    .title{
      border-bottom:2px solid #d2d2d2;
      padding-bottom:10px;
      p{
        font-size:14px;
        color:#000;
        padding-left:10px;
        border-left:5px solid #35d5ba;
      }
    }
    .table{
    }
  }
}
</style>

<style rel="stylesheet/scss">
.pay_money .total .inp .el-form .el-form-item .el-form-item__content .el-input__inner{
  width: 170%;
}
</style>
