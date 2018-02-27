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
              <el-input v-model="searchData.code" placeholder="请输入供应商名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="产品名称:">
              <el-input v-model="searchData.name" placeholder="请输入供应商名称"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="产品类型:" >
              <el-select v-model="searchData.type" placeholder="请选择" filterable>
               <el-option v-for="item in typeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="系统:">
              <el-select v-model="searchData.system" placeholder="请选择" filterable>
               <el-option v-for="item in systemList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="规格型号:">
              <el-input v-model="searchData.specModel" placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="品牌:">
              <el-input v-model="searchData.brand" placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="供应商:">
              <el-select v-model="searchData.supply_id" placeholder="请选择" filterable>
               <el-option v-for="item in supplyList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
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
      searchData: {
        code: '产品编码',
        name: '产品名称',
        type: '主材',
        system: '停车场系统',
        specModel: '规格型号',
        brand: '品牌',
        supply_id: 20
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
      this.$emit('search', this.searchData)
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
