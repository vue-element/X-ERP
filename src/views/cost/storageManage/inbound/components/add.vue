<template>
  <div class="payment-contract-add">
    <div class="inner-tab-toggle">
      <ul>
        <li :class="actionTab === 'inboundInfo' ? 'is-active' : ''" @click="toggleTab('inboundInfo')">入库填写</li>
        <li :class="actionTab === 'officeCheck' ? 'is-active' : ''" @click="toggleTab('officeCheck')">办事处审核</li>
        <li :class="actionTab === 'costCheck' ? 'is-active' : ''" @click="toggleTab('costCheck')">成本部审核</li>
      </ul>
    </div>
    <div class="form-container">
      <el-form :model="inboundList" :rules="rules" ref="inboundList" v-if="container">
        <div class="form-module">
          <h4 class="module-title"><p>入库信息:</p></h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="付款合同编号/入库单号:">
                <p v-if="disabled">{{inboundList.paymentContract.code}}</p>
                <el-input v-else v-model="inboundList.paymentContract.code" placeholder="请输入付款合同编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="订单编号:">
                <p v-if="disabled">{{inboundList.paymentContract.orderCode}}</p>
                <el-input v-else v-model="inboundList.paymentContract.orderCode" placeholder="请输入订单编号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="入库成本核算表号:">
                <p v-if="disabled">{{inboundList.tableCode}}</p>
                <el-input v-else v-model="inboundList.tableCode" placeholder="请输入入库单编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="供应商:">
                <p v-if="disabled">{{inboundList.paymentContract.supply.name}}</p>
                <el-input v-else v-model="inboundList.paymentContract.supply.name" placeholder="请输入供应商"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="办事处:">
                <p v-if="disabled">{{inboundList.paymentContract.department}}</p>
                <el-input v-else v-model="inboundList.paymentContract.department" placeholder="请输入办事处"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="入库日期:" class="single-date">
                <p v-if="disabled">{{inboundList.date}}</p>
                <el-date-picker v-else type="date" v-model="inboundList.date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <table-component :inboundId="inboundId" :paymentContractId="paymentContractId" :editShow="editShow" :actionTab="actionTab" @InBound="InBound" @InBoundPay="InBoundPay" @outBoundPay="outBoundPay"></table-component>
      </el-form>
      <!-- 入库单 -->
      <div class="printTable" v-if="InboundTable">
        <div id="form_print">
          <div class="container">
            <h3>物料验收入库单</h3>
            <form class="head" :model="inboundList">
              <div class="left">
                <label>供应商：<span>{{inboundList.paymentContract.supply.name}}</span></label>
                <label>使用部门：<span>{{inboundList.paymentContract.department}}</span></label>
                <label>使用项目：<span>{{inboundList.paymentContract.contractInfo.name}}</span></label>
              </div>
              <div class="right">
                <label>入库单号：<span>{{inboundList.code}}</span></label>
                <label>入库日期：<span>{{inboundList.date}}</span></label>
              </div>
            </form>
            <table border="1" cellspacing="0" cellpadding="0" :data="InboundList">
              <thead>
                <tr height="30">
                  <th colspan="5">发货明细</th>
                  <th colspan="4">验收明细</th>
                </tr>
                <tr height="50">
                  <th>序号</th>
                  <th>物料名称</th>
                  <th>规格型号</th>
                  <th>品牌</th>
                  <th>采购数量</th>
                  <th>实收数量</th>
                  <th>核对型号</th>
                  <th>质量、外观(完好/破损)</th>
                  <th>合格证(有/无)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in InboundList">
                  <td>{{item.index}}</td>
                  <td>{{item.purchaseList.name}}</td>
                  <td>{{item.purchaseList.model}}</td>
                  <td>{{item.purchaseList.brand}}</td>
                  <td>{{item.purchaseList.acNumber}}</td>
                  <td>{{item.number}}</td>
                  <td>{{item.model}}</td>
                  <td>{{item.quality}}</td>
                  <td>{{item.certificate}}</td>
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
      <!-- 入库核算表 -->
      <div class="printTable" v-if="InboundPayTable">
        <div id="form_print">
          <div class="container">
            <h3>物料入库成本核算表</h3>
            <form class="head" :model="inboundList">
              <div class="left">
                <label>供应商：<span>{{inboundList.paymentContract.supply.name}}</span></label>
                <label>使用部门：<span>{{inboundList.paymentContract.department}}</span></label>
                <label>使用项目：<span>{{inboundList.paymentContract.contractInfo.name}}</span></label>
              </div>
              <div class="right">
                <label>入库核算表号：<span>{{inboundList.tableCode}}</span></label>
                <label>制表日期：<span>{{inboundList.date}}</span></label>
              </div>
            </form>
            <table border="1" cellspacing="0" cellpadding="0">
              <thead>
                <tr height="50">
                  <th>序号</th>
                  <th>物料名称</th>
                  <th>规格型号</th>
                  <th>品牌</th>
                  <th>采购单价</th>
                  <th>数量</th>
                  <th>单个成本</th>
                  <th>单个可抵扣税金</th>
                  <th>合计</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in InboundList">
                  <td>{{item.index}}</td>
                  <td>{{item.purchaseList.name}}</td>
                  <td>{{item.purchaseList.model}}</td>
                  <td>{{item.purchaseList.brand}}</td>
                  <td>{{item.purchaseList.unitPrice}}</td>
                  <td>{{item.number}}</td>
                  <td>{{item.unitCost}}</td>
                  <td>{{item.unitTaxFee}}</td>
                  <td>{{item.totalAmount}}</td>
                </tr>
                <tr>
                  <td colspan="8">合计</td>
                  <td>{{this.total}}</td>
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
      <!-- 出库核算表 -->
      <div class="printTable" v-if="outboundPayTable">
        <div id="form_print">
          <div class="container">
            <h3>物料出库成本核算表</h3>
            <form class="head" :model="inboundList">
              <div class="left">
                <label>供应商：<span>{{inboundList.paymentContract.supply.name}}</span></label>
                <label>使用部门：<span>{{inboundList.paymentContract.department}}</span></label>
                <label>使用项目：<span>{{inboundList.paymentContract.contractInfo.name}}</span></label>
              </div>
              <div class="right">
                <label>出库核算表号：<span>{{inboundList.tableCode}}</span></label>
                <label>制表日期：<span>{{inboundList.date}}</span></label>
              </div>
            </form>
            <table border="1" cellspacing="0" cellpadding="0">
              <thead>
                <tr height="50">
                  <th>序号</th>
                  <th>物料名称</th>
                  <th>规格型号</th>
                  <th>品牌</th>
                  <th>采购单价</th>
                  <th>数量</th>
                  <th>单个成本</th>
                  <th>单个可抵扣税金</th>
                  <th>合计</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in InboundList">
                  <td>{{item.index}}</td>
                  <td>{{item.purchaseList.name}}</td>
                  <td>{{item.purchaseList.model}}</td>
                  <td>{{item.purchaseList.brand}}</td>
                  <td>{{item.purchaseList.unitPrice}}</td>
                  <td>{{item.number}}</td>
                  <td>{{item.unitCost}}</td>
                  <td>{{item.unitTaxFee}}</td>
                  <td>{{item.totalAmount}}</td>
                </tr>
                <tr>
                  <td colspan="8">合计</td>
                  <td>{{this.total}}</td>
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
import { returnFloat } from '@/utils'
export default {
  props: ['editData'],
  components: { tableComponent },
  data() {
    return {
      action: 'add',
      actionTab: 'inboundInfo',
      loading: false,
      disabled: false,
      editShow: false,
      inboundList: {},
      businessList: [],
      categoryList: [],
      supplyList: [],
      contractInfoList: [],
      // 打印
      printTable: false,
      inboundId: '',
      rules: {},
      container: true,
      // 入库单打印
      InboundTable: false,
      InboundList: [],
      // 入库核算表
      InboundPayTable: false,
      total: null,
      // 出库核算表
      outboundPayTable: false
    }
  },
  created() {
    this.getInboundList()
    if (this.editData.tabState === 'addTab') {
      this.action = 'add'
    } else {
      this.action = 'edit'
      this.editInfo()
      this.disabled = true
      this.editShow = true
    }
  },
  methods: {
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.inboundList = data.inboundList
      this.inboundId = this.inboundList.id
      this.paymentContractId = this.inboundList.paymentContract.id
    },
    toggleTab(tab) {
      this.actionTab = tab
      this.container = true
      this.InboundTable = false
      this.InboundPayTable = false
      this.outboundPayTable = false
    },
    // 打印入库
    InBound(status) {
      this.InboundTable = status
      this.container = false
    },
    // 返回
    back() {
      this.container = true
      this.InboundTable = false
      this.InboundPayTable = false
      this.outboundPayTable = false
    },
    // 数据获取
    getInboundList() {
      var data = _.cloneDeep(this.editData.editData)
      this.paymentContractId = data.inboundList.paymentContract.id
      this.$get('/inboundDetaile/findAllByPaymentContract/' + this.paymentContractId).then((res) => {
        var data = _.cloneDeep(res.data.data) || []
        var arr = []
        data.forEach((item, index) => {
          item.index = index + 1
          item.number = item.number ? item.number : item.purchaseList.number
          item.model = item.model ? item.model : item.purchaseList.model
          item.certificate = item.certificate ? item.certificate : '有'
          item.quality = item.quality ? item.quality : '完好'
          var taxRate = item.purchaseList.paymentContract.supply.taxRate // 税率
          var unitPrice = item.purchaseList.unitPrice // 单价
          item.unitCost = this.unitCost(taxRate, unitPrice) // 单个成本
          item.unitTaxFee = returnFloat(unitPrice - item.unitCost)
          item.totalAmount = returnFloat(item.unitCost * item.number)
          arr.push(item.totalAmount)
        })
        var total = this.getSum(arr)
        this.total = total
        this.InboundList = data
      })
    },
    // 核算表求和
    getSum(arr) {
      var sum = 0
      for (var i = 0; i < arr.length; i++) {
        sum += arr[i]
      }
      return sum
    },
    unitCost (taxRate, unitPrice) {
      taxRate = parseFloat(taxRate) / 100 // 转化税率（小数点）
      return returnFloat(unitPrice / (1 + taxRate)) // 单价中包含税金，并且保留2位小数
    },
    // 入库核算表
    InBoundPay(status) {
      this.InboundPayTable = status
      this.container = false
    },
    // 出库核算表
    outBoundPay(status) {
      this.outboundPayTable = status
      this.container = false
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
  computed: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
              padding: 15px;
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
    font-size: 16px;
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
    font-size: 14px;
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
