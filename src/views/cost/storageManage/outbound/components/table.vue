<template>
  <div class="payment-contract">
    <div class="form-module" v-if="hasPerm('outboundDetaile:findAllByPage')">
      <h4 class="module-title">
        <p @click="uploadTableShow = false">出库清单</p>
        <div class="material-table-head fr">
          <button @click.prevent="showDialog" v-if="hasPerm('outboundDetaile:save') && checkPerm === 'firstStep'">
            <i class="iconfont icon-add"></i>
            <span>新增出库</span>
          </button>
        </div>
      </h4>
      <div>
        <el-table class="basic-form" style="width: 100%" :data="outboundList" v-loading.body="listLoading">
          <el-table-column label="序号">
            <template slot-scope="scope">{{scope.$index + 1}}</template>
          </el-table-column>
          <el-table-column label="物料名称">
            <template slot-scope="scope"><span>{{scope.row.name}}</span></template>
          </el-table-column>
          <el-table-column label="规格型号">
            <template slot-scope="scope"><span>{{scope.row.model}}</span></template>
          </el-table-column>s
          <el-table-column label="品牌">
            <template slot-scope="scope"><span>{{scope.row.brand}}</span></template>
          </el-table-column>
          <el-table-column label="出库数量">
            <template slot-scope="scope">
              <input v-if="scope.row.edit" type="text" v-model="scope.row.number" placeholder="请填写" clearable>
              <span v-else>{{scope.row.number}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" v-if="(hasPerm('outboundDetaile:save') || hasPerm('outboundDetaile:delete')) && checkPerm === 'firstStep'">
            <template slot-scope="scope">
              <el-button v-show="hasPerm('outboundDetaile:save') && scope.row.edit" @click.native.prevent="confirmEdit(scope.row, scope.$index)" type="text">完成</el-button>
              <el-button v-show="hasPerm('outboundDetaile:save') && !scope.row.edit" @click.native.prevent='editRow(scope.row, scope.$index)' type="text">编辑</el-button>
              <el-button v-if="hasPerm('outboundDetaile:delete')" @click.native.prevent="deleteRow(scope.row.id, scope.$index)" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--  办事处填写 -->
        <div class="commont-btn" v-show="actionTab ==='inboundInfo' && outboundList.length !== 0">
          <el-button @click.prevent="submitCheck('提交审核')"
          :disabled="disableCheck || (checkPerm !== 'firstStep' && checkPerm !== 'tjsh')">提交审核</el-button>
        </div>
        <!--  办事处经理填写 -->
        <div class="commont-btn" v-show="actionTab ==='officeCheck' && checkPerm !=='firstStep' && checkPerm !=='tjsh'">
          <el-button @click.prevent="submitCheck('审核通过')" :disabled="checkPerm !=='shtg'">通过审核</el-button>
          <el-button @click="outBound" v-show="checkPerm ==='lastStep'">导出出库单</el-button>
          <el-button @click.prevent="submitCheck('退回填写')" :disabled="checkPerm !=='shtg'">退回填写</el-button>
        </div>
        <!--  成本部填写 -->
        <div class="commont-btn" v-show="actionTab ==='costCheck' && (checkPerm ==='cbhs' || checkPerm ==='lastStep')">
          <el-button @click="outBound">导出出库单</el-button>
        </div>
      </div>
    </div>
    <!-- 审核动态 -->
    <div class="form-module" v-if="hasPerm('outboundCheck:findByOutboundList')">
      <h4 class="module-title">
        <p>审核动态</p>
      </h4>
      <el-table class="basic-form" style="width: 100%" :data="outboundCheck" v-loading.body="listLoading">
        <el-table-column label="序号">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="操作人">
          <template slot-scope="scope"><span>{{scope.row.stepPerson}}</span></template>
        </el-table-column>
        <el-table-column label="操作时间">
          <template slot-scope="scope"><span>{{scope.row.time}}</span></template>
        </el-table-column>
        <el-table-column label="审核结果">
          <template slot-scope="scope"><span>{{scope.row.step}}</span></template>
        </el-table-column>
        <el-table-column label="下一步骤">
          <template slot-scope="scope"><span>{{scope.row.nextStep}}</span></template>
        </el-table-column>
        <el-table-column label="下一步骤审核人">
          <template slot-scope="scope"><span>{{scope.row.nextStepPerson}}</span></template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 弹窗框 -->
    <el-dialog title="出库清单" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
      <el-form :model="outboundInfo">
        <el-form-item label="采购清单" :label-width="formLabelWidth">
          <el-select v-model="outboundInfo.purchaseList.id" placeholder="请选择采购清单" @change="purchaseChange" clearable>
            <el-option v-for="item in purchaseList" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="剩余数量" :label-width="formLabelWidth">
          <el-input v-model="outboundInfo.surplusNumber" auto-complete="off" type="number"  disabled></el-input>
        </el-form-item>
        <el-form-item label="出库数量" :label-width="formLabelWidth">
          <el-input v-model="outboundInfo.number" auto-complete="off" type="number" :max="maxNumber" min="0" @change="numberChange" :disabled="!outboundInfo.purchaseList.id" placeholder="请输入出库数量"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click.native.prevent="addOutbound" :disabled="confirmShow">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/common.vue'
import _ from 'lodash'
import Vue from 'vue'

export default {
  components: { UploadExcelComponent },
  props: ['editShow', 'outboundId', 'paymentContractId', 'actionTab'],
  data() {
    return {
      checkPerm: 'tjsh',
      purchaseList: [],
      uploadDetail: [],
      isDisabled: false,
      uploadTableShow: false,
      listLoading: false,
      downloadLoading: false,
      comfirmUploading: false,
      dialogFormVisible: false,
      outboundInfo: {
        purchaseList: { id: '' },
        outboundList: { id: '' },
        number: '',
        surplusNumber: ''
      },
      maxNumber: 0,
      formLabelWidth: '120px',
      outboundList: [],
      outboundCheck: [],
      disableCheck: false
    }
  },
  created() {
    console.log('actionTab', this.actionTab)
    if (this.paymentContractId) {
      this.getPurchaseList()
    }
    if (this.outboundId) {
      this.getOutboundList()
      this.getOutboundCheck()
    }
  },
  methods: {
    getPurchaseList() {
      this.$get('/inboundDetaile/findAllByPaymentContract/' + this.paymentContractId).then((res) => {
        if (res.data.success === true) {
          var data = res.data.data
          var purchaseList = []
          data.forEach((item) => {
            item.purchaseList.surplusNumber = item.surplusNumber
            purchaseList.push(item.purchaseList)
          })
          this.purchaseList = purchaseList
        }
      })
    },
    getOutboundList() {
      var outboundList = []
      this.$get('/outboundDetaile/findByOutboundList/' + this.outboundId).then((res) => {
        var data = res.data.data.content
        data.forEach((item) => {
          item.name = item.purchaseList.name
          item.brand = item.purchaseList.brand
          item.model = item.purchaseList.model
          outboundList.push(item)
        })
        this.outboundList = outboundList
      })
    },
    showDialog() {
      if (!this.outboundId) {
        this.$message({
          message: '请先填写出库信息',
          type: 'warning'
        })
        this.dialogFormVisible = false
      } else {
        this.outboundInfo = {
          purchaseList: { id: '' },
          outboundList: { id: this.outboundId },
          number: ''
        }
        this.getPurchaseList()
        this.dialogFormVisible = true
      }
    },
    addOutbound() { // 新增出库清单
      this.outboundInfo.outboundList.id = this.outboundId
      var objectList = [this.outboundInfo]
      this.saveOutbound(objectList)
      this.dialogFormVisible = false
    },
    confirmEdit(row, index) { // 修改出库清单
      row.edit = !row.edit
      Vue.set(this.outboundList, index, row)
      var outboundInfo = {
        id: row.id,
        purchaseList: { id: row.purchaseList.id },
        outboundList: { id: this.outboundId },
        number: row.number
      }
      var objectList = [outboundInfo]
      this.saveOutbound(objectList)
    },
    saveOutbound(list) { // 保存出库清单
      var obj = {
        objectList: list
      }
      this.$post('/outboundDetaile/save', obj).then((res) => {
        if (res.data.success === true) {
          this.getOutboundList()
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    editRow(row, index) {
      row.edit = !row.edit
      Vue.set(this.outboundList, index, row)
    },
    deleteRow(id, index) {
      this.$post('/outboundDetaile/delete', { id: [id] }).then((res) => {
        if (res.data.success === true) {
          this.getOutboundList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    // 获取审核动态数组
    getOutboundCheck() {
      this.$get('/outboundCheck/findByOutboundList/' + this.outboundId).then((res) => {
        if (res.data.success === true) {
          this.outboundCheck = res.data.data
          console.log('outboundCheck', this.outboundCheck)
        }
      })
    },
    // 保存出库审核
    submitCheck(stepWord) {
      var obj = {
        step: stepWord,
        outboundList: {
          id: this.outboundId
        }
      }
      var url = ''
      if (stepWord === '提交审核') {
        url = '/outboundCheck/submit'
      } else if (stepWord === '审核通过' || stepWord === '退回填写') {
        url = '/outboundCheck/officeCheck'
      } else if (stepWord === '成本核算') {
        url = '/outboundCheck/costCheck'
      }
      // console.log('submit', JSON.stringify(obj))
      this.$post(url, obj).then((res) => {
        this.getOutboundCheck()
      })
    },
    purchaseChange(val) {
      this.purchaseList.forEach((item) => {
        if (item.id === val) {
          // this.outboundInfo.number = item.acNumber
          this.outboundInfo.surplusNumber = item.surplusNumber
          this.maxNumber = _.cloneDeep(item.surplusNumber)
        }
      })
    },
    numberChange(val) {
      val = parseInt(val)
      var maxNumber = parseInt(this.maxNumber)
      if (val > maxNumber) {
        this.outboundInfo.number = maxNumber
      } else if (val < 0) {
        this.outboundInfo.number = 0
      }
    },
    outBound() {
      // console.log()
      if (this.checkPerm !== 'lastStep') {
        this.submitCheck('成本核算')
      }
      this.$emit('outBound', true)
    }
  },
  watch: {
    outboundId(val) {
      if (val) {
        this.getOutboundCheck()
      }
    },
    outboundList(list) {
      var hasEdit = list.find(item => {
        return item.edit === true
      })
      if (!hasEdit) {
        this.disableCheck = false
      } else {
        this.disableCheck = true
      }
    },
    outboundCheck(list) {
      var checkPerm = ''
      var len = list.length
      if (len === 0) {
        checkPerm = 'firstStep'
      } else {
        var lastStep = list[len - 1].step
        console.log('step', lastStep)
        if (lastStep === '退回填写') {
          checkPerm = 'tjsh'
        } else if (lastStep === '提交审核') {
          checkPerm = 'shtg'
        } else if (lastStep === '审核通过') {
          checkPerm = 'cbhs'
        } else if (lastStep === '成本核算') {
          checkPerm = 'lastStep'
        }
      }
      console.log('checkPerm', checkPerm)
      this.checkPerm = checkPerm
    }
  },
  computed: {
    confirmShow() {
      if (this.outboundInfo.purchaseList.id && this.outboundInfo.number) {
        return false
      } else {
        return true
      }
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
