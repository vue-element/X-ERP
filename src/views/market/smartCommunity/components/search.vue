<template>
<div class="form-container smartCommunity-search">
  <div class="form-module">
    <h4 class="module-title">
      <p>查询条件</p>
    </h4>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="basic-item">
          <label>项目名称：</label>
          <input type="text" v-model="searchData.name" placeholder="请输入"/>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="basic-item single-date">
          <label>首期入伙时间：</label>
          <el-date-picker type="date" v-model="searchData.firstEntry" placeholder="选择日期" ></el-date-picker>
          <!-- <el-date-picker v-model="searchData.firstEntry"  value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="—" end-placeholder="结束日期">
          </el-date-picker> -->
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="basic-item">
          <label>合约模式：</label>
          <el-select v-model="searchData.contractMode" placeholder="请选择">
           <el-option v-for="item in contractModeList" :label="item.name" :value="item.id" :key="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="basic-item customer-info">
          <label>客户信息：</label>
          <el-select v-model="client.id" placeholder="请选择">
           <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="basic-item">
          <label>城市：</label>
          <el-cascader :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange"></el-cascader>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="basic-item">
          <label>区域：</label>
          <el-select v-model="region.id" placeholder="请选择">
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
import { parseTime } from '@/utils'
export default {
  name: 'SmartCommunitySearch',
  data() {
    return {
      height: 100,
      clientList: [],
      cityList: [],
      regionList: [],
      region: { id: 1 },
      client: { id: 1 },
      city: { id: 3 },
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
      cityOption: [0, 1, 3],
      searchData: {
        region_id: 1,
        client_id: 1,
        city_id: 3,
        contractMode: '',
        name: '廖淑萍',
        firstEntry: ''
      }
    }
  },
  created() {
    this.getInsertData()
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
      this.city.id = val[len - 1]
    },
    search() {
<<<<<<< HEAD
      if (this.firstEntryDate.length > 0) {
        console.log(this.searchData.firstEntry)
        this.searchData.firstEntry = parseTime(this.firstEntryDate[0], '{y}-{m}-{d}')
      } else {
        this.searchData.firstEntry = ''
      }
=======
      // this.searchData.firstEntry = this.searchData.firstEntry[0]
>>>>>>> 8a0b7627cfea2268a2bbd1ad5220c3f98a50f4bd
      this.searchData.region_id = this.region.id
      this.searchData.client_id = this.client.id
      this.searchData.city_id = this.city.id
      var searchData = {
        region_id: 1,
        client_id: 1,
        city_id: 3,
        contractMode: '',
        name: '廖淑萍',
        firstEntry: '2018-01-10'
      }
      // console.log('searchData.firstEntry', this.searchData.firstEntry)
      // console.log(typeof(this.searchData.firstEntry))
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.smartCommunity-search {
  color: #000;
  border: 1px solid #d2d2d2;
  margin: 16px 0;
  padding: 0 20px;
  @include borderRadius(4px);
  h4 {
    height: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #d2d2d2;
    p {
      border-left: 5px solid #35d5ba;
      padding-left: 15px;
    }
  }
  .el-form {
    color: #000;
    .el-row {
      .el-form-item {
        margin: 0;
        padding: 0;
        margin-top: 20px;
        @include flex;
      }
    }
  }
}
</style>
<style lang="scss">
.smartCommunity-search{
  .el-form{
    .el-form-item{
      .el-form-item__label{
        width: 70px;
      }
      .el-form-item__content {
        width: 210px;
      }
      .el-input__inner {
        width: 210px
      }
    }
    .el-col:last-child {
      .el-form-item__label{
        width: 96px;
      }
    }
  }
}
</style>
