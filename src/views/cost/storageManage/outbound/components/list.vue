 <template>
  <div class="contract-list">
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" v-loading.body="listLoading">
        <el-table-column prop="0" label="序号"><template slot-scope="scope">{{scope.$index + 1}}</template></el-table-column>
        <el-table-column prop="contractInfo.name" label="合同编号"></el-table-column>
        <el-table-column prop="code" label="采购清单编号"></el-table-column>
        <el-table-column prop="code" label="出库单编号"></el-table-column>
        <el-table-column prop="contractInfo.name" label="项目"></el-table-column>
        <el-table-column prop="region.name" label="办事处"></el-table-column>
        <el-table-column prop="category" label="状态"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button @click.native.prevent="seeRow(scope.row.id)" type="text">查看</el-button> -->
            <el-button @click.native.prevent="seeRow(scope.row.id)" type="text">查看</el-button>
            <el-dropdown>
              <el-button class="el-dropdown-link" type="text">更多</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a" @click.native.prevent="" type="text">审核</el-dropdown-item>
                <el-dropdown-item command="b" @click.native.prevent="" type="text">导出</el-dropdown-item>
                <el-dropdown-item command="c" @click.native.prevent="deleteRow(scope.row.id)" type="text">删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
       @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  name: 'paymentContractList',
  props: ['searchData'],
  data() {
    return {
      listLoading: false,
      height: 100,
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      tableData: []
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    this.getSupplierData()
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
    },
    getSupplierData() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/outboundList/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then(res => {
        this.listLoading = false
        if (res.data.success === true) {
          var data = res.data.data
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.tableData = data.content
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSupplierData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getSupplierData()
    },
    deleteRow(id) {
      var projectID = { id: [id] }
      this.$post('/outboundList/delete', projectID).then(res => {
        if (res.data.success === true) {
          this.getSupplierData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    seeRow(id) {
      this.$get('/outboundList/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        this.$emit('editRow', data)
      })
    }
  },
  // handleCommand(command) {
  //   console.log('command', command)
  // },
  watch: {
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>
