<template>
<div class="form-container smartCommunity-search">
  <el-form :model="searchData" ref="searchData">
    <div class="form-module">
      <h4 class="module-title">
        <p>查询条件</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="项目名称:">
            <select-dropdown label="项目名称" :listData="projectList"  @onchange="projectChange"></select-dropdown>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="首期入伙时间:" class="range-date">
            <el-date-picker v-model="searchData.firstEntry" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期" clearable>
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="合约模式:">
            <el-select v-model="searchData.contractMode" placeholder="请选择合约模式" clearable>
             <el-option v-for="item in contractModeList" :label="item.name" :value="item.name" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="客户信息:">
            <el-select v-model="searchData.client_id" placeholder="请选择客户信息" filterable clearable>
             <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="城市:">
              <el-cascader :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange" placeholder="请选择城市" filterable clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="区域:">
            <el-select v-model="searchData.region_id" placeholder="请选择区域" filterable clearable>
             <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="建筑业态:">
            <el-select v-model="searchData.archFormat" placeholder="请输入建筑业态" filterable clearable>
              <el-option v-for="item in archFormatList" :label="item.name" :value="item.name" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="小区类型:">
            <el-select v-model="searchData.communityType" placeholder="请选择区域" filterable clearable>
             <el-option v-for="item in communityTypeList" :label="item.name" :value="item.name" :key="item.id"></el-option>
           </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="commont-btn">
        <el-button @click="search">查  询</el-button>
        <el-button @click="searchAll">查询所有</el-button>
      </div>
    </div>
  </el-form>
</div>
</template>

<script>
import SelectDropdown from '@/components/SelectDropdown'
export default {
  name: 'SmartCommunitySearch',
  components: {
    SelectDropdown
  },
  data() {
    return {
      height: 100,
      clientList: [],
      cityList: [],
      regionList: [],
      projectList: [],
      cityOption: ['', '', ''],
      communityTypeList: [],
      contractModeList: [],
      archFormatList: [],
      searchData: {
        region_id: '',
        client_id: '',
        city_id: '',
        contractMode: '',
        name: ''
      },
      firstEntry: ''
    }
  },
  created() {
    this.getInsertData()
    this.searchData.city_id = this.cityOption[2]
  },
  methods: {
    projectChange(name) {
      this.searchData.name = name
    },
    getInsertData() {
      this.$get('/project/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
        this.projectList = data.projectList
      })
      this.archFormatList = [{ name: '多层' }, { name: '高层' }, { name: '小高层' }, { name: '别墅' }, { name: '商业' }, { name: '写字楼' }]
      this.communityTypeList = [{ name: '开放式小区' }, { name: '封闭式小区' }]
      this.contractModeList = [{ name: '酬金制' }, { name: '包干制' }]
    },
    cityChange(val) {
      var len = val.length
      this.searchData.city_id = val[len - 1]
    },
    search() {
      var searchData = {}
      for (var key in this.searchData) {
        if (this.searchData[key]) {
          if (key === 'firstEntry') {
            searchData['firstEntry'] = this.searchData['firstEntry'][0]
            searchData['firstEntry1'] = this.searchData['firstEntry'][1]
          } else {
            searchData[key] = this.searchData[key]
          }
        }
      }
      // console.log('searchWord', searchData)
      this.$emit('searchWord', searchData)
    },
    searchAll() {
      var searchData = {}
      this.$emit('searchWord', searchData)
    }
  },
  computed: {}
}
</script>


<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
<style lang="scss">
</style>
