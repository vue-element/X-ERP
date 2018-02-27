<template>
  <div class="payment-contract">
    <div class="form-module">
      <h4 class="module-title">
        <p @click="uploadTableShow = false">物料详情</p>
        <div class="material-table-head fr">
          <button @click="handleDownload" :loading="downloadLoading">
            <i class="iconfont icon-download"></i>
            <span>模版下载</span>
          </button>
          <button @click="uploadMaterial">
            <i class="iconfont icon-import"></i>
            <span>导入物料明细</span>
          </button>
          <button @click="addMaterial">
            <i class="iconfont icon-add"></i>
            <span>新增出库</span>
          </button>
        </div>
      </h4>
      <!-- <div  v-show="!uploadTableShow"> -->
      <div>
        <el-table class="basic-form" style="width: 100%" :data="outboundList" v-loading.body="listLoading">
          <el-table-column label="序号">
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column label="物料名称">
            <template slot-scope="scope">
              <input v-if="scope.row.edit" type="text" v-model="scope.row.name" placeholder="请填写">
              <span v-else>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格型号">
            <template slot-scope="scope">
              <input v-if="scope.row.edit" type="text" v-model="scope.row.model" placeholder="请填写">
              <span v-else>{{scope.row.model}}</span>
            </template>
          </el-table-column>
          <el-table-column label="品牌">
            <template slot-scope="scope">
              <input v-if="scope.row.edit" type="text" v-model="scope.row.brand" placeholder="请填写">
              <span v-else>{{scope.row.brand}}</span>
            </template>
          </el-table-column>
          <el-table-column label="出库数量">
            <template slot-scope="scope">
              <input v-if="scope.row.edit" type="text" v-model="scope.row.number" placeholder="请填写">
              <span v-else>{{scope.row.number}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.edit" @click.native.prevent="confirmEdit(scope.row, scope.$index)" type="text">完成</el-button>
              <el-button v-else @click.native.prevent='editRow(scope.row, scope.$index)' type="text">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="uploadTableShow">
        <upload-excel-component @on-selected-file='selected' ref="upload"></upload-excel-component>
      </div>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/common.vue'
import { parseTime } from '@/utils'
import Vue from 'vue'

export default {
  components: { UploadExcelComponent },
  props: ['contractId', 'editShow'],
  data() {
    return {
      outboundList: [],
      uploadTableShow: false,
      listLoading: false,
      downloadLoading: false,
      comfirmUploading: false
    }
  },
  created() {
    console.log('editShow', this.editShow)
    this.getOutboundList()
  },
  watch: {
  },
  methods: {
    getOutboundList() {
      this.$get('/outboundList').then((res) => {
        this.outboundList = res.data.data.content
      })
    },
    addMaterial() {
      var obj = {
        name: '',
        brand: '',
        model: '',
        unit: '',
        unitPrice: '',
        number: '',
        totalAmount: '',
        edit: true
      }
      this.outboundList.push(obj)
    },
    deleteRow(id) {
      var rowId = { id: [id] }
      this.$post('/outboundList/delete', rowId).then((res) => {
        if (res.data.success === true) {
          this.getOutboundList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    editRow(row, index) {
      row.edit = !row.edit
      Vue.set(this.outboundList, index, row)
      // console.log('outboundList[idex]', this.outboundList[index])
    },
    confirmEdit(row, index) {
      row.edit = !row.edit
      Vue.set(this.outboundList, index, row)
      // console.log('outboundList[idex]', this.outboundList[index])
      this.$post('/outboundList/save', row).then((res) => {
        this.getOutboundList()
      })
    },
    uploadMaterial() {
      this.uploadTableShow = true
      this.$refs.upload.handleUpload()
    },
    handleDownload() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '物料名称', '品牌', '规格型号', '单位', '单价', '数量', '总金额']
        const filterVal = ['name', 'brand', 'model', 'unit', 'unitPrice', 'number', 'totalAmount']
        const list = []
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, this.filename)
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    selected(data) {
      // var list = []
      this.uploadDetail.forEach((item) => {
        var obj = {}
        obj = {
          name: item['物料名称'],
          brand: item['品牌'],
          model: item['规格型号'],
          unit: item['单位'],
          unitPrice: item['单价'],
          number: item['数量'],
          totalAmount: item['总金额']
        }
        this.$post('/outboundList/save', obj).then((res) => {
          console.log('res', res)
          this.getOutboundList()
        })
        // list.push(obj)
      })
      // console.log('list', JSON.stringify(list))
      // this.$post('/outboundList/save', list).then((res) => {
      //   console.log('res', res)
      // })
    }
  }
}
</script>


<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.payment-contract {
  .material-table-head {
    margin: 0 10px;
    margin-top: -10px;
    margin-bottom: 20px;
    button{
      margin-left:20px;
      color: #828282;
    }
    button:focus {
      color: #35d5ba;
    }
    button.is-active {
      color: #35d5ba;
    }
  }
  .el-table {
    .el-input {
      .el-input__icon{
        line-height: 26px!important;
      }
    }
  }
}

</style>
