<template>
<div class="bid-wrapper">
  <div class="costing-form-tags">
    <ul>
      <li :class="tab === 'primaryMaterial' ? 'is-active' : ''" @click="toggleTab('primaryMaterial')">
        <el-select v-model="value" placeholder="主材报价表">
          <el-option v-for="item in primary" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li :class="tab === 'auxiliaryMaterial' ? 'is-active' : ''" @click="toggleTab('auxiliaryMaterial')">
        <el-select v-model="value" placeholder="辅材报价表">
          <el-option v-for="item in assist" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </li>
      <li :class="tab === 'materialSummary' ? 'is-active' : ''" @click="toggleTab('materialSummary')">主材汇总表</li>
      <li :class="tab === 'manualSummary' ? 'is-active' : ''" @click="toggleTab('manualSummary')">人工汇总表</li>
      <li :class="tab === 'techService' ? 'is-active' : ''" @click="toggleTab('techService')">技术服务报价表</li>
      <li :class="tab === 'costBudget' ? 'is-active' : ''" @click="toggleTab('costBudget')">成本预算表</li>
      <li :class="tab === 'priceSummary' ? 'is-active' : ''" @click="toggleTab('priceSummary')">报价汇总表</li>
    </ul>
  </div>
  <!-- <router-view></router-view> -->
  <primaryMaterial v-show="tab === 'primaryMaterial'"></primaryMaterial>
  <auxiliaryMaterial v-show="tab === 'auxiliaryMaterial'"></auxiliaryMaterial>
  <materialSummary v-show="tab === 'materialSummary'"></materialSummary>
  <manualSummary v-show="tab === 'manualSummary'"></manualSummary>
  <techService v-show="tab === 'techService'"></techService>
  <costBudget v-show="tab === 'costBudget'"></costBudget>
  <priceSummary v-show="tab === 'priceSummary'"></priceSummary>
</div>
</template>

<script>
import primaryMaterial from './components/primaryMaterial'
import auxiliaryMaterial from './components/auxiliaryMaterial'
import materialSummary from './components/materialSummary'
import manualSummary from './components/manualSummary'
import techService from './components/techService'
import costBudget from './components/costBudget'
import priceSummary from './components/priceSummary'
export default {
  name: 'bidManage',
  components: {
    primaryMaterial,
    auxiliaryMaterial,
    materialSummary,
    manualSummary,
    techService,
    costBudget,
    priceSummary
  },
  data() {
    return {
      primary: [{
        value: '数据机房',
        label: '数据机房'
      }, {
        value: '综合布线',
        label: '综合布线'
      }, {
        value: '终端系统',
        label: '终端系统'
      }, {
        value: '添加',
        label: '添加'
      }],
      assist: [{
        value: '辅材表1',
        label: '辅材表1'
      }, {
        value: '辅材表2',
        label: '辅材表2'
      }, {
        value: '辅材表3',
        label: '辅材表3'
      }, {
        value: '添加',
        label: '添加'
      }],
      value: '',
      tab: 'materialSummary'
    }
  },
  methods: {
    toggleTab(tab) {
      this.tab = tab
    }
  },
  computed: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>@import "src/styles/mixin.scss";
.bid-wrapper {
    .costing-form-tags {
        @include boxSizing;
        width: 100%;
        height: 40px;
        margin-top: 10px;
        border: solid 1px #d2d2d2;
        color: #828282;
        vertical-align: middle;
    }
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
            cursor: pointer;
        }
        li.is-active {
            border: solid 1px #35d5ba;
            color: #35d5ba;
        }
    }
}
</style>

<style rel="stylesheet/scss" lang="scss">@import "src/styles/mixin.scss";
.bid-wrapper {
    .el-select {
        .el-input__inner {
            height: 28px!important;
            vertical-align: top;
            border: 0;
            color: #828282!important;
            @include placeholderColor(#828282);
            text-align: center;
        }
        i.el-select__caret {
            color: #828282;
        }
    }
    li.is-active .el-input__inner {
        @include placeholderColor(#35d5ba);
    }
    li.is-active i.el-select__caret {
        color: #35d5ba!important;
    }
    .table-header {
        width: 100%;
        height: 30px;
        line-height: 30px;
        margin: 20px 0;
        background-color: #ffffff;
        font-size: 14px;
        text-align: center;
        position: relative;
        .table-attached {
            position: absolute;
            right: 0;
            top: 0;
            li {
                display: inline-block;
                margin: 0 12px;
                color: #828282;
                cursor: pointer;
            }
        }
    }
    table {
        border-left: 1px solid #828282;
        border-top: 1px solid #828282;
        tr {
            td {
                border-right: 1px solid #828282;
                border-bottom: 1px solid #828282;
                text-align: center;
                height: 30px;
                line-height: 30px;
            }
        }
    }
}
</style>
