<template>
  <div class="invoice-add form-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增付款信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同编号：" prop="contractInfo">
              <el-select v-model="ruleForm.contractInfo.id" placeholder="请选择合同编号" filterable>
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="人工成本投入：" prop="artificialCost">
              <el-input v-model="ruleForm.artificialCost" placeholder="请输入人工成本投入" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="材料成本投入：" prop="materialCost">
              <el-input v-model="ruleForm.materialCost" placeholder="请输入材料成本投入" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="综合成本投入：" class="single-date" prop="comprehensiveCost">
              <el-input v-model="ruleForm.comprehensiveCost" placeholder="请输入综合成本投入" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="管理费用：" prop="manageCost">
              <el-input v-model="ruleForm.manageCost" placeholder="请输入管理费用" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="稅金：" prop="tax">
              <el-input v-model="ruleForm.tax" placeholder="请输入税金" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="投入日期：" class="single-date" prop="inputDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.inputDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
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
      ruleForm: {
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
      this.ruleForm = data.contractPayment
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
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
        }
      })
    },
    reset() {
      if (this.editData.tabState === 'addTab') {
        this.ruleForm = {
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
</style>
