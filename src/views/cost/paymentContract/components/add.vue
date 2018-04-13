:sm:md<template>
  <div class="payment-contract-add form-container">
    <div class="commont-btn edit-btn" v-show="hasPerm('paymentContract:findUpdateData') && editShow" >
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="paymentContract" :rules="rules" ref="paymentContract">
      <div class="form-module">
        <h4 class="module-title">
          <p>基础信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="申请人:" prop="applicationPerson">
              <p v-if="disabled">{{paymentContract.applicationPerson}}</p>
              <el-input v-else v-model="paymentContract.applicationPerson" placeholder="请输入申请人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="申请时间:" class="single-date" prop="applicationTime">
              <p v-if="disabled">{{paymentContract.applicationTime}}</p>
              <el-date-picker  v-else type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="paymentContract.applicationTime" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="订单编号:" prop="orderCode">
              <p v-if="disabled">{{paymentContract.orderCode}}</p>
              <el-input v-else v-model="paymentContract.orderCode" placeholder="请输入订单编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="付款合同编号:">
              <p v-if="disabled">{{paymentContract.code}}</p>
              <el-input v-else v-model="paymentContract.code" placeholder="请输入付款合同号" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="合同编号:">
              <p v-if="disabled">{{paymentContract.contractInfo.code}}</p>
              <el-select v-else v-model="paymentContract.contractInfo.id" placeholder="请选择合同编号" filterable clearable>
               <el-option v-for="item in contractInfoList" :label="item.code" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="合同名称／所属项目:">
              <p v-if="disabled">{{paymentContract.contractInfo.name}}</p>
              <el-select v-else v-model="paymentContract.contractInfo.id" placeholder="自动生成" disabled>
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="申请部门:" prop="department">
              <p v-if="disabled">{{paymentContract.department}}</p>
              <el-select v-else v-model="paymentContract.department" placeholder="请选择所属项目" filterable clearable>
               <el-option v-for="item in departmentList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="业务类别:">
              <p v-if="disabled">{{paymentContract.contractInfo.businessCategory.name}}</p>
             <el-select v-else v-model="paymentContract.contractInfo.id" placeholder="自动生成" disabled>
              <el-option v-for="item in contractInfoList" :label="item.businessCategory.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>开票付款信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="支付对象:">
              <p v-if="disabled">{{paymentContract.paymentObject}}</p>
              <el-select v-else v-model="paymentContract.paymentObject" placeholder="请选择支付对象" filterable clearable>
                <el-option label="个人" value="个人"></el-option>
                <el-option label="供应商" value="供应商"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="应付金额:">
              <p v-if="disabled">{{payableAmount}}</p>
              <el-input v-else v-model="payableAmount" placeholder="请输入应付金额" @change="pAmountChange"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="到付时间:" class="single-date">
                <p v-if="disabled">{{paymentContract.payTime}}</p>
              <el-date-picker v-else type="date" v-model="paymentContract.payTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="凭单号:">
              <p v-if="disabled">{{paymentContract.oddNumber}}</p>
              <el-input v-else v-model="paymentContract.oddNumber" placeholder="请输入凭单号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="是否自提:">
              <p v-if="disabled">{{paymentContract.mention}}</p>
              <el-select v-else v-model="paymentContract.mention" placeholder="请选择" filterable clearable>
               <el-option label="是" value="是"></el-option>
               <el-option label="否" value="否"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="账期:">
              <p v-if="disabled">{{paymentContract.term}}</p>
              <el-select v-else v-model="paymentContract.term" placeholder="请选择账期" filterable clearable>
               <el-option label="一个月" value="一个月"></el-option>
               <el-option label="三个月" value="三个月"></el-option>
               <el-option label="六个月" value="六个月"></el-option>
               <el-option label="无" value="无"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>物料信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="供应商:" prop="supply">
              <p v-if="disabled">{{paymentContract.supply.name}}</p>
              <el-select v-else v-model="paymentContract.supply.id" placeholder="请选择供应商" filterable clearable>
                <el-option v-for="item in supplyList" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="材料类型:" prop="materialCategory">
              <p v-if="disabled">{{paymentContract.materialCategory.name}}</p>
              <el-select v-else v-model="paymentContract.materialCategory.id" placeholder="请选择材料类型" filterable clearable>
                <el-option v-for="item in materialCtgList" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="发货状态:" prop="deliveryStatus">
              <p v-if="disabled">{{paymentContract.deliveryStatus}}</p>
              <el-select v-else v-model="paymentContract.deliveryStatus" placeholder="请选择发货状态" filterable clearable>
               <el-option label="未发货" value="未发货"></el-option>
               <el-option label="已发货" value="已发货"></el-option>
               <el-option label="已到货" value="已到货"></el-option>
               <el-option label="已退货" value="已退货"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="会签单号:">
              <p v-if="disabled">{{paymentContract.signNumber}}</p>
              <el-input v-else v-model="paymentContract.signNumber" placeholder="请输入会签单号"></el-input>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="计划采购金额:">
              <p v-if="disabled">{{paymentContract.adAmount}}</p>
              <el-input v-else v-model="paymentContract.adAmount" placeholder="自动生成" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="实际采购金额:">
              <p v-if="disabled">{{paymentContract.acAmount}}</p>
              <el-input v-else v-model="paymentContract.acAmount" placeholder="自动生成" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn"  v-show="hasPerm('paymentContract:save') && !disabled">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
      <table-component :contractId="contractId" :editShow="editShow" @amountChange='amountChange'></table-component>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { isObjectValueEqual, outputmoney } from '@/utils'
