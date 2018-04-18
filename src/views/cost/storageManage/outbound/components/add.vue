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
      <div class="commont-btn edit-btn" v-show="hasPerm('outboundList:findUpdateData') && editShow">
        <el-button @click="toggleEditBtn">{{editWord}}</el-button>
      </div>
      <el-form :model="outboundInfo" :rules="rules" ref="outboundInfo">
        <div class="form-module">
          <h4 class="module-title">
            <p>出库信息:</p>
          </h4>
          <el-row :gutter="40">
            <el-col :sm="24" :md="12" :lg="12">
              <el-form-item label="付款合同编号/入库单编号:" prop="inboundList">
                <p v-if="disabled">{{outboundInfo.inboundList.code}}</p>
                <el-select v-else v-model="outboundInfo.inboundList.id" placeholder="请选择付款合同编号" filterable clearable @change="inboundChange">
                 <el-option v-for="item in inboundList" :label="item.code" :value="item.id" :key="item.id">
                 </el-option>
               </el-select>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :lg="12">
              <el-form-item label="项目:">
                <p v-if="disabled">{{outboundInfo.inboundList.paymentContract.contractInfo.name}}</p>
                <el-input v-else v-model="projectName" placeholder="自动生成" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :sm="24" :md="12" :lg="12">
              <el-form-item label="出库单编号:"  prop="code">
                <p v-if="disabled">{{outboundInfo.code}}</p>
                <el-input v-else v-model="outboundInfo.code" placeholder="请输入出库单编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :sm="24" :md="12" :lg="12">
              <el-form-item label="办事处:">
                <p v-if="disabled">{{outboundInfo.inboundList.paymentContract.department}}</p>
               <el-input v-else v-model="departmentName" placeholder="自动生成" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :sm="24" :md="12" :lg="12">
              <el-form-item label="出库日期:" class="single-date" prop="date">
                <p v-if="disabled">{{outboundInfo.date}}</p>
                <el-date-picker  v-else type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="outboundInfo.date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="commont-btn"  v-show="hasPerm('outboundList:save') && !disabled">
          <el-button :loading="loading" @click="save">保存</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-form>
      <table-component :outboundId="outboundId" :editShow="editShow" :paymentContractId="paymentContractId" :actionTab="actionTab"></table-component>
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
        inboundList: { id: '' },
        date: ''
      },
      projectName: '',
      departmentName: '',
      inboundList: [],
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
              this.paymentContractId = this.outboundInfo.inboundList.paymentContract.id
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
      this.outboundId = this.outboundInfo.id
      this.paymentContractId = this.outboundInfo.inboundList.paymentContract.id
      if (this.outboundId) {
        this.projectName = this.outboundInfo.inboundList.paymentContract.contractInfo.name
        this.departmentName = this.outboundInfo.inboundList.paymentContract.department
      }
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
        this.inboundList = data.inboundListArrary || []
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
        this.outboundInfo = this.editData.editData.outboundList
        // console.log('outboundInfo', this.outboundInfo)
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
    },
    // 根据付款合同编号，自动生成项目，办事处
    inboundChange(id) {
      var obj = this.inboundList.find((item) => {
        return item.id === id
      })
      this.projectName = obj.paymentContract.contractInfo.name
      this.departmentName = obj.paymentContract.department
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
