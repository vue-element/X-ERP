<template>
<div class="smartCommunity-list">
  <el-table class="basic-form" style="width: 100%"  :data="projectData" :height="height"
  v-loading.body="listLoading" element-loading-text="拼命加载中" border>
    <el-table-column align="center" label="序号" fixed width="60">
      <template slot-scope="scope">{{scope.$index  + 1}}</template>
   </el-table-column>
   <el-table-column prop="business.code" label="商机编号" fixed width="120"></el-table-column>
   <el-table-column prop="business.name" label="商机名称" fixed  min-width="180"></el-table-column>
   <el-table-column prop="business.amount" label="预计成交金额" width="120"></el-table-column>
   <el-table-column prop="business.executeState" label="商机执行状态" width="120"></el-table-column>
   <el-table-column label="在线协作地址" width="300">
     <template slot-scope="scope">
       <span @click="toURl(scope.row.url)">{{scope.row.url}}</span></template>
   </el-table-column>
   <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button @click.native.prevent="saveUrl(scope.row)" type="text" size="small" v-if="hasPerm('tenderOffer:findUpdateData')">表格查看/编辑</el-button>
        <el-button @click.native.prevent="exportExcel(scope.row)" type="text" size="small">表格导出</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
   @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
</div>
</template>

<script>
import { winHeight, outputmoney } from '@/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'smartCommunityList',
  props: ['searchData', 'pageObj'],
  data() {
    return {
      listLoading: false,
      total: 5,
      currentPage: 1,
      pageSizes: [15, 20, 25],
      pageSize: 15,
      projectData: [],
      height: 100
    }
  },
  created() {
    if (this.pageObj.currentPage) {
      this.currentPage = this.pageObj.currentPage
      this.pageSize = this.pageObj.pageSize
    }
    this.getProjectData()
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  watch: {},
  methods: {
    resize() {
      this.height = winHeight() - 210
    },
    saveUrl(row) {
      var bCode = row.business.code
      var url = 'http://202.105.96.131:8085/_get_or_create?id=' + bCode
      // var url = 'http://localhost:8000/_get_or_create?id=' + bCode
      window.open(url, '_blank')
    },
    exportExcel(row) {
      var bCode = row.business.code
      // var url = 'http://localhost:8000/' + bCode
      var url = 'http://202.105.96.131:8085/' + bCode
      window.location.href = url + '.xlsx'
    },
    toURl(url) {
      window.open(url, '_blank')
    },
    seeRow(id) {
      this.$get('/project/findUpdateData/' + id).then(res => {
        var data = res.data.data
        data.currentPage = this.currentPage
        data.pageSize = this.pageSize
        this.$emit('seeRow', data)
      })
    },
    deleteRow(id) {
      var projectID = { id: [id] }
      this.$post('/project/delete', projectID).then(res => {
        if (res.status === 200) {
          this.getProjectData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    getProjectData() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      this.searchData.role_code = this.roleCode
      var url = '/tenderOffer/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false)
        .then(res => {
          this.listLoading = false
          if (res.data.success === true) {
            var data = res.data.data
            this.projectData = data.content
            this.projectData.forEach((item) => {
              item.business.amount = outputmoney('' + item.business.amount)
            })
            this.total = data.totalElements
            this.currentPage = data.number + 1
            this.pageSize = data.size
            this.$emit('exportData', this.projectData)
          }
        })
        .catch(() => {
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
  computed: {
    ...mapGetters([
      'roleCode'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
