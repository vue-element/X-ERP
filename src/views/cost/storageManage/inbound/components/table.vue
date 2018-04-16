<template>
  <div class="payment-contract">
    <div v-show="actionTab === 'inboundInfo' || actionTab === 'officeCheck'">
      <div class="form-module" v-if="hasPerm('inboundDetaile:findAllByPaymentContract')">
        <h4 class="module-title">
          <p>入库验收</p>
          <!-- <div class="material-table-head fr">
            <button :loading="false">
              <i class="iconfont icon-download"></i>
              <span>导出入库单</span>
            </button>
          </div> -->
        </h4>
        <el-table class="basic-form" style="width: 100%" :data="InboundList" v-loading.body="listLoading">
          <el-table-column label="发货明细">
            <el-table-column label="序号">
              <template slot-scope="scope">{{scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column label="物料名称">
              <template slot-scope="scope"><span>{{scope.row.purchaseList.name}}</span></template>
            </el-table-column>
            <el-table-column label="规格型号">
              <template slot-scope="scope"><span>{{scope.row.purchaseList.model}}</span></template>
            </el-table-column>
            <el-table-column label="品牌">
              <template slot-scope="scope"><span>{{scope.row.purchaseList.brand}}</span></template>
            </el-table-column>
            <el-table-column label="采购数量">
              <template slot-scope="scope"><span>{{scope.row.purchaseList.number}}</span></template>
            </el-table-column>
          </el-table-column>
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
            <el-table-column label="操作" v-if="hasPerm('inboundDetaile:save')" style="display: none">
              <template slot-scope="scope">
                <el-button v-if="scope.row.edit" @click.native.prevent="confirmEdit(scope.row, scope.$index)" type="text">完成</el-button>
                <el-button v-else @click.native.prevent='editRow(scope.row, scope.$index)' type="text">修改</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <div class="commont-btn"  v-show="actionTab === 'inboundInfo'">
          <el-button :loading="checkLoading" @click="submitCheck" :disabled="disableCheck">提交审核</el-button>
        </div>
        <div class="commont-btn"  v-show="actionTab === 'officeCheck'">
          <el-button :loading="false" v-if="hasPerm('inboundCheck:save')">通过审核</el-button>
          <el-button :loading="false" @click="printInBound">导出入库单</el-button>
          <el-button :loading="false">退回填写</el-button>
        </div>
      </div>
    <!--审核动态  -->
    </div>
    <div v-show="actionTab === 'costCheck'">
      <div class="form-module">
        <h4 class="module-title">
          <p>入库成本核算</p>
        </h4>
        <el-row>
          <el-col :xs="24" :sm="24" :lg="24">
            <el-table class="basic-form" style="width: 100%" :data="InboundList" v-loading.body="listLoading" border>
              <el-table-column label="序号" width="60" fixed>
                <template slot-scope="scope">{{scope.$index + 1}}</template>
              </el-table-column>
              <el-table-column label="物料名称" min-width="120">
                <template slot-scope="scope"><span>{{scope.row.purchaseList.name}}</span></template>
              </el-table-column>
              <el-table-column label="规格型号" min-width="120">
                <template slot-scope="scope"><span>{{scope.row.model}}</span></template>
              </el-table-column>
              <el-table-column label="品牌" min-width="100">
                <template slot-scope="scope"><span>{{scope.row.purchaseList.brand}}</span></template>
              </el-table-column>
              <el-table-column label="采购单价" min-width="100">
                <template slot-scope="scope"><span>{{scope.row.purchaseList.unitPrice}}</span></template>
              </el-table-column>
              <el-table-column label="数量" min-width="100">
                <template slot-scope="scope"><span>{{scope.row.number}}</span></template>
              </el-table-column>
              <el-table-column label="单个成本" min-width="100">
                <template slot-scope="scope"><span>{{scope.row.unitCost}}</span></template>
              </el-table-column>
              <el-table-column label="单个抵扣税金" min-width="160">
                <template slot-scope="scope"><span>{{scope.row.unitTaxFee}}</span></template>
              </el-table-column>
              <el-table-column label="合计" width="100" fixed="right">
                <template slot-scope="scope"><span>{{scope.row.totalAmount}}</span></template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="commont-btn">
          <el-button :loading="false" v-if="hasPerm('inboundCheck:save')">通过审核</el-button>
          <el-button :loading="false">导出入库单</el-button>
          <el-button :loading="false">导出入库成本核算表</el-button>
          <el-button :loading="false">导出出库成本核算表</el-button>
          <el-button :loading="false">退回填写</el-button>
        </div>
      </div>
    </div>
    <div class="form-module" v-if="hasPerm('inboundCheck:findAllByPage')">
      <h4 class="module-title">
        <p>审核动态</p>
      </h4>
      <el-table class="basic-form" style="width: 100%" :data="inboundCheck" v-loading.body="listLoading" border>
        <el-table-column label="序号" width="60" fixed>
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="审核步骤" min-width="100">
          <template slot-scope="scope"><span>{{scope.row.step}}</span></template>
        </el-table-column>
        <el-table-column label="操作人" min-width="100">
          <template slot-scope="scope"><span>{{scope.row.stepPerson}}</span></template>
        </el-table-column>
        <el-table-column label="操作时间" min-width="100">
          <template slot-scope="scope"><span>{{scope.row.time}}</span></template>
        </el-table-column>
        <el-table-column label="审核结果" min-width="100">
          <template slot-scope="scope"><span>{{scope.row.result}}</span></template>
        </el-table-column>
        <el-table-column label="下一步骤" min-width="100">
          <template slot-scope="scope"><span>{{scope.row.nextStep}}</span></template>
        </el-table-column>
        <el-table-column label="下一步骤审核人" min-width="100">
          <template slot-scope="scope"><span>{{scope.row.nextStepPerson}}</span></template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/common.vue'
import { returnFloat } from '@/utils'
import _ from 'lodash'
import Vue from 'vue'

export default {
  components: { UploadExcelComponent },
  props: ['contractId', 'editShow', 'actionTab'],
  data() {
    return {
      purchaseList: [],
      InboundList: [],
      isDisabled: false,
      uploadTableShow: false,
      listLoading: false,
      downloadLoading: false,
      comfirmUploading: false,
      checkLoading: false,
      disableCheck: false,
      inboundCheck: []
    }
  },
  created() {
    this.getPurchaseList()
    this.getInboundCheck()
  },
  methods: {
    getPurchaseList() {
      this.$get('/inboundCheck/findByInboundList/' + this.contractId).then((res) => {
        var data = _.cloneDeep(res.data.data) || []
        data.forEach((item) => {
          item.number = item.number ? item.number : item.purchaseList.number
          item.model = item.model ? item.model : item.purchaseList.model
          item.certificate = item.certificate ? item.certificate : '有'
          item.quality = item.quality ? item.quality : '完好'
          // 税金、成本、合计计算
          var taxRate = item.purchaseList.paymentContract.supply.taxRate // 税率
          var unitPrice = item.purchaseList.unitPrice // 单价
          item.unitCost = this.unitCost(taxRate, unitPrice) // 单个成本
          item.unitTaxFee = returnFloat(unitPrice - item.unitCost)
          item.totalAmount = returnFloat(item.unitCost * item.number)
        })
        this.InboundList = data
      })
    },
    unitCost (taxRate, unitPrice) {
      taxRate = parseFloat(taxRate) / 100 // 转化税率（小数点）
      return returnFloat(unitPrice / (1 + taxRate)) // 单价中包含税金，并且保留2位小数
    },
    editRow(row, index) {
      console.log('row', row)
      row.edit = true
      Vue.set(this.InboundList, index, row)
    },
    confirmEdit(row, index) {
      row.edit = false
      Vue.set(this.InboundList, index, row)
      var obj = {
        id: row.id,
        certificate: row.certificate,
        model: row.model,
        number: row.number,
        purchaseList: {
          id: row.purchaseList.id
        },
        quality: row.quality
      }
      this.$post('/inboundDetaile/save', obj).then((res) => {
        this.getPurchaseList()
      })
    },
    // 审核动态
    getInboundCheck() {
      this.$get('/inboundCheck/findAllByPaymentContract/' + this.contractId).then((res) => {
        // console.log('res', res)
        if (res.data.success === true) {
          this.inboundCheck = res.data.data
        }
      })
    },
    submitCheck() {
      var obj = {
        step: '',
        stepPerson: '',
        nextStep: '',
        nextStepPerson: '',
        paymentContract: {
          id: this.contractId
        },
        result: '提交审核',
        time: ''
      }
      this.$post('/inboundCheck/save', obj).then((res) => {
        this.getInboundCheck()
      })
    },
    // 打印入库单
    printInBound() {
      this.$emit('showData', true)
    }
  },
  watch: {
    actionTab(data) {
      // console.log(data)
    },
    InboundList(list) {
      list.forEach((item) => {
        if (item.edit === true) {
          console.log('isEditing')
          this.disableCheck = true
        } else {
          this.disableCheck = false
        }
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
  .commont-btn {
    text-align: right;
    margin: 10px 0;
  }
}

</style>
