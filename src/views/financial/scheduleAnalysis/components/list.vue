 <template>
  <div class="contract-list">
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" v-loading.body="listLoading" border>
        <el-table-column fixed="left" label="序号" width="60">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column prop="contractInfo" label="合同信息">
          <el-table-column prop="contractInfo.code" label="合同编码"></el-table-column>
          <el-table-column prop="contractInfo.name" label="合同名称"></el-table-column>
        </el-table-column>
        <el-table-column prop="contractInfo" label="进度分析">
          <el-table-column prop="contractInfo.region.name" label="项目所属阶段"></el-table-column>
          <el-table-column prop="name" label="完工百分比"></el-table-column>
          <el-table-column prop="date" label="项目状态"></el-table-column>
        </el-table-column>
        <el-table-column prop="contractInfo" label="回款分析">
          <el-table-column prop="name" label="回款比例"></el-table-column>
          <el-table-column prop="date" label="回款状态"></el-table-column>
        </el-table-column>
        <el-table-column prop="contractInfo" label="支出分析">
          <el-table-column prop="" label="材料">
            <el-table-column prop="name" label="采购比例"></el-table-column>
            <el-table-column prop="date" label="进度匹配度"></el-table-column>
          </el-table-column>
          <el-table-column prop="" label="人工">
            <el-table-column prop="" label="支出比例"></el-table-column>
            <el-table-column prop="" label="进度匹配度"></el-table-column>
          </el-table-column>
          <el-table-column prop="" label="综合">
            <el-table-column prop="" label="支出比例"></el-table-column>
            <el-table-column prop="" label="进度匹配度"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="contractInfo" label="收支差异分析">
          <el-table-column prop="" label="收入成本差异">
            <el-table-column prop="name" label="收支差额"></el-table-column>
            <el-table-column prop="date" label="状态"></el-table-column>
          </el-table-column>
          <el-table-column prop="" label="付现差异">
            <el-table-column prop="name" label="付现差额"></el-table-column>
            <el-table-column prop="date" label="状态"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="editRow(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
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
  name: 'scheduleAnalysisList',
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
    this.getScheduleData()
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
    },
    getScheduleData() {
      this.$get('/contractSchedule').then((res) => {
        console.log(res)
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getScheduleData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getScheduleData()
    },
    deleteRow(id) {
    },
    editRow(id) {
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
