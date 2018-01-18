<template>
<div class="app-container">
  <div class="form-head-attached clearfix">
    <div class="form-inner">
      <div class="crud-btn fl">
        <button :class="tab === 'searchTab' ? 'is-active' : ''" @click="toggleTab('searchTab')" >
          <i class="iconfont icon-search"></i>
          <span>查询</span>
        </button>
        <button :class="tab === 'listTab' ? 'is-active' : ''" @click="toggleTab('listTab')">
          <i class="iconfont icon-seeAll"></i>
          <span>查看明细</span>
        </button>
        <button @click="addBtn" :class="tab === 'addTab' ? 'is-active' : ''">
          <i class="iconfont icon-add"></i>
          <span>新增</span>
        </button>
        <button v-show="tab === 'listTab'" @click="delSelectData">
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
  <div class="compotent-tab" >
    <AddComponent v-if="tab === 'addTab'" :editData="editData"></AddComponent>
    <ListComponent v-if="tab === 'listTab'" @selData="selData" @editRow="editRow" :searchData="searchData" ref="del"></ListComponent>
    <SearchComponent v-if="tab === 'searchTab'" @searchWord="searchWord"></SearchComponent>
  </div>
</div>
</template>

<script>
import { winHeight } from '@/utils'
import AddComponent from './components/add'
import ListComponent from './components/list'
import SearchComponent from './components/search'
export default {
  name: 'smartCommunity',
  components: {
    AddComponent,
    ListComponent,
    SearchComponent
  },
  data() {
    return {
      searchData: {},
      editData: {},
      listData: '',
      tab: 'listTab',
      selArr: [],
      height: 100
    }
  },
  mounted() {
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
    },
    toggleTab(tab) {
      this.tab = tab
    },
    selData(selArr) {
      this.selArr = selArr
    },
    addBtn() {
      this.tab = 'addTab'
      this.editData = {
        editData: {},
        tabState: 'addTab'
      }
    },
    delSelectData() {
      if (this.selArr !== null) {
        var id = { id: this.selArr }
        console.log('id', id)
        this.$post('/project/delete', id).then((res) => {
          console.log('res', res)
          // console.log(this.$refs.del)
          this.$refs.del.getProjectData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      }
    },
    editRow(data) {
      this.tab = 'addTab'
      this.editData = {
        editData: data,
        tabState: 'editTab'
      }
      // console.log('id', id)
    },
    searchWord(data) {
      // console.log('searchWord', data)
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
  // border: 1px solid #d2d2d2;
  // margin-bottom: 16px;
  // padding: 0 20px;
  // @include borderRadius(4px);
  // @include noScroll;
  // @include boxSizing;
  // overflow-y: scroll;
}
</style>
