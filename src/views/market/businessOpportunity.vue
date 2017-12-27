<template>
<div class="app-container">
  <div class="attached-btn">
    <div class="crud-btn">
      <button class="iconfont icon-inquire">查询</button>
      <button class="iconfont icon-detail">查看明细</button>
      <button class="iconfont icon-add">新增</button>
      <button class="iconfont icon-edit">修改</button>
      <button class="iconfont icon-delete">删除</button>
      <button class="iconfont icon-add">提交审核</button>
    </div>
    <div class="export-data">
      <!-- <button class="iconfont icon-export">数据导出</button> -->
      <el-button @click="handleDownload" :loading="downloadLoading" class="iconfont icon-export">数据导出</el-button>
    </div>
  </div>
  <el-table :data="tableData" border style="width: 100%"  height="100">
   <!-- <el-table-column align="center" fixed label="商机编码">
     <template slot-scope="scope">
       {{scope.$index}}
     </template>
   </el-table-column>
   <el-table-column align="center" fixed label="商机名称">
     <template slot-scope="scope">
       {{scope.row.date}}
     </template>
   </el-table-column> -->
   <el-table-column align="center" prop="0" fixed label="序号"  width="50">
     <template slot-scope="scope">
       {{scope.$index}}
     </template>
   </el-table-column>
   <el-table-column align="center" prop="1" fixed label="商机编码" width="150"></el-table-column>
   <el-table-column align="center" prop="2" fixed label="商机名称" width="150" ></el-table-column>
   <el-table-column align="center" prop="3" fixed label="客户名称" width="120" ></el-table-column>
   <el-table-column align="center" prop="4" fixed label="所属年月"></el-table-column>
   <el-table-column align="center" prop="5" fixed label="预计成交金额" width="150" sortable></el-table-column>
   <el-table-column align="center" prop="6" label="商机跟进状态" width="120" sortable></el-table-column>
   <el-table-column align="center" prop="7" label="商机执行状态" width="120"></el-table-column>
   <el-table-column align="center" prop="8" label="城市" width="120"></el-table-column>
   <el-table-column align="center" prop="9" label="区域" width="120"></el-table-column>
   <el-table-column align="center" prop="10" label="业务分类" width="120"></el-table-column>
   <el-table-column align="center" prop="11" label="客户分类" width="120"></el-table-column>
   <el-table-column align="center" prop="12" label="合同原始金额（元）" width="120"></el-table-column>
   <el-table-column align="center" prop="13"label="合同变更合同（元）" width="120"></el-table-column>
   <el-table-column align="center" prop="14" label="变更后合同金额（元）" width="120"></el-table-column>
   <el-table-column align="center" prop="15" label="已开票金额（元）" width="120"></el-table-column>
   <el-table-column align="center" prop="16" label="已回款金额（元）" width="120"></el-table-column>
   <el-table-column align="center" prop="17" label="已开票未回款金额（元）" width="120"></el-table-column>
   <el-table-column align="center" prop="18" label="业务线负责人" width="120"></el-table-column>
   <el-table-column align="center" prop="19" label="关联合同" width="120"></el-table-column>
   <el-table-column align="center" prop="20" label="审批状态" width="100"></el-table-column>
 </el-table>
 <el-pagination class="page" background :current-page="currentPage" @current-change="handleCurrentChange"
  :page-sizes="[1, 2, 3, 4]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="2">
 </el-pagination>
</div>
</template>

<script>
export default {
  name: 'businessOpportunity',
  data() {
    return {
      currentPage: 2,
      downloadLoading: false,
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
      }]
    }
  },
  created() {
  },
  methods: {
    handleDownload() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '文章标题', '作者', '阅读数', '发布时间']
        const filterVal = ['1', '2', '3', '4', '5']
        const list = this.tableData
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, this.filename)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        v[j]
        // if (j === 'timestamp') {
        //   return parseTime(v[j])
        // } else {
        //   return v[j]
        // }
      }))
    },
    handleCurrentChange(e) {
      console.log(e)
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app-container {
  padding: 20px;
  width: 100%;
}
.attached-btn {
  width: 100%;
  height: 60px;
  line-height: 60px;
  padding: 0 4px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
}
.attached-btn button {
  margin: auto 10px;
}
.el-pagination{
  text-align: center;
  margin: 20px 0;
}
.el-table__fixed::-webkit-scrollbar {
  width: 0.05rem;
  height: 0.05rem;
  background-color:#588095;

}


/*定义滚动条轨道 内阴影+圆角*/

.el-table__fixed::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background-color: #588095;
}


/*定义滑块 内阴影+圆角*/

.el-table__fixed::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
  background-color: #555;
}
</style>
