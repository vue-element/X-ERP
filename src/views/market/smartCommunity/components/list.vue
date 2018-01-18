<template>
<div class="smartCommunity-list">
  <!-- <el-table class="basic-form" style="width: 100%"  :data="projectData" :height="height" @selection-change="handleSelectionChange" ref="multipleTable"> -->
  <el-table class="basic-form" style="width: 100%"  :data="projectData" :height="height" @selection-change="handleSelectionChange">
    <el-table-column type="selection"></el-table-column>
    <el-table-column align="center" prop="0" fixed label="序号">
      <template slot-scope="scope">
       {{scope.$index  + 1}}
     </template>
   </el-table-column>
   <el-table-column prop="client.name" fixed label="公司名称"></el-table-column>
   <el-table-column prop="city.name" fixed label="城市"></el-table-column>
   <el-table-column prop="region.name" fixed label="地区"></el-table-column>
   <el-table-column prop="name" fixed label="项目名称"></el-table-column>
   <el-table-column prop="archFormat" label="建筑业态" sortable></el-table-column>
   <el-table-column prop="builtArea" label="总建筑面积" sortable></el-table-column>
   <el-table-column prop="chargeArea" label="总收费面积"></el-table-column>
   <el-table-column prop="roomNum" label="总户数"></el-table-column>
   <el-table-column prop="parkingNum" label="车位总数"></el-table-column>
   <el-table-column prop="contractMode" label="合约模式"></el-table-column>
   <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click="seeRow(scope.row)" type="text" size="small">查看</el-button>
        <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">移除</el-button>
        <el-button type="text" size="small" @click.native.prevent="editRow(scope.row.id)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
   @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
</div>
</template>

<script>
import { winHeight } from '@/utils'
// import { fetchList } from '@/api/article'
export default {
  name: 'smartCommunityList',
  props: ['searchData'],
  data() {
    return {
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      projectData: [],
      height: 100
    }
  },
  created() {
    console.log('searchData', this.searchData)
    if (this.searchData.name) {
      this.getSearchData()
    } else {
      this.getProjectData()
    }
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  watch: {
    searchData(val, oldVal) {
      this.search()
    }
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
      console.log('selArr', selArr)
      this.$emit('selData', selArr)
    },
    seeRow(row) {
      console.log('row', row)
    },
    deleteRow(id) {
      var projectID = { id: [id] }
      this.$post('/project/delete', projectID).then((res) => {
        console.log('success', res)
        if (res.status === 200) {
          this.getProjectData()
        }
      })
    },
    editRow(id) {
      this.$get('/project/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        this.$emit('editRow', data)
      })
    },
    getProjectData() {
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/project?size=' + pageSize + '&page=' + page
      this.$get(url).then((res) => {
        console.log('res', res.data.data)
        var data = res.data.data
        this.projectData = data.content
        this.total = data.totalElements
        this.currentPage = data.number + 1
        this.pageSize = data.size
      })
    },
    getSearchData() {
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      this.$post('/project/search?size=' + pageSize + '&page=' + page, this.searchData, false).then((res) => {
        var data = res.data.data
        this.projectData = data.content
        this.total = data.totalElements
        this.currentPage = data.number + 1
        this.pageSize = data.size
      })
    },
    //  页码处理
    handleSizeChange(val) {
      this.pageSize = val
      if (this.searchData.name) {
        this.getSearchData()
      } else {
        this.getProjectData()
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.searchData.name) {
        this.getSearchData()
      } else {
        this.getProjectData()
      }
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
