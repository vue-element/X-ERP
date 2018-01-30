<template>
<div class="business-container invoice-search form-container">
  <el-form :model="searchData" ref="searchData">
    <div class="form-module">
      <h4 class="module-title">
        <p>查询条件:</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="商机名称：">
            <el-input v-model="searchData.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="单据日期：" class="single-date">
          <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="date"></el-date-picker>
            <!-- <el-date-picker v-model="searchData.date" type="daterange"  start-placeholder="开始日期" range-separator="—" end-placeholder="结束日期"></el-date-picker> -->
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="业务线负责人：">
            <el-input v-model="searchData.chargePerson" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item label="客户信息：">
            <el-select placeholder="请选择" v-model="searchData.client_id" >
             <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="区域：">
            <el-select placeholder="请选择"  v-model="searchData.region_id">
             <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="城市：">
            <el-cascader :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="commont-btn">
        <el-button @click="search">查  询</el-button>
        <el-button @click="searchAll">查询所有</el-button>
      </div>
    </div>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'InvoiceSearch',
  data() {
    return {
      searchData: {
        region_id: 1,
        client_id: 1,
        city_id: 3,
        chargePerson: '业务线负责人',
        name: '商机名称'
      },
      date: '',
      clientList: [],
      cityList: [],
      regionList: [],
      cityOption: [0, 1, 3]
    }
  },
  created() {
    this.getInsertData()
    this.searchData.city_id = this.cityOption[2]
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
      var len = val.length
      this.searchData.city_id = val[len - 1]
    },
    search() {
      if (this.date) {
        this.searchData.date = this.date
      }
      // console.log('searchData', this.searchData)
      this.$emit('searchWord', this.searchData)
    },
    searchAll() {
      var searchData = {}
      this.$emit('searchWord', searchData)
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
</style>
<style lang="scss">
@import "src/styles/mixin.scss";
</style>
