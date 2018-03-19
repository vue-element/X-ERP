:sm:md<template>
  <div class="payment-contract-add form-container">
    <div class="commont-btn edit-btn" v-show="editShow" >
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="paymentContract" :rules="rules" ref="paymentContract">
      <div class="form-module">
        <h4 class="module-title">
          <p>基础信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="申请人:" prop="applicationPerson">
              <p v-if="disabled">{{paymentContract.applicationPerson}}</p>
              <el-input v-else v-model="paymentContract.applicationPerson" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="申请时间:" class="single-date" prop="applicationTime">
              <p v-if="disabled">{{paymentContract.applicationTime}}</p>
              <el-date-picker  v-else type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="paymentContract.applicationTime" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="业务线:" prop="category">
              <p v-if="disabled">{{paymentContract.category.name}}</p>
              <el-select v-else v-model="paymentContract.category.id" placeholder="请选择" filterable>
               <el-option v-for="item in businessCtgList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="申请部门:" prop="department">
              <p v-if="disabled">{{paymentContract.department}}</p>
              <el-input v-else v-model="paymentContract.department" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="合同编号:" prop="contractInfo">
              <p v-if="disabled">{{paymentContract.contractInfo.code}}</p>
              <el-select v-else v-model="paymentContract.contractInfo.id" placeholder="请选择" filterable>
               <el-option v-for="item in contractInfoList" :label="item.code" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="供应商:" prop="supply">
              <p v-if="disabled">{{paymentContract.supply.name}}</p>
              <el-select v-else v-model="paymentContract.supply.id" placeholder="请选择" filterable>
               <el-option v-for="item in supplyList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="所属项目:" prop="project">
              <p v-if="disabled">{{paymentContract.project}}</p>
              <el-input v-else v-model="paymentContract.project" placeholder="请输入使用项目"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
           <el-form-item label="付款合同号:" prop="code">
             <p v-if="disabled">{{paymentContract.code}}</p>
             <el-input v-else v-model="paymentContract.code" placeholder="请输入付款合同号"></el-input>
           </el-form-item>
         </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>开票付款信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="支付对象:" prop="paymentObject">
              <p v-if="disabled">{{paymentContract.paymentObject}}</p>
              <el-select v-else v-model="paymentContract.paymentObject" placeholder="请选择" filterable>
                <el-option label="个人" value="个人"></el-option>
                <el-option label="供应商" value="供应商"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="应付金额:" prop="payableAmount">
              <p v-if="disabled">{{paymentContract.payableAmount}}</p>
              <el-input v-else v-model="paymentContract.payableAmount" placeholder="请输入您的账号" @change="amountChange"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="到付时间:" class="single-date" prop="payTime">
                <p v-if="disabled">{{paymentContract.payTime}}</p>
              <el-date-picker v-else type="date" v-model="paymentContract.payTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="发货状态:" prop="deliveryStatus">
              <p v-if="disabled">{{paymentContract.deliveryStatus}}</p>
              <el-select v-else v-model="paymentContract.deliveryStatus" placeholder="请选择" filterable>
               <el-option label="未发货" value="未发货"></el-option>
               <el-option label="已发货" value="已发货"></el-option>
               <el-option label="已到货" value="已到货"></el-option>
               <el-option label="已退货" value="已退货"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="是否自提:">
              <p v-if="disabled">{{paymentContract.mention}}</p>
              <el-select v-else v-model="paymentContract.mention" placeholder="请选择" filterable>
               <el-option label="是" value="是"></el-option>
               <el-option label="否" value="否"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="账期:">
              <p v-if="disabled">{{paymentContract.term}}</p>
              <el-select v-else v-model="paymentContract.term" placeholder="请选择" filterable>
               <el-option label="一个月" value="一个月"></el-option>
               <el-option label="三个月" value="三个月"></el-option>
               <el-option label="六个月" value="六个月"></el-option>
               <el-option label="无" value="无"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="优化成本:">
              <p v-if="disabled">{{paymentContract.optCost}}</p>
              <el-input v-else v-model="paymentContract.optCost" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn"  v-show="!disabled">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
      <table-component :contractId="contractId" :editShow="editShow"></table-component>
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
    var validateBusiness = (rules, value, callback) => {
      if (!value.id) {
        callback(new Error('请选择关联合同'))
      } else {
        callback()
      }
    }
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
      paymentContract: {
        applicationPerson: '廖淑萍',
        applicationTime: '',
        contractInfo: { id: '' },
        supply: { id: '' },
        category: { id: '' },
        deliveryStatus: '未发货',
        department: '',
        mention: '',
        optCost: '',
        payTime: '',
        payableAmount: '',
        paymentObject: '供应商',
        term: '',
        code: '',
        project: ''
      },
      contractInfoList: [],
      businessCtgList: [],
      supplyList: [],
      contractId: '',
      rules: {
        applicationPerson: [{ required: true, message: '请输入申请人', trigger: 'blur' }],
        applicationTime: [{ required: true, message: '请输入申请时间', trigger: 'blur' }],
        category: [{ required: true, message: '请选择业务线', trigger: 'change' }],
        department: [{ required: true, message: '请选择申请部门', trigger: 'blur' }],
        contractInfo: [{ required: true, validator: validateBusiness, trigger: 'change' }],
        supply: [{ required: true, validator: validateSupply, trigger: 'change' }],
        paymentObject: [{ required: true, message: '请选择支付对象', trigger: 'change' }],
        payableAmount: [{ required: true, message: '请输入应付金额', trigger: 'blur' }],
        payTime: [{ required: true, message: '请输入到付时间', trigger: 'blur' }],
        code: [{ required: true, message: '请输入付款合同号', trigger: 'blur' }],
        project: [{ required: true, message: '请输入使用项目', trigger: 'blur' }],
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
          console.log(JSON.stringify(this.paymentContract))
          this.$post('/paymentContract/save', this.paymentContract).then(res => {
            this.loading = false
            if (res.data.success === true) {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.disabled = true
              this.editShow = true
              this.contractId = res.data.data.id
              this.$emit('changeObj', false)
            } else {
              this.$message({
                message: '保存失败',
                type: 'error'
              })
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
      console.log('this.temp', this.temp)
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
        this.businessCtgList = data.businessCtgList
        // this.businessCtgList = [{ value: '科技-智慧社区工程全委' }, { value: '科技-智慧社区改造' }, { value: '科技-物联网大平台' }, { value: '科技-设计服务' }, { value: '科技-技术服务' }]
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
        this.paymentContract = _.cloneDeep(this.editData.editData.paymentContractList)
        this.contractId = this.paymentContract.id
      }
    },
    amountChange(val) {
      console.log(val)
      this.paymentContract.payableAmount = outputmoney(val)
    }
  },
  computed: {},
  watch: {
    disabled(status) {
      if (status === false) {
        this.$emit('changeObj', true)
      }
    },
    paymentContract: {
      handler(obj) {
        if (isObjectValueEqual(obj, this.temp)) {
          this.$emit('changeObj', false)
        } else {
          this.$emit('changeObj', true)
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
