<template>
  <div class="invoice-add form-container">
    <div class="commont-btn edit-btn" v-show="editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="invoiceData" :rules="rules" ref="invoiceData">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增开票信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同编号：" prop="contractInfo">
              <p v-if="disabled">{{invoiceData.contractInfo.name}}</p>
              <el-select v-else v-model="invoiceData.contractInfo.id" placeholder="请选择合同编码" filterable clearable>
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="发票抬头名称：" prop="name">
              <p v-if="disabled">{{invoiceData.name}}</p>
              <el-input v-else v-model="invoiceData.name" placeholder="请输入发票抬头名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="发票号码：" prop="number">
              <p v-if="disabled">{{invoiceData.number}}</p>
              <el-input v-else v-model.number="invoiceData.number" placeholder="请输入发票号码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="开票金额：" prop="amount">
              <p v-if="disabled">{{invoiceData.amount}}</p>
              <el-input v-else v-model="invoiceData.amount" placeholder="请输入开票金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="开票日期：" prop="date" class="single-date">
              <p v-if="disabled">{{invoiceData.date}}</p>
              <el-date-picker v-else type="date" placeholder="选择日期" v-model="invoiceData.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="开票内容：">
              <p v-if="disabled">{{invoiceData.content}}</p>
              <el-input v-else v-model="invoiceData.content" placeholder="请输入开票内容"></el-input>
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
import { outputmoney } from '@/utils'
import _ from 'lodash'
export default {
  name: 'invoiceAdd',
  props: ['editData'],
  data() {
    return {
      action: 'add',
      loading: false,
      disabled: false,
      editShow: false,
      editWord: '编辑',
      contractInfoList: [],
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
      },
      temp: {}
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.invoiceData)
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
      this.invoiceData = data.contractBilling
    },
    save() {
      this.loading = true
      Number(this.invoiceData.amount)
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
      this.invoiceData = _.cloneDeep(this.temp)
    },
    cancel() {
      this.$emit('toggleTab')
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.editWord = '编辑'
        this.editInfo()
      } else {
        this.editWord = '取消编辑'
      }
    },
    toggleAction() {
      if (this.editData.tabState === 'addTab') {
        this.action = 'add'
      } else {
        this.action = 'edit'
        this.editShow = true
        this.disabled = true
        this.editInfo()
      }
    },
    amount(val) {
      this.invoiceData.amount = outputmoney(val)
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.invoice-add{
  &::-webkit-scrollbar{
    width: 0;
  }
}
</style>
