<template>
  <div class="invoice-search form-container">
    <el-form :model="searchData" :rules="rules" ref="searchData">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="商机编号:">
              <el-select  v-model="searchData.business_id" placeholder="请选择" filterable>
               <el-option v-for="item in businessList" :label="item.code" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="业务线:">
              <el-select v-model="searchData.category" placeholder="请选择" filterable>
               <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="订单编号:">
              <el-input v-model="searchData.orderNumber" placeholder="请输入使用部门"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="使用部门:">
              <el-input v-model="searchData.department" placeholder="请输入使用部门"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="申请人:" class="single-date">
              <el-input v-model="searchData.applicationPerson" placeholder="请输入申请人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="申请时间:" class="range-date">
              <el-date-picker v-model="searchData.applicationTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"></el-date-picker>
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
        applicationPerson: '廖淑萍',
        applicationTime: [],
        orderNumber: '',
        category: '',
        department: '',
        business_id: ''
      },
      businessList: [],
      categoryList: [],
      rules: {}
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.$get('/paymentContract/findInsertData').then((res) => {
        var data = res.data.data
        this.businessList = data.businessList
        this.categoryList = [{ value: '科技-智慧社区工程全委' }, { value: '科技-智慧社区改造' }, { value: '科技-物联网大平台' }, { value: '科技-设计服务' }, { value: '科技-技术服务' }]
      })
    },
    search() {
      var searchData = {}
      for (var key in this.searchData) {
        if (this.searchData[key]) {
          if (key === 'applicationTime') {
            searchData['applicationTime'] = this.searchData['applicationTime'][0]
            searchData['applicationTime1'] = this.searchData['applicationTime'][1]
          } else {
            searchData[key] = this.searchData[key]
          }
        }
      }
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
