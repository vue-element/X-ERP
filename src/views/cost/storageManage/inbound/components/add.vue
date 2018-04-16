<template>
  <div class="payment-contract-add">
    <div class="inner-tab-toggle">
      <ul>
        <li :class="actionTab === 'inboundInfo' ? 'is-active' : ''" @click="toggleTab('inboundInfo')">入库填写</li>
        <li :class="actionTab === 'officeCheck' ? 'is-active' : ''" @click="toggleTab('officeCheck')">办事处审核</li>
        <li :class="actionTab === 'costCheck' ? 'is-active' : ''" @click="toggleTab('costCheck')">成本部审核</li>
      </ul>
    </div>
    <div class="form-container">
      <el-form :model="inboundList" :rules="rules" ref="inboundList">
        <div class="form-module">
          <h4 class="module-title"><p>入库信息:</p></h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="付款合同编号/入库单号:">
                <p v-if="disabled">{{inboundList.paymentContract.code}}</p>
                <el-input v-else v-model="inboundList.paymentContract.code" placeholder="请输入付款合同编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="订单编号:">
                <p v-if="disabled">{{inboundList.paymentContract.orderCode}}</p>
                <el-input v-else v-model="inboundList.paymentContract.orderCode" placeholder="请输入订单编号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="入库成本核算表号:">
                <p v-if="disabled">{{inboundList.tableCode}}</p>
                <el-input v-else v-model="inboundList.tableCode" placeholder="请输入入库单编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="供应商:">
                <p v-if="disabled">{{inboundList.paymentContract.supply.name}}</p>
                <el-input v-else v-model="inboundList.paymentContract.supply.name" placeholder="请输入供应商"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="办事处:">
                <p v-if="disabled">{{inboundList.paymentContract.department}}</p>
                <el-input v-else v-model="inboundList.paymentContract.department" placeholder="请输入办事处"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="入库日期:" class="single-date">
                <p v-if="disabled">{{inboundList.date}}</p>
                <el-date-picker v-else type="date" v-model="inboundList.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <table-component :inboundId="inboundId" :paymentContractId="paymentContractId" :editShow="editShow" :actionTab="actionTab"></table-component>
      </el-form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import tableComponent from './table.vue'
export default {
  props: ['editData'],
  components: { tableComponent },
  data() {
    return {
      action: 'add',
      actionTab: 'inboundInfo',
      loading: false,
      disabled: false,
      editShow: false,
      inboundList: {},
      businessList: [],
      categoryList: [],
      supplyList: [],
      contractInfoList: [],
      inboundId: '',
      rules: {}
    }
  },
  created() {
    if (this.editData.tabState === 'addTab') {
      this.action = 'add'
    } else {
      this.action = 'edit'
      this.editInfo()
      this.disabled = true
      this.editShow = true
    }
  },
  methods: {
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.inboundList = data.inboundList
      this.inboundId = this.inboundList.id
      this.paymentContractId = this.inboundList.paymentContract.id
    },
    toggleTab(tab) {
      this.actionTab = tab
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.payment-contract-add {
  .form-container{
    margin-top:50px;
    .edit-btn {
      margin: 0;
      button {
        float: right;
      }
    }
  }
}
</style>