import tableComponent from './table.vue'
export default {
  name: 'paymentContractAdd',
  props: ['editData'],
  components: { tableComponent },
  data() {
    var validateSupply = (rules, value, callback) => {
      if (!value.id) {
        callback(new Error('请选择供应商信息'))
      } else {
        callback()
      }
    }
    return {
      action: 'add',
      editWord: '编辑',
      loading: false,
      disabled: false,
      editShow: false,
      supplyName: '',
      adAmount: '',
      acAmount: '',
      payableAmount: '',
      paymentContract: {
        adAmount: null,
        acAmount: null,
        applicationPerson: '廖淑萍',
        applicationTime: '2018-03-19',
        code: '1',
        contractInfo: { id: '' },
        supply: { id: null },
        deliveryStatus: '未发货',
        department: '财务管理部',
        inputCode: '入库单编号',
        materialCategory: { id: '' },
        mention: '是',
        oddNumber: '',
        optCost: '优化成本',
        orderCode: '',
        payTime: '2018-03-19',
        payableAmount: null,
        paymentObject: '供应商',
        procurement: '采购总额',
        signNumber: '',
        term: ''
      },
      contractInfoList: [],
      businessCtgList: [],
      supplyList: [],
      materialCtgList: [],
      departmentList: [],
      contractId: '',
      rules: {
        applicationPerson: [{ required: true, message: '请输入申请人', trigger: 'blur' }],
        applicationTime: [{ required: true, message: '请输入申请时间', trigger: 'blur' }],
        orderCode: [{ required: true, message: '请输入订单编号', trigger: 'blur' }],
        department: [{ required: true, message: '请选择申请部门', trigger: 'blur' }],
        supply: [{ required: true, validator: validateSupply, trigger: 'change' }],
        paymentObject: [{ required: true, message: '请选择支付对象', trigger: 'change' }],
        payableAmount: [{ required: true, message: '请输入应付金额', trigger: 'blur' }],
        payTime: [{ required: true, message: '请输入到付时间', trigger: 'blur' }],
        code: [{ required: true, message: '请输入付款合同号', trigger: 'blur' }],
        deliveryStatus: [{ required: true, message: '请选择发货状态', trigger: 'change' }]
      },
      temp: {}
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.paymentContract)
  },
  methods: {
    save() {
      this.$refs.paymentContract.validate((valid) => {
        if (valid) {
          this.loading = true
          var paymentContract = {}
          var arr = ['contractInfo', 'materialCategory']
          for (var key in this.paymentContract) {
            if (this.paymentContract[key]) {
              if ((arr.indexOf(key) > -1) && (this.paymentContract[key].id === '')) { // arr向后台传值都是一个个实体，所以值为空，应该删不向后台传送
                continue
              } else {
                paymentContract[key] = this.paymentContract[key]
              }
            }
          }
          this.$post('/paymentContract/save', paymentContract).then(res => {
            this.loading = false
            if (res.data.success === true) {
              this.paymentContract = res.data.data
              this.hanlderFormat()
              this.temp = _.cloneDeep(res.data.data)
              this.successSave()
            } else {
              this.failSave()
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message({
            message: '信息未填写完整',
            type: 'warning'
          })
          return false
        }
      })
    },
    reset() {
      this.paymentContract = _.cloneDeep(this.temp)
    },
    cancel() {
      this.$emit('toggleTab')
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.editWord = '编辑'
        this.paymentContract = _.cloneDeep(this.temp)
      } else {
        this.editWord = '取消编辑'
      }
    },
    getInsertData() {
      this.$get('/paymentContract/findInsertData').then((res) => {
        var data = res.data.data
        this.contractInfoList = data.contractInfoList
        this.supplyList = data.supplyList
        this.materialCtgList = data.materialCtgList
        this.departmentList = [{ value: '财务管理部' }, { value: '成本管理部' }, { value: '市场管理部' }, { value: '工程技术部' }, { value: '人事行政部' }, { value: '运维及质量安全部' }, { value: '研发设计部' },
          { value: '华南办事处' }, { value: '华东办事处' }, { value: '华北办事处' }, { value: '华中办事处' }, { value: '西部办事处' }, { value: '北方办事处' }, { value: '深圳办事处' }]
      })
    },
    successSave() {
      this.$emit('changeObj', false)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      this.editShow = true
      this.disabled = true
    },
    failSave() {
      this.$message({
        message: '保存失败',
        type: 'error'
      })
    },
    toggleAction() {
      if (this.editData.tabState === 'addTab') {
        this.action = 'add'
        this.disabled = false
        this.editShow = false
      } else {
        this.action = 'edit'
        this.disabled = true
        this.editShow = true
        this.paymentContract = _.cloneDeep(this.editData.editData.paymentContract)
        this.hanlderFormat()
        this.temp = _.cloneDeep(this.paymentContract)
      }
    },
    pAmountChange(val) {
      this.paymentContract.payableAmount = val
      this.payableAmount = outputmoney('' + val)
    },
    amountChange(amountObj) {
      this.paymentContract.adAmount = amountObj.adAmount
      this.paymentContract.acAmount = amountObj.acAmount
      this.$post('/paymentContract/save', this.paymentContract).then((res) => {
      })
    },
    hanlderFormat() {
      this.contractId = this.paymentContract.id
      this.amount = outputmoney('' + this.paymentContract.amount)
      this.payableAmount = outputmoney('' + this.paymentContract.payableAmount)
      // materialCategory、contractInfo传值的时，空值为传，返回值为null 对两对象做格式转换
      if (this.paymentContract.materialCategory === null) {
        this.paymentContract.materialCategory = {
          id: '',
          name: ''
        }
      }
      if (this.paymentContract.contractInfo === null) {
        this.paymentContract.contractInfo = {
          id: '',
          name: '',
          code: '',
          businessCategory: { name: '' }
        }
      }
    }
  },
  computed: {},
  watch: {
    disabled(status) {
      if (status === false) {
        this.editWord = '取消编辑'
        this.$emit('changeObj', true)
      } else {
        this.editWord = '编辑'
      }
    },
    paymentContract: {
      handler(obj) {
        if (isObjectValueEqual(obj, this.temp)) {
          this.$emit('changeObj', false)
        } else {
          if ((obj.adAmount !== this.temp.adAmount) || (obj.acAmount !== this.temp.acAmount)) {
            return
          }
          this.$emit('changeObj', true)
        }
        // 付款合同编号拼接
        var supplyId = this.paymentContract.supply.id
        var name = ''
        if (supplyId) {
          if (this.supplyList.length > 0) {
            this.supplyList.forEach((item) => {
              if (item.id === supplyId) {
                name = item.name
              }
            })
          } else {
            name = this.paymentContract.supply.name
          }
          this.paymentContract.code = this.paymentContract.orderCode + '-' + name
        }
      },
      deep: true
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.payment-contract-add.form-container{
  .edit-btn {
    margin: 0;
    button {
      float: right;
    }
  }
}
</style>
