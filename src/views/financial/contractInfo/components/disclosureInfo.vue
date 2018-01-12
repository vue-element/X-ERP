<template>
  <div class="disclosure_info">
    <div class="inp">
      <div class="info_item">
        <div class="title">
          <p>交底信息</p>
        </div>
        <el-form ref="form">
          <el-form-item label="材料成本交底金额(元):">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <div class="title">
          <p>交底后变更信息</p>
        </div>
        <el-form ref="form">
          <el-form-item label="材料成本交底后变更金额(元):">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <div class="title">
          <p>最终目标成本</p>
        </div>
        <el-form ref="form">
          <el-form-item label="材料成本目标总金额(元):">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <div class="con-search-btn">保&nbsp;&nbsp;&nbsp;存</div>
          <div class="con-search-btn">重&nbsp;&nbsp;&nbsp;置</div>
          <div class="con-search-btn">取&nbsp;&nbsp;&nbsp;消</div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="title">
        <p>合同交底附件列表</p>
        <div class="con-search-btn">附件上次</div>
      </div>
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
      this.height = winHeight() - 710
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.disclosure_info{
  .inp{
    .info_item{
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
      .el-form{
        margin:20px 0 0 15px;
        .el-form-item{
          @include flex;
        }
      }
      .btn{
        margin:0 auto;
        margin-top:20px;
        text-align:center;
        div{
          display:inline-block;
          width:130px;
          height:30px;
          margin-right:30px;
          border-radius:4px;
          background-color:#35d5ba;
          border:1px solid #35d5ba;
        }
      }
    }
  }
  .list{
    margin-top:40px;
    .title{
      @include flex;
      height:32px;
      p{
        flex:1;
        height:16px;
        margin-top:5px;
        font-size:14px;
        color:#000;
        padding-left:10px;
        border-left:5px solid #35d5ba;
      }
      .con-search-btn{
        width:130px;
        height:30px;
        margin:0 auto 20px;
      }
    }
    .table{
      margin-top:10px;
    }
  }
}
</style>

<style rel="stylesheet/scss">
.disclosure_info .inp .info_item .el-form .el-form-item .el-form-item__content .el-input__inner{
  width:150%;
}
</style>
