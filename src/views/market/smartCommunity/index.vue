<template>
<div class="app-container">
  <ul class="form-attached clearfix">
    <ul class="crud-btn fl">
      <router-link to="search">
        <i class="iconfont icon-search"></i>
        <span>查询</span>
      </router-link>
      <li>
        <i class="iconfont icon-seeAll"></i>
        <span>查看明细</span>
      </li>
      <router-link to="add">
        <i class="iconfont icon-add"></i>
        <span>新增</span>
      </router-link>
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
  <div>
    <el-table :data="tableData" style="width: 100%" class="basic-form" :height="height">
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
  <!-- 查询功能 -->
  <div class="search-container" v-show="false">
    <div class="search-form">
      <h4>
        <p>查询条件</p>
      </h4>
      <el-form ref="form" :model="form">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-form-item label="活动名称" :span="6">
            <el-input v-model="form.name" placeholder="请填写活动名称"></el-input>
          </el-form-item>
          <el-form-item label="区域" :span="6">
            <el-select v-model="form.region" placeholder="请选择区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合约模式" :span="6">
            <el-select v-model="form.region" placeholder="请选择合约模式">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-form-item label="客户信息" :span="6">
            <el-input v-model="form.msg" placeholder="请填写客户信息"></el-input>
          </el-form-item>
          <el-form-item label="城市" :span="6">
            <el-select v-model="form.city" placeholder="请选择城市">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="首期入伙时间" :span="6">
            <el-select v-model="form.region" placeholder="请选择合约模式">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
      </el-form>
      <div class="search-btn">查  询</div>
    </div>
  </div>
</div>
</template>

<script>
import {
  winHeight
} from '@/utils'
// import { fetchList } from '@/api/article'
export default {
  name: 'smartCommunity',
  data() {
    return {
      ruleForm: {
        type: []
      },
      form: {
        region: ''
      },
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
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-container {
  padding: 0 10px;
  @include boxSizing;
}
.form-attached {
  margin: 0 15px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  ul.crud-btn {
    a, li{
      display: inline-block;
      margin-right: 35px;
      color: #828282;
      i {
        display: inline-block;
        margin-right: 6px;
      }
    }
  }
  .data-export {
    i {
      display: inline-block;
      margin-right: 6px;
    }
  }
}
.basic-form {
  .el-table__fixed-body-wrapper {
    margin: 28px 0;
  }
}
</style>
