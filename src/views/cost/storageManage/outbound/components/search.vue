<template>
  <div class="invoice-search form-container">
    <el-form :model="searchData" :rules="rules" ref="searchData">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="付款合同编号/入库单号:">
              <el-autocomplete v-model="searchData.inboundList_name" :fetch-suggestions="inboundCodeSearch" placeholder="请选择付款合同编号"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同名称／所属项目:">
              <el-autocomplete v-model="searchData.project_name" :fetch-suggestions="contractNameSearch" placeholder="请选择合同名称"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="出库单编号:">
              <el-autocomplete v-model="searchData.code" :fetch-suggestions="outboundCodeSearch" placeholder="请选择出库单编号"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="办事处:">
              <el-select v-model="searchData.region_id" placeholder="请输入办事处" clearable filter>
               <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
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
import { mapGetters } from 'vuex'
import { regionList } from '@/utils/selectList'
export default {
  name: 'paymentContractSearch',
  data() {
    return {
      loading: false,
      disabled: false,
      searchData: {
        inboundList_name: '',
        code: '',
        region_id: '',
        project_name: '',
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
      regionList().then((data) => {
        this.regionList = data
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
    // 入库单号搜索
    inboundCodeSearch(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/inboundListCode?role_code=' + this.roleCode + '&inboundListCode=' + queryString).then((res) => {
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
    // 入库单号搜索
    outboundCodeSearch(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/outboundListCode?role_code=' + this.roleCode + '&outboundListCode=' + queryString).then((res) => {
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
