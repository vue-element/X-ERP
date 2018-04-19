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
              <el-select v-model="searchData.p_id" placeholder="请选择产品编号" filterable clearable>
               <el-option v-for="item in priceList" :label="item.code" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="产品名称:">
              <el-select v-model="searchData.p_id" placeholder="请选择产品名称" filterable clearable>
               <el-option v-for="item in priceList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="产品类型:" >
              <el-select v-model="searchData.type" placeholder="请选择产品类型" filterable clearable>
               <el-option v-for="item in typeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="系统:">
              <el-select v-model="searchData.system" placeholder="请选择系统" filterable clearable>
               <el-option v-for="item in systemList" :label="item.value" :value="item.value" :key="item.id">
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
              <el-select v-model="searchData.supply_id" placeholder="请选择供应商" filterable clearable>
               <el-option v-for="item in supplyList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="有效期限:" class="range-date">
              <el-date-picker v-model="searchData.validDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
              </el-date-picker>
              <!-- <el-select v-model="searchData.reviewState" placeholder="请选择评审状态" filterable clearable>
               <el-option v-for="item in reviewStateList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select> -->
            </el-form-item>
          </el-col>
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
        p_id: '',
        type: '',
        system: '',
        specModel: '',
        brand: '',
        supply_id: null,
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
      this.$get('/price/findInsertData').then(res => {
        var data = res.data.data
        this.supplyList = data.supplyList
        this.priceList = data.priceList
      })
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
      this.typeList = [
        { value: '主材' },
        { value: '线材' },
        { value: '工器具' },
        { value: '辅材' },
        { value: '其他' },
        { value: '行政类' }
      ]
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
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
