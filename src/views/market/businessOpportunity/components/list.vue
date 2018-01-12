<template>
<div class="smartCommunity-list">
  <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" @selection-change="handleSelectionChange" ref="multipleTable">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column align="center" prop="0" fixed label="序号">
      <template slot-scope="scope">
       {{scope.$index}}
     </template>
   </el-table-column>
   <el-table-column align="center" prop="1" fixed label="公司名称"></el-table-column>
   <el-table-column align="center" prop="2" fixed label="办事处"></el-table-column>
   <el-table-column align="center" prop="3" fixed label="地区"></el-table-column>
   <el-table-column align="center" prop="4" fixed label="项目名称"></el-table-column>
   <el-table-column align="center" prop="5" label="建筑业态" sortable></el-table-column>
   <el-table-column align="center" prop="6" label="总建筑面积" sortable></el-table-column>
   <el-table-column align="center" prop="7" label="总收藏面积"></el-table-column>
   <el-table-column align="center" prop="8" label="总户数"></el-table-column>
   <el-table-column align="center" prop="9" label="车位总数"></el-table-column>
   <el-table-column align="center" prop="10" label="合约模式"></el-table-column>
  </el-table>
  <el-pagination class="page" background :current-page="currentPage" :page-sizes="[1, 2, 3, 4]"
  :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="50"></el-pagination>
</div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  name: 'smartCommunityList',
  props: ['searchData'],
  data() {
    return {
      tableData: [{
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
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
      }, {
        1: '2017000000'
        // }, {
        //   1: '2017000000'
        // }, {
        //   1: '2017000000'
      }],
      currentPage: 2,
      height: 100
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  watch: {
    searchData(val, oldVal) {
      this.search()
    }
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
      // this.height = 0
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    search() {
      console.log('list search')
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
