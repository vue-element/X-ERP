<template>
  <div class="invoice-search form-container">
    <el-form :model="analysisData" ref="analysisData">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同名称:" class="single-date">
              <el-autocomplete v-model="contract.name" :fetch-suggestions="scheduleNameSearchAsync" @select="ciSelect" placeholder="请选择合同名称"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同编号:" class="single-date">
              <el-autocomplete v-model="contract.code" :fetch-suggestions="scheduleCodeSearchAsync" @select="ciSelect" placeholder="请选择合同编号"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="项目所属阶段:" class="single-date">
              <el-select v-model="analysisData.stage" placeholder="请选择项目所属阶段" filterable clearable>
               <el-option v-for="item in stageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="项目状态:" class="single-date">
              <el-select v-model="analysisData.status" placeholder="请选择项目转态" filterable clearable>
                <el-option v-for="item in projectStatusList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="回款状态:" class="single-date">
              <el-select v-model="analysisData.receivedStatus" placeholder="请选择回款状态" filterable clearable>
               <el-option v-for="item in receivedStatusList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="材料进度匹配度:" class="single-date">
              <el-select v-model="analysisData.materialStatus" placeholder="请选择材料进度匹配度" filterable clearable>
                <el-option v-for="item in materialStatusList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="人工进度匹配度:" class="single-date">
              <el-select v-model="analysisData.artificialStatus" placeholder="请选择人工进度匹配度" filterable clearable>
               <el-option v-for="item in artificialStatusList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="综合进度匹配度:" class="single-date">
              <el-select v-model="analysisData.comprehensiveStatus" placeholder="请选择综合进度匹配度" filterable clearable>
                <el-option v-for="item in comprehensiveStatusList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="收支差异状态:" class="single-date">
              <el-select v-model="analysisData.paymentBalanceStatus" placeholder="请选择收支差异状态" filterable clearable>
               <el-option v-for="item in paymentBalanceStatusList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="付现差异状态:" class="single-date">
              <el-select v-model="analysisData.cashBalanceStatus" placeholder="请选择付现差异状态" filterable clearable>
                <el-option v-for="item in cashBalanceStatusList" :label="item.value" :value="item.value" :key="item.id"></el-option>
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
import { mapGetters } from 'vuex'
export default {
  name: 'scheduleManageSearch',
  data() {
    return {
      loading: false,
      disabled: false,
      contractInfoList: [], // 项目合同
      stageList: [], // 项目所属阶段
      projectStatusList: [], // 项目状态
      receivedStatusList: [], // 回款状态
      materialStatusList: [], // 材料进度匹配度
      artificialStatusList: [], // 人工进度匹配度
      comprehensiveStatusList: [], // 综合进度匹配度
      paymentBalanceStatusList: [], // 收支差异状态
      cashBalanceStatusList: [], // 付现差异状态
      contract: {
        name: '',
        code: ''
      },
      analysisData: {
        contractInfo_id: '',
        stage: '',
        projectStatus: '',
        receivedStatus: '',
        materialStatus: '',
        artificialStatus: '',
        comprehensiveStatus: '',
        paymentBalanceStatus: '',
        cashBalanceStatus: ''
      }
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.stageList = [{ value: '未进场' }, { value: '施工中' }, { value: '已完工' }]
      this.projectStatusList = [{ value: '正常' }, { value: '滞后' }, { value: '严重滞后' }]
      this.receivedStatusList = [{ value: '正常' }, { value: '提前' }, { value: '滞后' }, { value: '严重滞后' }]
      this.materialStatusList = [{ value: '正常' }, { value: '提前' }, { value: '滞后' }, { value: '严重滞后' }]
      this.artificialStatusList = [{ value: '正常' }, { value: '超支' }]
      this.comprehensiveStatusList = [{ value: '正常' }, { value: '超支' }]
      this.paymentBalanceStatusList = [{ value: '正常' }, { value: '异常' }]
      this.cashBalanceStatusList = [{ value: '正常' }, { value: '异常' }]
    },
    scheduleNameSearchAsync(queryString, callback) {
      var role_code = this.$store.state.account.roleCode
      var list = [{}]
      this.$get('/keywordQuery/contractInfoName?role_code=' + role_code + '&contractInfoName=' + queryString).then(res => {
        var data = res.data
        for (const i of data.objectList) {
          i.value = i.name
        }
        list = data.objectList
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      })
    },
    scheduleCodeSearchAsync(queryString, callback) {
      var role_code = this.$store.state.account.roleCode
      var list = [{}]
      this.$get('/keywordQuery/contractInfoCode?role_code=' + role_code + '&contractInfoCode=' + queryString).then(res => {
        var data = res.data
        for (const i of data.objectList) {
          i.value = i.code
        }
        list = data.objectList
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      })
    },
    ciSelect(item) {
      this.analysisData.contractInfo_id = item.id
      this.contract.name = item.name
      this.contract.code = item.code
    },
    search() {
      var searchData = {}
      for (var key in this.analysisData) {
        if (this.analysisData[key]) {
          searchData[key] = this.analysisData[key]
        }
      }
      this.$emit('search', searchData)
    },
    searchAll() {
      var searchData = {}
      this.$emit('search', searchData)
    }
  },
  watch: {
    contract: {
      handler(val) {
        if (val.code === '' || val.name === '') {
          this.contract.name = ''
          this.contract.code = ''
        }
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters([
      'userName'
    ])
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
