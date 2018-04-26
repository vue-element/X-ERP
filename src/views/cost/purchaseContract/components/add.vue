<template>
  <div class="payment-contract-add form-container">
    <el-form :model="paymentContract" ref="paymentContract">
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
              <el-input v-else v-model="paymentContract.code" placeholder="自动生成" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="合同编号:">
              <p v-if="disabled">{{paymentContract.contractInfo.code}}</p>
              <el-autocomplete v-else v-model="paymentContract.contractInfo.code" :fetch-suggestions="contractCodeSearch" @select="contractCodeSelect" placeholder="请选择合同编号"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="合同名称／所属项目:">
              <p v-if="disabled">{{paymentContract.contractInfo.name}}</p>
              <el-input v-else v-model="paymentContract.contractInfo.name" placeholder="自动生成" disabled></el-input>
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
              <p v-if="disabled">{{paymentContract.contractInfo.business.businessCategory.name}}</p>
              <el-input v-else v-model="paymentContract.contractInfo.business.businessCategory.name" placeholder="自动生成" disabled></el-input>
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
              <el-autocomplete v-else v-model="paymentContract.supply.name" :fetch-suggestions="supplySearchAsync" @select="supplySelect" placeholder="请选择供应商"></el-autocomplete>
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
      <table-component :contractId="contractId" :editShow="editShow"  @amountChange='amountChange'></table-component>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { outputmoney } from '@/utils'
import tableComponent from './table.vue'
export default {
  name: 'paymentContractAdd',
  props: ['editData'],
  components: { tableComponent },
  data() {
    return {
      disabled: true,
      editShow: false,
      payableAmount: '',
      paymentContract: {
        adAmount: null,
        acAmount: null,
        applicationPerson: '廖淑萍',
        applicationTime: '2018-03-19',
        businessCategory: { id: null },
        code: '',
        contractInfo: { id: null },
        supply: { id: null },
        deliveryStatus: '未发货',
        department: '财务管理部',
        inputCode: '入库单编号',
        materialCategory: { id: null },
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
      contractId: ''
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.paymentContract = _.cloneDeep(this.editData.editData.paymentContract)
      console.log('this.paymentContract', this.paymentContract)
      // this.paymentContract.amount = outputmoney('' + this.paymentContract.amount)
      this.paymentContract.payableAmount = outputmoney('' + this.paymentContract.payableAmount)
      this.contractId = this.paymentContract.id
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
    }
  },
  computed: {},
  watch: {
    amountObj(val) {
      console.log('val', val)
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
