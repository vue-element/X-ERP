<template>
  <div class="invoice-search form-container">
    <el-form :model="searchData" :rules="rules" ref="searchData">
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="供应商名称:">
              <el-autocomplete v-model="searchData.name" :fetch-suggestions="supplySearchAsync" @select="supplySelect" placeholder="请输入供应商名称"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="供应商类别:">
              <el-select v-model="searchData.type" placeholder="请选择供应商类别" filterable clearable>
               <el-option v-for="item in typeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="供应商类型:">
              <el-select v-model="searchData.category" placeholder="请选择供应商类型" filterable clearable>
               <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="供应商等级:">
              <el-select v-model="searchData.grade" placeholder="请选择供应商等级" filterable clearable>
               <el-option v-for="item in gradeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="物资类别:">
              <el-select v-model="searchData.materialCategory" placeholder="请选择物资类别" filterable clearable>
               <el-option v-for="item in materialCtgList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="企业性质:">
              <el-select v-model="searchData.enterpriseNature" placeholder="请选择企业性质" filterable clearable>
               <el-option v-for="item in enterpriseNatureList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合作商类别:" >
              <el-select v-model="searchData.cooperativeType" placeholder="请选择合作商类别" filterable clearable>
               <el-option v-for="item in cooperativeTypeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="供货周期（天）:" >
                <el-input v-model="searchData.supplyCycle" placeholder="请输入供货周期"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="供货区域:" >
              <el-select v-model="searchData.region_id" placeholder="请输入供货区域" filterable clearable>
                <el-option v-for="item in supplyRegionList" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="结算方式:" >
              <el-select v-model="searchData.settlementMethod" placeholder="请选择结算方式" filterable clearable>
               <el-option v-for="item in settlementMethodList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="评审状态:">
              <el-select v-model="searchData.reviewState" placeholder="请选择评审状态" filterable clearable>
               <el-option v-for="item in reviewStateList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
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
import { supplyRegionList, materialCtgList } from '@/utils/selectList'
export default {
  name: 'supplierSearch',
  data() {
    return {
      loading: false,
      disabled: false,
      contractInfoList: [],
      searchData: {
        name: '',
        materialCategory: '',
        enterpriseNature: '',
        cooperativeType: '',
        category: '',
        grade: '',
        type: '',
        supplyCycle: '',
        reviewState: '',
        settlementMethod: '',
        region_id: ''
      },
      supplyRegionList: [],
      typeList: [],
      categoryList: [],
      materialCtgList: [],
      enterpriseNatureList: [],
      cooperativeTypeList: [],
      regionList: [],
      settlementMethodList: [],
      reviewStateList: [],
      gradeList: [],
      rules: {}
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    supplyChange(name) {
      this.searchData.name = name
    },
    getInsertData() {
      supplyRegionList().then((data) => {
        this.supplyRegionList = data
      })
      materialCtgList().then((data) => {
        this.materialCtgList = data
      })
      this.cooperativeTypeList = [{ value: '物资供应商' }, { value: '业务分包商' }]
      this.enterpriseNatureList = [{ value: '国企' }, { value: '民企' }, { value: '合资' }, { value: '外企' }]
      this.invoiceTypeList = [{ value: '小规模纳税人' }, { value: '一般纳税人' }, { value: '普通' }]
      this.categoryList = [{ value: '常用型' }, { value: '临时型' }, { value: '历史型' }]
      this.typeList = [{ value: '战略供方' }, { value: '甲方指定' }, { value: '普通合格' }, { value: '试用' }, { value: '临时供方' }]
      this.reviewStateList = [{ value: '合格' }, { value: '新引进' }]
      this.settlementMethodList = [{ value: '月结' }, { value: '货到付款' }, { value: '其他' }]
      this.gradeList = [{ value: 'A级' }, { value: 'B级' }, { value: 'C级' }, { value: 'D级' }]
    },
    search() {
      var searchData = {}
      for (var key in this.searchData) {
        if (this.searchData[key]) {
          searchData[key] = this.searchData[key]
        }
      }
      this.$emit('search', searchData)
    },
    searchAll() {
      var searchData = {}
      this.$emit('search', searchData)
    },
    // 供应商搜索
    supplySearchAsync(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/supplyName?supplyName=' + queryString).then((res) => {
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
    },
    supplySelect(item) {
      this.searchData.name = item.name
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
