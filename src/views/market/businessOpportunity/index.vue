<template>
<div class="app-container">
  <div class="form-head-attached clearfix">
    <div class="form-inner">
      <div class="crud-btn fl">
        <button v-if="hasPerm('bussiness:search')" @click="toggleTab('searchTab')" :class="tab === 'searchTab' ? 'is-active' : ''">
          <i class="iconfont icon-search"></i>
          <span>查询</span>
        </button>
        <button v-if="hasPerm('bussiness:findAllByPage')" @click="toggleTab('listTab')" :class="tab === 'listTab' ? 'is-active' : ''">
          <i class="iconfont icon-seeAll"></i>
          <span>查看</span>
        </button>
        <button v-if="hasPerm('bussiness:save')" @click="addBtn" :class="(tab === 'addTab' && editData.tabState ==='addTab') ? 'is-active' : ''">
          <i class="iconfont icon-add"></i>
          <span>新增</span>
        </button>
        <button v-show="tab === 'addTab' && editData.tabState ==='editTab'" :class="(tab === 'addTab' && editData.tabState ==='editTab')? 'is-active' : ''">
          <i class="iconfont icon-seeAll"></i>
          <span>查看明细</span>
        </button>
        <button v-if="hasPerm('bussiness:delete')"  @click="delSelectData" v-show="deleteShow && tab === 'listTab'">
          <i class="iconfont icon-delete"></i>
          <span>删除</span>
        </button>
      </div>
      <div class="export-btn fr">
        <button v-show="hasPerm('bussiness:export') && tab === 'listTab'" @click="handleDownload()">
          <i class="iconfont icon-export"></i>
          <span>数据导出</span>
        </button>
      </div>
    </div>
  </div>
  <div class="compotent-tab">
    <AddComponent v-if="tab === 'addTab'" :editData="editData"  @toggleTab="toggleTab('listTab')" @changeObj="changeObj"></AddComponent>
    <ListComponent v-if="tab === 'listTab'" @selData="selData" ref="del" :searchData="searchData" @exportData="exportData" @editRow="editRow" :pageObj="pageObj"></ListComponent>
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
      permissionKey: 'bussiness',
      searchData: {
        amount: 0,
        amount1: 0
      },
      tab: 'listTab',
      deleteShow: false,
      selArr: [],
      exprotList: [],
      editData: {},
      isChange: false,
      pageObj: {}
    }
  },
  created() {
    // console.log('this.listPermission', this.listPermission)
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
    confirmDel() {
      var id = { id: this.selArr }
      this.$post('/bussiness/delete', id).then((res) => {
        if (res.data.success === true) {
          this.$refs.del.getProjectData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    editRow(data) {
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
      this.exprotList = data
    },
    handleDownload() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '商机名称', '商机编号', '客户信息', '城市', '区域', '业务分类', '预计启动时间', '预计成交金额', '业务负责人', '商机审批状态']
        const filterVal = ['index', 'name', 'code', 'client.name', 'city.name', 'region.name', 'businessCategory.name', 'startDate', 'amount', 'businessPerson.name', 'examineState']
        const list = this.exprotList
        var i = 1
        list.forEach((item) => {
          item.index = i
          i++
        })
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '商机信息表')
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j.indexOf('.') !== -1) {
            var arr = j.split('.')
            var m = arr[0]
            var n = arr[1]
            if (arr[0] === 'projectImpls') {
              return v[m][0]['' + n]
            } else {
              return v[m]['' + n]
            }
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
