<template>
<div class="form-container smartCommunity-search">
  <div class="form-module">
    <h4 class="module-title">
      <p>查询条件</p>
    </h4>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="basic-item">
          <label>客户类别:</label>
          <el-select v-model="searchData.category" placeholder="请选择客户类别"  filterable clearable>
           <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.value">
           </el-option>
         </el-select>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="basic-item single-date">
          <label>客户名称:</label>
          <el-select v-model="searchData.name" placeholder="请选择客户类别" filterable clearable>
           <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="basic-item">
          <label>联系人:</label>
          <input type="text" v-model="searchData.name" placeholder="请输入联系人" />
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="12">
        <div class="basic-item customer-info">
          <label>业态:</label>
          <el-select v-model="searchData.type" placeholder="请选择业态" filterable clearable>
           <el-option v-for="item in typeList" :label="item.value" :value="item.value" :key="item.value">
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
      searchData: {
        c_id: null,
        category: '',
        type: '',
        person: ''
      },
      clientList: [],
      typeList: [],
      categoryList: []
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.$get('/client/findInsertData').then((res) => {
        if (res.data.success === true) {
          this.clientList = res.data.data.clientList
        }
      })
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
</style>
<style lang="scss">
</style>
