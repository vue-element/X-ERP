<template>
<div class="form-container smartCommunity-search">
  <el-form :model="searchData" ref="searchData">
    <div class="form-module">
      <h4 class="module-title">
        <p>查询条件</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="客户名称:">
            <el-autocomplete v-model="searchData.name" :fetch-suggestions="clientSearchAsync" @select="clientSelect" placeholder="请输入客户名称"></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="客户类别:">
            <!-- <select-dropdown label="客户类别" :listData="categoryList"  @onchange="categoryChange"></select-dropdown> -->
            <el-select v-model="searchData.category" placeholder="请选择客户类别"  filterable clearable>
             <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.value">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="业态:">
            <el-select v-model="searchData.type" placeholder="请选择业态" filterable clearable>
             <el-option v-for="item in typeList" :label="item.value" :value="item.value" :key="item.value">
             </el-option>
           </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="联系人:">
            <el-input v-model="searchData.person" placeholder="请输入联系人"></el-input>
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
// import SelectDropdown from '@/components/SelectDropdown.vue'
export default {
  // components: {
  //   SelectDropdown
  // },
  data() {
    return {
      searchData: {
        name: '',
        category: '',
        type: '',
        person: ''
      },
      typeList: [],
      categoryList: []
    }
  },
  mounted() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.categoryList = [{ value: '中海物业' }, { value: '外部物业' }, { value: '中海地产' }, { value: '外部地产' }, { value: '其他客户' }]
      this.typeList = [{ value: '多层' }, { value: '高层' }, { value: '小高层' }, { value: '别墅' }, { value: '商业' }, { value: '写字楼' }, { value: '其他' }]
    },
    search() {
      var searchData = {}
      for (var key in this.searchData) {
        if (this.searchData[key]) {
          searchData[key] = this.searchData[key]
        }
      }
      console.log('searchWord', searchData)
      this.$emit('searchWord', searchData)
    },
    searchAll() {
      var searchData = {}
      this.$emit('searchWord', searchData)
    },
    // categoryChange(name) {
    //   this.searchData.category = name
    // },
    // 客户搜索
    clientSearchAsync(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/clientName?clientName=' + queryString).then((res) => {
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
    clientSelect(item) {
      this.searchData.name = item.name
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.smartCommunity-search {
  .filter-item {
    position: relative;
    .filter-ul{
      position: absolute;
      width: 100%;
    }
  }
}
</style>
<style lang="scss">
</style>
