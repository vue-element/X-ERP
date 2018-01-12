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
  </div>
</template>

<script>
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
        margin-top:20px;
        text-align:center;
        div{
          width:130px;
          height:30px;
          margin-right:30px;
          border-radius:4px;
          background-color:#35d5ba;
          border:1px solid #35d5ba;
        }
        div:nth-child(1){
          margin-left:25%;
        }
      }
    }
  }
}
</style>

<style rel="stylesheet/scss">
.disclosure_info .inp .info_item .el-form .el-form-item .el-form-item__content .el-input__inner{  width:190%;
}
</style>
