<template>
<div class="business-container invoice-search">
  <!-- 社区建设单项目信息表 -->
  <div class="form-container project-msg"  v-show="true">
    <div class="form-inner">
      <!-- 基本信息 -->
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>商机名称：</label>
              <input type="text"  placeholder="请输入" v-model="searchData.name">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item range-date">
              <label>单据日期：</label>
              <el-date-picker v-model="searchData.date" type="daterange"  start-placeholder="开始日期" range-separator="—" end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>业务分线负责人：</label>
              <input type="text"  placeholder="请输入" v-model="searchData.chargePerson">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="24" :lg="8">
            <div class="basic-item customer-info">
              <label>客户信息：</label>
              <el-select placeholder="请选择" v-model="client.id" >
               <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>区域：</label>
              <el-select placeholder="请选择"  v-model="region.id">
               <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
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
        </el-row>
        <div class="commont-btn">
          <el-button @click="search">查  询</el-button>
          <el-button @click="searchAll">查询所有</el-button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  name: 'InvoiceSearch',
  data() {
    return {
      searchData: {
        region_id: 1,
        client_id: 1,
        city_id: 3,
        chargePerson: '业务线负责人',
        date: '',
        name: '商机名称'
      },
      clientList: [],
      cityList: [],
      regionList: [],
      region: { id: 1 },
      client: { id: 1 },
      city: { id: 3 },
      cityOption: [0, 1, 3]
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
        this.clientList = data.clientList
        this.regionList = data.regionList
      })
    },
    cityChange(val) {
      console.log('val', val)
      var len = val.length
      this.city.id = val[len - 1]
    },
    search() {
      if (this.searchData.date) {
        this.searchData.date = parseTime(this.searchData.date[0], '{y}-{m}-{d}')
      } else {
        this.searchData.date = ''
      }
      this.searchData.region_id = this.region.id
      this.searchData.client_id = this.client.id
      this.searchData.city_id = this.city.id
      this.$emit('searchWord', this.searchData)
    },
    searchAll() {
      this.searchData = {}
      this.$emit('searchWord', this.searchData)
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.invoice-search {
  color: #000;
  font-size: 14px;
  .el-row {
    .el-form-item,
    .money-item {
      margin: 0;
      padding: 0;
      margin-top: 20px;
      @include flex;
    }
    .money-item {
      label.el-form-item__label {
        width: 26%!important;
        margin-right: 2%;
        padding:0;
        text-align: right;
      }
      .el-form-item__content{
        width: 62%;
        @include borderRadius(4px);
        @include flex;
        @include boxSizing;
        border: 1px solid #828282;
        padding:0 15px;
        padding-left: 15px;
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
@import "src/styles/mixin.scss";
</style>
