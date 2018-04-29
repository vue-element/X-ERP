<template>
  <div class="payment-contract">
    <div class="form-module" v-if="hasPerm('purchaseList:findAllByPaymentContract')">
      <h4 class="module-title"><p>物料详情</p></h4>
      <el-table class="basic-form" style="width: 100%" height= "300" :data="purchaseList" v-loading.body="listLoading" border>
        <el-table-column label="序号" width="60" fixed>
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="物料名称" min-width="160">
          <template slot-scope="scope"><span>{{scope.row.name}}</span></template>
        </el-table-column>
        <el-table-column label="规格型号" min-width="160">
          <template slot-scope="scope"><span>{{scope.row.model}}</span></template>
        </el-table-column>
        <el-table-column label="品牌" min-width="160">
          <template slot-scope="scope"><span>{{scope.row.brand}}</span></template>
        </el-table-column>
        <el-table-column label="单价" min-width="160">
          <template slot-scope="scope"><span>{{scope.row.unitPrice}}</span></template>
        </el-table-column>
        <el-table-column label="实际数量" min-width="160">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" type="text" v-model.number="scope.row.acNumber" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.acNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际金额" min-width="120">
          <template slot-scope="scope">
            <el-input v-if="scope.row.edit" type="text" v-model="scope.row.acAmount" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.acAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="单位" min-width="80">
          <template slot-scope="scope"><span>{{scope.row.unit}}</span></template>
        </el-table-column>
        <el-table-column label="操作" min-width="100" fixed="right" v-if="hasPerm('purchaseList:save')">
          <template slot-scope="scope">
            <el-button v-show="hasPerm('purchaseList:save') && scope.row.edit" @click.native.prevent="confirmEdit(scope.row, scope.$index)" type="text">完成</el-button>
            <el-button v-show="hasPerm('purchaseList:save') && !scope.row.edit" @click.native.prevent='editRow(scope.row, scope.$index)' type="text">编辑</el-button>
            <!-- <el-button @click.native.prevent="deleteRow(scope.row.id, scope.$index)" type="text">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 开票信息 -->
    <div class="form-module" v-if="hasPerm('billing:findAllByPaymentContract')">
      <h4 class="module-title">
        <p>开票信息</p>
      </h4>
      <el-table class="basic-form" style="width: 100%" :data="billingList" v-loading.body="listLoading" height="300">
        <el-table-column label="序号">
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="开票日期">
          <template slot-scope="scope">
            <el-date-picker  v-if="scope.row.edit" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="scope.row.date" placeholder="选择日期"></el-date-picker>
            <span v-else>{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="开票金额">
          <template slot-scope="scope">
            <input v-if="scope.row.edit" type="text" v-model="scope.row.amount" placeholder="请填写">
            <span v-else>{{scope.row.amount }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="page" background :current-page="currentPageB" :page-sizes="pageSizes" :page-size="pageSizeB"  :total="totalB"
       @size-change="billSizeChange" @current-change="billCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
    </div>
    <!-- 付款合同 -->
    <div class="form-module" v-if="hasPerm('payment:findAllByPaymentContract')">
      <h4 class="module-title">
        <p>付款信息</p>
      </h4>
      <el-table class="basic-form" style="width: 100%" :data="paymentList" v-loading.body="listLoading" height="300">
        <el-table-column label="序号">
          <template slot-scope="scope">
           {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="付票日期">
          <template slot-scope="scope">
            <el-date-picker  v-if="scope.row.edit" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="scope.row.date" placeholder="选择日期"></el-date-picker>
            <span v-else>{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column label="付票金额">
          <template slot-scope="scope">
            <input v-if="scope.row.edit" type="text" v-model="scope.row.amount" placeholder="请填写">
            <span v-else>{{scope.row.amount }}</span>
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
      listLoading: false,
      downloadLoading: false,
      comfirmUploading: false,
      // 开票付款合同
      totalP: 5,
      currentPageP: 1,
      pageSizeP: 5,
      pageSizes: [5, 10, 15],
      totalB: 5,
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
      var acAmount = 0
      var adAmount = 0
      this.$get('/purchaseList/findAllByPaymentContract/' + this.contractId).then((res) => {
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
    editRow(row, index) {
      row.edit = !row.edit
      Vue.set(this.purchaseList, index, row)
    },
    confirmEdit(row, index) {
      row.edit = !row.edit
      Vue.set(this.purchaseList, index, row)
      this.saveMaterial(row)
    },
    saveMaterial(obj) {
      if (this.contractId) {
        this.$post('/purchaseList/save', obj).then((res) => {
          console.log('res', res)
          this.getPurchaseList()
        })
      }
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
    }
  },
  watch: {
    purchaseList: {
      handler(arr) {
        arr.forEach((item) => {
          item.acAmount = item.acNumber * item.unitPrice
          // console.log('item.acNumber', item.acNumber)
          // console.log('item.acNumber', item.unitPrice)
        })
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
