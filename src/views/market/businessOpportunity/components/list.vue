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
   <el-table-column prop="city.name" label="城市"></el-table-column>
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
  name: 'businessList',
  props: ['searchData'],
  data() {
    return {
      total: 5,
      currentPage: 2,
      pageSizes: [12, 15, 16],
      pageSize: 12,
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
              category: '科技-智慧社区工程全委'
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
      console.log('selArr', selArr)
      this.$emit('selData', selArr)
    },
    seeRow(row) {
      console.log('row', row)
    },
    deleteRow(id) {
      var projectID = { id: [id] }
      this.$post('/bussiness/delete', projectID).then((res) => {
        console.log('success', res)
        if (res.status === 200) {
          this.getProjectData()
        }
      })
    },
    editRow(id) {
      this.$get('/bussiness/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        console.log('data', data)
        this.$emit('editRow', data)
      })
    },
    getProjectData() {
      this.$get('/bussiness').then((res) => {
        var data = res.data.data
        // console.log('res', res.data.data)
        this.bussinessData = data.content
        this.total = data.totalElements
        this.currentPage = data.number + 1
        this.pageSize = data.size
      })
    },
    //  页码处理
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
      var page = val - 1
      var url = '/bussiness?size=' + this.pageSize + '&page=' + page
      this.$get(url).then((res) => {
        console.log('res', res.data.data)
        var data = res.data.data
        this.bussinessData = data.content
        this.total = data.totalElements
        this.currentPage = data.number + 1
        this.pageSize = data.size
      })
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
