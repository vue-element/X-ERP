<template>
  <div class="disclosure_info form-container">
    <div class="form-module inp">
      <h4 class="module-title">
        <p>合同交底信息录入</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="8">
          <div class="item">
            <label>材料成本交底金额(元)：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <div class="item">
            <label>材料成本交底后变更金额(元)：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="8">
          <div class="item">
            <label>材料成本目标总金额(元)：</label>
            <input type="text">
          </div>
        </el-col>
      </el-row>
      <div class="btn">
        <div class="con-search-btn">保&nbsp;&nbsp;&nbsp;存</div>
        <div class="con-search-btn">重&nbsp;&nbsp;&nbsp;置</div>
        <div class="con-search-btn">取&nbsp;&nbsp;&nbsp;消</div>
      </div>
    </div>

    <div class="form-module list">
      <h4 class="module-title">
        <p>合同交底附件列表</p>
        <div class="con-search-btn up_files">附件上传</div>
      </h4>

      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" ref="multipleTable">
          <el-table-column align="center" prop="0" label="序号">
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="1" label="附件名称"></el-table-column>
          <el-table-column align="center" prop="2" label="附件说明"></el-table-column>
          <el-table-column align="center" prop="3" label="上传人"></el-table-column>
          <el-table-column align="center" prop="4" label="上传时间"></el-table-column>
          <el-table-column align="center" prop="5" label="操作"></el-table-column>
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
        1: '附件1：长春中海国际社区合同交底记录-国社.doc',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
      }, {
        1: '附件2：长春中海国际社区智能化工程设备采购粮单.xls',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
      }, {
        1: '附件3：长春中海国际社区智能化合同交底说明书.doc',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
      }, {
        1: '附件4：长春中海国际社区智能化合同交底说明书.doc',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
      },
      {
        1: '附件4：长春中海国际社区合同交底记录-国社.doc',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
      }, {
        1: '附件5：长春中海国际社区智能化工程设备采购粮单.xls',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
      }, {
        1: '附件6：长春中海国际社区智能化合同交底说明书.doc',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
      }, {
        1: '附件7：长春中海国际社区智能化合同交底说明书.doc',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
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
      this.height = winHeight() - 482
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.disclosure_info.form-container{
  border:none;
  margin:0;
  padding:0;
  .form-module.inp{
    .el-row{
      margin-bottom:10px;
      .el-col{
        .item {
          margin-top: 20px;
          label {
            color: #000;
            width: 30%;
            line-height: 16px;
            word-wrap: wrap;
            font-size: 14px;
            vertical-align:middle;
            display:inline-block;
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
    .btn{
      text-align:center;
      div.con-search-btn{
        margin-left:30px;
        display:inline-block;
      }
    }
  }
  .form-module.list{
    margin-bottom:0;
    .module-title{
      position:relative;
      .up_files{
        position:absolute;
        top:-20px;
        right:0;
      }
    }
  }
}
</style>
