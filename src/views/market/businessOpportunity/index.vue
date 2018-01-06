<template>
<div class="app-container">
  <div class="form-attached clearfix">
    <div class="form-inner">
      <div class="crud-btn fl">
        <button @click="toggleTab('search')" :class="tab === 'search' ? 'is-active' : ''">
          <i class="iconfont icon-search"></i>
          <span>查询</span>
        </button>
        <button @click="toggleTab('list')" :class="tab === 'list' ? 'is-active' : ''">
          <i class="iconfont icon-seeAll"></i>
          <span>查看明细</span>
        </button>
        <button @click="toggleTab('add')" :class="tab === 'add' ? 'is-active' : ''">
          <i class="iconfont icon-add"></i>
          <span>新增</span>
        </button>
        <button>
          <i class="iconfont icon-edit"></i>
          <span>修改</span>
        </button>
        <button>
          <i class="iconfont icon-delete"></i>
          <span>删除</span>
        </button>
      </div>
      <div class="export-btn fr">
        <button>
          <i class="iconfont icon-export"></i>
          <span>数据导出</span>
        </button>
      </div>
    </div>
  </div>
  <div class="compotent-tab">
    <AddComponent v-show="tab === 'add'" @add="add"></AddComponent>
    <!-- <ListComponent v-show="tab === 'list'" :searchData="searchData"></ListComponent> -->
    <SearchComponent v-show="tab === 'search'" @search="search"></SearchComponent>
  </div>
</div>
</template>

<script>
import { winHeight } from '@/utils'
import AddComponent from './components/add'
// import ListComponent from './components/list'
import SearchComponent from './components/search'
// import { fetchList } from '@/api/article'
export default {
  name: 'businessOpportunity',
  components: {
    AddComponent,
    // ListComponent,
    SearchComponent
  },
  data() {
    return {
      searchData: {},
      tab: 'list',
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
    search(searchData) {
      console.log(111)
      console.log(searchData)
      this.tab = 'list'
      this.searchData = searchData
    },
    add(searchData) {
      this.tab = 'list'
      this.searchData = searchData
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
.form-attached {
  position: fixed;
  top: 100px;
  left: 220px;
  right: 10px;
  z-index: 1;
  height: 50px;
  // line-height: 40px;
  font-size: 16px;
  color: #828282;
  background-color: #fff;

  .form-inner {
    height: 100%;
    margin: 0 16px;
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
  }
  div.crud-btn,
  div.export-btn {
    button{
      color: #828282!important;
      display: inline-block;
      margin:0 16px;
      i {
        display: inline-block;
        margin-right: 6px;
      }
    }
    button.is-active {
      color: #35d5ba!important;
    }
  }
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
