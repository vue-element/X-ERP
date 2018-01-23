<template>
  <div class="invoice-add form-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增开票信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="合同编码：" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="开票金额：" prop="name">
              <el-input v-model="ruleForm.code" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="开票号码：" prop="name">
              <el-input v-model="ruleForm.name1" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="开票日期：" prop="name" class="range-date">
              <el-date-picker v-model="value2" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="开票内容：" prop="name">
              <el-input v-model="ruleForm.name1" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn">
        <el-button :loading="loading">保存</el-button>
        <el-button :loading="loading">重置</el-button>
        <el-button :loading="loading">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'invoiceAdd',
  data() {
    return {
      loading: false,
      disabled: false,
      value: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      categoryList: [],
      clientList: [],
      region: [],
      isExecute: [{
        value: '1',
        label: '是'
      }, {
        value: '2',
        label: '否'
      }],
      rules: {

      },
      ruleForm: {
        name: ''
      }
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
.invoice-add.form-container{
  margin-top: 50px;
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
