<template>
  <div class="billing-add form-container">
    <div class="commont-btn edit-btn" v-show="editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="billingData" :rules="rules" ref="billingData">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增开票信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同名称：" prop="contractInfo">
              <p v-if="disabled">{{billingData.contractInfo.name}}</p>
              <el-select v-else v-model="billingData.contractInfo.id" placeholder="请选择合同名称" filterable clearable>
                <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同编号：">
              <p v-if="disabled">{{billingData.contractInfo.code}}</p>
              <el-select v-else v-model="billingData.contractInfo.id" placeholder="请选择合同编号" filterable clearable>
                <el-option v-for="item in contractInfoList" :label="item.code" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="发票抬头名称：" prop="name">
              <p v-if="disabled">{{billingData.name}}</p>
              <el-input v-else v-model="billingData.name" placeholder="请输入发票抬头名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="开票金额：" prop="amount">
              <p v-if="disabled">{{billingData.amount}}</p>
              <el-input v-else v-model="billingData.amount" placeholder="请输入开票金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="税率(%)：" prop="taxRate">
              <p v-if="disabled">{{billingData.taxRate}}</p>
              <el-input v-else v-model="billingData.taxRate" placeholder="请输入税率"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="税金：" class="single-date">
              <p v-if="disabled">{{billingData.tax}}</p>
              <el-input v-else v-model="tax" placeholder="自动填充" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="收入(不含税)：" class="single-date">
              <p v-if="disabled">{{billingData.income}}</p>
              <el-input v-else v-model="income" placeholder="自动填充" disabled></el-input>
            </el-form-item>
          </el-col>
           <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="开票号码：" prop="number">
              <p v-if="disabled">{{billingData.number}}</p>
              <el-input v-else v-model="billingData.number" placeholder="请输入发票号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item class="single-date" label="开票日期：">
              <p v-if="disabled">{{billingData.date}}</p>
              <el-date-picker v-else v-model="billingData.date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开票日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12" class="text">
            <el-form-item label="开票内容：" class="textarea">
              <p v-if="disabled">{{billingData.content}}</p>
              <el-input v-else v-model="billingData.content" type="textarea" placeholder="请输入开票内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn" v-show="!disabled">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { outputmoney, isObjectValueEqual } from '@/utils'
