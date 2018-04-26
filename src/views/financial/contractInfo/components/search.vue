<template>
  <div class="contractInfo-search form-container" ref="ele">
    <el-form class="basic">
      <div class="search form-module">
        <h4 class="module-title">
          <p>查询条件</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同名称：">
              <el-autocomplete v-model="searchData.name" :fetch-suggestions="contractNameSearchAsync" placeholder="请选择合同名称"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同编码：">
              <el-autocomplete v-model="searchData.code" :fetch-suggestions="contractCodeSearchAsync" placeholder="请选择合同编号"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="业务类别：">
              <el-autocomplete v-model="searchData.ctgName" :fetch-suggestions="businessCtgSearchAsync" @select="ctgSelect" placeholder="请选择客户名称"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="所属区域：">
              <el-autocomplete v-model="searchData.regionName" :fetch-suggestions="regionSearchAsync" @select="regionSelect" placeholder="请选择客户名称"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item class="single-date" label="签订时间：">
              <el-date-picker v-model="searchData.signDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择签订日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item class="single-date" label="合同所属期：">
              <el-date-picker v-model="searchData.term" format="yyyy-MM" value-format="yyyy-MM" type="date" placeholder="选择合同所属日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn">
        <el-button @click="search">查  询</el-button>
        <el-button @click="searchAll">查询所有</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { winHeight } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      contractInfoList: [],
      businessCtgList: [],
      regionList: [],
      searchData: {
        name: '',
        code: '',
        bctg_id: null,
        region_id: null,
        signDate: '',
        term: ''
      }
    }
  },
  created() {
  },
  methods: {
    contractNameSearchAsync(queryString, callback) {
      var role_code = this.$store.state.account.userName
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
    contractCodeSearchAsync(queryString, callback) {
      var role_code = this.$store.state.account.userName
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
    // 业务分类
    businessCtgSearchAsync(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/businessCtg').then(res => {
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
    ctgSelect(item) {
      this.searchData.bctg_id = item.id
    },
    // 所属区域
    regionSearchAsync(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/region').then(res => {
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
    regionSelect(item) {
      this.searchData.region_id = item.id
    },
    search() {
      var searchData = {}
      console.log(this.searchData)
      for (var key in this.searchData) {
        if (this.searchData[key]) {
          searchData[key] = this.searchData[key]
          if (key === 'term') {
            searchData['term'] = this.searchData['term'] + '-01'
          } else if (key === 'ctgName') {
            delete searchData['ctgName']
          } else if (key === 'regionName') {
            delete searchData[key]
          }
        }
      }
      console.log(searchData)
      this.$emit('search', searchData)
    },
    searchAll() {
      var searchData = {}
      this.$emit('search', searchData)
    }
  },
  mounted() {
    this.$refs.ele.style.height = winHeight() - 180 + 'px'
    window.addEventListener('resize', () => {
      this.$refs.ele.style.height = winHeight() - 180 + 'px'
    })
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
.contractInfo-search.form-container{
  margin-top:50px;
  &::-webkit-scrollbar{
    width: 0;
  }
}
</style>
