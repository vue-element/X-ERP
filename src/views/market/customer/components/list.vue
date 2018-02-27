<template>
<div class="smartCommunity-list">
  <el-table class="basic-form" style="width: 100%"  :data="clientList" :height="height" v-loading.body="listLoading" element-loading-text="拼命加载中">
    <!-- <el-table-column type="selection"></el-table-column> -->
    <el-table-column align="center" prop="0" fixed label="序号">
      <template slot-scope="scope">{{scope.$index  + 1}}</template>
   </el-table-column>
   <el-table-column prop="name" fixed label="客户名称"></el-table-column>
   <el-table-column prop="category" fixed label="客户类型"></el-table-column>
   <el-table-column prop="type" fixed label="业态"></el-table-column>
   <el-table-column prop="nature" label="企业性质" sortable></el-table-column>
   <el-table-column prop="person" label="联系人" sortable></el-table-column>
   <el-table-column prop="position" label="职位"></el-table-column>
   <el-table-column prop="phone" label="联系人电话"></el-table-column>
   <el-table-column prop="qq" label="QQ"></el-table-column>
   <el-table-column prop="email" label="E-mail"></el-table-column>
   <el-table-column prop="address" label="客户地址"></el-table-column>
   <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click.native.prevent="seeRow(scope.row.id)" type="text" size="small">查看</el-button>
        <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
        <!-- <el-button type="text" size="small" @click.native.prevent="editRow(scope.row.id)">编辑</el-button> -->
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
    // handleSelectionChange(arr) {
    //   var selArr = []
    //   arr.forEach((item) => {
    //     selArr.push(item.id)
    //   })
    //   this.$emit('selData', selArr)
    // },
    seeRow(id) {
      this.$get('/client/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        this.$emit('seeRow', data)
      })
    },
    deleteRow(id) {
      var projectID = { id: [id] }
      this.$post('/client/delete', projectID).then((res) => {
        if (res.status === 200) {
          this.clientData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    editRow(id) {
      this.$get('/client/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        console.log('data', data)
        // this.$emit('editRow', data)
      })
    },
    clientData() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/client?size=' + pageSize + '&page=' + page
      console.log(this.searchData)
      this.$get(url, this.searchData).then((res) => {
        if (res.data.success === true) {
          var data = res.data.data
          this.clientList = data.content
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.listLoading = false
          this.$emit('exportData', this.clientList)
        } else {
          this.listLoading = false
        }
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
