<template>
  <div class="contractInfo-search form-container">
     <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="basic">
        <div class="search form-module">
          <h4 class="module-title">
            <p>查询条件</p>
          </h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同名称：" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入您的账号" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同编码：" prop="name">
                <el-input v-model="ruleForm.number" placeholder="请输入您的账号" :disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="业务分类：" prop="name">
                <el-select v-model="ruleForm.work" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="range-date" label="合同所属年月：" prop="name">
                <el-date-picker v-model="ruleForm.firstEntryDate" type="daterange"  start-placeholder="开始日期" range-separator="—" end-placeholder="结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="single-date" label="签订时间：" prop="name">
                <el-date-picker v-model="ruleForm.sign" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="所属区域：" prop="name">
                <el-select v-model="ruleForm.office" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="是否执行结束：" prop="name">
                <el-select v-model="ruleForm.isExecute" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="commont-btn">
          <el-button>保存</el-button>
        </div>
      </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabled: false,
      ruleForm: {
        name: '',
        number: '',
        work: '',
        firstEntryDate: '',
        sign: '',
        office: '',
        isExecute: [{
          value: '1',
          label: '是'
        }, {
          value: '2',
          label: '否'
        }]
      },
      rules: {}
    }
  },
  created() {

  },
  methods: {

  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.contractInfo-search.form-container{
  .form-module{
    .el-row{
      margin-bottom:10px;
      .el-col{
        .item {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
