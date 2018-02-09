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
        <button :class="tab === 'addTab' ? 'is-active' : ''" @click="addBtn">
          <i class="iconfont icon-add"></i>
          <span>新增</span>
        </button>
        <button v-show="deleteShow" @click="delSelectData">
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
    <AddComponent v-if="tab === 'addTab'" :editData="editData" @toggleTab="toggleTab('listTab')"></AddComponent>
    <ListComponent v-if="tab === 'listTab'" @selData="selData" @seeRow="seeRow" :searchData="searchData" ref="del"></ListComponent>
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
      deleteShow: false,
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
    seeRow(data) {
      this.tab = 'addTab'
      // console.log(data)
      this.editData = {
        editData: data,
        tabState: 'seeTab'
      }
    },
    delSelectData() {
      var id = { id: this.selArr }
      this.$post('/project/delete', id).then((res) => {
        console.log('res', res)
        this.$refs.del.getProjectData()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    },
    searchWord(data) {
      this.tab = 'listTab'
      this.searchData = data
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-container {
  width: 100%;
  @include scrolling;
}
.basic-form {
  .el-table__fixed-body-wrapper {
    margin: 28px 0;
  }
}
</style>
