<template>
<div class="app-container">
  <div class="form-head-attached clearfix">
    <div class="form-inner">
      <div class="crud-btn fl">
        <!-- <button :class="tab === 'searchTab' ? 'is-active' : ''" @click="toggleTab('searchTab')" >
          <i class="iconfont icon-search"></i>
          <span>查询</span>
        </button> -->
        <button :class="tab === 'listTab' ? 'is-active' : ''" @click="listBtn">
          <i class="iconfont icon-seeAll"></i>
          <span>查看</span>
        </button>
        <button :class="(tab === 'addTab' && editData.tabState ==='addTab') ? 'is-active' : ''" @click="addBtn">
          <i class="iconfont icon-add"></i>
          <span>新增</span>
        </button>
        <button v-show="tab === 'addTab' && editData.tabState ==='editTab'" :class="(tab === 'addTab' && editData.tabState ==='editTab')? 'is-active' : ''">
          <i class="iconfont icon-seeAll"></i>
          <span>查看明细</span>
        </button>
      </div>
      <div class="export-btn fr">
        <button v-show="tab === 'listTab'" @click="handleDownload()">
          <i class="iconfont icon-export"></i>
          <span>数据导出</span>
        </button>
      </div>
    </div>
  </div>
  <div class="compotent-tab" >
    <transition name="fade" mode="out-in">
      <AddComponent v-if="tab === 'addTab'" :editData="editData" @toggleTab="listBtn" @changeObj='changeObj' ></AddComponent>
      <ListComponent v-if="tab === 'listTab'" @seeRow="seeRow" :searchData="searchData" @exportData="exportData" ref="del"></ListComponent>
      <SearchComponent v-if="tab === 'searchTab'" @searchWord="searchWord"></SearchComponent>
    </transition>
  </div>
</div>
</template>

<script>
import AddComponent from './components/add'
import ListComponent from './components/list'
import SearchComponent from './components/search'
export default {
  name: 'customer',
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
      oldTab: '',
      selArr: [],
      height: 100,
      exprotList: [],
      isChange: false
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    toggleTab(tab) {
      if (this.tab === 'addTab' && this.isChange === true) {
        this.showPopWin(() => {
          this.tab = tab
        })
        return
      }
      this.tab = tab
    },
    listBtn() {
      this.toggleTab('listTab')
    },
    addBtn() {
      if (this.editData.tabState === 'editTab') { // 编辑状态点击新增
        if (this.isChange === true) { // 有值的变化
          this.showPopWin(() => {
            this.tab = '' // tab为空，在变为 ‘addTab’重新渲染add组件
            setTimeout(() => {
              this.tab = 'addTab'
            }, 50)
            this.editData.tabState = 'addTab'
          })
        } else { // 没有值的变化
          this.tab = ''
          setTimeout(() => {
            this.tab = 'addTab'
          }, 50)
          this.editData.tabState = 'addTab'
        }
      } else {
        this.tab = 'addTab'
        this.editData.tabState = 'addTab'
      }
    },
    seeRow(data) {
      this.toggleTab('addTab')
      this.editData = {
        editData: data,
        tabState: 'editTab'
      }
    },
    searchWord(data) {
      this.toggleTab('listTab')
      this.searchData = data
    },
    showPopWin(callback) {
      this.$confirm('信息未保存，是否离开当前页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        callback()
        this.isChange = false
      }).catch(() => {
        this.isChange = true
      })
    },
    changeObj(status) {
      console.log('status', status)
      this.isChange = status
    },
    exportData(data) {
      this.exprotList = data
    },
    handleDownload() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '客户名称', '客户类型', '业态', '企业性质', '联系人', '联系人电话', 'QQ', 'E-mail', '客户地址']
        const filterVal = ['id', 'name', 'category', 'type', 'nature', 'person', 'phone', 'qq', 'email', 'address']
        const list = this.exprotList
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '商机管理表')
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    }
  },
  computed: {
  },
  watch: {}
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
</style>
