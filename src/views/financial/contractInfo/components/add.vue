<template>
  <div class="contract-info-container">
    <div class="contractInfo-item" className="sub-navbar">
      <ul>
        <li :class="tab === 'basicInfo'?'is-active':''" @click="toggleTab('basicInfo')">合同基础信息</li>
        <li :class="tab === 'disclosureInfo'?'is-active':''" @click="toggleTab('disclosureInfo')">合同交底信息</li>
        <li :class="tab === 'subContract'?'is-active':''" @click="toggleTab('subContract')">分包</li>
        <li :class="tab === 'change'?'is-active':''" @click="toggleTab('change')">变更</li>
        <li :class="tab === 'invoiceInfo'?'is-active':''" @click="toggleTab('invoiceInfo')">开票信息</li>
        <li :class="tab === 'returnMoney'?'is-active':''" @click="toggleTab('returnMoney')">回款信息</li>
        <li :class="tab === 'payMoney'?'is-active':''" @click="toggleTab('payMoney')">付款信息</li>
      </ul>
    </div>

    <div class="contractInfo-show">
      <basicInfo v-show="tab === 'basicInfo'"></basicInfo>
      <disclosureInfo v-show="tab === 'disclosureInfo'"></disclosureInfo>
      <subContract v-show="tab === 'subContract'"></subContract>
      <change v-show="tab === 'change'"></change>
      <invoiceInfo v-show="tab === 'invoiceInfo'"></invoiceInfo>
      <returnMoney v-show="tab === 'returnMoney'"></returnMoney>
      <payMoney v-show="tab === 'payMoney'"></payMoney>
    </div>
  </div>
</template>

<script>
import basicInfo from '../components/detaile/basicInfo'
import disclosureInfo from '../components/detaile/disclosureInfo'
import subContract from '../components/detaile/subContract'
import change from '../components/detaile/change'
import invoiceInfo from '../components/detaile/invoiceInfo'
import returnMoney from '../components/detaile/returnMoney'
import payMoney from '../components/detaile/payMoney'
export default {
  props: ['rowDetail', 'searchData'],
  components: {
    basicInfo,
    disclosureInfo,
    subContract,
    change,
    invoiceInfo,
    returnMoney,
    payMoney
  },
  data() {
    return {
      tab: 'basicInfo'
    }
  },
  mounted() {
  },
  created() {
  },
  methods: {
    toggleTab(tab) {
      this.tab = tab
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.contract-info-container{
  .contractInfo-item{
    @include boxSizing;
    position: fixed;
    top:150px;
    left:240px;
    right: 30px;
    height:40px;
    border:1px solid #d2d2d2;
    color:#828282;
    z-index: 1002;
    background-color: #fff;
    ul {
        @include flex;
        li {
            width: 148px;
            height: 28px;
            line-height: 30px;
            margin: 5px;
            text-align: center;
            border: solid 1px #d2d2d2;
            overflow: hidden;
        }
        li.is-active {
            border: solid 1px #35d5ba;
            color: #35d5ba;
        }
    }
  }
}
</style>
