<template>
  <div class="invoice-add form-container">
    <el-form :model="paymentData" :rules="rules" ref="paymentData">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增付款信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同编号：" prop="contractInfo">
              <el-select v-model="paymentData.contractInfo.id" placeholder="请选择合同编号" filterable>
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="人工成本投入：" prop="artificialCost">
              <el-input v-model="paymentData.artificialCost" placeholder="请输入人工成本投入" @change="artificialCost"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="材料成本投入：" prop="materialCost">
              <el-input v-model="paymentData.materialCost" placeholder="请输入材料成本投入" @change="materialCost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="综合成本投入：" class="single-date" prop="comprehensiveCost">
              <el-input v-model="paymentData.comprehensiveCost" placeholder="请输入综合成本投入" @change="comprehensiveCost"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="管理费用：" prop="manageCost">
              <el-input v-model="paymentData.manageCost" placeholder="请输入管理费用" @change="manageCost"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="稅金：" prop="tax">
              <el-input v-model="paymentData.tax" placeholder="请输入税金" @change="tax"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="投入日期：" class="single-date" prop="inputDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="paymentData.inputDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
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
import { outputmoney } from '@/utils'
export default {
  name: 'paymentAdd',
  props: ['editData'],
  data() {
    var validateContractInfo = (rules, value, callback) => {
      if (!value.id) {
        callback(new Error('合同编码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      disabled: false,
      contractInfoList: [],
      paymentData: {
        contractInfo: {
          id: ''
        },
        artificialCost: '',
        materialCost: '',
        comprehensiveCost: '',
        manageCost: '',
        tax: '',
        inputDate: ''
      },
      rules: {
        contractInfo: [{ required: true, validator: validateContractInfo, trigger: 'change' }],
        artificialCost: [{ required: true, message: '请输入人工成本投入', trigger: 'blur' }],
        materialCost: [{ required: true, message: '请输入材料成本投入', trigger: 'blur' }],
        comprehensiveCost: [{ required: true, message: '请输入综合成本投入', trigger: 'blur' }],
        manageCost: [{ required: true, message: '请输入管理费用', trigger: 'blur' }],
        tax: [{ required: true, message: '请输入税金', trigger: 'blur' }],
        inputDate: [{ required: true, message: '请选择投入日期', trigger: 'change' }]
      }
    }
  },
  created() {
    console.log(this.editData.editData)
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
      var data = _.cloneDeep(this.editData.editData)
      this.contractInfoList = data.contractInfoList
      this.paymentData = data.contractPayment
    },
    save() {
      this.$refs.paymentData.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$post('/ContractPayment/save', this.paymentData).then(res => {
            if (res.data.success === true) {
              console.log('this.paymentData', this.paymentData)
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
        }
      })
    },
    reset() {
      if (this.editData.tabState === 'addTab') {
        this.paymentData = {
          amount: '',
          content: '',
          contractInfo: {
            id: ''
          },
          date: '',
          name: '',
          number: ''
        }
      } else {
        this.editInfo()
      }
    },
    cancel() {
      this.$emit('toggleTab')
    },
    artificialCost(val) {
      this.paymentData.artificialCost = outputmoney(val)
    },
    materialCost(val) {
      this.paymentData.materialCost = outputmoney(val)
    },
    comprehensiveCost(val) {
      this.paymentData.comprehensiveCost = outputmoney(val)
    },
    manageCost(val) {
      this.paymentData.manageCost = outputmoney(val)
    },
    tax(val) {
      this.paymentData.tax = outputmoney(val)
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
