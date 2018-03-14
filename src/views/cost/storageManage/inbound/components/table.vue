<template>
  <div class="payment-contract">
    <div v-show="actionTab === 'inboundInfo' || actionTab === 'officeCheck'">
      <div class="form-module">
        <h4 class="module-title">
          <p>入库验收</p>
        </h4>
        <el-row>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-table class="basic-form" style="width: 100%" :data="purchaseList" v-loading.body="listLoading">
              <el-table-column label="发货明细">
                <el-table-column label="序号">
                  <template slot-scope="scope">{{scope.$index + 1}}</template>
                </el-table-column>
                <el-table-column label="物料名称">
                  <template slot-scope="scope"><span>{{scope.row.name}}</span></template>
                </el-table-column>
                <el-table-column label="规格型号">
                  <template slot-scope="scope"><span>{{scope.row.model}}</span></template>
                </el-table-column>
                <el-table-column label="品牌">
                  <template slot-scope="scope"><span>{{scope.row.brand}}</span></template>
                </el-table-column>
                <el-table-column label="采购数量">
                  <template slot-scope="scope"><span>{{scope.row.number}}</span></template>
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
                <el-table-column label="操作" style="display: none">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.edit" @click.native.prevent="confirmEdit(scope.row, scope.$index)" type="text">完成</el-button>
                    <el-button v-else @click.native.prevent='editRow(scope.row, scope.$index)' type="text">修改</el-button>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="commont-btn"  v-show="actionTab === 'inboundInfo'">
          <el-button :loading="checkLoading" @click="submitCheck" :disabled="disableCheck">提交审核</el-button>
        </div>
        <div class="commont-btn"  v-show="actionTab === 'officeCheck'">
          <el-button :loading="false">通过审核</el-button>
          <el-button :loading="false">导出入库单</el-button>
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
            <el-table class="basic-form" style="width: 100%" :data="purchaseList" v-loading.body="listLoading">
              <el-table-column label="序号">
                <template slot-scope="scope">{{scope.$index + 1}}</template>
              </el-table-column>
              <el-table-column label="物料名称">
                <template slot-scope="scope"><span>{{scope.row.name}}</span></template>
              </el-table-column>
              <el-table-column label="规格型号">
                <template slot-scope="scope"><span>{{scope.row.model}}</span></template>
              </el-table-column>
              <el-table-column label="品牌">
                <template slot-scope="scope"><span>{{scope.row.brand}}</span></template>
              </el-table-column>
              <el-table-column label="采购单价">
                <template slot-scope="scope"><span>{{scope.row.unitPrice}}</span></template>
              </el-table-column>
              <el-table-column label="数量">
                <template slot-scope="scope"><span>{{scope.row.number}}</span></template>
              </el-table-column>
              <el-table-column label="单个成本">
                <template slot-scope="scope"><span>{{scope.row.number}}</span></template>
              </el-table-column>
              <el-table-column label="单个抵扣税金">
                <template slot-scope="scope"><span>{{scope.row.number}}</span></template>
              </el-table-column>
              <el-table-column label="合计">
                <template slot-scope="scope"><span>{{scope.row.totalAmount}}</span></template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="commont-btn">
          <el-button :loading="false">通过审核</el-button>
          <el-button :loading="false">导出入库单</el-button>
          <el-button :loading="false">导出入库成本核算表</el-button>
          <el-button :loading="false">导出出库成本核算表</el-button>
          <el-button :loading="false">退回填写</el-button>
        </div>
      </div>
    </div>
    <div class="form-module">
      <h4 class="module-title">
        <p>审核动态</p>
      </h4>
      <el-table class="basic-form" style="width: 100%" :data="inboundCheck" v-loading.body="listLoading">
        <el-table-column label="序号">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="审核步骤">
          <template slot-scope="scope"><span>{{scope.row.step}}</span></template>
        </el-table-column>
        <el-table-column label="操作人">
          <template slot-scope="scope"><span>{{scope.row.stepPerson}}</span></template>
        </el-table-column>
        <el-table-column label="操作时间">
          <template slot-scope="scope"><span>{{scope.row.time}}</span></template>
        </el-table-column>
        <el-table-column label="审核结果">
          <template slot-scope="scope"><span>{{scope.row.result}}</span></template>
        </el-table-column>
        <el-table-column label="下一步骤">
          <template slot-scope="scope"><span>{{scope.row.nextStep}}</span></template>
        </el-table-column>
        <el-table-column label="下一步骤审核人">
          <template slot-scope="scope"><span>{{scope.row.nextStepPerson}}</span></template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/common.vue'
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
      this.$get('/inboundDetaile/findAllByPaymentContract/' + this.contractId).then((res) => {
        var data = _.cloneDeep(res.data.data)
        console.log('data', data)
        data.forEach((item) => {
          item.edit = false
          item.number = item.purchaseList.number
          item.model = item.purchaseList.model
          item.model = item.purchaseList.model
          item.certificate = '有'
          item.quality = '完好'
          this.purchaseList.push(item.purchaseList)
        })
        this.InboundList = data
      })
    },
    editRow(row, index) {
      console.log('row', row)
      row.edit = true
      Vue.set(this.InboundList, index, row)
    },
    confirmEdit(row, index) {
      row.edit = false
      Vue.set(this.InboundList, index, row)
      this.$post('/inboundDetaile/save', row).then((res) => {

      })
    },
    // 审核动态
    getInboundCheck() {
      this.$get('/inboundCheck/findAllByPaymentContract/' + this.contractId).then((res) => {
        console.log('res', res)
        if (res.data.success === true) {
          this.inboundCheck = res.data.data
        }
      })
    },
    submitCheck() {
      var obj = {
        step: '1',
        stepPerson: '1',
        nextStep: '2',
        nextStepPerson: '',
        paymentContract: {
          id: this.contractId
        },
        result: '提交审核',
        time: ''
      }
      console.log('submit', JSON.stringify(obj))
      this.$post('/inboundCheck/save', obj).then((res) => {
        console.log(res)
        this.getInboundCheck()
      })
    }
  },
  watch: {
    actionTab(data) {
      console.log(data)
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
