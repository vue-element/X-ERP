<template>
  <div class="invoice-search form-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同编号：" prop="contractInfo.id">
              <el-select v-model="ruleForm.contractInfo.id" placeholder="请选择">
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="发票抬头名称：" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="发票号码：" prop="number">
              <el-input v-model="ruleForm.number" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="开票日期：" prop="name" class="range-date">
              <el-date-picker v-model="value2" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="开票日期：" prop="date" class="single-date">
              <el-date-picker v-model="ruleForm.date" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn">
        <el-button :loading="loading" @click="search">查询</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'invoiceSearch',
  data() {
    return {
      loading: false,
      disabled: false,
      contractInfoList: [],
      ruleForm: {
        amount: '开票金额',
        content: '开票内容',
        contractInfo: {
          id: 1
        },
        date: '',
        name: '发票抬头名称',
        number: '发票号码'
      },
      rules: {}
    }
  },
  created() {
    console.log('search created')
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.$get('/contractBilling/findInsertData').then(res => {
        if (res.data.success === true) {
          this.contractInfoList = res.data.data.contractInfoList
        }
      })
    },
    search() {
      this.setSearchObj(this.ruleForm)
      this.$router.push({ path: '/financial/invoice/list' })
    },
    ...mapActions(['setSearchObj'])
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
