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
              <el-select v-model="searchData.ci_id" placeholder="请选择合同名称" filterable clearable>
                <el-option v-for="item in contractInfoList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同编码：">
              <el-select v-model="searchData.ci_id" placeholder="请选择合同编码" filterable clearable>
                <el-option v-for="item in contractInfoList" :label="item.code" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="业务分类：">
              <el-select v-model="searchData.bctg_id" placeholder="请选择业务类别" clearable>
                <el-option v-for="item in businessCtgList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="所属区域：">
              <el-select v-model="searchData.region_id" placeholder="请选择所属区域" clearable>
                <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item class="single-date" label="签订时间：">
              <el-date-picker v-model="searchData.signDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item class="single-date" label="合同所属期：">
              <el-date-picker v-model="searchData.term" format="yyyy-MM" value-format="yyyy-MM" type="date" placeholder="选择日期"></el-date-picker>
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
      contractInfoList: [],
      businessCtgList: [],
      regionList: [],
      searchData: {
        ci_id: null,
        bctg_id: '',
        region_id: null,
        signDate: '',
        term: ''
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
        this.contractInfoList = data.contractInfoList
        this.businessCtgList = data.businessCtgList
        this.regionList = data.regionList
        console.log(data)
      })
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
