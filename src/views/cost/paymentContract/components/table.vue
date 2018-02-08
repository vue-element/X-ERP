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
            <span>新增物料明细</span>
          </button>
        </div>
      </h4>
      <!-- <div  v-show="!uploadTableShow"> -->
      <div>
        <el-table class="basic-form" style="width: 100%" :data="purchaseList" v-loading.body="listLoading">
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
          <el-table-column label="品牌">
            <template slot-scope="scope">
              <input v-if="scope.row.edit" type="text" v-model="scope.row.brand" placeholder="请填写">
              <span v-else>{{scope.row.brand}}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格型号">
            <template slot-scope="scope">
              <input v-if="scope.row.edit" type="text" v-model="scope.row.model" placeholder="请填写">
              <span v-else>{{scope.row.model}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位">
            <template slot-scope="scope">
              <input v-if="scope.row.edit" type="text" v-model="scope.row.unit" placeholder="请填写">
              <span v-else>{{scope.row.unit}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价">
            <template slot-scope="scope">
              <input v-if="scope.row.edit" type="text" v-model="scope.row.unitPrice" placeholder="请填写">
              <span v-else>{{scope.row.unitPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="数量">
            <template slot-scope="scope">
              <input v-if="scope.row.edit" type="text" v-model="scope.row.number" placeholder="请填写">
              <span v-else>{{scope.row.number}}</span>
            </template>
          </el-table-column>
          <el-table-column label="总金额">
            <template slot-scope="scope">
              <input v-if="scope.row.edit" type="text" v-model="scope.row.totalAmount" placeholder="请填写">
              <span v-else>{{scope.row.totalAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button v-if="scope.row.edit" @click.native.prevent="confirmEdit(scope.row, scope.$index)" type="text">完成</el-button>
              <el-button v-else @click.native.prevent='editRow(scope.row, scope.$index)' type="text">编辑</el-button>
              <el-button @click.native.prevent="deleteRow(scope.row.id, scope.$index)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="uploadTableShow">
        <upload-excel-component @on-selected-file='selected' ref="upload"></upload-excel-component>
      </div>
    </div>
    <!-- 开票信息 -->
    <div class="form-module" v-show="editShow">
      <h4 class="module-title">
        <p>开票信息</p>
        <div class="material-table-head fr">
          <button @click="addBilling">
            <i class="iconfont icon-add"></i>
            <span>新增开票信息</span>
          </button>
        </div>
      </h4>
      <el-table class="basic-form" style="width: 100%" :data="billingList" v-loading.body="listLoading">
        <el-table-column label="序号">
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="开票日期">
          <template slot-scope="scope">
            <el-date-picker  v-if="scope.row.edit" type="date" format="yyyy-MM-dd"  v-model="scope.row.date" placeholder="选择日期"></el-date-picker>
            <span v-else>{{scope.row.date | parseTime('{y}-{m}-{d}')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开票金额">
          <template slot-scope="scope">
            <input v-if="scope.row.edit" type="text" v-model="scope.row.amount" placeholder="请填写">
            <span v-else>{{scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" @click.native.prevent="confirmBillingEdit(scope.row, scope.$index)" type="text">完成</el-button>
            <el-button v-else @click.native.prevent='editBillingRow(scope.row, scope.$index)' type="text">编辑</el-button>
            <el-button @click.native.prevent="deleteBillingRow(scope.row.id)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 付款合同 -->
    <div class="form-module" v-show="editShow">
      <h4 class="module-title">
        <p>付款信息   </p>
        <div class="material-table-head fr">
          <button @click="addPayment">
            <i class="iconfont icon-add"></i>
            <span>新增付款信息</span>
          </button>
        </div>
      </h4>
      <el-table class="basic-form" style="width: 100%" :data="paymentList" v-loading.body="listLoading">
        <el-table-column label="序号">
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="付票日期">
          <template slot-scope="scope">
            <el-date-picker  v-if="scope.row.edit" type="date" format="yyyy-MM-dd"  v-model="scope.row.date" placeholder="选择日期"></el-date-picker>
            <span v-else>{{scope.row.date | parseTime('{y}-{m}-{d}')}}</span>
          </template>
        </el-table-column>
        <el-table-column label="付票金额">
          <template slot-scope="scope">
            <input v-if="scope.row.edit" type="text" v-model="scope.row.amount" placeholder="请填写">
            <span v-else>{{scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" @click.native.prevent="confirmPaymentEdit(scope.row, scope.$index)" type="text">完成</el-button>
            <el-button v-else @click.native.prevent='editPaymentRow(scope.row, scope.$index)' type="text">编辑</el-button>
            <el-button @click.native.prevent="deletePaymentRow(scope.row.id)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      purchaseList: [],
      billingList: [],
      paymentList: [],
      uploadDetail: [],
      isDisabled: false,
      uploadTableShow: false,
      listLoading: false,
      downloadLoading: false,
      comfirmUploading: false
    }
  },
  created() {
    console.log('editShow', this.contractId)
    if (this.contractId) {
      this.getPurchaseList()
      this.getBillingList()
      this.getPaymentList()
    }
  },
  methods: {
    getPurchaseList() {
      this.$get('/purchaseList/findAllByPaymentContract/' + this.contractId).then((res) => {
        this.purchaseList = res.data.data.content
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
      this.purchaseList.push(obj)
    },
    editRow(row, index) {
      row.edit = !row.edit
      Vue.set(this.purchaseList, index, row)
    },
    confirmEdit(row, index) {
      row.edit = !row.edit
      Vue.set(this.purchaseList, index, row)
      if (this.contractId) {
        row.paymentContract = {
          id: this.contractId
        }
        this.$post('/purchaseList/save', { objectList: [row] }).then((res) => {
          this.getPurchaseList()
        })
      }
    },
    // saveMaterial(list) {
    //   if (this.contractId) {
    //     list.forEach((item) => {
    //       item.paymentContract = { id: this.contractId }
    //     })
    //     this.$post('/purchaseList/save', { objectList: list }).then((res) => {
    //       this.getPurchaseList()
    //     })
    //   }
    // },
    deleteRow(id, index) {
      if (this.contractId) {
        this.$post('/purchaseList/delete', { id: [id] }).then((res) => {
          if (res.data.success === true) {
            this.getPurchaseList()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      } else {
        this.purchaseList.splice(index, 1)
      }
    },
    selected(data) {
      var list = []
      this.uploadDetail = data.results
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
        if (this.contractId) {
          obj.paymentContract = {
            id: this.contractId
          }
        }
        list.push(obj)
      })
      var objectList = {
        objectList: list
      }
      this.$post('/purchaseList/save', objectList).then((res) => {
        console.log('res', res)
        this.getPurchaseList()
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
    // 开票信息
    getBillingList() {
      this.$get('/billing/findAllByPaymentContract/' + this.contractId).then((res) => {
        this.billingList = res.data.data.content
      })
    },
    addBilling() {
      var id = this.contractId
      var obj = {}
      obj = {
        amount: '',
        date: '',
        paymentContract: { id: id },
        edit: true
      }
      this.billingList.push(obj)
    },
    editBillingRow(row, index) {
      row.edit = !row.edit
      Vue.set(this.billingList, index, row)
    },
    confirmBillingEdit(row, index) {
      row.edit = !row.edit
      Vue.set(this.billingList, index, row)
      this.$post('/billing/save', row).then((res) => {
        this.getBillingList()
      })
    },
    deleteBillingRow(id) {
      var rowId = { id: [id] }
      this.$post('/billing/delete', rowId).then((res) => {
        if (res.data.success === true) {
          this.getBillingList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 付款信息
    getPaymentList() {
      this.$get('/payment/findAllByPaymentContract/' + this.contractId).then((res) => {
        this.paymentList = res.data.data.content
      })
    },
    addPayment() {
      var id = this.contractId
      var obj = {}
      obj = {
        amount: '',
        date: '',
        paymentContract: { id: id },
        edit: true
      }
      this.paymentList.push(obj)
    },
    editPaymentRow(row, index) {
      row.edit = !row.edit
      Vue.set(this.paymentList, index, row)
    },
    confirmPaymentEdit(row, index) {
      row.edit = !row.edit
      Vue.set(this.paymentList, index, row)
      this.$post('/payment/save', row).then((res) => {
        this.getPaymentList()
      })
    },
    deletePaymentRow(id) {
      var rowId = { id: [id] }
      this.$post('/payment/delete', rowId).then((res) => {
        if (res.data.success === true) {
          this.getPaymentList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    }
  },
  watch: {
    contractId(data) {
      console.log('my contractId', data)
      this.purchaseList.forEach((item) => {
        item.paymentContract = { id: data }
      })
      // console.log('purchaseList', this.purchaseList)
      this.$post('/purchaseList/save', this.purchaseList).then((res) => {
        console.log('res', res)
        this.getPurchaseList()
      })
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
