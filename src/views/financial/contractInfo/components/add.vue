<template>
  <div class="contract-info-container">
    <div class="contractInfo-item" className="sub-navbar">
      <ul>
        <li :class="tab === 'basicInfo'?'is-active':''" @click="toggleTab('basicInfo')">合同基础信息</li>
        <li :class="tab === 'disclosureInfo'?'is-active':''" @click="toggleTab('disclosureInfo')">合同交底信息</li>
        <li :class="tab === 'subContract'?'is-active':''" @click="toggleTab('subContract')">分包</li>
        <li :class="tab === 'change'?'is-active':''" @click="toggleTab('change')">变更</li>
        <li :class="tab === 'billing'?'is-active':''" @click="toggleTab('billing')">开票信息</li>
        <li :class="tab === 'received'?'is-active':''" @click="toggleTab('received')">回款信息</li>
        <li :class="tab === 'payment'?'is-active':''" @click="toggleTab('payment')">成本信息</li>
      </ul>
    </div>
    <div class="contractInfo-show">
      <basicInfo v-if="tab === 'basicInfo'" :editData="editData" @cancel="cancel" @changeObj='changeObj'></basicInfo>
      <disclosureInfo v-if="tab === 'disclosureInfo'" :editData="editData" @cancel="cancel" @changeObj='changeObj'></disclosureInfo>
      <subContract v-if="tab === 'subContract'" :editData="editData"></subContract>
      <change v-if="tab === 'change'" :editData="editData"></change>
      <billing v-if="tab === 'billing'" :editData="editData"></billing>
      <received v-if="tab === 'received'" :editData="editData"></received>
      <payment v-if="tab === 'payment'" :editData="editData"></payment>
    </div>
  </div>
</template>

<script>
import basicInfo from '../components/detaile/basicInfo'
import disclosureInfo from '../components/detaile/disclosureInfo'
import subContract from '../components/detaile/subContract'
import change from '../components/detaile/change'
import billing from '../components/detaile/billing'
import received from '../components/detaile/received'
import payment from '../components/detaile/payment'
export default {
  components: {
    basicInfo,
    disclosureInfo,
    subContract,
    change,
    billing,
    received,
    payment,
    isChange: false
  },
  props: ['editData', 'contractMsg'],
  data() {
    return {
      tab: 'basicInfo'
    }
  },
  created() {
  },
  methods: {
    toggleTab(tab) {
      if (this.isChange === true) {
        this.showPopWin(() => {
          this.tab = tab
        })
        return
      }
      this.tab = tab
    },
    cancel () {
      this.$emit('cancel')
    },
    changeObj(status) {
      this.$emit('isChange', status)
      this.isChange = status
    },
    showPopWin(callback) {
      this.$confirm('信息未保存，是否离开当前页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        callback()
        this.isChange = false
      }).catch(() => {
        this.isChange = true
      })
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
