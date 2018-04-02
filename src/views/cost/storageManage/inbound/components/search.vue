<template>
  <div class="invoice-search form-container">
    <el-form :model="searchData" ref="searchData">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="订单编号:">
              <el-select v-model="searchData.orderCode" placeholder="请选择订单编号" filterable clearable>
               <el-option v-for="item in paymentContractList" :label="item.orderCode" :value="item.orderCode" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="付款合同编号:">
              <el-select v-model="searchData.code" placeholder="请选择付款合同编号" filterable clearable>
               <el-option v-for="item in paymentContractList" :label="item.code" :value="item.code" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="使用部门:">
              <el-select v-model="searchData.department" placeholder="请选择所属项目" filterable clearable>
               <el-option v-for="item in departmentList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="供应商:">
              <el-select v-model="searchData.supply_id" placeholder="请选择供应商" filterable clearable>
               <el-option v-for="item in supplyList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="入库日期:" class="range-date">
              <el-date-picker v-model="searchData.inputDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn">
        <el-button :loading="loading" @click="search">查询</el-button>
        <el-button :loading="loading" @click="searchAll">查询所有</el-button>
        <el-button @click="reset">重置</el-button>
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
        orderCode: '',
        code: '',
        department: '',
        inputDate: '',
        supply_id: ''
      },
      paymentContractList: [],
      supplyList: [],
      departmentList: []
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.$get('/paymentContract/findInsertData').then((res) => {
        var data = res.data.data
        this.paymentContractList = data.paymentContractList
        this.supplyList = data.supplyList
        this.departmentList = [{ value: '财务管理部' }, { value: '成本管理部' }, { value: '市场管理部' }, { value: '工程技术部' }, { value: '人事行政部' }, { value: '运维及质量安全部' }, { value: '研发设计部' },
          { value: '华南办事处' }, { value: '华东办事处' }, { value: '华北办事处' }, { value: '华中办事处' }, { value: '西部办事处' }, { value: '北方办事处' }, { value: '深圳办事处' }]
      })
    },
    search() {
      var searchData = {}
      for (var key in this.searchData) {
        if (this.searchData[key]) {
          if (key === 'inputDate') {
            searchData['inputDate'] = this.searchData['inputDate'][0]
            searchData['inputDate1'] = this.searchData['inputDate'][1]
          } else {
            searchData[key] = this.searchData[key]
          }
        }
      }
      console.log('search1', searchData)
      this.$emit('search', searchData)
    },
    searchAll() {
      var searchData = {
        amount: 0,
        amount1: 0
      }
      console.log('search2', searchData)
      this.$emit('search', searchData)
    },
    reset() {
      for (var key in this.searchData) {
        if (this.searchData[key]) {
          this.searchData[key] = ''
        }
      }
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
