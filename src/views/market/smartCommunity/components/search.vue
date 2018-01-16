<template>
<div class="form-container smartCommunity-search">
  <div class="form-module">
    <h4 class="module-title">
      <p>查询条件</p>
    </h4>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="basic-item">
          <label>项目名称：</label>
          <input type="text" placeholder="请输入"/>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="basic-item basic-date">
          <label>首期入伙时间：</label>
          <el-date-picker v-model="value" type="daterange"  start-placeholder="开始日期" range-separator="—" end-placeholder="结束日期" default-value="2017-01-01" size="mini">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="basic-item">
          <label>合约模式：</label>
          <el-select  placeholder="请选择">
           <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="basic-item customer-info">
          <label>客户信息：</label>
          <el-select v-model="searchData.client" placeholder="请选择">
           <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="basic-item">
          <label>城市：</label>
          <el-cascader :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange"></el-cascader>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="basic-item">
          <label>区域：</label>
          <el-select v-model="searchData.region" placeholder="请选择">
           <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
    </el-row>
    <div class="common-btn">查  询</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SmartCommunitySearch',
  data() {
    return {
      height: 100,
      clientList: [],
      cityList: [],
      regionList: [],
      cityOption: [0, 1, 3],
      value: '',
      searchData: {
        region: {},
        client: {},
        city: {}
      }
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.$get('/bussiness/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        console.log('data', this.cityList)
        this.clientList = data.clientList
        this.regionList = data.regionList
      })
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.smartCommunity-search {
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
    .el-col:last-child {
      .el-form-item__label{
        width: 96px;
      }
    }
  }
}
</style>
