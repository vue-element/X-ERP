<template>
  <div>
  <div class="basicInfo-container form-container" ref="ele">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="basic form-module">
      <h4 class="module-title">
        <p>基础信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="6">
          <!-- <div class="basic-item">
            <label>合同名称：</label>
            <input type="text">
          </div> -->
          <el-form-item label="合同名称：" prop="name" label-position="right">
            <el-input name="name" type="text" @click.native="usernameClick" placeholder="请输入您的账号" /></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <!-- <div class="basic-item">
            <label>城市：</label>
            <input type="text">
          </div> -->
          <el-form-item label="城市：" prop="name">
            <el-input name="name" type="text" @click.native="usernameClick" placeholder="请输入您的账号" /></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <div class="basic-item">
            <label>业务线名称：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <div class="basic-item">
            <label>来源单类型：</label>
            <input type="text">
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="basic form-module">
    </div>
    <div class="timeNodes form-module">
      <h4 class="module-title">
        <p>时间节点信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="6">
          <div class="basic-item">
            <label>归档日期：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <div class="basic-item">
            <label>合同所属年月：</label>
            <input type="text">
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="invoice form-module">
      <h4 class="module-title">
        <p>开票回款信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="6">
          <div class="basic-item">
            <label>开票原始金额(元)：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <div class="basic-item">
            <label>累计开票金额(元)：</label>
            <input type="text">
          </div>
        </el-col>
         <el-col :xs="24" :sm="12" :lg="6">
          <div class="basic-item">
            <label>已开票未回款金额(元)：</label>
            <input type="text">
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="project form-module">
      <h4 class="module-title">
        <p>项目投入信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="basic-item">
            <label>材料成本目标总金额(元)：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="basic-item">
            <label>期末未投入金额(元)：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="basic-item">
            <label>项目目标成本总金额(元)：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="basic-item">
            <label>综合成本累计投入金额(元)：</label>
            <input type="text">
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="last-project form-module">
      <h4 class="module-title">
        <p>项目合同结束</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="basic-item">
            <label>项目实际验收时间：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="basic-item">
            <label>质保金金额(元)：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="basic-item">
            <label>合同是否执行结束：</label>
            <input type="text">
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="project-res form-module">
      <h4 class="module-title">
        <p>项目经营成果</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="6">
          <div class="basic-item">
            <label>计划毛利(元)：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="6">
          <div class="basic-item">
            <label>实际毛利率：</label>
            <input type="text">
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <div class="commont-btn">
    <el-button>保存</el-button>
    <el-button>重置</el-button>
    <el-button>取消</el-button>
  </div>
</div>
</template>

<script>
// import { winHeight } from '@/utils'
export default {
  data() {
    return {

    }
  },
  methods: {

  },
  created() {

  },
  mounted() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.basicInfo-container.form-container{
  margin:0;
  overflow-y:auto;
  @include noScroll;
  .form-module{
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
            text-align:right;
          }
          input {
            width: 38%;
            height: 28px;
            border: 1px solid #828282;
            @include borderRadius(4px);
            text-indent: 12px;
            vertical-align:middle;
          }
        }
      }
    }
  }
  .btn{
    text-align:center;
    margin-bottom:30px;
    div.common-btn{
      margin-left:30px;
      display:inline-block;
    }
  }
  .invoice{
    label{
      text-align:left !important;
    }
  }
}
</style>
