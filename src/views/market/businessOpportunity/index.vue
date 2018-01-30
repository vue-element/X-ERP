<template>
<div class="app-container">
  <div class="form-head-attached clearfix">
    <div class="form-inner">
      <div class="crud-btn fl">
        <button @click="toggleTab('searchTab')" :class="tab === 'searchTab' ? 'is-active' : ''">
          <i class="iconfont icon-search"></i>
          <span>查询</span>
        </button>
        <button @click="toggleTab('listTab')" :class="tab === 'listTab' ? 'is-active' : ''">
          <i class="iconfont icon-seeAll"></i>
          <span>查看明细</span>
        </button>
        <button @click="addBtn" :class="tab === 'addTab' ? 'is-active' : ''">
          <i class="iconfont icon-add"></i>
          <span>新增</span>
        </button>
        <button @click="delSelectData" v-show="deleteShow">
          <i class="iconfont icon-delete"></i>
          <span>删除</span>
        </button>
      </div>
      <div class="export-btn fr">
        <button v-show="tab === 'listTab'">
          <i class="iconfont icon-export"></i>
          <span>数据导出</span>
        </button>
      </div>
    </div>
  </div>
  <div class="compotent-tab">
    <AddComponent v-if="tab === 'addTab'" :editData="editData"  @toggleTab="toggleTab('listTab')"></AddComponent>
    <ListComponent v-if="tab === 'listTab'" @selData="selData" ref="del" :searchData="searchData" @editRow="editRow"></ListComponent>
    <SearchComponent v-if="tab === 'searchTab'" @searchWord="searchWord"></SearchComponent>
  </div>
</div>
</template>

<script>
import AddComponent from './components/add'
import ListComponent from './components/list'
import SearchComponent from './components/search'
export default {
  name: 'businessOpportunity',
  components: {
    AddComponent,
    ListComponent,
    SearchComponent
  },
  data() {
    return {
      searchData: {},
      tab: 'listTab',
      deleteShow: false,
      height: 100,
      selArr: []
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    toggleTab(tab) {
      this.tab = tab
    },
    selData(selArr) {
      this.selArr = selArr
      if (this.selArr.length > 0) {
        this.deleteShow = true
      } else {
        this.deleteShow = false
      }
    },
    addBtn() {
      this.tab = 'addTab'
      this.editData = {
        editData: {},
        tabState: 'addTab'
      }
    },
    delSelectData() {
      var id = { id: this.selArr }
      this.$post('/bussiness/delete', id).then((res) => {
        this.$refs.del.getProjectData()
        if (res.data.success === true) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    editRow(data) {
      this.tab = 'addTab'
      this.editData = {
        editData: data,
        tabState: 'seeTab'
      }
    },
    searchWord(data) {
      this.tab = 'listTab'
      this.searchData = data
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-container {
  width: 100%;
  @include scrolling
}
.basic-form {
  .el-table__fixed-body-wrapper {
    margin: 28px 0;
  }
}
.compotent-tab {
  margin-top: 50px;
}
</style>
