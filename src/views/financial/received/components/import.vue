<template>
  <div class="recevied-import form-container">
    <el-table :data="tableData" border highlight-current-row style="width:100%" :height="height">
      <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item'></el-table-column>
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
      billingList: [],
      tableData: [],
      tableHeader: [],
      select: null,
      in: null
    }
  },
  created() {
    this.getBillingList()
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
      var tableData = data.results
      this.select = tableData.length
      var filterCode = []
      for (let i = 0; i < tableData.length; i++) {
        for (let j = 0; j < this.billingList.length; j++) {
          if (tableData[i].合同编号 === this.billingList[j].contractInfo.code) {
            filterCode.push(tableData[i])
            break
          }
        }
      }
      var filter = []
      for (let i = 0; i < filterCode.length; i++) {
        for (var j = 0; j < this.billingList.length; j++) {
          if (filterCode[i].发票号码 === this.billingList[j].number) {
            if (filterCode[i].合同编号 === this.billingList[j].contractInfo.code) {
              filter.push(filterCode[i])
            }
          }
        }
      }
      this.tableData = filter
    },
    dataImport() {
      this.in = this.tableData.length
      var data = this.tableData
      data.forEach((item) => {
        item.cb_number = item.发票号码
        item.date = item.回款日期
        item.amount = item.回款金额
        item.diffAmount = item.回款金额
        delete item.发票号码
        delete item.合同编号
        delete item.回款日期
        delete item.回款金额
      })
      this.$post('/contractReceived/importData', data).then((res) => {
        if (res.data.success === true) {
          this.$confirm('数据导入成功，选择' + this.select + '条，成功导入' + this.in + '条', '提示', {
            confirmButtonText: '确定',
            type: 'success'
          }).then(() => {
            this.$emit('toggleTab', 'listTab')
          })
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
    },
    getBillingList() {
      this.$get('/contractBilling').then(res => {
        var data = res.data.data.content
        var billingList = []
        for (var i = 0; i < data.length; i++) {
          billingList.push(data[i])
        }
        this.billingList = billingList
      })
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
.recevied-import.form-container{
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