import _ from 'lodash'
export default {
  name: 'invoiceAdd',
  props: ['editData'],
  data() {
    var validateContractInfo = this.validateMsg('合同信息不能为空')
    var validateAmount = this.validateMount('开票金额不能为空', '请输入数字值')
    var validateTaxRate = this.validateMount('税金不能为空', '请输入数值')
    return {
      action: 'add',
      loading: false,
      disabled: false,
      editShow: false,
      editWord: '编辑',
      contractInfoList: [],
      taxRateList: [],
      preAmount: '',
      billingData: {
        amount: '',
        content: '',
        name: '',
        contractInfo: {
          id: ''
        },
        number: '',
        tax: '',
        taxRate: '',
        income: '',
        diffAmount: ''
      },
      rules: {
        contractInfo: [{ required: true, validator: validateContractInfo, trigger: 'change' }],
        amount: [{ required: true, validator: validateAmount, trigger: 'blur' }],
        name: [{ required: true, message: '请输入发票抬头名称', trigger: 'blur' }],
        number: [{ required: true, message: '请输入发票号码', trigger: 'blur' }],
        taxRate: [{ required: true, validator: validateTaxRate, trigger: 'blur' }],
        date: [{ required: true, message: '请选择开票日期', trigger: 'blur' }]
      },
      temp: {}
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.billingData)
  },
  methods: {
    getInsertData() {
      this.$get('/contractBilling/findInsertData').then((res) => {
        if (res.data.success === true) {
          this.contractInfoList = res.data.data.contractInfoList
        }
      })
      this.taxRateList = [{ value: '3%' }, { value: '6%' }, { value: '11%' }, { value: '13%' }, { value: '17%' }]
    },
    save() {
      this.$refs.billingData.validate(valid => {
        if (valid) {
          this.loading = true
          this.billingData.tax = this.tax
          this.billingData.income = this.income
          this.billingData.diffAmount = this.billingData.amount - this.preAmount
          this.$post('/contractBilling/save', this.billingData).then(res => {
            this.loading = false
            if (res.data.success === true) {
              this.temp = _.cloneDeep(res.data.data)
              this.successSave()
            } else {
              this.failSave()
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    reset() {
      this.billingData = _.cloneDeep(this.temp)
    },
    cancel() {
      this.$emit('changeObj', false)
      this.$emit('toggleTab')
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      this.billingData = _.cloneDeep(this.temp)
    },
    toggleAction() {
      if (this.editData.tabState === 'addTab') {
        this.action = 'add'
      } else {
        this.action = 'edit'
        this.editShow = true
        this.disabled = true
        this.billingData = _.cloneDeep(this.editData.editData.contractBilling)
        this.preAmount = this.billingData.amount
      }
    },
    successSave() {
      this.$emit('changeObj', false)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      if (this.action === 'add') {
        this.$emit('toggleTab')
      } else {
        this.editShow = true
        this.disabled = true
        this.billingData = _.cloneDeep(this.temp)
      }
    },
    failSave() {
      this.$message({
        message: '保存失败',
        type: 'error'
      })
    },
    amount(val) {
      this.billingData.amount = outputmoney(val)
    },
    validateMsg(errMsg) {
      return (rule, value, callback) => {
        if (!value.id) {
          callback(new Error(errMsg))
        } else {
          callback()
        }
      }
    },
    validateMount(emptyMsg, tipMsg) {
      return (rule, value, callback) => {
        if (!value) {
          return callback(new Error(emptyMsg))
        } else {
          if (!Number(value)) {
            callback(new Error(tipMsg))
          } else {
            callback()
          }
        }
      }
    }
  },
  watch: {
    billingData: {
      handler(obj) {
        if (isObjectValueEqual(obj, this.temp)) {
          this.$emit('changeObj', false)
        } else {
          this.$emit('changeObj', true)
        }
      },
      deep: true
    },
    disabled (status) {
      if (status === false) {
        this.editWord = '取消编辑'
        this.$emit('changeObj', true)
      } else {
        this.editWord = '编辑'
      }
    }
  },
  computed: {
    tax() {
      if (this.billingData.amount && this.billingData.taxRate) {
        var r = /^-?\d+$/
        var amount = this.billingData.amount
        if (!r.test(amount)) {
          var numAmount = '' + (amount)
          amount = numAmount.substring(0, numAmount.indexOf('.') + 3)
        }
        var numRate = '' + this.billingData.taxRate / 100
        var taxRate = numRate.substring(0, numRate.indexOf('.') + 3)
        var numRes = amount * taxRate
        if (!r.test(numRes)) {
          numRes = '' + (amount * taxRate)
          var res = numRes.substring(0, numRes.indexOf('.') + 3)
          return res
        } else {
          return numRes
        }
      } else {
        return null
      }
    },
    income() {
      if (this.billingData.amount && this.billingData.taxRate) {
        var r = /^-?\d+$/
        var amount = this.billingData.amount
        if (!r.test(amount)) {
          var numAmount = '' + (amount)
          amount = numAmount.substring(0, numAmount.indexOf('.') + 3)
        }
        var numRate = '' + this.billingData.taxRate / 100
        var taxRate = numRate.substring(0, numRate.indexOf('.') + 3)
        var numRes = amount * taxRate
        if (!r.test(numRes)) {
          numRes = '' + (amount * taxRate)
          var res = numRes.substring(0, numRes.indexOf('.') + 3)
          return (amount - res)
        } else {
          return (amount - numRes)
        }
      } else {
        return null
      }
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.billing-add{
  &::-webkit-scrollbar{
    width: 0;
  }
}
</style>
