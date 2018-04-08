<template>
<div class="form-container smartCommunity-search">
  <div class="form-module">
    <h4 class="module-title">
      <p>查询条件</p>
    </h4>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="basic-item">
          <label>账号名：</label>
          <input type="text" v-model="searchData.name" placeholder="请输入账号名"/>
        </div>
      </el-col>
      <!-- <el-col :xs="12" :sm="12" :lg="12">
        <div class="basic-item range-date">
          <label>首期入伙时间：</label>
          <el-date-picker v-model="searchData.firstEntry" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-col> -->
    </el-row>
    <div class="commont-btn">
      <el-button @click="search">查  询</el-button>
      <el-button @click="searchAll">查询所有</el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'userSearch',
  data() {
    return {
      height: 100,
      searchData: {
        name: ''
      }
    }
  },
  created() {
    // this.getInsertData()
  },
  methods: {
    // getInsertData() {
    //   this.$get('/bussiness/findInsertData').then((res) => {
    //     var data = res.data.data
    //   })
    // },
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
