<template>
  <div class="pay_money">
    <div class="total">
      <div class="title">
        <p>汇总信息</p>
      </div>
      <div class="inp">
        <el-form ref="form">
          <el-form-item label="项目累计投入金额">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="材料累计投入金额">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="人工累计投入金额">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="综合累计投入金额">
            <el-input></el-input>
          </el-form-item>
        </el-form>
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
      }],
      height: 100,
      currentPage: 1
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
      this.height = winHeight() - 450
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.pay_money{
  .total{
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
    .inp{
      .el-form{
        margin:20px 0 20px 15px;
        @include flex;
        flex-wrap: wrap;
        .el-form-item{
          flex:50%;
          @include flex;
          .label{
            flex:1;
            font-size:14px;
            color:#000;
          }
          .el-form-item__content{
            flex:1;
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
  }
}
</style>

<style rel="stylesheet/scss">
.pay_money .total .inp .el-form .el-form-item .el-form-item__content .el-input__inner{
  width: 170%;
}
</style>
