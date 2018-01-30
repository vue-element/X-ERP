<template>
  <div class="invoice-add form-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增回款信息:</p>
        </h4>
        <el-row :gutter="40">
          <!-- <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同编码：" prop="contractInfo.id">
              <el-select v-model="ruleForm.contractInfo.id" placeholder="请选择">
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :xs="12" :sm="12" :lg="12" >
            <el-form-item label="开票编码："  prop="contractBilling.id">
              <el-select v-model="ruleForm.contractBilling.id" placeholder="请选择" label="开票内容：" filterable>
               <el-option v-for="item in contractBillingList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12" >
            <el-form-item label="回款日期：" prop="date" class="single-date">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12" >
            <el-form-item label="回款金额：" prop="amount">
              <el-input v-model="ruleForm.amount" placeholder="请输入您的账号" :disabled="disabled"></el-input>
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
import _ from 'lodash'
export default {
  name: 'receivedPaymentAdd',
  props: ['editData'],
  data() {
    return {
      loading: false,
      disabled: false,
      action: 'add',
      contractBillingList: [],
      ruleForm: {
        contractBilling: {
          id: 1
        },
        amount: '100',
        date: ''
      },
      rules: {}
    }
  },
  created() {
    if (this.editData.tabState === 'addTab') {
      this.getInsertData()
      this.action = 'add'
    } else {
      this.editInfo()
      this.action = 'edit'
    }
  },
  methods: {
    getInsertData() {
      this.$get('/ContractReceived/findInsertData').then(res => {
        if (res.data.success === true) {
          this.contractBillingList = res.data.data.contractBillingList
        }
      })
    },
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.contractBillingList = data.contractBillingList
      this.ruleForm = data.contractReceived
    },
    save() {
      this.loading = true
      console.log('ruleForm', JSON.stringify(this.ruleForm))
      this.$post('/ContractReceived/save', this.ruleForm).then(res => {
        if (res.data.success === true) {
          this.loading = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          if (this.action === 'edit') {
            this.$emit('toggleTab')
          }
        }
      })
    },
    reset() {
      if (this.action === 'add') {
        console.log('isaddTab')
        this.ruleForm = {
          contractBilling: {
            id: ''
          },
          amount: '',
          date: ''
        }
      } else {
        this.editInfo()
      }
    },
    cancel() {
      this.$emit('toggleTab')
    }
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
