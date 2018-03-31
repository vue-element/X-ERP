<template>
<div class="app-container">
  <div class="form-head-attached clearfix">
    <div class="form-inner">
      <div class="crud-btn fl">
        <button :class="tab === 'searchTab' ? 'is-active' : ''" @click="toggleTab('searchTab')" v-if="hasPerm('project:search')">
          <i class="iconfont icon-search"></i>
          <span>查询</span>
        </button>
        <button :class="tab === 'listTab' ? 'is-active' : ''" @click="toggleTab('listTab')" v-if="hasPerm('project:findAllByPage')">
          <i class="iconfont icon-seeAll"></i>
          <span>查看</span>
        </button>
        <button :class="(tab === 'addTab' && editData.tabState ==='addTab') ? 'is-active' : ''" @click="addBtn" v-if="hasPerm('project:findInsertData')">
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
        <button v-show="tab === 'listTab'" @click="handleDownload()">
          <i class="iconfont icon-export"></i>
          <span>数据导出</span>
        </button>
      </div>
    </div>
  </div>
  <div class="compotent-tab" >
      <AddComponent v-if="tab === 'addTab'" :editData="editData" @toggleTab="toggleTab('listTab')" @changeObj="changeObj"></AddComponent>
      <ListComponent v-if="tab === 'listTab'" @selData="selData" @seeRow="seeRow" :searchData="searchData" @exportData="exportData" ref="del"></ListComponent>
      <SearchComponent v-show="tab === 'searchTab'" @searchWord="searchWord"></SearchComponent>
  </div>
</div>
</template>

<script>
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
      exprotList: [],
      isChange: false
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
      this.toggleTab('addTab')
      this.editData = {
        editData: data,
        tabState: 'editTab'
      }
    },
    confirmDel() {
      var id = { id: this.selArr }
      this.$post('/project/delete', id).then((res) => {
        console.log('res', res)
        if (res.data.success === true) {
          this.$refs.del.getProjectData()
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
        const tHeader = ['序号', '客户信息', '区域', '城市', '项目名称', '楼栋及单元数量', '项目地址', '首期入伙时间', '建筑业态', '物业管理费', ' 车位总数', '车位比',
          '户数', '容积率', '总收费面积(平米)', '地面车位数量', '地面车位收费标准', '地库车位数量', '地库车位收费标准', '人防车位数量', '人防车位收费标准']
        const filterVal = ['index', 'client', 'region', 'city', 'name', 'buildNum', 'address', 'firstEntry', 'archFormat', 'manageFee', 'parkingNum', 'carRatio',
          'roomNum', 'volumetricRate', 'chargeArea', 'groundParkingNum', 'groundParkingFee', 'basementParkingNum', 'basementParkingFee', 'defenseParkingNum', 'defenseParkingFee']
        const list = this.exprotList
        var i = 1
        list.forEach((item) => {
          item.index = i
          i++
        })
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '智慧社区数据库')
        this.downloadLoading = false
      })
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
