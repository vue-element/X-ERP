<template>
<div class="smartCommunity-list">
  <el-table class="basic-form" style="width: 100%"  :data="projectData" :height="height" @selection-change="handleSelectionChange"
  v-loading.body="listLoading" element-loading-text="拼命加载中" border>
    <el-table-column type="selection" width="40" fixed></el-table-column>
    <el-table-column align="center" prop="0" fixed label="序号" width="60" fixed>
      <template slot-scope="scope">{{scope.$index  + 1}}</template>
   </el-table-column>
   <el-table-column prop="client.name" label="商机编号" width="200"></el-table-column>
   <el-table-column prop="city.name" label="商机名称" width="100"></el-table-column>
   <el-table-column prop="region.name" label="所属年月" width="100"></el-table-column>
   <el-table-column prop="name" label="预计成交金额" width="120" fixed></el-table-column>
   <el-table-column prop="address" label="商机跟进状态"></el-table-column>
   <el-table-column fixed="right" label="操作" width="200">
      <template slot-scope="scope">
        <!-- <el-button @click.native.prevent="seeRow(scope.row.id)" type="text" size="small">查看</el-button> -->
        <el-button @click.native.prevent="saveUrl(scope.row.id)" type="text" size="small">表格查看/编辑</el-button>
        <el-button @click.native.prevent="seeRow(scope.row.id)" type="text" size="small">表格导出</el-button>
        <!-- <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
   @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
</div>
</template>

<script>
import Cookies from 'js-cookie'
import { winHeight } from '@/utils'
export default {
  name: 'smartCommunityList',
  props: ['searchData'],
  data() {
    return {
      listLoading: false,
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      projectData: [],
      height: 100
    }
  },
  created() {
    this.getProjectData()
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  watch: {
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
    },
    handleSelectionChange(arr) {
      var selArr = []
      arr.forEach((item) => {
        selArr.push(item.id)
      })
      this.$emit('selData', selArr)
    },
    saveUrl(id) {
      window.open('http://localhost:8000', '_blank')
      Cookies.set('ethercalcUrl', '20180315', { expires: 7 })
    },
    seeRow(id) {
      this.$get('/project/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        this.$emit('seeRow', data)
      })
    },
    deleteRow(id) {
      var projectID = { id: [id] }
      this.$post('/project/delete', projectID).then((res) => {
        if (res.status === 200) {
          this.getProjectData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    editRow(id) {
      this.$get('/project/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        console.log('data', data)
        // this.$emit('editRow', data)
      })
    },
    getProjectData() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/project/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then((res) => {
        this.listLoading = false
        if (res.data.success === true) {
          var data = res.data.data
          this.projectData = data.content
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.$emit('exportData', this.projectData)
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    //  页码处理
    handleSizeChange(val) {
      this.pageSize = val
      this.getProjectData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getProjectData()
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
