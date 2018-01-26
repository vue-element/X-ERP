<template>
  <div class="invoice-search form-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="业务线名称：" prop="name">
              <el-select v-model="ruleForm.name" placeholder="请选择">
                <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="所属区域：" prop="name">
              <el-select v-model="ruleForm.name" placeholder="请选择">
                <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="业务分类：" prop="name">
              <el-select v-model="ruleForm.name" placeholder="请选择">
                <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="合同所属年月：" prop="name" class="range-date">
              <el-date-picker v-model="value2" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="合同编号：" prop="name">
              <el-input v-model="ruleForm.name1" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="合同名称：" prop="name">
              <el-input v-model="ruleForm.name1" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="发票抬头名称：" prop="name">
              <el-input v-model="ruleForm.name1" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="发票号码：" prop="name">
              <el-input v-model="ruleForm.name1" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="签订日期：" prop="name" class="range-date">
              <el-date-picker v-model="value2" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="所属办事处：" prop="name">
              <el-select v-model="mainMsg.client.id" placeholder="请选择">
                <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn">
        <el-button :loading="loading">查询</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'invoiceSearch',
  data() {
    return {
      loading: false,
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
.invoice-search.form-container{
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
