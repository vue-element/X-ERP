<template>
  <div class="invoice-add form-container">
    <div class="commont-btn edit-btn" v-show="editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="paymentManage" :rules="rules" ref="paymentManage">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增回款信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同编号：" prop="contractInfo">
              <p v-if="disabled">{{contractInfo.name}}</p>
              <el-select v-else v-model="contractInfo.id" placeholder="请选择合同编码"  filterable clearable>
                <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12" >
            <el-form-item label="开票编码：" prop="contractBilling">
              <p v-if="disabled">{{paymentManage.contractBilling.name}}</p>
              <el-input v-else v-model="paymentManage.code" placeholder="请输入开票编码"></el-input>
             <!--  <el-select v-else v-model="paymentManage.contractBilling.id" placeholder="请选择开票编码" label="开票内容：">
                <el-option v-for="item in contractBillingList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12" >
            <el-form-item label="回款日期：" class="single-date" prop="date">
              <p v-if="disabled">{{paymentManage.date}}</p>
              <el-date-picker v-else v-model="paymentManage.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期" ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12" >
            <el-form-item label="回款金额：" prop="amount">
              <p v-if="disabled">{{paymentManage.amount}}</p>
              <el-input v-else v-model="paymentManage.amount" placeholder="请输入回款金额" @change="amount"></el-input>
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
    return {
      loading: false,
      editShow: true,
      editWord: '编辑',
      disabled: false,
      action: 'add',
      contractBillingList: [],
      contractInfoList: [],
      contractInfo: {
        id: ''
      },
      paymentManage: {
        contractBilling: {
          id: ''
        },
        amount: '',
        date: '',
        code: ''
      },
      rules: {
        contractInfo: [{ required: true, message: '请选择合同编码', trigger: 'change' }],
        contractBilling: [{ required: true, message: '请选择开票编码', trigger: 'change' }],
        date: [{ required: true, message: '请选择回款日期', trigger: 'change' }],
        amount: [{ required: true, message: '请输入回款金额', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.paymentManage)
  },
  methods: {
    getInsertData() {
      this.$get('/contractReceived/findInsertData').then((res) => {
        console.log(res)
        if (res.data.success === true) {
          this.contractBillingList = res.data.data.contractBillingList
          this.contractInfoList = res.data.data.contractInfoList
        }
      })
    },
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      console.log(data)
      this.contractBillingList = data.contractBillingList
      this.paymentManage = data.contractReceived
    },
    save() {
      this.$refs.paymentManage.validate((valid) => {
        if (valid) {
          this.loading = true
          this.paymentManage.contractBilling.contractInfo.id = this.contractInfo.id
          console.log(this.paymentManage)
          this.$post('/contractReceived/save', this.paymentManage).then(res => {
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
      this.paymentManage = _.cloneDeep(this.temp)
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
      this.paymentManage.amount = outputmoney(val)
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
