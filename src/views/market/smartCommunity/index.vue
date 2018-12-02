<template>
<div class="app-container">
  <div class="form-head-attached clearfix">
    <div class="form-inner">
      <div class="crud-btn fl">
        <button  v-show="hasPerm('project:search')" :class="tab === 'searchTab' ? 'is-active' : ''" @click="toggleTab('searchTab')">
          <i class="iconfont icon-search"></i>
          <span>查询</span>
        </button>
        <button  v-show="hasPerm('project:findAllByPage')" :class="tab === 'listTab' ? 'is-active' : ''" @click="toggleTab('listTab')">
          <i class="iconfont icon-seeAll"></i>
          <span>查看</span>
        </button>
        <button v-show="hasPerm('project:save')" :class="(tab === 'addTab' && editData.tabState ==='addTab') ? 'is-active' : ''" @click="addBtn">
          <i class="iconfont icon-add"></i>
          <span>新增</span>
        </button>
        <button v-show="tab === 'addTab' && editData.tabState ==='editTab'" :class="(tab === 'addTab' && editData.tabState ==='editTab')? 'is-active' : ''">
          <i class="iconfont icon-seeAll"></i>
          <span>查看明细</span>
        </button>
        <button  v-show="deleteShow && tab === 'listTab'" @click="delSelectData" v-if="hasPerm('project:deltete')">
          <i class="iconfont icon-delete"></i>
          <span>删除</span>
        </button>
      </div>
      <div class="export-btn fr">
        <button v-show="hasPerm('project:export') && tab === 'listTab'" @click="handleDownload()">
          <i class="iconfont icon-export"></i>
          <span>数据导出</span>
        </button>
      </div>
    </div>
  </div>
  <div class="compotent-tab" >
      <AddComponent v-if="tab === 'addTab'" :editData="editData" @toggleTab="toggleTab('listTab')" @changeObj="changeObj"></AddComponent>
      <ListComponent v-if="tab === 'listTab'" @selData="selData" @seeRow="seeRow" :searchData="searchData" @exportData="exportData" ref="list" :pageObj="pageObj" ></ListComponent>
      <SearchComponent v-show="tab === 'searchTab'" @searchWord="searchWord"></SearchComponent>
  </div>
  <Function ref="downLoad"></Function>
</div>
</template>

<script>
import AddComponent from './components/add'
import ListComponent from './components/list'
import SearchComponent from './components/search'
import Function from './Function'
export default {
  name: 'smartCommunity',
  components: {
    AddComponent,
    ListComponent,
    SearchComponent,
    Function
  },
  data() {
    return {
      searchData: {},
      editData: {},
      listData: '',
      tab: 'listTab',
      selArr: [],
      deleteShow: false,
      exportList: [],
      isChange: false,
      pageObj: {}
    }
  },
  mounted() {
  },
  created() {
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
    selData(selArr) {
      this.selArr = selArr
      if (this.selArr.length > 0) {
        this.deleteShow = true
      } else {
        this.deleteShow = false
      }
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
      this.pageObj = {
        currentPage: data.currentPage,
        pageSize: data.pageSize
      }
      this.toggleTab('addTab')
      this.editData = {
        editData: data,
        tabState: 'editTab'
      }
    },
    searchWord(data) {
      this.pageObj = {}
      this.toggleTab('listTab')
      this.searchData = data
    },
    // searchYear(year) {
    //   this.pageObj = {}
    //   this.toggleTab('listTab')
    //   // this.searchData = year
    // },
    confirmDel() {
      var id = { id: this.selArr }
      this.$post('/project/delete', id).then((res) => {
        console.log('res', res)
        if (res.data.success === true) {
          this.$refs.list.getProjectData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    delSelectData() {
      this.$confirm('确认删除此信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.confirmDel()
      }).catch(() => {
        return false
      })
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
    changeObj(res) {
      this.isChange = res
    },
    exportData(data) {
      this.exportList = data
    },
    handleDownload() {
      if (this.exportList.length > 0) {
        this.$refs.downLoad.drawList(this.exportList)
        this.$refs.list.clearSelection()
      } else {
        this.$message({
          message: '请选择至少一项目',
          type: 'warning'
        })
      }
    },
    formatJson(filterVal, jsonData) {
      var list = ['client', 'region', 'city']
      return jsonData.map(v =>
        filterVal.map(j => {
          if (list.indexOf(j) !== -1) {
            return v[j]['name']
          } else {
            return v[j]
          }
        })
      )
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
