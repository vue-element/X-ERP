<template>
<div class="form-container smartCommunity-search">
  <el-form :model="searchData" ref="searchData">
    <div class="form-module">
      <h4 class="module-title">
        <p>查询条件</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机名称:">
            <el-autocomplete v-model="searchData.b_name" :fetch-suggestions="bussinessNameSearch"  placeholder="请选择商机名称"></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机编码:">
            <el-autocomplete v-model="searchData.b_code" :fetch-suggestions="bussinessCodeSearch" placeholder="请选择商机编码"></el-autocomplete>
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
export default {
  name: 'SmartCommunitySearch',
  data() {
    return {
      height: 100,
      searchData: {
        b_name: '',
        b_code: ''
      },
      businessList: []
    }
  },
  created() {
  },
  methods: {
    search() {
      var searchData = {}
      for (var key in this.searchData) {
        if (this.searchData[key]) {
          searchData[key] = this.searchData[key]
        }
      }
      this.$emit('searchWord', searchData)
    },
    searchAll() {
      var searchData = {}
      this.$emit('searchWord', searchData)
    },
    // 商机编号变化
    bussinessCodeSearch(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/bussinessCode?role_code=' + this.roleCode + '&bussinessCode=' + queryString).then((res) => {
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
    // 商机名称变化
    bussinessNameSearch(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/bussinessName?role_code=' + this.roleCode + '&businessName=' + queryString).then((res) => {
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
</style>
