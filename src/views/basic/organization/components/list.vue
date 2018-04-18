<template>
  <div class="organization-list">
    <el-col :span="4">
      <el-tree class="org-tree" :data="orgtree" :props="defaultProps" @node-click="handleNodeClick" :style="{height: height + 'px'}" default-expand-all></el-tree>
    </el-col>
    <el-col :span="20" :offset="0">
      <transition name="el-zoom-in-top" mode="out-in">
        <el-table class="basic-form" style="width: 100%"  :data="userData" :height="height" @selection-change="handleSelectionChange"
        v-loading.body="listLoading" element-loading-text="拼命加载中" border>
          <el-table-column align="center" prop="0" fixed label="序号" width="60" fixed>
            <template slot-scope="scope">{{scope.$index  + 1}}</template>
         </el-table-column>
         <el-table-column prop="organization.name" label="组织名称" min-width="200"></el-table-column>
         <el-table-column prop="organization.code" label="组织编号" min-width="180"></el-table-column>
         <el-table-column prop="organization.organization.name" label="上级组织名称" min-width="200"></el-table-column>
         <el-table-column prop="organization.organization.code" label="上级组织编号" min-width="180"></el-table-column>
         <!-- <el-table-column prop="name" label="责任人" width="100"></el-table-column>
         <el-table-column prop="phone" label="责任人联系方式" min-width="180"></el-table-column>
         <el-table-column prop="name" label="组织类型" width="100"></el-table-column> -->
         <!-- <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click.native.prevent="seeRow(scope.row)" type="text" size="small">查看</el-button>
              <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </transition>
      <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
       @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </el-col>
  </div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  name: 'OrgTree',
  props: ['searchData'],
  data() {
    return {
      isCollapse: false,
      listLoading: false,
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      userData: [],
      height: 100,
      orgtree: [],
      orgId: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created() {
    this.getOrgTree()
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  watch: {
  },
  methods: {
    getOrgTree() {
      this.listLoading = true
      this.$get('org/tree').then((res) => {
        this.listLoading = false
        this.orgtree = res.data
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleNodeClick(data) {
      console.log('data', data)
      if (data.children === null || data.children.length === 0) {
        console.log('this.last', data.value)
        this.orgId = data.value
        this.getUserList()
      }
    },
    getUserList() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      this.$get('/user/findByOrganization/' + this.orgId + '?size=' + pageSize + '&page=' + page).then((res) => {
        this.listLoading = false
        var data = res.data.data
        this.userData = data.content
        this.total = data.totalElements
        this.currentPage = data.number + 1
        this.pageSize = data.size
      })
    },
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
      this.$emit('seeRow', row)
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
    //  页码处理
    handleSizeChange(val) {
      this.pageSize = val
      this.getUserList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getUserList()
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.organization-list {
  height: 100%;
  .org-tree {
    overflow-y: auto;
    position: relative;
  }
}
</style>
