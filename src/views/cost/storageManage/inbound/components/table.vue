<template>
  <div class="payment-contract">
    <div class="form-module">
      <h4 class="module-title">
        <p>入库验收</p>
      </h4>
      <el-row>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-table class="basic-form" style="width: 100%" :data="purchaseList" v-loading.body="listLoading">
            <el-table-column label="发货明细">
              <el-table-column label="序号">
                <template slot-scope="scope">
                 {{scope.$index + 1}}
                </template>
              </el-table-column>
              <el-table-column label="物料名称">
                <template slot-scope="scope">
                  <span>{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column label="规格型号">
                <template slot-scope="scope">
                  <span>{{scope.row.model}}</span>
                </template>
              </el-table-column>
              <el-table-column label="品牌">
                <template slot-scope="scope">
                  <span>{{scope.row.brand}}</span>
                </template>
              </el-table-column>
              <el-table-column label="采购数量">
                <template slot-scope="scope">
                  <span>{{scope.row.number}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-table class="basic-form" style="width: 100%" :data="InboundList" v-loading.body="listLoading">
            <el-table-column label="验收明细">
              <el-table-column label="实收数量">
                <template slot-scope="scope">
                  <input v-if="scope.row.edit" type="text" v-model="scope.row.number" placeholder="请填写">
                  <span v-else>{{scope.row.number}}</span>
                </template>
              </el-table-column>
              <el-table-column label="核对型号">
                <template slot-scope="scope">
                  <input v-if="scope.row.edit" type="text" v-model="scope.row.model" placeholder="请填写">
                  <span v-else>{{scope.row.model}}</span>
                </template>
              </el-table-column>
              <el-table-column label="质量外观">
                <template slot-scope="scope">
                  <input v-if="scope.row.edit" type="text" v-model="scope.row.quality" placeholder="请填写">
                  <span v-else>{{scope.row.quality}}</span>
                </template>
              </el-table-column>
              <el-table-column label="合格证">
                <template slot-scope="scope">
                  <input v-if="scope.row.edit" type="text" v-model="scope.row.certificate" placeholder="请填写">
                  <span v-else>{{scope.row.certificate}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.edit" @click.native.prevent="confirmEdit(scope.row, scope.$index)" type="text">完成</el-button>
                  <el-button v-else @click.native.prevent='editRow(scope.row, scope.$index)' type="text">修改</el-button>
                  <!-- <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div class="commont-btn">
        <el-button :loading="false">提交审核</el-button>
      </div>
      <div v-show="uploadTableShow">
        <upload-excel-component @on-selected-file='selected' ref="upload"></upload-excel-component>
      </div>
    </div>
    <!--审核动态  -->
    <!-- <div class="form-module"> -->
      <h4 class="module-title">
        <p>审核动态</p>
      </h4>
      <el-table class="basic-form" style="width: 100%" :data="InboundList" v-loading.body="listLoading">
        <el-table-column label="序号">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="审核步骤">
          <template slot-scope="scope"><span>{{scope.row.number}}</span></template>
        </el-table-column>
        <el-table-column label="品牌">
          <template slot-scope="scope"><span>{{scope.row.model}}</span></template>
        </el-table-column>
        <el-table-column label="操作人">
          <template slot-scope="scope"><span>{{scope.row.quality}}</span></template>
        </el-table-column>
        <el-table-column label="操作时间">
          <template slot-scope="scope"><span>{{scope.row.certificate}}</span></template>
        </el-table-column>
        <el-table-column label="审核结果">
          <template slot-scope="scope"><span>{{scope.row.certificate}}</span></template>
        </el-table-column>
        <el-table-column label="下一步骤">
          <template slot-scope="scope"><span>{{scope.row.certificate}}</span></template>
        </el-table-column>
        <el-table-column label="下一步骤审核人">
          <template slot-scope="scope"><span>{{scope.row.certificate}}</span></template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/common.vue'
import _ from 'lodash'
import { parseTime } from '@/utils'
import Vue from 'vue'

export default {
  components: { UploadExcelComponent },
  props: ['contractId', 'editShow'],
  data() {
    return {
      purchaseList: [],
      InboundList: [],
      isDisabled: false,
      uploadTableShow: false,
      listLoading: false,
      downloadLoading: false,
      comfirmUploading: false
    }
  },
  created() {
    console.log('editShow', this.contractId)
    this.getPurchaseList()
    this.getInboundList()
  },
  watch: {
  },
  methods: {
    getPurchaseList() {
      this.$get('/purchaseList/findAllByPaymentContract/' + this.contractId).then((res) => {
        var data = res.data.data.content
        this.purchaseList = _.cloneDeep(data)
      })
    },
    getInboundList() {
      this.$get('/inboundDetaile').then((res) => {
        var data = res.data.data.content
        this.InboundList = _.cloneDeep(data)
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
      if (this.contractId) {
        obj.paymentContract = {
          id: this.contractId
        }
      }
      this.purchaseList.push(obj)
    },
    // deleteRow(id) {
    //   var rowId = { id: [id] }
    //   this.$post('/purchaseList/delete', rowId).then((res) => {
    //     if (res.data.success === true) {
    //       this.getPurchaseList()
    //       this.$message({
    //         message: '删除成功',
    //         type: 'success'
    //       })
    //     }
    //   })
    // },
    editRow(row, index) {
      row.edit = !row.edit
      Vue.set(this.InboundList, index, row)
    },
    confirmEdit(row, index) {
      row.edit = !row.edit
      Vue.set(this.InboundList, index, row)
      this.$post('/inboundDetaile/save', row).then((res) => {
        this.getInboundList()
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
        this.$post('/purchaseList/save', obj).then((res) => {
          console.log('res', res)
          this.getPurchaseList()
        })
        // list.push(obj)
      })
      // console.log('list', JSON.stringify(list))
      // this.$post('/purchaseList/save', list).then((res) => {
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
