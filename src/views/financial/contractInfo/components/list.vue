<template>
    <div class="table">
      <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" ref="multipleTable">
        <el-table-column align="center" prop="0" label="序号">
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="number" label="合同编码"></el-table-column>
        <el-table-column align="center" prop="name" label="合同名称"></el-table-column>
        <el-table-column align="center" prop="area" label="所属办事处"></el-table-column>
        <el-table-column align="center" prop="date" label="合同所属年月"></el-table-column>
        <el-table-column align="center" prop="changeMoney" label="变更后合同金额"></el-table-column>
        <el-table-column align="center" prop="payMoney" label="已开票金额"></el-table-column>
        <el-table-column align="center" prop="returnMoney" label="已回款金额"></el-table-column>
        <el-table-column align="center" prop="payNoReturn" label="已开票未回款金额"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="seeRow(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
            <!-- <el-button @click.native.prevent="editRow(scope.row.id)" type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPage" :page-sizes="[1, 2, 3]"
:page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="100"></el-pagination>
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
        id: '1',
        number: '2018001176',
        name: '深圳市中海华庭电梯监管服务合同',
        area: '深圳办事处',
        date: '2018-01',
        changeMoney: '1,000,000',
        payMoney: '1,100,000',
        returnMoney: '500,000',
        payNoReturn: '300,000'
      }, {
        id: '2',
        number: '2018001177',
        name: '深圳市中海华庭电梯监管服务合同',
        area: '深圳办事处',
        date: '2018-01',
        changeMoney: '1,000,000',
        payMoney: '1,100,000',
        returnMoney: '500,000',
        payNoReturn: '300,000'
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
      this.height = winHeight() - 220
    },
    seeRow(row) {
      this.$emit('seeRow', row)
      // this.$router.push({ path: '/financial/contract-info?status=add' })
    },
    deleteRow(id) {
      // var contractID = id
      // this.$post('/contractInfo/delete', contractID).then((res) => {
      //   console.log(res)
      // })
    }
    // editRow() {
    //   this.$router.push({ path: '/financial/detaileInfo' })
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>
