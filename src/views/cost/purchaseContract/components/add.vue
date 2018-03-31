 :sm:md<template>
  <div class="payment-contract-add form-container">
    <el-form :model="paymentContract" ref="paymentContract">
      <div class="form-module">
        <h4 class="module-title">
          <p>基础信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="申请人:">
              <p>{{paymentContract.applicationPerson}}</p>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="申请时间:" class="single-date">
              <p>{{paymentContract.applicationTime}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="订单编号:">
              <p>{{paymentContract.orderCode}}</p>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="付款合同编号:">
              <p>{{paymentContract.code}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="商机编号:">
              <p>{{paymentContract.contractInfo.code}}</p>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="所属项目:">
              <p>{{paymentContract.contractInfo.name}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="使用部门:">
              <p>{{paymentContract.department}}</p>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="业务类别:">
              <p>{{paymentContract.businessCategory.name}}</p>
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
              <p >{{paymentContract.paymentObject}}</p>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="应付金额:">
              <p>{{paymentContract.payableAmount}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="到付时间:" class="single-date">
              <p>{{paymentContract.payTime}}</p>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="凭单号:">
              <p>{{paymentContract.oddNumber}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="是否自提:">
              <p>{{paymentContract.mention}}</p>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="账期:">
              <p>{{paymentContract.term}}</p>
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
            <el-form-item label="供应商:">
              <p>{{paymentContract.supply.name}}</p>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="材料类型:">
              <p>{{paymentContract.materialCategory.name}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="发货状态:">
              <p>{{paymentContract.deliveryStatus}}</p>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="会签单号:">
              <p>{{paymentContract.signNumber}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="采购金额:">
              <p >{{paymentContract.amount}}</p>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <table-component :contractId="contractId" :editShow="editShow"></table-component>
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
      editShow: false,
      paymentContract: {
        amount: null,
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
      this.paymentContract = _.cloneDeep(this.editData.editData.paymentContractList)
      this.paymentContract.amount = outputmoney('' + this.paymentContract.amount)
      this.paymentContract.payableAmount = outputmoney('' + this.paymentContract.payableAmount)
      this.contractId = this.paymentContract.id
    }
  },
  computed: {},
  watch: {}
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
