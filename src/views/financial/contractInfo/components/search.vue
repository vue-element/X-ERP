<template>
  <div class="contractInfo-search form-container" ref="ele">
    <el-form class="basic">
      <div class="search form-module">
        <h4 class="module-title">
          <p>查询条件</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="合同名称：" prop="name">
              <el-input v-model="searchData.name" placeholder="请输入合同名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="合同编码：" prop="name">
              <el-input v-model="searchData.code" placeholder="请输入合同编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="业务分类：" prop="name">
              <el-select v-model="searchData.category" placeholder="请选择业务类别">
                <el-option v-for="item in category" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item class="single-date" label="合同所属期：" prop="name">
              <el-date-picker v-model="searchData.date" format="yyyy-MM" value-format="yyyy-MM" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item class="single-date" label="签订时间：" prop="name">
              <el-date-picker v-model="searchData.signDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="所属区域：" prop="name">
              <el-select v-model="searchData.region_id" placeholder="请选择所属区域">
                <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn">
        <el-button @click="search">查  询</el-button>
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
      category: [{
        id: '1',
        name: '科技-智慧社区工程全委'
      }, {
        id: '2',
        name: '科技-智慧社区改造'
      }, {
        id: '3',
        name: '科技-物联网大平台'
      }, {
        id: '4',
        name: '科技-设计服务'
      }, {
        id: '5',
        name: '科技-技术服务'
      }, {
        id: '6',
        name: '机电-设备运维平台'
      }, {
        id: '7',
        name: '机电-设备顾问'
      }, {
        id: '8',
        name: '机电-节能工程'
      }, {
        id: '9',
        name: '机电-设备查验'
      }, {
        id: '10',
        name: '机电-设备运维全委'
      }, {
        id: '11',
        name: '机电-设备升级改造'
      }, {
        id: '12',
        name: '机电-电梯第三方监管'
      }],
      searchData: {
        name: '',
        code: '',
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
    },
    search() {
      this.$emit('search', this.searchData)
    }
  },
  mounted() {
    this.$refs.ele.style.height = winHeight() - 230 + 'px'
    window.addEventListener('resize', () => {
      this.$refs.ele.style.height = winHeight() - 230 + 'px'
    })
  },
  computed: {
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.contractInfo-search.form-container{
  overflow-y:auto;
  &::-webkit-scrollbar{
    width:0;
  }
  .form-module{
    .el-row{
      margin-bottom:10px;
      .el-col{
        .item {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
