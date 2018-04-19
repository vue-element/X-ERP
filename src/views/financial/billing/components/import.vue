<template>
  <div class="billing-import form-container">
    <el-table :data="tableData" border highlight-current-row style="width:100%;" :height="height">
      <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item' width="200"></el-table-column>
    </el-table>
    <div class="btn">
      <upload-excel-component @on-selected-file='selected' class="upLoad" v-if="hasData"></upload-excel-component>
      <el-button type="success" @click="reset">重置</el-button>
      <el-button type="success" @click="dataImport">导入</el-button>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { winHeight } from '@/utils'
export default {
  name: 'uploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      height: 100,
      hasData: true,
      arrList: [],
      tableData: [],
      tableHeader: []
    }
  },
  created() {
    this.getListItem()
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 250
    },
    selected(data) {
      this.tableHeader = this.curtail(data.header)
      for (var i = 0; i < data.results.length; i++) {
        for (var key in data.results[i]) {
          if (key === '序号') {
            delete data.results[i][key]
          }
        }
      }
      this.tableData = data.results
    },
    dataImport() {
      var data = this.tableData
      data.forEach((item) => {
        item.ci_code = item.合同编号
        item.name = item.发票抬头名称
        item.amount = item['开票金额(含税)']
        item.diffAmount = item['开票金额(含税)']
        item.date = item.开票日期
        item.number = item.开票号码
        item.content = item.开票内容
        item.taxRate = item.税率
        item.tax = item.税金
        item.income = item['收入(不含税)']
        delete item.开票内容
        delete item.开票号码
        delete item.发票抬头名称
        delete item.合同编号
        delete item.开票日期
        delete item['开票金额(含税)']
        delete item.税金
        delete item.税率
        delete item['收入(不含税)']
      })
      var arrList = this.arrList
      var flag = true
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < arrList.length; j++) {
          if (data[i].number === arrList[j]) {
            flag = false
            break
          }
        }
      }
      if (flag) {
        this.$post('/contractBilling/importData', data).then((res) => {
          if (res.data.success === true) {
            this.$confirm('数据导入成功', '提示', {
              confirmButtonText: '确定',
              type: 'success'
            }).then(() => {
              this.$emit('toggleTab', 'listTab')
            })
          }
        })
      } else {
        this.$confirm('数据导入失败，开票号码出现重复', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
    },
    getListItem() {
      this.$get('/contractBilling').then((res) => {
        if (res.data.success === true) {
          var data = res.data.data.content
          var arrList = []
          for (var i = 0; i < data.length; i++) {
            arrList.push(data[i].number)
          }
          this.arrList = arrList
        }
      })
    },
    curtail(arr) {
      var m = arr.slice(1)
      return m
    },
    reset() {
      this.tableData = null
      this.tableHeader = null
    }
  },
  watch: {
    tableData() {
      if (this.tableData) {
        this.hasData = false
      } else {
        this.hasData = true
      }
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.billing-import.form-container{
  .upLoad{
    display: inline-block;
    margin-right: 10px;
  }
  button{
    line-height: 0.4;
    background-color: #35d5ba;
    border-color: #35d5ba;
  }
  .el-table{
    border: 1px solid #ebeef5;
  }
  .btn{
    background-color: white;
    text-align: center;
    position: fixed;
    bottom: 31px;
    left: 245px;
    right: 50px;
    height: 50px;
    line-height: 50px;
  }
}
</style>
