<template>
  <div class="app-container">
    <div class="form-head-attached">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button v-if="hasPerm('outboundList:search')" @click="toggleTab('searchTab')" :class="tab === 'searchTab' ? 'is-active' : ''">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </button>
          <button v-if="hasPerm('outboundList:findAllByPage')" @click="toggleTab('listTab')" :class="tab === 'listTab' ? 'is-active' : ''">
            <i class="iconfont icon-seeAll"></i>
            <span>查看</span>
          </button>
          <button v-if="hasPerm('outboundList:save')" @click="addBtn" :class="(tab === 'addTab' && editData.tabState ==='addTab') ? 'is-active' : ''">
            <i class="iconfont icon-add"></i>
            <span>新增</span>
          </button>
          <button v-show="tab === 'addTab' && editData.tabState ==='editTab'" :class="(tab === 'addTab' && editData.tabState ==='editTab')? 'is-active' : ''">
            <i class="iconfont icon-seeAll"></i>
            <span>查看明细</span>
          </button>
        </div>
      </div>
    </div>
    <div class="compotent-tab">
      <AddComponent v-if="tab === 'addTab'" :editData="editData" @toggleTab="toggleTab('listTab')" @changeObj="changeObj"></AddComponent>
      <ListComponent v-if="tab === 'listTab'" @editRow="editRow" :searchData="searchData" :pageObj="pageObj"></ListComponent>
      <SearchComponent v-show="tab === 'searchTab'" @search="search"></SearchComponent>
      <ImportComponent v-if="tab === 'importTab'"></ImportComponent>
    </div>
  </div>
</template>

<script>
// import { parseTime } from '@/utils'
import AddComponent from './components/add'
import ListComponent from './components/list'
import SearchComponent from './components/search'
import ImportComponent from './components/import'
export default {
  name: 'outbound',
  components: {
    AddComponent,
    ListComponent,
    SearchComponent,
    ImportComponent
  },
  data() {
    return {
      downloadLoading: false,
      isChange: false,
      tab: 'listTab',
      editData: {},
      searchData: {},
      list: [],
      pageObj: {}
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    addBtn() {
      // this.tab = 'addTab'
      // this.editData = {
      //   editData: {},
      //   tabState: 'addTab'
      // }
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
    showPopWin(callback) {
      this.$confirm('信息未保存，是否离开当前页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        callback()
        this.isChange = false // 对象变化，按确定键，isChange还原为false
      }).catch(() => {
        this.isChange = true // 对象变化，弹窗出，取消键，isChange依旧为true
      })
    },
    changeObj(res) {
      this.isChange = res
    },
    editRow(data) {
      this.pageObj = {
        currentPage: data.currentPage,
        pageSize: data.pageSize
      }
      this.editData = {
        editData: data,
        tabState: 'editTab'
      }
      this.toggleTab('addTab')
      // this.tab = 'addTab'
    },
    search(data) {
      this.pageObj = {}
      this.searchData = data
      // this.tab = 'listTab'
      this.toggleTab('listTab')
    },
    toggleTab(tab) {
      if (this.tab === 'addTab' && this.isChange === true) {
        this.showPopWin(() => {
          this.tab = tab
        })
        return
      }
      this.tab = tab
      // this.tab = tab
    }
    // dataImpore() {
    //   this.toggleTab('importTab')
    // },
    // handleDownload() {
    //   this.downloadLoading = true
    //   require.ensure([], () => {
    //     const { export_json_to_excel } = require('@/vendor/Export2Excel')
    //     const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间']
    //     const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
    //     const list = this.list
    //     // if (list) {
    //     //   list = this.list
    //     // } else {
    //     //   list = []
    //     // }
    //     // console.log('list', list)
    //     const data = this.formatJson(filterVal, list)
    //     export_json_to_excel(tHeader, data, this.filename)
    //     this.downloadLoading = false
    //   })
    // },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v =>
    //     filterVal.map(j => {
    //       if (j === 'timestamp') {
    //         return parseTime(v[j])
    //       } else {
    //         return v[j]
    //       }
    //     })
    //   )
    // }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  },
  watch: {
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
