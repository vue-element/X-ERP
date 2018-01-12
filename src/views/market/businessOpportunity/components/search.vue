<template>
<div class="business-container business-search">
  <!-- 社区建设单项目信息表 -->
  <div class="form-container project-msg"  v-show="true">
    <div class="form-inner">
      <!-- 基本信息 -->
      <div class="form-module">
        <h4>
          <p>查询条件</p>
        </h4>
        <el-form ref="form" :model="form">
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-form-item label="商机名称">
              <el-input v-model="form.name" placeholder="请填写活动名称"></el-input>
            </el-form-item>
            <el-form-item label="客户类别">
              <el-select v-model="form.region" placeholder="请选择区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="区域">
              <el-select v-model="form.region" placeholder="请选择合约模式">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-form-item label="修改日期">
              <el-date-picker v-model="value" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" default-value="2010-10-01">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="业务分类">
              <el-select v-model="form.city" placeholder="请选择城市">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="业务线负责人">
              <el-input v-model="form.name" placeholder="请填写活动名称"></el-input>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-form-item label="单据日期">
              <el-input v-model="form.name" placeholder="请填写活动名称"></el-input>
            </el-form-item>
            <el-form-item label="执行状态" >
              <el-select v-model="form.city" placeholder="请选择城市">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商机跟进状态">
              <el-select v-model="form.city" placeholder="请选择城市">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-form-item label="审核状态">
              <el-select v-model="form.city" placeholder="请选择城市">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="关联合同">
              <el-select v-model="form.city" placeholder="请选择城市">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属年月">
              <el-date-picker v-model="value" type="daterange"  start-placeholder="开始日期" range-separator="—" end-placeholder="结束日期" default-value="2017-01-01">
              </el-date-picker>
            </el-form-item>
          </el-row>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-form-item label="商机编码">
              <el-input v-model="form.msg" placeholder="请填写客户信息"></el-input>
            </el-form-item>
            <el-form-item label="城市">
              <el-input v-model="form.msg" placeholder="请填写客户信息"></el-input>
            </el-form-item>
            <div class="el-form-item money-item">
              <label class="el-form-item__label">金额</label>
              <div class="el-form-item__content">
                <input placeholder="0">
                <span>~</span>
                <input placeholder="0">
              </div>
            </div>
          </el-row>
        </el-form>
        <div class="con-search-btn">查  询</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  winHeight
} from '@/utils'
// import { fetchList } from '@/api/article'
export default {
  name: 'businessOpportunity-index',
  data() {
    return {
      msg: {
        1: 1
      },
      inputable: true,
      form: {
        region: '',
        name: ''
      },
      value: '',
      height: 100
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
      // this.height = 0
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.el-form {
  color: #000;
  font-size: 14px;
  .el-row {
    .el-form-item,
    .money-item {
      margin: 0;
      padding: 0;
      margin-top: 20px;
      // width: 23%;
      @include flex;
    }
    .money-item {
      .el-form-item__content{
        @include borderRadius(4px);
        @include flex;
        @include boxSizing;
        border: 1px solid #828282;
        padding:0 15px;
        input {
          width: 40%;
          text-align: center;
        }
        span {
          width: 20%;
          text-align: center;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.business-container.business-search{
  .el-form{
    .el-form-item{
      .el-form-item__label{
        width: 70px;
      }
      .el-form-item__content {
        width: 210px;
      }
      .el-input__inner {
        width: 210px
      }
    }
    .el-form-item:last-child {
      .el-form-item__label{
        width: 106px;
      }
    }
  }
  .el-date-editor {
    padding: 3px;
    .el-range__icon,
    .el-range-input,
    .el-range-separator,
    .el-icon-circle-close {
      height: 22px;
      line-height: 22px;
      vertical-align: top;
      font-size: 14px;
    }
    .el-input__icon {
      width:22px;
      font-size: 12px;
    }
    .el-range-separator{
      padding: 0 2px;
    }
  }
}
</style>
