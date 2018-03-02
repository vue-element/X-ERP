<template>
<div class="form-container smartCommunity-search">
  <div class="form-module">
    <h4 class="module-title">
      <p>查询条件</p>
    </h4>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="basic-item">
          <label>项目名称：</label>
          <input type="text" v-model="searchData.name" placeholder="请输入项目名称"/>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="basic-item range-date">
          <label>首期入伙时间：</label>
          <el-date-picker v-model="searchData.firstEntry" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="basic-item">
          <label>合约模式：</label>
          <el-select v-model="searchData.contractMode" placeholder="请选择合约模式">
           <el-option v-for="item in contractModeList" :label="item.name" :value="item.id" :key="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="basic-item customer-info">
          <label>客户信息：</label>
          <el-select v-model="searchData.client_id" placeholder="请选择客户信息">
           <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="basic-item">
          <label>城市：</label>
          <el-cascader :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange" placeholder="请选择城市"></el-cascader>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="basic-item">
          <label>区域：</label>
          <el-select v-model="searchData.region_id" placeholder="请选择区域">
           <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
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
  name: 'SmartCommunitySearch',
  data() {
    return {
      height: 100,
      clientList: [],
      cityList: [],
      regionList: [],
      contractModeList: [
        {
          id: '酬金制',
          name: '酬金制'
        },
        {
          id: '包干制',
          name: '包干制'
        }
      ],
      cityOption: ['', '', ''],
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
    getInsertData() {
      this.$get('/bussiness/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
      })
    },
    cityChange(val) {
      var len = val.length
      this.searchData.city_id = val[len - 1]
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
      searchData['firstEntry'] = this.searchData['firstEntry'][0]
      searchData['firstEntry1'] = this.searchData['firstEntry'][1]
      console.log('search', searchData)
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
