<template>
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
          <span>新增物料明细</span>
        </button>
      </div>
    </h4>
    <div  v-show="!uploadTableShow">
      <el-table class="basic-form" style="width: 100%" :data="purchaseList" v-loading.body="listLoading">
        <el-table-column label="序号">
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="物料名称">
          <template slot-scope="scope">
            <input v-if="scope.row.edit" type="text" v-model="scope.row.name">
            <span v-else>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="品牌">
          <template slot-scope="scope">
            <input v-if="scope.row.edit" type="text" v-model="scope.row.brand">
            <span v-else>{{scope.row.brand}}</span>
          </template>
        </el-table-column>
        <el-table-column label="规格型号">
          <template slot-scope="scope">
            <input v-if="scope.row.edit" type="text" v-model="scope.row.model">
            <span v-else>{{scope.row.model}}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位">
          <template slot-scope="scope">
            <input v-if="scope.row.edit" type="text" v-model="scope.row.unit">
            <span v-else>{{scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column label="单价">
          <template slot-scope="scope">
            <input v-if="scope.row.edit" type="text" v-model="scope.row.unitPrice">
            <span v-else>{{scope.row.unitPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <input v-if="scope.row.edit" type="text" v-model="scope.row.number">
            <span v-else>{{scope.row.number}}</span>
          </template>
        </el-table-column>
        <el-table-column label="总金额">
          <template slot-scope="scope">
            <input v-if="scope.row.edit" type="text" v-model="scope.row.totalAmount">
            <span v-else>{{scope.row.totalAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" @click.native.prevent="confirmEdit(scope.row)" type="text">完成</el-button>
            <el-button v-else @click.native.prevent='editRow(scope.row)' type="text">编辑</el-button>
            <el-button @click.native.prevent="deleteRow(scope.$index)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-show="uploadTableShow">
      <upload-excel-component @on-selected-file='selected' ref="upload"></upload-excel-component>
      <el-table :data="uploadDetail" border highlight-current-row style="width: 100%;margin-top:20px;">
        <el-table-column v-for='item of uploadHeader' :prop="item" :label="item" :key='item'>
        </el-table-column>
      </el-table>
      <!-- <div class="commont-btn">
        <el-button :loading="comfirmUploading" @click="comfirmUpload">确认上传</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import { parseTime } from '@/utils'
export default {
  props: ['purchaseData', 'editShow'],
  components: { UploadExcelComponent },
  data() {
    return {
      purchaseList: [
        {
          name: '视频综合平台',
          brand: '海康',
          model: 'DS-B21-S10-A',
          unit: '个',
          unitPrice: '1200',
          number: '1',
          totalAmount: '1200',
          edit: false
        },
        {
          name: '视频综合平台',
          brand: '海康',
          model: 'DS-B21-S10-A',
          unit: '个',
          unitPrice: '1200',
          number: '1',
          totalAmount: '1200',
          edit: false
        }
      ],
      uploadHeader: [],
      uploadDetail: [],
      uploadTableShow: false,
      listLoading: false,
      downloadLoading: false,
      comfirmUploading: false
    }
  },
  created() {
    this.purchaseList = this.purchaseData
    this.purchaseList.forEach((item) => {
      item.edit = false
    })
    // console.log('editShow', this.editShow)
    // console.log('purchaseList', this.purchaseList)
  },
  methods: {
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
      this.purchaseList.push(obj)
    },
    deleteRow(index) {
      console.log(index)
      this.purchaseList.splice(index, 1)
    },
    editRow(row) {
      row.edit = !row.edit
      console.log(row)
      // console.log('purchaseList', this.purchaseList)
      // scope.row.edit=!scope.row.edit
    },
    uploadMaterial() {
      this.uploadTableShow = true
      this.$refs.upload.handleUpload()
    },
    confirmEdit(row) {
      row.edit = false
      this.$message({
        message: 'The title has been edited',
        type: 'success'
      })
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
      this.uploadDetail = data.results
      this.uploadHeader = data.header
      var list = []
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
        list.push(obj)
      })
      console.log('list', list)
      this.$emit('uploadList', list)
    }
  }
}
</script>


<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
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
</style>
