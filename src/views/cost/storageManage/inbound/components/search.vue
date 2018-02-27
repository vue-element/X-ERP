<template>
  <div class="invoice-search form-container">
    <el-form :model="searchData" :rules="rules" ref="searchData">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同编号:">
              <el-input v-model="searchData.applicationPerson" placeholder="请输入合同编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="办事处:">
             <el-select  v-model="searchData.business_id" placeholder="请选择" filterable>
               <el-option v-for="item in businessList" :label="item.code" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="采购清单编号:">
              <el-input v-model="searchData.applicationPerson" placeholder="请输入采购清单编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="入库单号:">
              <el-input v-model="searchData.orderNumber" placeholder="请输入入库单号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="供应商:" class="single-date">
              <el-input v-model="searchData.applicationPerson" placeholder="请输入供应商"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="日期:" class="single-date">
              <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="searchData.applicationTime" placeholder="选择日期"></el-date-picker>
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
        applicationTime: '2018-01-10',
        business_id: '',
        category: '科技-智慧社区改造',
        deliveryStatus: '已发货',
        department: '财务部',
        orderNumber: ''
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
        this.categoryList = [{
          value: '科技-智慧社区工程全委'
        }, {
          value: '科技-智慧社区改造'
        }, {
          value: '科技-物联网大平台'
        }, {
          value: '科技-设计服务'
        }, {
          value: '科技-技术服务'
        }]
      })
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
