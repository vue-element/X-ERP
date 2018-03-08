<template>
  <div class="invoice-add form-container">
    <el-form :model="invoiceData" :rules="rules" ref="invoiceData">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增开票信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同编码：" prop="contractInfo">
              <el-select v-model="invoiceData.contractInfo.id" placeholder="请选择合同编码" filterable>
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="发票抬头名称：" prop="name">
              <el-input v-model="invoiceData.name" placeholder="请输入发票抬头名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="发票号码：" prop="number">
              <el-input v-model.number="invoiceData.number" placeholder="请输入发票号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="开票金额：" prop="amount">
              <el-input v-model="invoiceData.amount" placeholder="请输入开票金额" @change="amount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="开票日期：" prop="date" class="single-date">
              <el-date-picker type="date" placeholder="选择日期" v-model="invoiceData.date"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="开票内容：">
              <el-input v-model="invoiceData.content" placeholder="请输入开票内容"></el-input>
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
import { outputmoney } from '@/utils'
export default {
  name: 'invoiceAdd',
  props: ['editData'],
  data() {
    return {
      action: 'add',
      loading: false,
      disabled: false,
      contractInfoList: [],
      originData: {},
      invoiceData: {
        amount: '',
        content: '',
        name: '',
        contractInfo: {
          id: ''
        },
        number: ''
      },
      rules: {
        contractInfo: [{ required: true, message: '请输入合同编码', trigger: 'change' }],
        name: [{ required: true, message: '请输入发票抬头名称', trigger: 'blur' }],
        number: [{ required: true, message: '请输入发票号码' }, { type: 'number', message: '请输入数字' }],
        amount: [{ required: true, message: '请输入开票金额', trigger: 'blur' }],
        date: [{ required: true, message: '请选择开票日期', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.editData.tabState === 'addTab') {
      this.action = 'add'
      this.getInsertData()
    } else {
      this.action = 'edit'
      this.editInfo()
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
    editInfo() {
      var data = this.editData.editData
      this.contractInfoList = data.contractInfoList
      this.originData = data.contractBilling
      this.invoiceData = data.contractBilling
    },
    save() {
      this.loading = true
      this.$post('/contractBilling/save', this.invoiceData).then(res => {
        if (res.data.success === true) {
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
        this.invoiceData = {
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
        this.invoiceData = this.originData
      }
    },
    cancel() {
      this.$emit('toggleTab')
    },
    amount(val) {
      this.invoiceData.amount = outputmoney(val)
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
