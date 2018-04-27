<template>
  <div class="invoice-search form-container">
    <el-form :model="searchData" :rules="rules" ref="searchData">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="产品编号:">
              <el-autocomplete v-model="searchData.code" :fetch-suggestions="priceCodeSearch" @select="priceSelect" placeholder="请输入产品编号"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="产品名称:">
              <el-autocomplete v-model="searchData.name" :fetch-suggestions="priceNameSearch" @select="priceSelect" placeholder="请输入产品名称"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="产品类型:" >
              <el-select v-model="searchData.type" placeholder="请选择产品类型" filterable clearable>
               <el-option v-for="item in typeList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="系统:">
              <el-select v-model="searchData.system" placeholder="请选择系统" filterable clearable>
               <el-option v-for="item in systemList" :label="item.value" :value="item.value" :key="item.value">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="规格型号:">
              <el-input v-model="searchData.specModel" placeholder="请输入规格型号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="品牌:">
              <el-input v-model="searchData.brand" placeholder="请输入品牌"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="供应商:">
              <el-autocomplete v-model="searchData.supply_name" :fetch-suggestions="supplySearchAsync" placeholder="请选择供应商"></el-autocomplete>
            </el-form-item>
          </el-col>
          <!-- <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="有效期限:" class="range-date">
              <el-date-picker v-model="searchData.validDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col> -->
        </el-row>
      </div>
      <div class="commont-btn">
        <el-button :loading="loading" @click="search">查询</el-button>
        <el-button :loading="loading" @click="searchAll">查询所有</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { materialCtgList } from '@/utils/selectList'
export default {
  name: 'supplierSearch',
  data() {
    return {
      loading: false,
      disabled: false,
      typeList: [],
      systemList: [],
      supplyList: [],
      priceList: [],
      searchData: {
        name: '',
        code: '',
        type: '',
        system: '',
        specModel: '',
        brand: '',
        supply_name: '',
        validDate: []
      },
      rules: {}
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.systemList = [
        { value: '停车场系统' },
        { value: '监控系统' },
        { value: '门禁系统' },
        { value: '巡更系统' },
        { value: '电子围栏系统' },
        { value: '对讲系统' },
        { value: '背景音乐系统' },
        { value: '会议系统' },
        { value: '机房工程系统' },
        { value: '报警系统' },
        { value: '消防系统' },
        { value: '综合布线系统' },
        { value: '通用类' }
      ]
      materialCtgList().then((data) => {
        this.typeList = data
      })
    },
    search() {
      var searchData = {}
      for (var key in this.searchData) {
        if (this.searchData[key]) {
          if (key === 'validDate') {
            searchData['startDate'] = this.searchData['validDate'][0]
            searchData['endDate'] = this.searchData['validDate'][1]
          } else {
            searchData[key] = this.searchData[key]
          }
        }
      }
      // console.log('search', searchData)
      this.$emit('search', searchData)
    },
    searchAll() {
      var searchData = {}
      this.$emit('search', searchData)
    },
    // 供应商搜索
    supplySearchAsync(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/supplyName?supplyName=' + queryString).then((res) => {
        list = res.data.objectList
        for (var i of list) {
          i.value = i.name
        }
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    // 产品编号搜索
    priceCodeSearch(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/priceCode?priceCode=' + queryString).then((res) => {
        list = res.data.objectList
        for (var i of list) {
          i.value = i.code
        }
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    priceSelect(item) {
      this.searchData.code = item.code
      this.searchData.name = item.name
    },
    // 产品名称搜索
    priceNameSearch(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/priceName?priceName=' + queryString).then((res) => {
        list = res.data.objectList
        for (var i of list) {
          i.value = i.name
        }
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  computed: {},
  watch: {
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
