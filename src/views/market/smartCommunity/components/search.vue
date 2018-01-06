<template>
<div class="search-container smartCommunity-search">
  <h4>
    <p>查询条件</p>
  </h4>
  <el-form ref="form" :model="form">
    <el-row type="flex" justify="space-between">
      <el-col :lg="8" :sm="12" :xs="12">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" placeholder="请填写活动名称"></el-input>
        </el-form-item>
        </el-col>
        <el-col :lg="8" :sm="12" :xs="12">
        <el-form-item label="区域">
          <el-select v-model="form.region" placeholder="请选择区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :lg="8" :sm="12" :xs="12">
        <el-form-item label="合约模式">
          <el-select v-model="form.region" placeholder="请选择合约模式">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :lg="8" :sm="12" :xs="12">
        <el-form-item label="客户信息" :span="6">
          <el-input v-model="form.msg" placeholder="请填写客户信息"></el-input>
        </el-form-item>
        </el-col>
        <el-col :lg="8" :sm="12" :xs="12">
        <el-form-item label="城市" :span="6">
          <el-select v-model="form.city" placeholder="请选择城市">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        </el-col>
        <el-col :lg="8" :sm="12" :xs="12">
        <el-form-item label="首期入伙时间" :span="6">
          <el-date-picker v-model="value9" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" default-value="2010-10-01" size="mini">
          </el-date-picker>
        </el-form-item>
        </el-col>
    </el-row>
  </el-form>
  <div class="con-search-btn" @click="search">查  询</div>
</div>
</template>

<script>
// import { winHeight } from '@/utils'
// import { fetchList } from '@/api/article'
export default {
  name: 'smartCommunity-search',
  data() {
    return {
      form: {
        region: ''
      },
      value9: '',
      height: 100
    }
  },
  created() {
  },
  methods: {
    search() {
      console.log('search')
      this.$emit('search', this.form)
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.search-container {
  color: #000;
  border: 1px solid #d2d2d2;
  margin: 16px 0;
  padding: 0 20px;
  @include borderRadius(4px);
  h4 {
    height: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #d2d2d2;
    p {
      border-left: 5px solid #35d5ba;
      padding-left: 15px;
    }
  }
  .el-form {
    color: #000;
    .el-row {
      .el-form-item {
        margin: 0;
        padding: 0;
        margin-top: 20px;
        @include flex;
      }
    }
  }
}
</style>
<style lang="scss">
.smartCommunity-search{
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
        width: 96px;
      }
    }
  }
}
</style>
