 <template>
  <div class="contract-list">
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" v-loading.body="listLoading" border>
        <el-table-column prop="0" label="序号" width="60" fixed>
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="code" label="产品编号" width="100" fixed></el-table-column>
        <el-table-column prop="name" label="产品名称" width="200" fixed></el-table-column>
        <el-table-column prop="type" label="产品类型" width="120"></el-table-column>
        <el-table-column prop="system" label="系统" width="160"></el-table-column>
        <el-table-column prop="specModel" label="规格型号" width="140"></el-table-column>
        <el-table-column prop="brand" label="品牌" width="120"></el-table-column>
        <el-table-column prop="supply.name" label="供应商" width="160"></el-table-column>
        <el-table-column prop="supply.category" label="供应商类型" width="100"></el-table-column>
        <el-table-column prop="supply.supplyCycle" label="供货周期" width="100"></el-table-column>
        <el-table-column prop="productQuotation" label="最新报价(元)" width="140"></el-table-column>
        <el-table-column prop="unit" label="单位" width="100"></el-table-column>
        <el-table-column label="操作" fixed="right" width="100">
          <template slot-scope="scope">
            <el-button @click.native.prevent="seeRow(scope.row.id)" type="text" v-if="hasPerm('price:findAllByPage')">查看</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" v-if="hasPerm('price:delete')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
       @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import { outputmoney, winHeight } from '@/utils'
export default {
  name: 'supplierList',
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
    this.getPriceData()
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
    },
    getPriceData() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/price/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then(res => {
        this.listLoading = false
        if (res.data.success === true) {
          var data = res.data.data
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.tableData = data.content
          this.tableData.forEach((item) => {
            item.productQuotation = outputmoney('' + item.productQuotation)
          })
          this.$emit('exportData', this.tableData)
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPriceData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getPriceData()
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
    confirmDel(id) {
      var projectID = { id: [id] }
      this.$post('/price/delete', projectID).then(res => {
        if (res.data.success === true) {
          this.getPriceData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    seeRow(id) {
      this.$get('/price/findUpdateData/' + id).then((res) => {
        if (res.data.success === true) {
          var data = res.data.data
          this.$emit('editRow', data)
        }
      })
    }
  },
  watch: {
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>
