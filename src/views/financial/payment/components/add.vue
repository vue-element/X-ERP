<template>
  <div class="invoice-add form-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增付款信息:</p>
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
            <el-form-item label="人工成本投入：" prop="artificialCost">
              <el-input v-model="ruleForm.artificialCost" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="材料成本投入：" prop="materialCost">
              <el-input v-model="ruleForm.materialCost" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="综合成本投入：" prop="comprehensiveCost" class="single-date">
              <el-input v-model="ruleForm.comprehensiveCost" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="管理费用：" prop="manageCost">
              <el-input v-model="ruleForm.manageCost" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="稅金：" prop="tax">
              <el-input v-model="ruleForm.tax" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="投入日期：" prop="inputDate" class="single-date">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.inputDate"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'paymentAdd',
  props: ['editData'],
  data() {
    return {
      loading: false,
      disabled: false,
      contractInfoList: [],
      ruleForm: {
        contractInfo: {
          id: 1
        },
        artificialCost: '人工支出',
        materialCost: '材料支出',
        comprehensiveCost: '综合支出',
        manageCost: '管理费用',
        tax: '稅金',
        inputDate: '投入日期'
      },
      rules: {},
      // queryId: 1,
      originData: {}
    }
  },
  created() {
    if (this.editData.tabState === 'addTab') {
      this.getInsertData()
    } else {
      this.editInfo()
    }
  },
  methods: {
    getInsertData() {
      this.$get('/ContractPayment/findInsertData').then(res => {
        if (res.data.success === true) {
          this.contractInfoList = res.data.data.contractInfoList
        }
      })
    },
    editInfo() {
      console.log(this.editData.editData)
      var data = this.editData.editData
      this.contractInfoList = data.contractInfoList
      this.originData = data.contractPayment
      this.ruleForm = data.contractPayment
    },
    save() {
      this.loading = true
      this.$post('/ContractPayment/save', this.ruleForm).then(res => {
        if (res.data.success === true) {
          console.log('this.ruleForm', this.ruleForm)
          this.loading = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          if (this.editData.tabState === 'editTab') {
            this.$emit('toggleTab')
          }
        }
      })
    },
    reset() {
      if (this.editData.tabState === 'addTab') {
        this.ruleForm = {
          amount: '',
          content: '',
          contractInfo: {
            id: 1
          },
          date: '',
          name: '',
          number: ''
        }
      } else {
        this.ruleForm = this.originData
      }
    },
    cancel() {
      this.$emit('toggleTab')
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
