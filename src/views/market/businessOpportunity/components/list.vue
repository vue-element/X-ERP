<template>
<div class="bussiness-list">
  <el-table class="basic-form" style="width: 100%"  :data="bussinessData" :height="height" @selection-change="handleSelectionChange" ref="multipleTable">
    <el-table-column type="selection"></el-table-column>
    <el-table-column align="center" prop="0" fixed label="序号">
      <template slot-scope="scope">
       {{scope.$index  + 1}}
     </template>
   </el-table-column>
   <el-table-column prop="code" fixed label="编码"></el-table-column>
   <el-table-column prop="name" fixed label="商机名称"></el-table-column>
   <el-table-column prop="type" fixed label="商机类型"></el-table-column>
   <el-table-column prop="source" fixed label="商机来源"></el-table-column>
   <el-table-column prop="date" label="单据日期" sortable></el-table-column>
   <el-table-column prop="chargePerson" label="业务线负责人" sortable></el-table-column>
   <el-table-column prop="followPerson" label="项目跟进人"></el-table-column>
   <el-table-column prop="followState" label="商机跟进状态"></el-table-column>
   <el-table-column prop="executState" label="商机执行状态"></el-table-column>
   <el-table-column prop="projectImpls[0].category" label="业务分类"></el-table-column>
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
export default {
  name: 'businessList',
  props: ['searchData'],
  data() {
    return {
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
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    this.getProjectData()
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
      // console.log('selArr', selArr)
      this.$emit('selData', selArr)
    },
    seeRow(row) {
      console.log('row', row)
    },
    deleteRow(id) {
      var projectID = { id: [id] }
      this.$post('/bussiness/delete', projectID).then((res) => {
        if (res.status === 200) {
          this.getProjectData()
        }
      })
    },
    editRow(id) {
      this.$get('/bussiness/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        this.$emit('editRow', data)
      })
    },
    getProjectData() {
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      var url = '/bussiness?size=' + pageSize + '&page=' + page
      this.$get(url).then((res) => {
        // console.log('res', res.data.data)
        var data = res.data.data
        this.total = data.totalElements
        this.currentPage = data.number + 1
        this.pageSize = data.size
        this.bussinessData = data.content
        this.bussinessData.forEach((item) => {
          // 商机执行状态
          switch (item.executState) {
            case 0:
              item.executState = '前期接洽'
              break
            case 1:
              item.executState = '方案编制'
              break
            case 2:
              item.executState = '投标'
              break
            case 3:
              item.executState = '中标'
              break
            case 4:
              item.executState = '合同会签'
              break
            default:
              item.executState = '纸质版合同签订'
          }
          // 商机跟进状态
          switch (item.followState) {
            case 0:
              item.followState = '浅度跟进'
              break
            case 1:
              item.followState = '深度跟进'
              break
            case 2:
              item.followState = '已定未签'
              break
            case 3:
              item.followState = '已签订'
              break
            default:
              item.followState = '放弃'
          }
          // 商机业务分类
          switch (item.projectImpls[0].category) {
            case 0:
              item.projectImpls[0].category = '科技-智慧社区工程全委'
              break
            case 1:
              item.projectImpls[0].category = '科技-智慧社区改造'
              break
            case 2:
              item.projectImpls[0].category = '科技-物联网大平台'
              break
            case 3:
              item.projectImpls[0].category = '科技-设计服务'
              break
            default:
              item.projectImpls[0].category = '科技-技术服务'
          }
        })
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
