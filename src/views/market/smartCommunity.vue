<template>
<div class="app-container">
  <ul class="form-attached clearfix">
    <ul class="crud-btn fl">
      <li>
        <i class="iconfont icon-search"></i>
        <span>查询</span>
      </li>
      <li>
        <i class="iconfont icon-seeAll"></i>
        <span>查看明细</span>
      </li>
      <li>
        <i class="iconfont icon-add"></i>
        <span>新增</span>
      </li>
      <li>
        <i class="iconfont icon-edit"></i>
        <span>修改</span>
      </li>
      <li>
        <i class="iconfont icon-delete"></i>
        <span>删除</span>
      </li>
    </ul>
    <li class="fr data-export">
      <i class="iconfont icon-export"></i>
      <span>数据导出</span>
    </li>
  </ul>
  <el-table :data="tableData" style="width: 100%" class="basic-form" :height="height" >
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
// import { fetchList } from '@/api/article'
export default {
  name: 'smartCommunity',
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
  methods: {
    resize() {
      this.height = winHeight() - 210
      // this.height = 0
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.app-container {
  padding: 0 10px;
  @include boxSizing;
}
.form-attached{
  margin: 0 15px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #828282;
  ul.crud-btn{
    li{
      display: inline-block;
      margin-right: 35px;
      i {
        display: inline-block;
        margin-right: 6px;
      }
    }
  }
  .data-export{
    i {
      display: inline-block;
      margin-right: 6px;
    }
  }
}
.basic-form{
  .el-table__fixed-body-wrapper{
    margin:28px 0;
  }
}

</style>
