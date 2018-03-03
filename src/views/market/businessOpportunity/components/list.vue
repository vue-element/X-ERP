<template>
<div class="bussiness-list">
  <el-table class="basic-form" style="width: 100%" :data="bussinessData" :height="height" @selection-change="handleSelectionChange" v-loading.body="listLoading" element-loading-text="拼命加载中" border>
   <el-table-column type="selection" fixed width="40"></el-table-column>
   <el-table-column align="center" prop="0" fixed="left" label="序号" width="60">
     <template slot-scope="scope">{{scope.$index  + 1}}</template>
   </el-table-column>
   <el-table-column prop="name" fixed label="商机名称" width="100"></el-table-column>
   <el-table-column prop="client.name" fixed label="客户名称" width="200"></el-table-column>
   <el-table-column prop="region.name" fixed label="区域" width="100"></el-table-column>
   <el-table-column prop="projectImpls[0].category" label="业务分类"></el-table-column>
   <el-table-column prop="date" label="所属日期" width="120"></el-table-column>
   <el-table-column prop="projectImpls[0].amount" label="预计成交金额" width="140"></el-table-column>
   <el-table-column prop="chargePerson" label="业务线负责人" width="120"></el-table-column>
   <el-table-column prop="followPerson" label="项目跟进人" width="120"></el-table-column>
   <el-table-column prop="followState" label="商机跟进状态" width="120"></el-table-column>
   <el-table-column prop="executState" label="商机执行状态" width="120"></el-table-column>
   <el-table-column prop="examineState" label="商机审批状态" width="120"></el-table-column>
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
  name: 'businessList',
  props: ['searchData'],
  data() {
    return {
      listLoading: false,
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15,
      bussinessData: [
        {
          id: 14,
          code: '编码',
          name: '商机名称',
          date: '单据日期',
          type: '商机类型',
          source: '商机来源',
          chargePerson: '业务线负责人',
          chargePersonPhone: '业务线负责人 - 联系电话',
          followPerson: '项目跟进人',
          followPersonPhone: '项目跟进人 - 联系电话',
          followState: '已定未签',
          executState: '合同会签',
          region: {},
          city: {},
          client: {},
          oldCity: '0-1-3',
          projectImpls: [
            {
              id: 14,
              keyword: '项目关键信息',
              bidDate: '投标日期',
              bidDate2: '方案投标日期',
              startDate: '总体项目开工时间',
              developDate: '预计开发或发货时间',
              signDate: '预计合同签订时间',
              amount: '预计成交金额',
              category: 2
            }
          ]
        }
      ],
      height: 100
    }
  },
  created() {
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
        this.$emit('editRow', data)
      })
    },
    deleteRow(id) {
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
    getProjectData() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/bussiness/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then((res) => {
        if (res.data.success === true) {
          this.listLoading = false
          var data = res.data.data
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.bussinessData = data.content
          this.$emit('exportData', data.content)
        } else {
          this.$message({
            message: '数据获取失败',
            type: 'success'
          })
        }
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
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
