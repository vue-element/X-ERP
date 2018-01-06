<template>
	<div class="bid-wrapper">
    <div class="costing-form-tags">
      <ul>
        <li class="is-active">
          <el-select v-model="value" placeholder="主材报价表">
            <el-option v-for="item in primary" :key="item.value" :label="item.label":value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <el-select v-model="value" placeholder="辅材报价表">
            <el-option v-for="item in assist" :key="item.value" :label="item.label":value="item.value">
            </el-option>
          </el-select>
        </li>
        <li class='is-active'>主财汇总表</li>
        <li>人工汇总表</li>
        <li>技术服务报价表</li>
        <li>成本预算表</li>
        <li>报价汇总表</li>
      </ul>
    </div>
    <router-view></router-view>
	</div>
</template>

<script>
export default {
  name: 'bidManage',
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
      value: ''
    }
  },
  methods: {

  },
  computed: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.bid-wrapper {
  .costing-form-tags{
    width: 100%;
  	height: 40px;
    margin-top: 10px;
  	border: solid 1px #d2d2d2;
    color: #828282;
    vertical-align: middle;
  }
  ul{
    @include flex;
    li {
      width: 148px;
    	height: 28px;
      line-height: 30px;
      margin:5px;
      text-align: center;
    	border: solid 1px #d2d2d2;
    }
    li.is-active {
      border: solid 1px #35d5ba;
      color: #35d5ba;
    }
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
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
    margin:20px 0;
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
      }
    }
  }
  table {
    border-left:1px solid #828282;
    border-top:1px solid #828282;
    tr {
      td {
        border-right:1px solid #828282;
        border-bottom:1px solid #828282;
        text-align: center;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
