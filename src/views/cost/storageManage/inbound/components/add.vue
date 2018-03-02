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
      <el-form :model="paymentContract" :rules="rules" ref="paymentContract">
        <div class="form-module">
          <h4 class="module-title"><p>出库信息:</p></h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="入库单编号:">
                <p v-if="disabled">{{paymentContract.inputNumber}}</p>
                <el-input v-else v-model="paymentContract.inputNumber" placeholder="请输入您的账号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="供应商:">
                <p v-if="disabled">{{paymentContract.applicationPerson}}</p>
                <el-input v-else v-model="paymentContract.applicationPerson" placeholder="请输入您的账号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="办事处:">
                <p v-if="disabled">{{paymentContract.business.name}}</p>
                <el-select v-else v-model="paymentContract.business.id" placeholder="请选择" filterable>
                 <el-option v-for="item in businessList" :label="item.name" :value="item.id" :key="item.id">
                 </el-option>
               </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="入库日期:" class="single-date">
                  <p v-if="disabled">{{paymentContract.payTime}}</p>
                <el-date-picker v-else type="date" v-model="paymentContract.payTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <table-component :contractId="contractId" :editShow="editShow" :actionTab="actionTab"></table-component>
      </el-form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import tableComponent from './table.vue'
export default {
  name: 'paymentContractAdd',
  props: ['editData'],
  components: { tableComponent },
  data() {
    return {
      action: 'add',
      actionTab: 'inboundInfo',
      loading: false,
      disabled: false,
      editShow: false,
      paymentContract: {},
      businessList: [],
      categoryList: [],
      contractId: '',
      rules: {}
    }
  },
  created() {
    if (this.editData.tabState === 'addTab') {
      this.action = 'add'
      // this.getInsertData()
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
      this.paymentContract = data.paymentContractList
      this.businessList = data.businessList
      this.contractId = this.paymentContract.id
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
