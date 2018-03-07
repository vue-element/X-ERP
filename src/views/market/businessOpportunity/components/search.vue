<template>
<div class="business-container invoice-search form-container">
  <el-form :model="searchData" ref="searchData">
    <div class="form-module">
      <h4 class="module-title">
        <p>查询条件:</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机名称:">
            <el-input v-model="searchData.name" placeholder="请输入"></el-input>
            <!-- <el-select placeholder="请选择" v-model="searchData.name" filterable>
             <el-option v-for="item in businessList" :label="item.name" :value="item.id" :key="item.id">
             </el-option>
           </el-select> -->
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机编码:">
            <el-input v-model="searchData.code" placeholder="请输入"></el-input>
            <!-- <el-select placeholder="请选择" v-model="searchData.code" filterable>
             <el-option v-for="item in businessList" :label="item.code" :value="item.id" :key="item.id">
             </el-option>
           </el-select> -->
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="客户信息：">
            <el-select placeholder="请选择" v-model="searchData.client_id" filterable>
             <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="修改日期:" class="range-date">
            <el-date-picker v-model="searchData.modifydDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="单据日期:" class="single-date">
          <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="searchData.billDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="所属年月:" class="range-date">
          <el-date-picker v-model="searchData.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="业务分类:">
            <el-select placeholder="请选择" v-model="searchData.category" filterable>
             <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="业务线负责人:">
            <el-input v-model="searchData.chargePerson" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="区域：">
            <el-select placeholder="请选择"  v-model="searchData.region_id">
             <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="城市：">
            <el-cascader :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机跟进状态:" prop="followState">
            <el-select v-model="searchData.followState" placeholder="请选择">
              <el-option v-for="item in followStateList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机执行状态:" prop="executState">
            <el-select v-model="searchData.executState" placeholder="请选择">
              <el-option v-for="item in executStateList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机审批状态:">
            <el-select v-model="searchData.examineState" placeholder="请选择区域">
              <el-option v-for="item in examineStateList" :label="item.value" :value="item.id" :key="item.id">
              </el-option>
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
export default {
  name: 'InvoiceSearch',
  data() {
    return {
      searchData: {
        region_id: 1,
        client_id: 1,
        city_id: 3,
        chargePerson: '',
        name: '',
        code: '',
        category: '',
        followState: '',
        executState: '',
        examineState: '',
        date: [],
        billDate: '',
        modifydDate: []
      },
      cityOption: [0, 1, 3],
      clientList: [],
      cityList: [],
      regionList: [],
      businessList: [],
      followStateList: [],
      executStateList: [],
      categoryList: [],
      examineStateList: []
    }
  },
  created() {
    this.getInsertData()
    this.searchData.city_id = this.cityOption[2]
  },
  methods: {
    cityChange(val) {
      var len = val.length
      this.searchData.city_id = val[len - 1]
    },
    search() {
      var searchData = {}
      for (var key in this.searchData) {
        if (this.searchData[key]) {
          if (key === 'modifydDate') {
            searchData['modifydDate'] = this.searchData['modifydDate'][0]
            searchData['modifydDate1'] = this.searchData['modifydDate'][1]
          } else if (key === 'date') {
            searchData['date'] = this.searchData['date'][0]
            searchData['date1'] = this.searchData['date'][1]
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
    getInsertData() {
      this.$get('/bussiness/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
      })
      this.$get('/bussiness').then((res) => {
        this.businessList = res.data.data.content
      })
      this.followStateList = [{ value: '浅度跟进' }, { value: '深度跟进' }, { value: '已定未签' }, { value: '已签订' }, { value: '放弃' }]
      this.executStateList = [{ value: '前期接洽' }, { value: '方案编制' }, { value: '投标' }, { value: '中标' }, { value: '合同会签' }, { value: '纸质版合同签订' }]
      this.categoryList = [{ value: '科技-智慧工程全委' }, { value: '科技-智慧社区改造' }, { value: '科技-物联网大数据平台' }, { value: '科技-设计服务' },
        { value: '科技-技术服务' }, { value: '科技-技术服务+材料采购' }, { value: '科技-产品营销' }, { value: '机电-设备查验' }, { value: '机电-设施设备运维平台' },
        { value: '机电-设备运维全委' }, { value: '机电-电梯第三方监管' }, { value: '机电-节能工程' }, { value: '机电-设备升级改造' }, { value: '机电-设备顾问' }]
      this.examineStateList = [{ value: '审核中' }, { value: '已审批' }, { value: '重新审批' }]
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
</style>
<style lang="scss">
@import "src/styles/mixin.scss";
</style>
