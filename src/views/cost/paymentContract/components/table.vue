<template>
  <div class="payment-contract">
    <!-- 物料详情 -->
    <div class="form-module" v-if="hasPerm('purchaseList:findAllByPaymentContract')">
      <h4 class="module-title">
        <p>物料详情</p>
        <div class="material-table-head fr">
          <button @click.prevent="handleDownload" :loading="downloadLoading">
            <i class="iconfont icon-download"></i>
            <span>模版下载</span>
          </button>
          <button @click.prevent="uploadMaterial" v-if="hasPerm('purchaseList:importData')">
            <i class="iconfont icon-import"></i>
            <span>导入物料明细</span>
          </button>
          <!-- <button @click.prevent="addMaterial">
            <i class="iconfont icon-add"></i>
            <span>新增物料明细</span>
          </button> -->
        </div>
      </h4>
      <div>
        <el-table class="el-table-sm" style="width: 100%" :height='purchaseHeight' :data="purchaseList" v-loading.body="listLoading" border>
          <el-table-column label="序号" width="60" fixed>
            <template slot-scope="scope">{{scope.$index + 1}}</template>
          </el-table-column>
          <el-table-column label="物料名称" min-width="160">
            <template slot-scope="scope">
              <el-input v-if="scope.row.edit" type="text" v-model="scope.row.name" placeholder="请填写"></el-input>
              <span v-else>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column label="规格型号" min-width="160">
            <template slot-scope="scope">
              <el-input v-if="scope.row.edit" type="text" v-model="scope.row.model" placeholder="请填写"></el-input>
              <span v-else>{{scope.row.model}}</span>
            </template>
          </el-table-column>
          <el-table-column label="品牌" min-width="160">
            <template slot-scope="scope">
              <el-input v-if="scope.row.edit" type="text" v-model="scope.row.brand" placeholder="请填写"></el-input>
              <span v-else>{{scope.row.brand}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单价" min-width="160">
            <template slot-scope="scope">
              <el-input v-if="scope.row.edit" type="text" v-model="scope.row.unitPrice" placeholder="请填写" @change="unitPriceChange"></el-input>
              <span v-else>{{scope.row.unitPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划数量" min-width="160">
            <template slot-scope="scope">
              <el-input v-if="scope.row.edit" type="text" v-model.number="scope.row.number" placeholder="请填写"></el-input>
              <span v-else>{{scope.row.adNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划金额" min-width="160">
            <template slot-scope="scope">
              <el-input v-if="scope.row.edit" type="text" v-model="scope.row.totalAmount" placeholder="请填写"></el-input>
              <span v-else>{{scope.row.adAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="单位" min-width="80">
            <template slot-scope="scope">
              <el-input v-if="scope.row.edit" type="text" v-model="scope.row.unit" placeholder="请填写"></el-input>
              <span v-else>{{scope.row.unit}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="操作" min-width="120" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="hasPerm('purchaseList:save') && scope.row.edit" @click.native.prevent="confirmEdit(scope.row, scope.$index)" type="text">完成</el-button>
              <el-button v-if="hasPerm('purchaseList:save')" @click.native.prevent='editRow(scope.row, scope.$index)' type="text">编辑</el-button>
              <el-button v-if="hasPerm('purchaseList:delete')" @click.native.prevent="deleteRow(scope.row.id, scope.$index)" type="text">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div v-show="uploadTableShow">
        <upload-excel-component @on-selected-file='selected' ref="upload"></upload-excel-component>
      </div>
    </div>
    <!-- 开票信息 -->
    <div class="form-module" v-show="editShow && hasPerm('billing:findAllByPaymentContract')">
      <h4 class="module-title">
        <p>开票信息</p>
        <div class="material-table-head fr">
          <button v-if="hasPerm('billing:save')" @click.prevent="addBilling">
            <i class="iconfont icon-add"></i>
            <span>新增开票信息</span>
          </button>
        </div>
      </h4>
      <el-table class="el-table-sm" :data="billingList" v-loading.body="listLoading" :height="billHeight">
        <el-table-column label="序号" width="100" fixed>
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="开票日期">
          <template slot-scope="scope">
            <el-date-picker  v-if="scope.row.edit" type="date" format="yyyy-MM-dd"  value-format="yyyy-MM-dd" v-model="scope.row.date" placeholder="选择日期"></el-date-picker>
            <span v-else>{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开票金额">
          <template slot-scope="scope">
            <input v-if="scope.row.edit" type="text" v-model="scope.row.amount" placeholder="请填写">
            <span v-else>{{scope.row.amount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-show="hasPerm('billing:save') && scope.row.edit" @click.native.prevent="confirmBillingEdit(scope.row, scope.$index)" type="text">完成</el-button>
            <el-button v-show="hasPerm('billing:update') && !scope.row.edit" @click.native.prevent='editBillingRow(scope.row, scope.$index)' type="text">编辑</el-button>
            <el-button v-if="hasPerm('billing:delete')" @click.native.prevent="deleteBillingRow(scope.row.id)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPageB" :page-sizes="pageSizes" :page-size="pageSizeB"  :total="totalB"
       @size-change="billSizeChange" @current-change="billCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
    <!-- 付款合同 -->
    <div class="form-module" v-show="editShow && hasPerm('payment:findAllByPaymentContract')">
      <h4 class="module-title">
        <p>付款信息</p>
        <div class="material-table-head fr">
          <button v-if="hasPerm('payment:save')" @click.prevent="addPayment">
            <i class="iconfont icon-add"></i>
            <span>新增付款信息</span>
          </button>
        </div>
      </h4>
      <el-table class="el-table-sm" style="width: 100%" :data="paymentList" v-loading.body="listLoading" :height="paymentHeight">
        <el-table-column label="序号" width="100" fixed>
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="付款日期">
          <template slot-scope="scope">
            <el-date-picker  v-if="scope.row.edit" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="scope.row.date" placeholder="选择日期"></el-date-picker>
            <span v-else>{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="付款金额">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" type="text" v-model="scope.row.amount" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.amount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-show="hasPerm('payment:save') && scope.row.edit" @click.native.prevent="confirmPaymentEdit(scope.row, scope.$index)" type="text">完成</el-button>
            <el-button v-show="hasPerm('payment:update') && !scope.row.edit" @click.native.prevent='editPaymentRow(scope.row, scope.$index)' type="text">编辑</el-button>
            <el-button v-if="hasPerm('payment:delete')" @click.native.prevent="deletePaymentRow(scope.row.id)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPageP" :page-sizes="pageSizes" :page-size="pageSizeP"  :total="totalP"
       @size-change="paymentSizeChange" @current-change="paymentCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/common.vue'
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
      comfirmUploading: false,
      acAmount: null,
      adAmount: null,
      // 开票付款合同
      totalP: 5,
      currentPageP: 1,
      pageSizeP: 5,
      pageSizes: [5, 10, 20],
      totalB: 10,
      currentPageB: 1,
      pageSizeB: 5
    }
  },
  created() {
    if (this.contractId) {
      this.getPurchaseList()
      this.getBillingList()
      this.getPaymentList()
    }
  },
  methods: {
    getPurchaseList() {
      this.$get('/purchaseList/findAllByPaymentContract/' + this.contractId).then((res) => {
        var acAmount = 0
        var adAmount = 0
        if (res.data.success === true) {
          this.purchaseList = res.data.data
          this.purchaseList.forEach((item) => {
            acAmount += item.acAmount
            adAmount += item.adAmount
          })
          var amountObj = {
            acAmount,
            adAmount
          }
          this.$emit('amountChange', amountObj)
        }
      })
    },
    // addMaterial() {
    //   if (this.contractId) {
    //     var obj = {
    //       paymentContract: {
    //         id: this.contractId
    //       },
    //       name: '',
    //       brand: '',
    //       model: '',
    //       unit: '',
    //       unitPrice: '',
    //       number: '',
    //       totalAmount: '',
    //       edit: true
    //     }
    //     this.purchaseList.push(obj)
    //   } else {
    //     this.$message({
    //       message: '请先保存基础信息与付款信息',
    //       type: 'warning'
    //     })
    //   }
    // },
    // editRow(row, index) {
    //   row.edit = !row.edit
    //   Vue.set(this.purchaseList, index, row)
    // },
    // confirmEdit(row, index) {
    //   row.edit = !row.edit
    //   Vue.set(this.purchaseList, index, row)
    //   this.saveMaterial([row])
    // },
    saveMaterial(list) {
      if (this.contractId) {
        var url = '/purchaseList/importData/' + this.contractId
        this.$post(url, { objectList: list }).then((res) => {
          if (res.data.success === true) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.getPurchaseList()
          }
        })
      }
    },
    // deleteRow(id, index) {
    //   if (this.contractId) {
    //     this.$post('/purchaseList/delete', { id: [id] }).then((res) => {
    //       if (res.data.success === true) {
    //         this.getPurchaseList()
    //         // this.$message({
    //         //   message: '删除成功',
    //         //   type: 'success'
    //         // })
    //       }
    //     })
    //   }
    // },
    selected(data) {
      this.uploadDetail = data.results
      var list = []
      this.uploadDetail.forEach((item) => {
        var obj = {}
        obj = {
          paymentContract: {
            id: this.contractId
          },
          // acAmount: item['计划金额'],
          // acNumber: item['计划数量'],
          adAmount: item['计划金额'],
          adNumber: item['计划数量'],
          brand: item['品牌'],
          model: item['规格型号'],
          name: item['物料名称'],
          unit: item['单位'],
          unitPrice: item['单价']
        }
        list.push(obj)
        console.log('list', list)
      })
      this.saveMaterial(list)
    },
    uploadMaterial() {
      if (this.contractId) {
        this.uploadTableShow = true
        this.$refs.upload.handleUpload()
      } else {
        this.$message({
          message: '请先保存基础信息与付款信息',
          type: 'warning'
        })
      }
    },
    handleDownload() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '物料名称', '规格型号', '品牌', '单价', '计划数量', '计划金额', '单位']
        const filterVal = ['index', 'name', 'model', 'brand', 'unitPrice', 'adNumber', 'adAmount', 'unit']
        const list = []
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '物料明细')
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    },
    unitPriceChange(val) {
      console.log('val', val)
    },
    // 开票信息
    billSizeChange(val) {
      this.pageSizeB = val
      this.getBillingList()
    },
    billCurrentChange(val) {
      this.currentPageB = val
      this.getBillingList()
    },
    getBillingList() {
      var pageSize = this.pageSizeB || 5
      var page = this.currentPageB - 1 || 0
      var query = '?size=' + pageSize + '&page=' + page
      this.$get('/billing/findAllByPaymentContract/' + this.contractId + query).then((res) => {
        var data = res.data.data
        this.billingList = data.content
        this.totalB = data.totalElements
        this.currentPageB = data.number + 1
        this.pageSizeB = data.size
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
        if (res.data.success === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.getBillingList()
        }
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
    paymentSizeChange(val) {
      this.pageSizeP = val
      this.getPaymentList()
    },
    paymentCurrentChange(val) {
      this.currentPageP = val
      this.getPaymentList()
    },
    getPaymentList() {
      var pageSize = this.pageSizeP || 5
      var page = this.currentPageP - 1 || 0
      var query = '?size=' + pageSize + '&page=' + page
      this.$get('/payment/findAllByPaymentContract/' + this.contractId + query).then((res) => {
        var data = res.data.data
        this.paymentList = data.content
        this.totalP = data.totalElements
        this.currentPageP = data.number + 1
        this.pageSizeP = data.size
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
      console.log('edit', row.edit)
      Vue.set(this.paymentList, index, row)
    },
    confirmPaymentEdit(row, index) {
      row.edit = !row.edit
      Vue.set(this.paymentList, index, row)
      this.$post('/payment/save', row).then((res) => {
        if (res.data.success === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.getPaymentList()
        }
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
  computed: {
    purchaseHeight() {
      var height = this.purchaseList.length * 42 + 100
      return height > 260 ? 260 : height
    },
    billHeight () {
      var height = this.billingList.length * 42 + 100
      return height > 260 ? 260 : height
    },
    paymentHeight() {
      var height = this.paymentList.length * 42 + 100
      return height > 260 ? 260 : height
    }
  },
  watch: {
    purchaseList: {
      handler(arr) {
        var purchaseAmount = 0
        arr.forEach((item) => {
          item.totalAmount = item.number * item.unitPrice
          purchaseAmount += item.totalAmount
        })
        this.$emit('purchaseAmount', purchaseAmount)
      },
      deep: true
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
    height: 20px;
    line-height: 20px;
    // margin-bottom: 20px;
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
