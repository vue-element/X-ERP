<template>
<div class="form-container smartCommunity-search">
  <el-form>
    <div class="form-module">
      <h4 class="module-title">
        <p>查询条件一：(按年份查询)</p>
      </h4>
      <el-row :gutter="40" class="yearSearch">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="年份:">
            <el-date-picker v-model="year" type="year" placeholder="选择年" value-format="yyyy" format="yyyy">
           </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
           <el-button @click="searchByYear">查  询</el-button>
        </el-col>
      </el-row>
    </div>
  </el-form>
  <el-form :model="searchData" ref="searchData">
    <div class="form-module">
      <h4 class="module-title">
        <p>查询条件二：(按项目信息查询)</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="管理处名称:">
            <el-autocomplete v-model="searchData.name" :fetch-suggestions="projectSearchAsync" placeholder="请选择管理处名称"></el-autocomplete>
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
          <el-form-item label="公司名称:">
            <el-autocomplete v-model="searchData.client_name" :fetch-suggestions="clientSearchAsync" placeholder="请选择公司名称"></el-autocomplete>
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
          <el-form-item label="办事处:">
            <el-select v-model="searchData.region_id" placeholder="请选择办事处" filterable clearable>
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
import { mapGetters } from 'vuex'
import { cityList, regionList } from '@/utils/selectList'
export default {
  name: 'SmartCommunitySearch',
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
        name: '',
        firstEntry: '',
        archFormat: '',
        communityType: '',
        contractMode: '',
        region_id: '',
        city_id: '',
        client_name: ''
      },
      year: ''
      // firstEntry: ''
    }
  },
  created() {
    this.getInsertData()
    this.searchData.city_id = this.cityOption[2]
  },
  methods: {
    getInsertData() {
      cityList().then((data) => {
        this.cityList = data
      })
      regionList().then((data) => {
        this.regionList = data
      })
      this.archFormatList = [{ name: '多层' }, { name: '高层' }, { name: '小高层' }, { name: '别墅' }, { name: '商业' }, { name: '写字楼' }]
      this.communityTypeList = [{ name: '开放式小区' }, { name: '封闭式小区' }]
      this.contractModeList = [{ name: '酬金制' }, { name: '包干制' }]
    },
    cityChange(val) {
      var len = val.length
      this.searchData.city_id = val[len - 1]
    },
    searchByYear() {
      if (this.year) {
        this.$emit('searchWord', { year: this.year })
      } else {
        this.searchAll()
      }
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
      this.$emit('searchWord', searchData)
    },
    searchAll() {
      var searchData = {}
      this.$emit('searchWord', searchData)
    },
    // 项目搜索
    projectSearchAsync(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/projectName?role_code=' + this.roleCode + '&projectName=' + queryString).then((res) => {
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
    // 客户搜索
    clientSearchAsync(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/clientName?clientName=' + queryString).then((res) => {
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
    }
  },
  computed: {
    ...mapGetters([
      'roleCode'
    ])
  },
  watch: {
  }
}
</script>


<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
<style lang="scss">
@import 'src/styles/mixin.scss';
.smartCommunity-search {
  .el-input {
    .el-input__prefix,
    .el-input__suffix{
      font-size: 16px;
      line-height: 20px;
      margin-top: -4px;
    }
  }
  .yearSearch {
    .el-button {
      border-radius: 4px;
      @include boxSizing;
      padding: 0 10px;
      margin-top: 20px;
      margin-right: 20px;
      width: auto;
      min-width: 80px;
      height: 30px;
      line-height: 30px;
      background-color: #35d5ba;
      border: 1px solid #35d5ba;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }
  }
}
</style>
