<template>
  <div class="invoice-add form-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增开票信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="合同编码：" prop="contractInfo.id">
              <el-select v-model="ruleForm.contractInfo.id" placeholder="请选择" filterable>
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="发票抬头名称：" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="发票号码：" prop="number">
              <el-input v-model="ruleForm.number" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <el-form-item label="开票金额：" prop="amount">
              <el-input v-model="ruleForm.amount" placeholder="请输入您的账号" :disabled="disabled"></el-input>
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
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
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
      ruleForm: {
        amount: '开票金额',
        content: '开票内容',
        name: '发票抬头名称',
        contractInfo: {
          id: 1
        },
        number: '发票号码'
      },
      rules: {}
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
      console.log(this.editData.editData)
      var data = this.editData.editData
      this.contractInfoList = data.contractInfoList
      this.originData = data.contractBilling
      this.ruleForm = data.contractBilling
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
          if (this.editData.tabState === 'editTab') {
            this.$emit('toggleTab')
          }
        }
      })
    },
    reset() {
      if (this.editData.tabState === 'addTab') {
        console.log('isaddTab')
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
        console.log('originData', this.originData)
        this.ruleForm = this.originData
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
