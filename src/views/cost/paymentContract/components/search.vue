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
              <el-input v-model="searchData.orderCode" placeholder="请输入付款合同编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="付款合同编号:">
              <el-input v-model="searchData.code" placeholder="请输入付款合同编号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="商机编号:">
              <el-select v-model="searchData.contractInfo_id" placeholder="请选择商机编号" filterable>
               <el-option v-for="item in contractInfoList" :label="item.code" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="使用项目:" >
              <el-select v-model="paymentContract.contractInfo_id" placeholder="请选择所属项目" filterable>
               <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="业务类型:">
              <el-select v-model="paymentContract.b_ctg_id" placeholder="请选择业务类别" filterable>
               <el-option v-for="item in businessCtgList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="使用部门:">
              <el-input v-model="searchData.department" placeholder="请输入使用部门"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="发货状态:">
              <el-select v-model="searchData.deliveryStatus" placeholder="请选择发货状态" filterable>
               <el-option label="未发货" value="未发货"></el-option>
               <el-option label="已发货" value="已发货"></el-option>
               <el-option label="已到货" value="已到货"></el-option>
               <el-option label="已退货" value="已退货"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="材料类型:">
              <el-select v-model="paymentContract.m_ctg_id" placeholder="请选择材料类型" filterable>
                <el-option v-for="item in materialCtgList" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="申请时间:" class="range-date">
              <el-date-picker v-model="searchData.applicationTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="采购金额:">
              <el-input v-model="searchData.amount" placeholder="请输入付款合同编号"></el-input>
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
        orderCode: '',
        code: '',
        project: '',
        department: '',
        b_ctg_id: '',
        m_ctg_id: '',
        deliveryStatus: '',
        contractInfo_id: '',
        applicationTime: '',
        amount: ''
      },
      contractInfoList: [],
      categoryList: [],
      supplyList: []
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.$get('/paymentContract/findInsertData').then((res) => {
        var data = res.data.data
        this.contractInfoList = data.contractInfoList
        this.supplyList = data.supplyList
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
