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
              <el-select v-model="searchData.contractInfo_id" placeholder="请选择合同名称" filterable>
                <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同编码：">
              <el-select v-model="searchData.contractInfo_id" placeholder="请选择合同编码" filterable>
                <el-option v-for="item in contractInfoList" :label="item.code" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="业务分类：" prop="name">
              <el-select v-model="searchData.category" clearable placeholder="请选择业务类别">
                <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="所属区域：" prop="name">
              <el-select v-model="searchData.region_id" clearable placeholder="请选择所属区域">
                <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item class="single-date" label="签订时间：" prop="name">
              <el-date-picker v-model="searchData.signDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item class="single-date" label="合同所属期：" prop="name">
              <el-date-picker v-model="searchData.date" format="yyyy-MM" value-format="yyyy-MM" type="date" placeholder="选择日期"></el-date-picker>
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
export default {
  data() {
    return {
      regionList: [],
      cityList: [],
      clientList: [],
      contractInfoList: [],
      searchData: {
        // name: '',
        // code: '',
        contractInfo_id: '',
        date: '',
        signDate: '',
        region_id: '',
        category: ''
      }
    }
  },
  created() {
    this.getFindInsertData()
  },
  methods: {
    getFindInsertData() {
      this.$get('/contractInfo/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
      })
      this.$get('/contractInfo').then((res) => {
        this.contractInfoList = res.data.data.content
      })
      this.categoryList = [
        { value: '科技-智慧工程全委' }, { value: '科技-智慧社区改造' }, { value: '科技-物联网大数据平台' }, { value: '科技-设计服务' },
        { value: '科技-技术服务' }, { value: '科技-技术服务+材料采购' }, { value: '科技-产品营销' }, { value: '机电-设备查验' }, { value: '机电-设施设备运维平台' }, { value: '机电-设备运维全委' }, { value: '机电-电梯第三方监管' }, { value: '机电-节能工程' }, { value: '机电-设备升级改造' }, { value: '机电-设备顾问' }
      ]
    },
    search() {
      var searchData = {}
      for (var key in this.searchData) {
        if (this.searchData[key] === '') {
          delete this.searchData[key]
        } else {
          searchData[key] = this.searchData[key]
        }
      }
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
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.contractInfo-search.form-container{
  margin-top:90px;
  &::-webkit-scrollbar{
    width: 0;
  }
}
</style>
