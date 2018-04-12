<template>
  <div class="payment-contract">
    <div class="form-module">
      <h4 class="module-title"><p>物料详情</p></h4>
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
        <el-table-column label="操作" min-width="120" fixed="right">
          <template slot-scope="scope">
            <el-button v-if="hasPerm('purchaseList:save') && scope.row.edit" @click.native.prevent="confirmEdit(scope.row, scope.$index)" type="text">完成</el-button>
            <el-button v-if="hasPerm('purchaseList:save')" @click.native.prevent='editRow(scope.row, scope.$index)' type="text">编辑</el-button>
            <el-button v-if="hasPerm('purchaseList:delete')" @click.native.prevent="deleteRow(scope.row.id, scope.$index)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 开票信息 -->
    <div class="form-module">
      <h4 class="module-title">
        <p>开票信息</p>
      </h4>
      <el-table class="basic-form" style="width: 100%" :data="billingList" v-loading.body="listLoading">
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
    </div>
    <!-- 付款合同 -->
    <div class="form-module">
      <h4 class="module-title">
        <p>付款信息</p>
      </h4>
      <el-table class="basic-form" style="width: 100%" :data="paymentList" v-loading.body="listLoading">
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
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/common.vue'
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
      comfirmUploading: false
    }
  },
  created() {
    console.log('contractId', this.contractId)
    if (this.contractId) {
      this.getPurchaseList()
      this.getBillingList()
      this.getPaymentList()
    }
  },
  methods: {
    getPurchaseList() {
      this.$get('/purchaseList/findAllByPaymentContract/' + this.contractId).then((res) => {
        if (res.data.success === true) {
          this.purchaseList = res.data.data
        }
      })
    },
    // 开票信息
    getBillingList() {
      this.$get('/billing/findAllByPaymentContract/' + this.contractId).then((res) => {
        this.billingList = res.data.data.content
      })
    },
    // 付款信息
    getPaymentList() {
      this.$get('/payment/findAllByPaymentContract/' + this.contractId).then((res) => {
        this.paymentList = res.data.data.content
      })
    }
  },
  watch: {
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
