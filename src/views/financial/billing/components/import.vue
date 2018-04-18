<template>
  <div class="billing-import form-container">
    <upload-excel-component @on-selected-file='selected' class="upLoad"></upload-excel-component>
    <el-button type="success" @click="dataImport">导入</el-button>
    <el-table :data="tableData" border highlight-current-row style="width:100%;margin-top:20px;">
      <el-table-column v-for='item of tableHeader' :prop="item" :label="item" :key='item'></el-table-column>
    </el-table>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'

export default {
  name: 'uploadExcel',
  components: { UploadExcelComponent },
  data() {
    return {
      tableData: [],
      tableHeader: []
    }
  },
  methods: {
    selected(data) {
      this.tableData = data.results
      this.tableHeader = data.header
    },
    dataImport() {
      console.log(this.tableData)
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.billing-import.form-container{
  .upLoad{
    display: inline-block;
    text-align: center;
  }
  button{
    line-height: 0.4;
    background-color: #35d5ba;
    border-color: #35d5ba;
  }
}
</style>
