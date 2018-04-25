<template>
  <div class="invoice-search form-container">
    <el-form :model="searchData" ref="searchData">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同名称：">
              <el-autocomplete v-model="searchData.receivedName" :fetch-suggestions="receivedNameSearchAsync" @select="ciSelect" placeholder="请选择合同名称"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同编号：">
              <el-autocomplete v-model="searchData.receivedCode" :fetch-suggestions="receivedCodeSearchAsync" @select="ciSelect" placeholder="请选择合同名称"></el-autocomplete>
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
  name: 'paymentSearch',
  data() {
    return {
      loading: false,
      disabled: false,
      contractBillingList: [],
      searchData: {
        contractInfo_id: ''
      }
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'userName'
    ])
  },
  methods: {
    receivedNameSearchAsync(queryString, callback) {
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
    receivedCodeSearchAsync(queryString, callback) {
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
    ciSelect(item) {
      this.searchData.contractInfo_id = item.id
      this.searchData.receivedName = item.name
      this.searchData.receivedCode = item.code
    },
    search() {
      this.$emit('search', this.searchData)
    },
    searchAll() {
      var searchData = {}
      this.$emit('search', searchData)
    }
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
