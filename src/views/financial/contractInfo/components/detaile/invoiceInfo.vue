<template>
  <div class="invoice-info-container form-container">
    <div class="inp form-module">
      <h4 class="module-title">
        <p>汇总信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="8">
          <div class="item">
            <label>开票抬头名称：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <div class="item">
            <label>累计开票金额：</label>
            <input type="text">
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="list form-module">
      <h4 class="module-title">
        <p>开票详情</p>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" ref="multipleTable">
          <el-table-column align="center" prop="0" label="序号">
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="1" label="开票金额"></el-table-column>
          <el-table-column align="center" prop="2" label="开票日期"></el-table-column>
          <el-table-column align="center" prop="3" label="开票号码"></el-table-column>
          <el-table-column align="center" prop="4" label="开票内容"></el-table-column>
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
      currentPage: 1
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
      this.height = winHeight() - 460
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.invoice-info-container.form-container{
  border:none;
  margin:0;
  .inp.form-module{
    .el-row{
      margin-bottom:10px;
      .el-col{
        .item {
          margin-top: 20px;
          label {
            color: #000;
            width: 35%;
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
  .list.form-module{
    margin-bottom:0;
    .module-title{
      position:relative;
      .up-files{
        position:absolute;
        top:-20px;
        right:0;
      }
    }
  }
}
</style>
