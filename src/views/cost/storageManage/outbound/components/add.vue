<template>
  <div class="payment-contract-add">
    <div class="inner-tab-toggle">
      <ul>
        <li :class="actionTab === 'inboundInfo' ? 'is-active' : ''" @click="toggleTab('inboundInfo')">出库填写</li>
        <li :class="actionTab === 'officeCheck' ? 'is-active' : ''" @click="toggleTab('officeCheck')">办事处审核</li>
        <li :class="actionTab === 'costCheck' ? 'is-active' : ''" @click="toggleTab('costCheck')">成本部审核</li>
      </ul>
    </div>
    <div class="form-container">
      <div class="commont-btn edit-btn" v-show="editShow">
        <el-button @click="toggleEditBtn">{{editWord}}</el-button>
      </div>
      <el-form :model="outboundInfo" :rules="rules" ref="outboundInfo">
        <div class="form-module">
          <h4 class="module-title">
            <p>出库信息:</p>
          </h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="付款合同编号:" prop="paymentContract">
                <p v-if="disabled">{{outboundInfo.paymentContract.code}}</p>
                <el-select v-else v-model="outboundInfo.paymentContract.id" placeholder="请选择付款合同编号" filterable>
                 <el-option v-for="item in paymentContractList" :label="item.code" :value="item.id" :key="item.id">
                 </el-option>
               </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="项目:">
                <p v-if="disabled">{{outboundInfo.paymentContract.project}}</p>
                <el-select v-else v-model="outboundInfo.paymentContract.id" placeholder="自动生成" disabled>
                 <el-option v-for="item in paymentContractList" :label="item.project" :value="item.id" :key="item.id">
                 </el-option>
               </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="出库单编号:"  prop="code">
                <p v-if="disabled">{{outboundInfo.code}}</p>
                <el-input v-else v-model="outboundInfo.code" placeholder="请输入出库单编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="办事处:">
                <p v-if="disabled">{{outboundInfo.paymentContract.department}}</p>
                <el-select v-else v-model="outboundInfo.paymentContract.id" placeholder="自动生成" disabled>
                 <el-option v-for="item in paymentContractList" :label="item.department" :value="item.id" :key="item.id">
                 </el-option>
               </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="出库日期:" class="single-date" prop="date">
                <p v-if="disabled">{{outboundInfo.date}}</p>
                <el-date-picker  v-else type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="outboundInfo.date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="commont-btn"  v-show="!disabled">
          <el-button :loading="loading" @click="save">保存</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
        <table-component :outboundId="outboundId" :editShow="editShow" :paymentContractId="paymentContractId" :actionTab="actionTab"></table-component>
      </el-form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import tableComponent from './table.vue'
export default {
  props: ['editData'],
  components: { tableComponent },
  data() {
    var validatePC = (rules, value, callback) => {
      if (!value.id) {
        callback(new Error('请选择付款合同编号'))
      } else {
        callback()
      }
    }
    return {
      action: 'add',
      actionTab: 'inboundInfo',
      editWord: '编辑',
      loading: false,
      disabled: false,
      editShow: false,
      outboundInfo: {
        code: '出库单编号',
        paymentContract: { id: '' },
        date: ''
      },
      paymentContractList: [],
      contractList: [],
      projectList: [],
      regionList: [],
      paymentContractId: '',
      contractId: '',
      outboundId: '',
      rules: {
        paymentContract: [{ required: true, validator: validatePC, trigger: 'change' }],
        date: [{ required: true, message: '请输入出库日期', trigger: 'blur' }]
      },
      temp: {}
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.outboundInfo)
  },
  methods: {
    save() {
      this.$refs.outboundInfo.validate((valid) => {
        if (valid) {
          this.$post('/outboundList/save', this.outboundInfo).then(res => {
            this.loading = false
            if (res.data.success === true) {
              this.outboundInfo = res.data.data
              this.outboundId = this.outboundInfo.id
              this.paymentContractId = this.outboundInfo.paymentContract.id
              this.successSave()
            } else {
              this.failSave()
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message({
            message: '信息未填写完整',
            type: 'warning'
          })
          return false
        }
      })
    },
    reset() {
      this.outboundInfo = _.cloneDeep(this.temp)
      this.editInfo()
    },
    cancel() {
      this.$emit('toggleTab')
    },
    editInfo() {
      this.outboundInfo = this.outboundInfo.outboundList
      this.paymentContractId = this.outboundInfo.paymentContract.id
      this.outboundId = this.outboundInfo.id
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.editWord = '编辑'
        this.outboundInfo = _.cloneDeep(this.temp)
        this.editInfo()
      } else {
        this.editWord = '取消编辑'
      }
    },
    toggleTab(tab) {
      this.actionTab = tab
    },
    getInsertData() {
      this.$get('/outboundList/findInsertData').then((res) => {
        var data = res.data.data
        this.paymentContractList = data.paymentContractList || []
        this.contractList = data.contractInfoList || []
        this.projectList = data.projectList || []
        this.regionList = data.regionList || []
      })
    },
    toggleAction() {
      if (this.editData.tabState === 'addTab') {
        this.action = 'add'
        this.disabled = false
        this.editShow = false
      } else {
        this.action = 'edit'
        this.disabled = true
        this.editShow = true
        this.outboundInfo = this.editData.editData
        this.editInfo()
      }
    },
    successSave() {
      this.$emit('changeObj', false)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      this.editShow = true
      this.disabled = true
    },
    failSave() {
      this.$message({
        message: '保存失败',
        type: 'error'
      })
    }
  },
  computed: {},
  watch: {
    disabled(status) {
      if (status === false) {
        this.editWord = '取消编辑'
        this.$emit('changeObj', true)
      } else {
        this.editWord = '编辑'
      }
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.payment-contract-add {
  .form-container{
    margin-top:50px;
    .edit-btn {
      margin: 0;
      button {
        float: right;
      }
    }
  }
}
</style>
