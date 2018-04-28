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
              <el-autocomplete v-model="searchData.orderCode" :fetch-suggestions="orderCodeSearch" placeholder="请选择订单编号"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="付款合同编号:">
              <el-autocomplete v-model="searchData.code" :fetch-suggestions="codeSearch" placeholder="请选择付款合同编号"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="合同编号:">
              <el-autocomplete v-model="searchData.contractInfo_code" :fetch-suggestions="contractCodeSearch" @select="contractSelect" placeholder="请选择合同编号"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="合同名称／所属项目:" >
              <el-autocomplete v-model="searchData.contractInfo_name" :fetch-suggestions="contractNameSearch" @select="contractSelect" placeholder="请选择合同编号"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="业务类型:">
              <select-dropdown label="材料类型" :listData="businessCtgList"  @onchange="businessCtgChange"></select-dropdown>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="使用部门:">
              <el-select v-model="searchData.department" placeholder="请选择所属项目" filterable clearable>
               <el-option v-for="item in departmentList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="发货状态:">
              <el-select v-model="searchData.deliveryStatus" placeholder="请选择发货状态" filterable clearable>
               <el-option label="未发货" value="未发货"></el-option>
               <el-option label="已发货" value="已发货"></el-option>
               <el-option label="已到货" value="已到货"></el-option>
               <el-option label="已退货" value="已退货"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="材料类型:">
              <select-dropdown label="材料类型" :listData="materialCtgList"  @onchange="materialCtgChange"></select-dropdown>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="申请时间:" class="range-date">
              <el-date-picker v-model="searchData.applicationTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :md="12" :lg="12">
            <el-form-item label="实际采购金额:">
              <el-row>
                <el-col :span="10">
                  <el-input v-model="searchData.acAmount" placeholder="请输入金额"></el-input>
                </el-col>
                <el-col class="line" :span="4" style="text-align:center">——</el-col>
                <el-col :span="10">
                  <el-input v-model="searchData.acAmount1" placeholder="请输入金额"></el-input>
                </el-col>
              </el-row>
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
import SelectDropdown from '@/components/SelectDropdown.vue'
import { mapGetters } from 'vuex'
import { businessCtgList, materialCtgList } from '@/utils/selectList'
export default {
  name: 'paymentContractSearch',
  components: {
    SelectDropdown
  },
  data() {
    return {
      loading: false,
      disabled: false,
      searchData: {
        orderCode: '',
        code: '',
        project: '',
        department: '',
        b_ctg_name: '',
        m_ctg_name: '',
        deliveryStatus: '',
        contractInfo_code: '',
        contractInfo_name: '',
        applicationTime: '',
        acAmount: '',
        acAmount1: ''
      },
      businessCtgList: [],
      materialCtgList: [],
      departmentList: []
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.departmentList = [{ value: '财务管理部' }, { value: '成本管理部' }, { value: '市场管理部' }, { value: '工程技术部' }, { value: '人事行政部' }, { value: '运维及质量安全部' }, { value: '研发设计部' },
        { value: '华南办事处' }, { value: '华东办事处' }, { value: '华北办事处' }, { value: '华中办事处' }, { value: '西部办事处' }, { value: '北方办事处' }, { value: '深圳办事处' }]
      businessCtgList().then((data) => {
        this.businessCtgList = data
      })
      materialCtgList().then((data) => {
        this.materialCtgList = data
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
        } else {
          if (key === 'acAmount') {
            searchData['acAmount'] = 0
          }
          if (key === 'acAmount1') {
            searchData['acAmount1'] = 0
          }
        }
      }
      searchData.adAmount = 0
      searchData.adAmount1 = 0
      console.log('search1', searchData)
      this.$emit('search', searchData)
    },
    searchAll() {
      var searchData = {
        adAmount: 0,
        adAmount1: 0,
        acAmount: 0,
        acAmount1: 0
      }
      this.$emit('search', searchData)
    },
    reset() {
      for (var key in this.searchData) {
        if (this.searchData[key]) {
          this.searchData[key] = ''
        }
      }
    },
    businessCtgChange(name) {
      this.searchData.b_ctg_name = name
    },
    materialCtgChange(name) {
      this.searchData.m_ctg_name = name
    },
    // 订单编号搜索
    orderCodeSearch(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/orderCode?role_code=' + this.roleCode + '&orderCode=' + queryString).then((res) => {
        list = res.data.objectList
        for (var i of list) {
          i.value = i.code
        }
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    // 付款合同搜索
    codeSearch(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/paymentContractCode?role_code=' + this.roleCode + '&paymentContractCode=' + queryString).then((res) => {
        list = res.data.objectList
        for (var i of list) {
          i.value = i.code
        }
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    // 合同编号搜索
    contractCodeSearch(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/contractInfoCode?contractInfoCode=' + queryString + '&role_code=' + this.roleCode).then((res) => {
        list = res.data.objectList
        for (var i of list) {
          i.value = i.code
        }
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    // 合同名称搜索
    contractNameSearch(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/contractInfoName?contractInfoName=' + queryString + '&role_code=' + this.roleCode).then((res) => {
        list = res.data.objectList
        for (var i of list) {
          i.value = i.name
        }
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    contractSelect(item) {
      this.searchData.contractInfo_name = item.name
      this.searchData.contractInfo_code = item.code
    }
  },
  computed: {
    ...mapGetters([
      'roleCode'
    ])
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
