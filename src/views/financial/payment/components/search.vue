<template>
  <div class="payment-search form-container">
    <el-form :model="searchData" ref="searchData">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同名称 ：">
              <el-select v-model="searchData.contractInfo_id" placeholder="请选择合同名称" filterable clearable>
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同编号：">
              <el-select v-model="searchData.contractInfo_id" placeholder="请选择合同编号" filterable clearable>
               <el-option v-for="item in contractInfoList" :label="item.code" :value="item.id" :key="item.id">
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
  name: 'paymentSearch',
  data() {
    return {
      loading: false,
      disabled: false,
      contractInfoList: [],
      searchData: {
        contractInfo_id: ''
      }
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.$get('/contractPayment/findInsertData').then(res => {
        if (res.data.success === true) {
          this.contractInfoList = res.data.data.contractInfoList
        }
      })
    },
    search() {
      this.$emit('search', this.searchData)
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
.payment-search{
  &::-webkit-scrollbar{
    width: 0;
  }
}
</style>
