<template>
<div class="app-container">
  <ul class="form-attached clearfix">
    <ul class="crud-btn fl">
      <li @click="toggleTab('search')">
        <i class="iconfont icon-search"></i>
        <span>查询</span>
      </li>
      <li>
        <i class="iconfont icon-seeAll"></i>
        <span>查看明细</span>
      </li>
      <li @click="toggleTab('add')">
        <i class="iconfont icon-add"></i>
        <span>新增</span>
      </li>
      <li>
        <i class="iconfont icon-edit"></i>
        <span>修改</span>
      </li>
      <li>
        <i class="iconfont icon-delete"></i>
        <span>删除</span>
      </li>
    </ul>
    <li class="fr data-export">
      <i class="iconfont icon-export"></i>
      <span>数据导出</span>
    </li>
  </ul>
  <AddComponent v-show="tab === 'add'"></AddComponent>
  <ListComponent v-show="tab === 'list'" :searchData="searchData"></ListComponent>
  <SearchComponent v-show="tab === 'search'" @search="search"></SearchComponent>
</div>
</template>

<script>
import { winHeight } from '@/utils'
import AddComponent from './components/add'
import ListComponent from './components/list'
import SearchComponent from './components/search'

// import { fetchList } from '@/api/article'
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
      tab: 'list',
      ruleForm: {
        type: []
      },
      form: {
        region: ''
      },
      tableData: [{
        1: '2017001176',
        2: '弱电维保-中海华庭',
        3: '中海房地产',
        4: '2017-12',
        5: '1000000',
        6: '深度跟进',
        7: '项目侦测',
        8: '东莞',
        9: '深圳办事处',
        10: '机电-设备运维',
        11: '高级分类',
        12: '1000000',
        13: '20000',
        14: '30000',
        15: '40000',
        16: '50000',
        17: '10000',
        18: '王晓',
        19: '20170110',
        20: '已审批'
      }, {
        1: '2017000000',
        2: '弱电维保-中海华庭',
        3: '中海房地产',
        4: '2017-12',
        5: '1000000',
        6: '深度跟进',
        7: '项目侦测',
        8: '东莞',
        9: '深圳办事处',
        10: '机电-设备运维',
        11: '高级分类',
        12: '1000000',
        13: '20000',
        14: '30000',
        15: '40000',
        16: '50000',
        17: '10000',
        18: '王晓',
        19: '20170110',
        20: '已审批'
      }, {
        1: '2017000000',
        2: '弱电维保-中海华庭',
        3: '中海房地产',
        4: '2017-12',
        5: '1000000',
        6: '深度跟进',
        7: '项目侦测',
        8: '东莞',
        9: '深圳办事处',
        10: '机电-设备运维',
        11: '高级分类',
        12: '1000000',
        13: '20000',
        14: '30000',
        15: '40000',
        16: '50000',
        17: '10000',
        18: '王晓',
        19: '20170110',
        20: '已审批'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
        // }, {
        //   1: '2017000000'
        // }, {
        //   1: '2017000000'
      }],
      currentPage: 2,
      height: 100
    }
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
      // this.height = 0
    },
    toggleTab (tab) {
      this.tab = tab
    },
    search (searchData) {
      console.log(111)
      console.log(searchData)
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
  padding: 0 10px;
  @include boxSizing;
  @include scrolling
}
.form-attached {
  // position: fixed;
  // top: 100px;
  // left: 220px;
  // right: 10px;
  // z-index: 102;
  background-color: red;
  margin: 0 15px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  ul.crud-btn {
    a, li{
      display: inline-block;
      margin-right: 35px;
      color: #828282;
      i {
        display: inline-block;
        margin-right: 6px;
      }
    }
  }
  .data-export {
    i {
      display: inline-block;
      margin-right: 6px;
    }
  }
}
.basic-form {
  .el-table__fixed-body-wrapper {
    margin: 28px 0;
  }
}
</style>
