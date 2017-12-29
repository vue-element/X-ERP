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
  <el-table :data="tableData3" style="width: 100%">
    <el-table-column prop="date" label="日期" width="150"></el-table-column>
    <el-table-column label="配送信息">
      <el-table-column prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column label="地址">
        <el-table-column prop="province" label="省份"width="120"></el-table-column>
        <el-table-column prop="city" label="市区" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" width="300"></el-table-column>
        <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
      </el-table-column>
    </el-table-column>
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
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-07',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
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
        const tHeader = ['日期', '姓名', '省份', '市区', '地址', '邮编']
        // const tHeader = ['日期', {'配送信息': ['姓名', {'地址': ['省份', '市区', '地址', '邮编']}]}]
        const filterVal = ['date', 'name', 'province', 'city', 'address', 'zip']
        const list = this.tableData3
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, this.filename)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        return v[j]
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
  @include boxSizing;
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
