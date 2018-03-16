<template>
<div class="smartCommunity-list">
  <el-table style="width: 100%"  :data="clientList" :height="height" v-loading.body="listLoading" element-loading-text="拼命加载中" border>
    <el-table-column  fixed="left" align="center" prop="0" label="序号" width="60">
      <template slot-scope="scope">{{scope.$index  + 1}}</template>
   </el-table-column>
   <el-table-column prop="name" label="客户名称"></el-table-column>
   <el-table-column prop="category" label="客户类型" width="100"></el-table-column>
   <el-table-column prop="type" label="业态" width="180"></el-table-column>
   <el-table-column prop="nature" label="企业性质" width="100"></el-table-column>
   <el-table-column prop="person" label="联系人" width="100"></el-table-column>
   <el-table-column prop="phone" label="联系人电话" width="140"></el-table-column>
   <el-table-column prop="position" label="职位" width="140"></el-table-column>
   <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click.native.prevent="seeRow(scope.row.id)" type="text" size="small">查看</el-button>
        <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
   @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
</div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  name: 'customerInput',
  props: ['searchData'],
  data() {
    return {
      listLoading: false,
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      clientList: [],
      height: 100
    }
  },
  created() {
    this.clientData()
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
    seeRow(id) {
      this.$get('/client/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        this.$emit('seeRow', data)
      })
    },
    deleteRow(id) {
      var projectID = { id: [id] }
      this.$post('/client/delete', projectID).then((res) => {
        if (res.data.success === true) {
          this.clientData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    clientData() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/client?size=' + pageSize + '&page=' + page
      this.$get(url, this.searchData).then((res) => {
        this.listLoading = false
        if (res.data.success === true) {
          var data = res.data.data
          this.clientList = data.content
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.$emit('exportData', this.clientList)
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    //  页码处理
    handleSizeChange(val) {
      this.pageSize = val
      this.clientData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.clientData()
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
