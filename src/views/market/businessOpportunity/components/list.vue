<template>
<div class="bussiness-list">
  <el-table class="basic-form" style="width: 100%"  :data="projectData" :height="height" @selection-change="handleSelectionChange" ref="multipleTable">
    <el-table-column type="selection"></el-table-column>
    <el-table-column align="center" prop="0" fixed label="序号">
      <template slot-scope="scope">
       {{scope.$index  + 1}}
     </template>
   </el-table-column>
   <el-table-column prop="1" fixed label="公司名称"></el-table-column>
   <el-table-column prop="2" fixed label="办事处"></el-table-column>
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
  name: 'businessList',
  props: ['searchData'],
  data() {
    return {
      total: 5,
      currentPage: 2,
      pageSizes: [12, 15, 16],
      pageSize: 12,
      projectData: [{
        1: '2017001176',
        2: '弱电维保-中海华庭',
        3: '中海房地产',
        4: '2017-12',
        5: '1000000',
        6: '深度跟进',
        7: '项目侦测',
        8: '东莞',
        9: '深圳办事处',
        10: '机电-设备运维',
        11: '高级分类',
        12: '1000000',
        13: '20000',
        14: '30000',
        15: '40000',
        16: '50000',
        17: '10000',
        18: '王晓',
        19: '20170110',
        20: '已审批'
      }, {
        1: '2017000000',
        2: '弱电维保-中海华庭',
        3: '中海房地产',
        4: '2017-12',
        5: '1000000',
        6: '深度跟进',
        7: '项目侦测',
        8: '东莞',
        9: '深圳办事处',
        10: '机电-设备运维',
        11: '高级分类',
        12: '1000000',
        13: '20000',
        14: '30000',
        15: '40000',
        16: '50000',
        17: '10000',
        18: '王晓',
        19: '20170110',
        20: '已审批'
      }, {
        1: '2017000000',
        2: '弱电维保-中海华庭',
        3: '中海房地产',
        4: '2017-12',
        5: '1000000',
        6: '深度跟进',
        7: '项目侦测',
        8: '东莞',
        9: '深圳办事处',
        10: '机电-设备运维',
        11: '高级分类',
        12: '1000000',
        13: '20000',
        14: '30000',
        15: '40000',
        16: '50000',
        17: '10000',
        18: '王晓',
        19: '20170110',
        20: '已审批'
      }, {
        1: '2017000000'
      }],
      height: 100,
      oldCity: ''
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    // this.$get('/project').then((res) => {
    //   console.log('res', res.data)
    // })
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
        console.log('success', res)
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
      this.$get('/bussiness').then((res) => {
        console.log('res', res.data.data)
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
    },
    handleCurrentChange(val) {
      this.currentPage = val
      var page = val - 1
      var url = '/project?size=' + this.pageSize + '&page=' + page
      this.$get(url).then((res) => {
        // console.log('res', res.data.data)
        var data = res.data.data
        this.projectData = data.content
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
