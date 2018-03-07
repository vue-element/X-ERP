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
              <el-input v-model="searchData.name" placeholder="请输入供应商名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合作商类别:" >
              <el-select v-model="searchData.cooperativeType" placeholder="请选择" filterable>
               <el-option v-for="item in cooperativeTypeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="物资类别:">
              <el-select v-model="searchData.materialCategory" placeholder="请选择" filterable>
               <el-option v-for="item in materialCategoryList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="评审状态:">
              <el-select v-model="searchData.reviewState" placeholder="请选择" filterable>
               <el-option v-for="item in reviewStateList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="联系人:">
              <el-input v-model="searchData.person" placeholder="请输入联系人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">

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
export default {
  name: 'supplierSearch',
  data() {
    return {
      loading: false,
      disabled: false,
      contractInfoList: [],
      searchData: {
        name: '',
        cooperativeType: '',
        materialCategory: '',
        reviewState: '',
        person: ''
      },
      rules: {}
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.cooperativeTypeList = [{ value: '物资供应商' }, { value: '业务分包商' }]
      this.materialCategoryList = [{ value: '主材' }, { value: '线材' }, { value: '工器具' }, { value: '辅材' }, { value: '其他' }, { value: '行政类' }]
      this.reviewStateList = [{ value: '合格' }, { value: '新引进' }]
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
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
