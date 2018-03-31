<template>
  <div class="invoice-search form-container">
    <el-form :model="searchData" :rules="rules" ref="searchData">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="付款合同编号:">
              <el-select v-model="searchData.paymentContract_id" placeholder="请选择付款合同编号" filterable clearable>
               <el-option v-for="item in paymentContractList" :label="item.code" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="项目:">
              <el-select v-model="searchData.paymentContract_id" placeholder="自动生成" disabled>
               <el-option v-for="item in paymentContractList" :label="item.project" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="出库日期:" class="range-date">
              <el-date-picker v-model="searchData.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="办事处:">
              <el-select v-model="searchData.paymentContract_id" placeholder="自动生成" disabled>
               <el-option v-for="item in paymentContractList" :label="item.department" :value="item.id" :key="item.id">
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
  name: 'paymentContractSearch',
  data() {
    return {
      loading: false,
      disabled: false,
      searchData: {
        contractInfo_id: '',
        orderNumber: '',
        code: '',
        region_id: '',
        project_id: '',
        date: ''
      },
      projectList: [],
      paymentContractList: [],
      contractInfoList: [],
      regionList: [],
      rules: {}
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.$get('/outboundList/findInsertData').then((res) => {
        var data = res.data.data
        this.paymentContractList = data.paymentContractList || []
        this.projectList = data.projectList || []
        this.regionList = data.regionList || []
        this.contractInfoList = data.contractInfoList || []
      })
    },
    search() {
      var searchData = {}
      for (var key in this.searchData) {
        if (this.searchData[key]) {
          if (key === 'date') {
            searchData['date'] = this.searchData['date'][0]
            searchData['date1'] = this.searchData['date'][1]
          } else {
            searchData[key] = this.searchData[key]
          }
        }
      }
      console.log('serach', searchData)
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
