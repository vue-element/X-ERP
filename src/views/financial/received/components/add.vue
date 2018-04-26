<template>
  <div class="received-add form-container">
    <div class="commont-btn edit-btn" v-show="hasPerm('contractReceived:findUpdateData') && editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="receivedData" :rules="rules" ref="receivedData">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增回款信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同名称：" prop="contractBilling">
              <p v-if="disabled">{{receivedData.contractBilling.contractInfo.name}}</p>
              <el-autocomplete v-else v-model="receivedData.contractBilling.contractInfo.name" :fetch-suggestions="contractNameSearchAsync" @select="ciSelect" placeholder="请选择合同名称"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同编号：">
              <p v-if="disabled">{{receivedData.contractBilling.contractInfo.code}}</p>
              <el-autocomplete v-else v-model="receivedData.contractBilling.contractInfo.code" :fetch-suggestions="contractCodeSearchAsync" @select="ciSelect" placeholder="请选择合同编号"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12" >
            <el-form-item label="发票号码：" prop="contractBilling">
              <p v-if="disabled">{{receivedData.contractBilling.number}}</p>
              <el-select v-else v-model="receivedData.contractBilling.number" placeholder="请选择发票号码" filterable clearable>
                <el-option v-for="item in contractBillingList" :label="item.number" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12" >
            <el-form-item label="回款日期：" class="single-date" prop="date">
              <p v-if="disabled">{{receivedData.date}}</p>
              <el-date-picker v-else v-model="receivedData.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择回款日期" ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12" >
            <el-form-item label="回款金额：" prop="amount">
              <p v-if="disabled">{{receivedData.amount}}</p>
              <el-input v-else v-model="receivedData.amount" placeholder="请输入回款金额"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn" v-show="hasPerm('contractReceived:save') && !disabled">
        <el-button @click="save" :loading="loading" >保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { outputmoney, isObjectValueEqual } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'receivedPaymentAdd',
  props: ['editData'],
  data() {
    var validateContractInfo = this.validateMsg('合同信息不能为空')
    var validateAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('回款金额不能为空'))
      } else {
        if (!Number(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }
    }
    return {
      loading: false,
      editShow: false,
      editWord: '编辑',
      disabled: false,
      action: 'add',
      contractBillingList: [],
      contractInfoList: [],
      preAmount: null,
      receivedData: {
        contractBilling: {
          id: null,
          contractInfo: {
            id: null,
            code: '',
            name: ''
          }
        },
        amount: null,
        date: '',
        diffAmount: null
      },
      rules: {
        contractBilling: [{ required: true, validator: validateContractInfo, trigger: 'change' }],
        number: [{ required: true, message: '发票号码不能为空', trigger: 'change' }],
        date: [{ required: true, message: '请选择回款日期', trigger: 'change' }],
        amount: [{ required: true, validator: validateAmount, trigger: 'blur' }]
      },
      temp: {}
    }
  },
  created() {
    this.toggleAction()
    this.temp = _.cloneDeep(this.receivedData)
  },
  methods: {
    contractNameSearchAsync(queryString, callback) {
      var role_code = this.$store.state.account.userName
      var list = [{}]
      this.$get('/keywordQuery/contractInfoName?role_code=' + role_code + '&contractInfoName=' + queryString).then(res => {
        var data = res.data
        for (const i of data.objectList) {
          i.value = i.name
        }
        list = data.objectList
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      })
    },
    contractCodeSearchAsync(queryString, callback) {
      var role_code = this.$store.state.account.userName
      var list = [{}]
      this.$get('/keywordQuery/contractInfoCode?role_code=' + role_code + '&contractInfoCode=' + queryString).then(res => {
        var data = res.data
        for (const i of data.objectList) {
          i.value = i.code
        }
        list = data.objectList
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      })
    },
    ciSelect(item) {
      this.receivedData.contractBilling.id = item.id
      this.receivedData.contractBilling.contractInfo.code = item.code
      this.receivedData.contractBilling.contractInfo.name = item.name
      this.$get('/contractBilling/findAllByContractInfo/' + item.id).then((res) => {
        this.contractBillingList = res.data.data.contractBillingList.content
      })
    },
    save() {
      this.$refs.receivedData.validate((valid) => {
        if (valid) {
          this.loading = true
          this.receivedData.diffAmount = this.receivedData.amount - this.preAmount
          var container = {}
          for (var key in this.receivedData) {
            if (this.receivedData[key]) {
              container[key] = this.receivedData[key]
            }
          }
          this.$post('/contractReceived/save', container).then(res => {
            if (res.data.success === true) {
              this.loading = false
              this.temp = _.cloneDeep(res.data.data)
              this.successSave()
            } else {
              this.failSave()
            }
          }).catch((res) => {
            this.loading = false
          })
        }
      })
    },
    reset() {
      this.receivedData = _.cloneDeep(this.temp)
    },
    cancel() {
      this.$emit('changeObj', false)
      this.$emit('toggleTab')
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      this.receivedData = _.cloneDeep(this.temp)
    },
    toggleAction() {
      if (this.editData.tabState === 'addTab') {
        this.action = 'add'
      } else {
        this.action = 'edit'
        this.editShow = true
        this.disabled = true
        this.receivedData = _.cloneDeep(this.editData.editData.contractReceived)
        this.preAmount = this.receivedData.amount
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
        this.receivedData = _.cloneDeep(this.temp)
      }
    },
    failSave() {
      this.$message({
        message: '保存失败',
        type: 'error'
      })
    },
    amountChange(val) {
      this.receivedData.amount = outputmoney(val)
    },
    validateMsg(errMsg) {
      return (rule, value, callback) => {
        if (!value) {
          callback(new Error(errMsg))
        } else {
          callback()
        }
      }
    }
  },
  watch: {
    receivedData: {
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
    ...mapGetters([
      'userName'
    ])
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.received-add{
  &::-webkit-scrollbar{
    width: 0;
  }
}
</style>
