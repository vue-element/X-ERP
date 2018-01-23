<template>
  <div class="app-container">
    <!-- <el-input style='width:240px;' placeholder="请输入文件名(默认excel-list)" prefix-icon="el-icon-document" v-model="filename"></el-input>
    <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">导出excel</el-button> -->
    <div class="attached-btn">
      <div>
        <div class="iconfont icon-inquire">查询</div>
        <div class="iconfont icon-detail">查看明细</div>
        <div class="iconfont icon-add">新增</div>
        <div class="iconfont icon-edit">修改</div>
        <div class="iconfont icon-delete">删除</div>
      </div>
      <div>
        <upload-excel-component @on-selected-file='selected'></upload-excel-component>
        <el-button class="iconfont icon-download">模版下载</el-button>
        <el-button @click="handleDownload" :loading="downloadLoading" class="iconfont icon-export">数据导出</el-button>
      </div>
    </div>
    <!-- <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item'>
      </el-table-column>
    </el-table> -->

    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="文章标题">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="作者" width="95" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.author}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="阅读数" width="115" align="center">
        <template slot-scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="发布时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="page" background :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'exportExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      list: null,
      listLoading: true,
      downloadLoading: false,
      filename: '',
      tableData: [],
      tableHeader: [],
      currentPage: 2
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    selected(data) {
      this.tableData = data.results
      this.tableHeader = data.header
    },
    handleDownload() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
        const list = this.list
        console.log('list', list)
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, this.filename)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>
<style scoped>
.attached-btn{
  display: flex;
  justify-content:space-between;
  width: 100%;
  height: 60px;
  line-height: 60px;
  color:#000;
}
.attached-btn div{
  display: inline-block;
  margin: 0 15px;
}
.page{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 20px 0;
}
</style>
