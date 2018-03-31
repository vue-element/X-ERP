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
            <el-select placeholder="请选择商机名称" v-model="searchData.b_id" filterable clearable>
             <el-option v-for="item in businessList" :label="item.name" :value="item.id" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机编码:">
            <el-select placeholder="请选择商机编码" v-model="searchData.b_id" filterable clearable>
             <el-option v-for="item in businessList" :label="item.code" :value="item.id" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="区域:">
            <el-select placeholder="请选择区域"  v-model="searchData.region_id" clearable>
             <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="城市:">
            <el-cascader :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange" filterable clearable ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机提供人:">
            <el-input v-model="searchData.sourcePerson" placeholder="请输入商机提供人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="客户名称:">
            <el-select placeholder="请选择客户名称" v-model="searchData.client_id" filterable clearable>
             <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="客户类别:">
            <el-select placeholder="请选择客户类别" v-model="searchData.clientCtg" filterable clearable>
             <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="业务分类:">
            <el-select placeholder="请选择业务分类" v-model="searchData.ctg_id" filterable clearable>
             <el-option v-for="item in businessCtgList" :label="item.name" :value="item.id" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机审批状态:">
            <el-select v-model="searchData.examineState" placeholder="请选择商机审批状态" clearable>
              <el-option v-for="item in examineStateList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机执行状态:" prop="executState">
            <el-select v-model="searchData.executState" placeholder="请选择商机执行状态" clearable>
              <el-option v-for="item in executeStateList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="项目预计启动时间:" class="range-date">
            <el-date-picker v-model="searchData.startDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="预计成交金额:">
            <el-row>
              <el-col :span="10">
                <el-input v-model="searchData.amount" placeholder="请输入成交金额"></el-input>
              </el-col>
              <el-col class="line" :span="4" style="text-align:center">——</el-col>
              <el-col :span="10">
                <el-input v-model="searchData.amount1" placeholder="请输入成交金额"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="业务线负责人:">
            <el-select placeholder="请选择业务线负责人" v-model="searchData.bp_id" filterable clearable>
             <el-option v-for="item in userList" :label="item.name" :value="item.id" :key="item.id">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机录入日期:" class="range-date">
            <el-date-picker v-model="searchData.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
            </el-date-picker>
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
        b_id: '',
        sourcePerson: '',
        startDate: '',
        startDate1: '',
        amount: '',
        amount1: '',
        executState: '',
        examineState: '',
        date: '',
        date1: '',
        city_id: '',
        client_id: '',
        ctg_id: '',
        clientCtg: '',
        bp_id: '',
        region_id: ''
      },
      cityOption: [],
      userList: [],
      clientList: [],
      cityList: [],
      regionList: [],
      businessList: [],
      businessCtgList: [],
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
          if (key === 'startDate') {
            searchData['startDate'] = this.searchData['startDate'][0]
            searchData['startDate1'] = this.searchData['startDate'][1]
          } else if (key === 'date') {
            searchData['date'] = this.searchData['date'][0]
            searchData['date1'] = this.searchData['date'][1]
          } else {
            searchData[key] = this.searchData[key]
          }
        } else {
          if (key === 'amount') {
            searchData['amount'] = 0
          }
          if (key === 'amount1') {
            searchData['amount1'] = 0
          }
        }
      }
      // console.log('searchWord', searchData)
      this.$emit('searchWord', searchData)
    },
    searchAll() {
      var searchData = {
        amount: 0,
        amount1: 0
      }
      this.$emit('searchWord', searchData)
    },
    getInsertData() {
      this.$get('/bussiness/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
        this.businessCtgList = data.businessCtgList
        this.userList = data.userList
        this.businessList = data.businessList
      })
      // this.$get('/bussiness').then((res) => {
      //   this.businessList = res.data.data.content
      // })
      this.categoryList = [{ value: '中海物业' }, { value: '外部物业' }, { value: '中海地产' }, { value: '外部地产' }, { value: '其他客户' }]
      this.executeStateList = [{ value: '前期接洽' }, { value: '招投标' }, { value: '中标' }, { value: '合同会签' }, { value: '纸质版合同签订' }, { value: '放弃' }]
      this.examineStateList = [{ value: '商机线索' }, { value: '有效商机' }]
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
