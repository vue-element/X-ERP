<template>
<div class="bussiness-list">
  <el-table class="basic-form" style="width: 100%" :data="bussinessData" :height="height" @selection-change="handleSelectionChange" v-loading.body="listLoading" element-loading-text="拼命加载中" border>
   <el-table-column type="selection" fixed width="40"></el-table-column>
   <el-table-column align="center" label="序号" fixed width="60">
     <template slot-scope="scope">{{scope.$index  + 1}}</template>
   </el-table-column>
   <el-table-column prop="name" fixed label="商机名称" min-width="240"></el-table-column>
   <el-table-column prop="code" label="商机编号" min-width="160"></el-table-column>
   <el-table-column prop="client.name" label="客户名称" min-width="240"></el-table-column>
   <el-table-column prop="client.category" label="客户类别" width="160"></el-table-column>
   <el-table-column prop="region.name" label="区域" width="100"></el-table-column>
   <el-table-column prop="businessCategory.name" label="业务分类" width="160"></el-table-column>
   <el-table-column prop="startDate" label="预计启动时间" width="140"></el-table-column>
   <el-table-column prop="amount" label="预计成交金额" width="140"></el-table-column>
   <el-table-column prop="businessPerson.name" label="业务负责人" width="120"></el-table-column>
   <el-table-column prop="executeState" label="商机执行状态" width="120"></el-table-column>
   <el-table-column fixed="right" prop="examineState" label="商机审批状态" width="120"></el-table-column>
   <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click.native.prevent="seeRow(scope.row.id)" type="text" size="small" v-if="hasPerm('bussiness:findAllByPage')">查看</el-button>
        <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small" v-if="hasPerm('bussiness:delete')">删除</el-button>
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
  name: 'businessList',
  props: ['searchData', 'pageObj'],
  data() {
    return {
      listLoading: false,
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      bussinessData: [],
      height: 100
    }
  },
  created() {
    // console.log('this.currentPage', this.pageObj)
    if (this.pageObj.currentPage) {
      console.log('this.currentPage', this.pageObj.currentPage)
      this.currentPage = this.pageObj.currentPage
      this.pageSize = this.pageObj.pageSize
    }
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
    seeRow(id) {
      this.$get('/bussiness/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        console.log('this.currentPage', res.data)
        console.log('this.currentPage', this.currentPage)
        data.currentPage = this.currentPage
        data.pageSize = this.pageSize
        console.log('this.currentPage', data)
        this.$emit('editRow', data)
      })
    },
    confirmDel(id) {
      var projectID = { id: [id] }
      this.$post('/bussiness/delete', projectID).then((res) => {
        if (res.data.success === true) {
          this.getProjectData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    deleteRow(id) {
      this.$confirm('确认删除此信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.confirmDel(id)
      }).catch(() => {
        return false
      })
    },
    getProjectData() {
      this.listLoading = true
      this.searchData.role_code = this.roleCode
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/bussiness/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then((res) => {
        this.listLoading = false
        if (res.data.success === true) {
          var data = res.data.data
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.bussinessData = data.content
          this.bussinessData.forEach((item) => {
            item.amount = outputmoney('' + item.amount)
          })
          this.$emit('exportData', this.bussinessData)
        } else {
          this.$message({
            message: '数据获取失败',
            type: 'error'
          })
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
