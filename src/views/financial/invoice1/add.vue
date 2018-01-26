<template>
  <div class="invoice-add form-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增开票信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="合同编号：" prop="contractInfo.id">
              <el-select v-model="ruleForm.contractInfo.id" placeholder="请选择">
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="开票金额：" prop="amount">
              <el-input v-model="ruleForm.amount" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="发票号码：" prop="number">
              <el-input v-model="ruleForm.number" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="开票日期：" prop="date" class="single-date">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="开票内容：" prop="content">
              <el-input v-model="ruleForm.content" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button><router-link to="/financial/invoice/list">取消</router-link></el-button>
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
      rules: {},
      // queryId: 1,
      originData: {}
    }
  },
  created() {
    console.log('add refresh')
    this.getInsertData()
    if (this.$route.query.id) {
      this.edit()
      // this.queryId = this.$route.query.id
    }
  },
  methods: {
    getInsertData() {
      this.$get('/contractBilling/findInsertData').then(res => {
        if (res.data.success === true) {
          this.contractInfoList = res.data.data.contractInfoList
        }
      })
    },
    save() {
      this.loading = true
      this.$post('/contractBilling/save', this.ruleForm).then(res => {
        if (res.data.success === true) {
          console.log('this.ruleForm', this.ruleForm)
          this.loading = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          if (this.$route.query.id) {
            this.$router.push('/financial/invoice/list')
          }
        }
      })
    },
    edit() {
      var id = this.$route.query.id
      this.$get('/contractBilling/findUpdateData/' + id).then(res => {
        if (res.data.success === true) {
          var data = res.data.data
          console.log(data)
          this.originData = data.contractBilling
          this.ruleForm = data.contractBilling
        }
      })
    },
    reset() {
      this.edit()
    }
  },
  computed: {}
  // watch: {
  //   $route() {
  //
  //   }
  // }
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
