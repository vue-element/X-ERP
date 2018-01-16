<template>
  <div class="contract-list">
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" ref="multipleTable">
      <el-table-column type="selection"></el-table-column>
        <el-table-column align="center" prop="0" label="序号">
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="1" label="合同编码"></el-table-column>
        <el-table-column align="center" prop="2" label="合同名称"></el-table-column>
        <el-table-column align="center" prop="3" label="所属办事处"></el-table-column>
        <el-table-column align="center" prop="4" label="合同所属年月"></el-table-column>
        <el-table-column align="center" prop="5" label="变更后合同金额"></el-table-column>
        <el-table-column align="center" prop="5" label="已开票金额"></el-table-column>
        <el-table-column align="center" prop="5" label="已回款金额"></el-table-column>
        <el-table-column align="center" prop="5" label="已开票未回款金额"></el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPage" :page-sizes="[1, 2, 3]"
:page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="10"></el-pagination>
    </div>
  </div>
</template>

<script>
import { winHeight } from '@/utils'

export default {
  data() {
    return {
      height: 100,
      currentPage: 1,
      tableData: [{
        1: '2018001176',
        2: '深圳市中海华庭电梯监管服务合同',
        3: '深圳办事处',
        4: '2018-01',
        5: '1,000,000',
        6: '1,100,000',
        7: '500,000',
        8: '300,000',
        9: '200,000'
      }, {
        1: '2018001177',
        2: '深圳市中海华庭电梯监管服务合同',
        3: '深圳办事处',
        4: '2018-01',
        5: '1,000,000',
        6: '1,100,000',
        7: '500,000',
        8: '300,000',
        9: '200,000'
      }]
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
    }
  }
}
</script>
