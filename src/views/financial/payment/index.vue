<template>
  <div class="contract-container">
    <div class="form-head-attached">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button @click="togglePath('search')" :class="path === 'search' ? 'is-active' : ''">
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </button>
          <button @click="togglePath('list')" :class="path === 'list' ? 'is-active' : ''">
            <i class="iconfont icon-seeAll"></i>
            <span>查看明细</span>
          </button>
          <button @click="togglePath('add')" :class="path === 'add' ? 'is-active' : ''">
            <i class="iconfont icon-add"></i>
            <span>新增</span>
          </button>
          <!-- <button>
            <i class="iconfont icon-delete"></i>
            <span>删除</span>
          </button> -->
        </div>
        <div class="export-btn fr">
          <button @click="dataImpore" :class="path === 'import' ? 'is-active' : ''">
            <i class="iconfont icon-import"></i>
            <span>数据导入</span>
          </button>
          <button @click="handleDownload()" :loading="downloadLoading">
            <i class="iconfont icon-download"></i>
            <span>模版下载</span>
          </button>
          <button @click="handleDownload()" :loading="downloadLoading">
            <i class="iconfont icon-export"></i>
            <span>数据导出</span>
          </button>
        </div>
      </div>
    </div>
    <keep-alive :include='cachedViews'>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import { parseTime } from '@/utils'
export default {
  name: 'invoice',
  data() {
    return {
      path: 'list',
      downloadLoading: false,
      list: [
        {
          id: 1,
          title: '头条信息',
          author: '作者',
          pageviews: 200,
          display_time: '2018-01-22'
        },
        {
          id: 2,
          title: '头条信息',
          author: '作者',
          pageviews: 200,
          display_time: '2018-01-22'
        },
        {
          id: 3,
          title: '头条信息',
          author: '作者',
          pageviews: 200,
          display_time: '2018-01-22'
        }
      ]
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  methods: {
    fetchData() {
      this.listLoading = true
    },
    togglePath(path) {
      // console.log(path)
      this.path = path
      this.$router.push({ path: '/financial/payment/' + path })
    },
    dataImpore() {
      this.togglePath('import')
    },
    handleDownload() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.list
        // if (list) {
        //   list = this.list
        // } else {
        //   list = []
        // }
        // console.log('list', list)
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, this.filename)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
  },
  watch: {
    $route() {
      var path = this.$route.path
      this.path = path.split('/').pop()
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.contract-container {
  width: 100%;
  @include scrolling
}
.basic-form {
  .el-table__fixed-body-wrapper {
    margin: 28px 0;
  }
}
.contract-list {
  margin-top: 50px;
}
</style>
