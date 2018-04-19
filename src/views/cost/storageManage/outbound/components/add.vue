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
      <div class="container" v-if="container">
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
        <table-component :outboundId="outboundId" :editShow="editShow" :paymentContractId="paymentContractId" :actionTab="actionTab" @outBound="outBound"></table-component>
      </div>
      <!-- 出库单 -->
      <div class="printTable" v-if="outBoundTable">
        <div id="form_print">
          <div class="container">
            <h3>物料验收出库单</h3>
            <form class="head" :model="outboundInfo">
              <div class="left">
                <label>使用部门：<span>{{outboundInfo.inboundList.paymentContract.department}}</span></label>
                <label>使用项目：<span>{{outboundInfo.inboundList.paymentContract.contractInfo.name}}</span></label>
              </div>
              <div class="right">
                <label>出库单号：<span>{{outboundInfo.inboundList.code}}</span></label>
                <label>出库日期：<span>{{outboundInfo.date}}</span></label>
              </div>
            </form>
            <table border="1" cellspacing="0" cellpadding="0" :data="outboundList">
              <thead>
                <tr height="50">
                  <th>序号</th>
                  <th>物料名称</th>
                  <th>规格型号</th>
                  <th>品牌</th>
                  <th>出库数量</th>
                  <th>采购计划单号</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in outboundList">
                  <td>{{item.index}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.model}}</td>
                  <td>{{item.brand}}</td>
                  <td>{{item.number}}</td>
                  <td>{{item.purchaseList.paymentContract.code}}</td>
                </tr>
              </tbody>
            </table>
            <form class="footer">
              <div class="left">
                <label>制表：<span>卓惠敏</span></label>
              </div>
              <div class="right">
                <label>审核：<span>罗艺</span></label>
              </div>
            </form>
          </div>
        </div>
        <div class="btn">
          <el-button @click="back">返回</el-button>
          <el-button @click="doPrint">打印</el-button>
        </div>
      </div>
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
      temp: {},
      // 出库打印
      container: true,
      outBoundTable: false,
      outboundList: []
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.getOutboundList()
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
      this.container = true
      this.outBoundTable = false
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
    },
    // 出库单打印
    outBound(status) {
      this.outBoundTable = status
      this.container = false
    },
    back() {
      this.container = true
      this.outBoundTable = false
    },
    getOutboundList() {
      var outboundList = []
      this.$get('/outboundDetaile/findByOutboundList/' + this.outboundId).then((res) => {
        var data = res.data.data.content
        data.forEach((item, index) => {
          item.index = index + 1
          item.name = item.purchaseList.name
          item.brand = item.purchaseList.brand
          item.model = item.purchaseList.model
          outboundList.push(item)
        })
        this.outboundList = outboundList
      })
    },
    doPrint() {
      var form_print = document.getElementById('form_print')
      var newStr = form_print.innerHTML
      var oldStr = document.body.innerHTML
      document.body.innerHTML = newStr
      window.print()
      window.location.reload()
      document.body.innerHTML = oldStr
      return false
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
    .printTable{
      #form_print{
        text-align: center;
        margin-bottom: 50px;
        .container{
          display: inline-block;
          font-size: 15px;
          h3{
            margin: 20px 0;
            font-size: 22px;
            font-weight: 500;
          }
          .head{
            display: flex;
            label{
              line-height: 20px;
            }
            .left{
              flex: 55%;
              margin-left: 30px;
            }
            .right{
              flex: 45%;
            }
          }
          table{
            height: 200px;
            margin: 10px 0 30px;
            border-collapse: collapse;
            overflow-y: scroll;
            font-size: 14px;
            th, td{
              padding: 20px;
              height: 35px;
            }
            td{
              word-wrap: break-word;
            }
          }
          label{
            font-weight: 700;
            text-align: left;
            display: block;
            margin-bottom: 10px;
            line-height: 25px;
          }
          .footer{
            display: flex;
            .left{
              flex: 40%;
            }
            .right{
              flex: 60%;
            }
            label{
              text-align: center;
            }
          }
        }
      }
      .btn{
        background-color: white;
        text-align: center;
        position: fixed;
        bottom: 31px;
        left: 245px;
        right: 50px;
        height: 50px;
        line-height: 50px;
        .el-button{
          line-height: 0.4;
          background-color: #35d5ba;
          border-color: #35d5ba;
          color: white;
        }
      }
    }
  }
}
@page{
  size: auto;
  margin: 4mm;
}
@media print{
  #form_print{
    text-align: center;
  }
  h3{
    text-align: center;
    margin: 60px 0 30px;
    font-size: 24px;
    font-weight: 500;
  }
  .head{
    display: flex;
  }
  .head .right,
  .head .left{
    flex: 1;
    margin-left: 30px;
  }
  label{
    line-height: 20px;
    text-align: left;
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
  }
  span{
    font-weight: 100;
  }
  table {
    margin: 10px 10px 30px;
    border-collapse: collapse;
  }
  th, td{
    max-width: 80px;
    min-width:70px;
    padding:5px;
    font-size: 12px;
    word-wrap: break-word;
    text-align: center;
    font-weight: 400;
  }
  .footer{
    display: flex;
  }
  .footer .left{
    flex: 40%;
  }
  .footer .right{
    flex: 60%;
  }
  .footer label{
    text-align: center;
  }
}
</style>
