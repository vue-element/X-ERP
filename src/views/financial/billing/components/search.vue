<template>
  <div class="invoice-search form-container">
    <el-form :model="searchData" ref="searchData">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同名称：">
              <el-select v-model="searchData.contractInfo_id" clearable placeholder="请选择合同编码"  filterable>
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同编号：">
              <el-select v-model="searchData.contractInfo_id" clearable placeholder="请选择合同编号"  filterable>
               <el-option v-for="item in contractInfoList" :label="item.code" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="发票抬头名称：">
              <el-input v-model="searchData.name" placeholder="请输入发票抬头名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="发票号码：">
              <el-input v-model="searchData.number" placeholder="请输入发票号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="开票日期：" class="range-date">
              <el-date-picker v-model="searchData.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"></el-date-picker>
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
  name: 'invoiceSearch',
  data() {
    return {
      loading: false,
      disabled: false,
      contractInfoList: [],
      searchData: {
        contractInfo_id: null,
        content: '',
        number: '',
        date: ''
      }
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.$get('/contractBilling/findInsertData').then(res => {
        if (res.data.success === true) {
          this.contractInfoList = res.data.data.contractInfoList
        }
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
      searchData['date'] = this.searchData['date'][0]
      searchData['date1'] = this.searchData['date'][1]
      this.$emit('search', searchData)
    },
    searchAll() {
      var searchData = {}
      this.$emit('search', searchData)
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.invoice-search{
  &::-webkit-scrollbar{
    width: 0;
  }
}
</style>
