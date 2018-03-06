<template>
  <div class="invoice-add form-container">
    <el-form :model="paymentManage" :rules="rules" ref="paymentManage">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增回款信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同编码：" prop="contractInfo">
              <el-select v-model="paymentManage.contractInfo.id" placeholder="请选择合同编码">
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12" >
            <el-form-item label="开票编码：" prop="contractBilling">
              <el-select v-model="paymentManage.contractBilling.id" placeholder="请选择开票编码" label="开票内容：" filterable>
               <el-option v-for="item in contractBillingList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12" >
            <el-form-item label="回款日期：" class="single-date" prop="date" >
              <el-date-picker type="date" placeholder="选择日期" v-model="paymentManage.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12" >
            <el-form-item label="回款金额：" prop="amount">
              <el-input v-model="paymentManage.amount" placeholder="请输入回款金额" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn">
        <el-button @click="save" :loading="loading" >保存</el-button>
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
    var validateContractInfo = (rules, value, callback) => {
      if (!value.id) {
        callback(new Error('合同编码不能为空'))
      } else {
        callback()
      }
    }
    var validateContractBilling = (rules, value, callback) => {
      if (!value.id) {
        callback(new Error('开票编码：不能为空'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      disabled: false,
      action: 'add',
      contractBillingList: [],
      contractInfoList: [],
      paymentManage: {
        contractInfo: {
          id: ''
        },
        contractBilling: {
          id: ''
        },
        amount: '',
        date: ''
      },
      rules: {
        contractInfo: [{ required: true, validator: validateContractInfo, trigger: 'change' }],
        contractBilling: [{ required: true, validator: validateContractBilling, trigger: 'change' }],
        date: [{ required: true, message: '请选择回款日期', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入回款金额', trigger: 'blur' }]
      }
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
          this.contractInfoList = res.data.data.contractInfoList
        }
      })
    },
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.contractBillingList = data.contractBillingList
      this.paymentManage = data.contractReceived
    },
    save() {
      this.$refs.paymentManage.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$post('/ContractReceived/save', this.paymentManage).then(res => {
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
        }
      })
    },
    reset() {
      if (this.action === 'add') {
        console.log('isaddTab')
        this.paymentManage = {
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
</style>
