<template>
  <div class="invoice-add form-container">
    <div class="commont-btn edit-btn" v-show="editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="receivedPaymentData" :rules="rules" ref="receivedPaymentData">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增回款信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同编号：">
              <!-- <p v-if="disabled">{{receivedPaymentData.contractInfo.code}}</p> -->
              <el-select v-model="receivedPaymentData.contractBilling.id" placeholder="请选择合同编码"  filterable>
                <el-option v-for="item in contractBillingList" :label="item.contractInfo.code" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同名称：">
              <!-- <p v-if="disabled">{{receivedPaymentData.contractInfo.name}}</p> -->
              <el-select v-model="receivedPaymentData.contractBilling.id" placeholder="请选择合同编码"  filterable>
                <el-option v-for="item in contractBillingList" :label="item.contractInfo.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12" >
            <el-form-item label="发票号码：">
              <p v-if="disabled">{{receivedPaymentData.number}}</p>
              <!-- <el-input v-else v-model="receivedPaymentData.number" placeholder="请输入开票编码"></el-input> -->
              <el-select v-model="receivedPaymentData.contractBilling.id" placeholder="请选择合同编码"  filterable>
                <el-option v-for="item in contractBillingList" :label="item.number" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12" >
            <el-form-item label="回款日期：" class="single-date" prop="date">
              <p v-if="disabled">{{receivedPaymentData.date}}</p>
              <el-date-picker v-else v-model="receivedPaymentData.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12" >
            <el-form-item label="回款金额：" prop="amount">
              <p v-if="disabled">{{receivedPaymentData.amount}}</p>
              <el-input v-else v-model="receivedPaymentData.amount" placeholder="请输入回款金额" @change="amount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn" v-show="!disabled">
        <el-button @click="save" :loading="loading" >保存</el-button>
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
  name: 'receivedPaymentAdd',
  props: ['editData'],
  data() {
    var validateContractInfo = this.validateMsg('合同信息不能为空')
    return {
      loading: false,
      editShow: true,
      editWord: '编辑',
      disabled: false,
      action: 'add',
      contractBillingList: [],
      contractInfoList: [],
      receivedPaymentData: {
        contractBilling: {
          id: null,
          contractInfo: {
            id: null
          }
        },
        amount: '',
        date: '',
        number: ''
      },
      rules: {
        contractInfo: [{ required: true, validator: validateContractInfo, trigger: 'change' }],
        date: [{ required: true, message: '请选择回款日期', trigger: 'change' }],
        amount: [{ required: true, message: '请输入回款金额', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.receivedPaymentData)
  },
  methods: {
    getInsertData() {
      this.$get('/contractReceived/findInsertData').then((res) => {
        if (res.data.success === true) {
          this.contractBillingList = res.data.data.contractBillingList
          console.log(this.contractBillingList)
          // for (var i = 0; i < this.contractBillingList.length; i++) {
          //   this.contractInfoList.push(this.contractBillingList[i].contractInfo)
          // }
          // console.log(this.contractInfoList)
        }
      })
    },
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      console.log(data)
      this.contractBillingList = data.contractBillingList
      this.receivedPaymentData = data.contractReceived
    },
    save() {
      this.$refs.receivedPaymentData.validate((valid) => {
        if (valid) {
          this.loading = true
          console.log(this.receivedPaymentData)
          this.$post('/contractReceived/save', this.receivedPaymentData).then(res => {
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
      this.receivedPaymentData = _.cloneDeep(this.temp)
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
        this.editShow = false
        this.action = 'add'
      } else {
        this.disabled = true
        this.action = 'edit'
        this.editInfo()
      }
    },
    amount(val) {
      this.receivedPaymentData.amount = outputmoney(val)
    },
    validateMsg(errMsg) {
      return (rule, value, callback) => {
        if (!value.id) {
          callback(new Error(errMsg))
        } else {
          callback()
        }
      }
    }
  },
  computed: {}
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
