<template>
<div class="smartCommunity-list">
  <div></div>
  <el-table class="basic-form" style="width: 100%"  :data="userData" :height="height" @selection-change="handleSelectionChange"
  v-loading.body="listLoading" element-loading-text="拼命加载中" border>
    <el-table-column align="center" prop="0" fixed label="序号" width="60" fixed>
      <template slot-scope="scope">{{scope.$index  + 1}}</template>
   </el-table-column>
   <el-table-column prop="name" label="名称" width="200"></el-table-column>
   <!-- <el-table-column prop="city.name" label="工号" width="100"></el-table-column> -->
   <el-table-column prop="role.name" label="所属组织名称" width="120"></el-table-column>
   <el-table-column prop="role.code" label="所属组织编号" width="120"></el-table-column>
    <el-table-column prop="role.name" label="角色"></el-table-column>
   <el-table-column prop="name" label="账户名" width="100"></el-table-column>
   <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click.native.prevent="seeRow(scope.row)" type="text" size="small">查看</el-button>
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
  name: 'userList',
  props: ['searchData'],
  data() {
    return {
      listLoading: false,
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      userData: [],
      height: 100
    }
  },
  created() {
    this.getUserData()
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
    seeRow(row) {
      // console.log('row', row)
      this.$emit('seeRow', row)
      // this.$get('/project/findUpdateData/' + id).then((res) => {
      //   var data = res.data.data
      //   this.$emit('seeRow', data)
      // })
    },
    deleteRow(id) {
      this.$confirm('确认删除此信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // this.confirmDel(id)
      }).catch(() => {
        return false
      })
    },
    confirmDel(id) {
      var projectID = { id: [id] }
      this.$post('/account/delete', projectID).then((res) => {
        if (res.data.success === true) {
          this.getUserData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    editRow(id) {
      // this.$get('/project/findUpdateData/' + id).then((res) => {
      //   var data = res.data.data
      //   // console.log('data', data)
      //   // this.$emit('editRow', data)
      // })
    },
    getUserData() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = 'account?size=' + pageSize + '&page=' + page
      // var url = '/project/search?size=' + pageSize + '&page=' + page
      this.$get(url, this.searchData, false).then((res) => {
        this.listLoading = false
        if (res.data.success === true) {
          var data = res.data.data
          this.userData = data.content
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.$emit('exportData', this.userData)
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    //  页码处理
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserData()
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
