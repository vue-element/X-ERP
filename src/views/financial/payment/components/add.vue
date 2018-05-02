<template>
  <div class="payment-add form-container">
    <div class="commont-btn edit-btn" v-show="hasPerm('contractPayment:update') && editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="paymentData" :rules="rules" ref="paymentData">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增付款信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同名称：" prop="contractInfo">
              <p v-if="disabled">{{paymentData.contractInfo.name}}</p>
              <el-autocomplete v-else v-model="paymentData.contractInfo.name" :fetch-suggestions="contractNameSearchAsync" @select="ciSelect" placeholder="请选择合同名称"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同编号：">
              <p v-if="disabled">{{paymentData.contractInfo.code}}</p>
              <el-autocomplete v-else v-model="paymentData.contractInfo.code" :fetch-suggestions="contractCodeSearchAsync" @select="ciSelect" placeholder="请选择合同编号"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="人工成本投入：" prop="artificialCost">
              <p v-if="disabled">{{paymentData.artificialCost}}</p>
              <el-input v-else v-model="paymentData.artificialCost" placeholder="请输入人工成本投入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="材料成本投入：" prop="materialCost">
              <p v-if="disabled">{{paymentData.materialCost}}</p>
              <el-input v-else v-model="paymentData.materialCost" placeholder="请输入材料成本投入"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="综合成本投入：" class="single-date" prop="comprehensiveCost">
              <p v-if="disabled">{{paymentData.comprehensiveCost}}</p>
              <el-input v-else v-model="paymentData.comprehensiveCost" placeholder="请输入综合成本投入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="管理费用：" prop="manageCost">
              <p v-if="disabled">{{paymentData.manageCost}}</p>
              <el-input v-else v-model="paymentData.manageCost" placeholder="请输入管理费用"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="稅金：" prop="tax">
              <p v-if="disabled">{{paymentData.tax}}</p>
              <el-input v-else v-model="paymentData.tax" placeholder="请输入税金"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="投入日期：" class="single-date" prop="inputDate">
              <p v-if="disabled">{{paymentData.inputDate}}</p>
              <el-date-picker v-else type="date" placeholder="选择投入日期" v-model="paymentData.inputDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn" v-show="hasPerm('contractPayment:save') && !disabled">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { isObjectValueEqual } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'paymentAdd',
  props: ['editData'],
  data() {
    var validateContractInfo = this.validateMsg('合同信息不能为空')
    var validateArtificialCost = this.validateAmount('人工成本投入不能为空', '请输入数字值')
    var validateMaterialCost = this.validateAmount('材料成本投入不能为空', '请输入数字值')
    var validateComprehensiveCost = this.validateAmount('综合成本投入不能为空', '请输入数字值')
    var validateManageCost = this.validateAmount('管理费用不能为空', '请输入数字值')
    var validateTax = this.validateAmount('税金不能为空', '请输入数字值')
    return {
      action: 'add',
      loading: false,
      editShow: false,
      editWord: '编辑',
      disabled: false,
      contractInfoList: [],
      preArtificialCost: null,
      preMaterialCost: null,
      preComprehensiveCost: null,
      preManageCost: null,
      preTax: null,
      paymentData: {
        contractInfo: {
          id: null,
          name: '',
          code: ''
        },
        artificialCost: null,
        materialCost: null,
        comprehensiveCost: null,
        manageCost: null,
        tax: null,
        inputDate: '',
        diffArtificialCost: null,
        diffMaterialCost: null,
        diffComprehensiveCost: null,
        diffManageCost: null,
        diffTax: null
      },
      rules: {
        contractInfo: [{ required: true, validator: validateContractInfo, trigger: 'change' }],
        artificialCost: [{ required: true, validator: validateArtificialCost, trigger: 'blur' }],
        materialCost: [{ required: true, validator: validateMaterialCost, trigger: 'blur' }],
        comprehensiveCost: [{ required: true, validator: validateComprehensiveCost, trigger: 'blur' }],
        manageCost: [{ required: true, validator: validateManageCost, trigger: 'blur' }],
        tax: [{ required: true, validator: validateTax, trigger: 'blur' }],
        inputDate: [{ required: true, message: '请选择投入日期', trigger: 'change' }]
      },
      temp: {}
    }
  },
  created() {
    this.toggleAction()
    this.temp = _.cloneDeep(this.paymentData)
  },
  methods: {
    contractNameSearchAsync(queryString, callback) {
      var role_code = this.$store.state.account.roleCode
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
      var role_code = this.$store.state.account.roleCode
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
      this.paymentData.contractInfo.id = item.id
      this.paymentData.contractInfo.code = item.code
      this.paymentData.contractInfo.name = item.name
    },
    save() {
      this.$refs.paymentData.validate((valid) => {
        if (valid) {
          this.loading = true
          this.paymentData.diffArtificialCost = this.paymentData.artificialCost - this.preArtificialCost
          this.paymentData.diffMaterialCost = this.paymentData.materialCost - this.preMaterialCost
          this.paymentData.diffComprehensiveCost = this.paymentData.comprehensiveCost - this.preComprehensiveCost
          this.paymentData.diffManageCost = this.paymentData.manageCost - this.preManageCost
          this.paymentData.diffTax = this.paymentData.tax - this.preTax
          var container = {}
          for (var key in this.paymentData) {
            if (this.paymentData[key]) {
              container[key] = this.paymentData[key]
            }
          }
          this.$post('/contractPayment/save', container).then(res => {
            if (res.data.success === true) {
              this.loading = false
              this.temp = _.cloneDeep(res.data.data)
              this.successSave()
            } else {
              this.failSave()
            }
          }).catch(res => {
            this.loading = false
          })
        }
      })
    },
    reset() {
      this.paymentData = _.cloneDeep(this.temp)
    },
    toggleAction() {
      if (this.editData.tabState === 'addTab') {
        this.action = 'add'
      } else {
        this.action = 'edit'
        this.editShow = true
        this.disabled = true
        this.paymentData = _.cloneDeep(this.editData.editData.contractPayment)
        this.preArtificialCost = this.paymentData.artificialCost
        this.preMaterialCost = this.paymentData.materialCost
        this.preComprehensiveCost = this.paymentData.comprehensiveCost
        this.preManageCost = this.paymentData.manageCost
        this.preTax = this.paymentData.tax
      }
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      this.paymentData = _.cloneDeep(this.temp)
    },
    cancel() {
      this.$emit('changeObj', false)
      this.$emit('toggleTab')
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
        this.paymentData = _.cloneDeep(this.temp)
      }
    },
    failSave() {
      this.$message({
        message: '保存失败',
        type: 'error'
      })
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
    validateAmount(errMsg, amountMsg) {
      return (rule, value, callback) => {
        if (!value) {
          return callback(new Error(errMsg))
        } else {
          if (!Number(value)) {
            callback(new Error(amountMsg))
          } else {
            callback()
          }
        }
      }
    }
  },
  watch: {
    paymentData: {
      handler(obj) {
        if (isObjectValueEqual(obj, this.temp)) {
          this.$emit('changeObj', false)
        } else {
          this.$emit('changeObj', true)
        }
        if (obj.contractInfo.name === '' || obj.contractInfo.code === '') {
          this.paymentData.contractInfo.id = ''
          this.paymentData.contractInfo.name = ''
          this.paymentData.contractInfo.code = ''
        }
      },
      deep: true
    },
    disabled(status) {
      if (status === false) {
        this.editWord = '取消编辑'
        this.$emit('changeObj', false)
      } else {
        this.editWord = '编辑'
      }
    }
  },
  computed: {
    ...mapGetters([
      'roleCode'
    ])
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.payment-add{
  &::-webkit-scrollbar{
    width: 0;
  }
}
</style>
