<template>
  <div class="analysis-list">
    <div class="table">
      <el-table class="basic-form" id="out-table" style="width: 100%" :data="scheduleAnalysisData" :height="height" v-loading.body="listLoading" border :row-style="rowStyle">
        <el-table-column fixed="left" label="序号" width="60">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="合同信息">
          <el-table-column prop="code" label="合同编码" width="140"></el-table-column>
          <el-table-column prop="name" label="合同名称" width="200"></el-table-column>
        </el-table-column>
        <el-table-column label="进度分析">
          <el-table-column prop="stage" label="项目所属阶段" width="160"></el-table-column>
          <el-table-column prop="finishPercentage" label="完工百分比(%)" width="120"></el-table-column>
          <el-table-column prop="projectStatus" label="项目状态" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="回款分析">
          <el-table-column prop="receivedPercentage" label="回款比例(%)" width="120"></el-table-column>
          <el-table-column prop="receivedStatus" label="回款状态" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="支出分析">
          <el-table-column label="材料">
            <el-table-column prop="materialPercentage" label="采购比例(%)" width="120"></el-table-column>
            <el-table-column prop="materialStatus" label="进度匹配度" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="人工">
            <el-table-column prop="artificialPercentage" label="支出比例(%)" width="120"></el-table-column>
            <el-table-column prop="artificialStatus" label="进度匹配度" width="120"></el-table-column>
          </el-table-column>
          <el-table-column label="综合">
            <el-table-column prop="comprehensivePercentage" label="支出比例(%)" width="120"></el-table-column>
            <el-table-column prop="comprehensiveStatus" label="进度匹配度" width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="收支差异分析">
          <el-table-column label="收入成本差异">
            <el-table-column prop="paymentBalance" label="收支差额(元)" width="120"></el-table-column>
            <el-table-column prop="paymentBalanceStatus" label="状态"></el-table-column>
          </el-table-column>
          <el-table-column label="付现差异">
            <el-table-column prop="cashBalance" label="付现差额(元)" width="120"></el-table-column>
            <el-table-column prop="cashBalanceStatus" label="状态" width="120"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="editRow(scope.row.id)" type="text" size="small">查看</el-button>
            <!-- <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
       @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import { winHeight, getPercentage } from '@/utils'
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
      scheduleAnalysisData: []
    }
  },
  created() {
    this.getScheduleData()
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
    },
    getScheduleData() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/contractSchedule/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then(res => {
        if (res.data.success === true) {
          var data = res.data.data
          for (var i = 0; i < data.content.length; i++) {
            var finishPercentage = getPercentage(data.content[i].finishPercentage)
            var receivedPercentage = getPercentage(data.content[i].receivedPercentage)
            var materialPercentage = getPercentage(data.content[i].materialPercentage)
            var artificialPercentage = getPercentage(data.content[i].artificialPercentage)
            var comprehensivePercentage = getPercentage(data.content[i].comprehensivePercentage)
            data.content[i].finishPercentage = finishPercentage
            data.content[i].receivedPercentage = receivedPercentage
            data.content[i].materialPercentage = materialPercentage
            data.content[i].artificialPercentage = artificialPercentage
            data.content[i].comprehensivePercentage = comprehensivePercentage
            var index = i + 1
            var ciCode = data.content[i].contractInfo.code
            var ciName = data.content[i].contractInfo.name
            data.content[i].index = index
            data.content[i].code = ciCode
            data.content[i].name = ciName
          }
          this.scheduleAnalysisData = data.content
          this.$emit('exportData', data.content)
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.listLoading = false
        }
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
      this.$get('/contractSchedule/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        this.$emit('editRow', data)
      })
    },
    rowStyle(row) {
      var data = row.row
      for (var key in data) {
        if (data[key] === '严重滞后' || data[key] === '超支') {
          return { 'background-color': '#F96161' }
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
