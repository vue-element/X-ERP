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
        <table-component :inboundId="inboundId" :paymentContractId="paymentContractId" :editShow="editShow" :actionTab="actionTab"></table-component>
      </el-form>
      <!-- 打印入库单 -->
      <div v-if="printTable" class="printTable">
        <div id="form_print">
          <div class="container">
            <h3>物料验收入库单</h3>
            <div class="head">
              <div class="left">
                <label>
                  供应商：<span></span>
                </label>
                <label>
                  使用部门：<span></span>
                </label>
                <label>
                  使用项目：<span></span>
                </label>
              </div>
              <div class="right">
                <label>
                  入库单号：<span></span>
                </label>
                <label>
                  入库日期：<span></span>
                </label>
              </div>
            </div>
            <!-- <table border="1" cellspacing="0" cellpadding="0">
              <thead>
                <tr>
                  <th colspan="5">发货明细</th>
                  <th colspan="4">验收明细</th>
                </tr>
                <tr>
                  <th>序号</th>
                  <th>物料名称</th>
                  <th>规格型号</th>
                  <th>品牌</th>
                  <th>采购单价</th>
                  <th>实收数量</th>
                  <th>核对型号</th>
                  <th>质量、外观(完好/破损)</th>
                  <th>合格证(有/无)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>网络红外枪球摄像机</td>
                  <td>DS-2CD2T26VD-I5(6mm)</td>
                  <td>海康</td>
                  <td>350.0</td>
                  <td>149</td>
                  <td>正确</td>
                  <td>完好</td>
                  <td>有</td>
                </tr>
              </tbody>
            </table> -->

            <el-table class="basic-form" style="width: 100%" :data="InboundList">
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
                  <template slot-scope="scope"><span>{{scope.row.number}}</span></template>
                </el-table-column>
                <el-table-column label="核对型号">
                  <template slot-scope="scope"><span>{{scope.row.model}}</span></template>
                </el-table-column>
                <el-table-column label="质量外观">
                  <template slot-scope="scope"><span>{{scope.row.quality}}</span></template>
                </el-table-column>
                <el-table-column label="合格证">
                  <template slot-scope="scope"><span>{{scope.row.certificate}}</span></template>
                </el-table-column>
              </el-table-column>
            </el-table>

            <div class="footer">
              <div class="left">
                <label>制表：
                  <span></span>
                </label>
              </div>
              <div class="right">
                <label>审核：
                  <span></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <el-button @click="back">返回</el-button>
        <el-button @click="doPrint">打印</el-button>
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
      container: true,
      printTable: false
      inboundId: '',
      rules: {}
    }
  },
  created() {
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
      console.log(data)
      this.inboundList = data.inboundList
      this.inboundId = this.inboundList.id
      this.paymentContractId = this.inboundList.paymentContract.id
    },
    toggleTab(tab) {
      this.container = true
      this.actionTab = tab
    },
    showData(status) {
      this.printTable = status
      this.container = false
    },
    back() {
      this.container = true
      this.printTable = false
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
        .container{
          display: inline-block;
          h3{
            margin: 20px 0;
            font-size: 22px;
            font-weight: 500;
          }
          .head{
            display: flex;
            padding: 0 20px;
            .left,
            .right{
              flex: 1;
            }
            .right{
              margin-left: 40px;
            }
          }
          table{
            margin: 10px 0 30px;
            border-collapse: collapse;
            thead{
              font-size: 14px;
            }
            tbody{
              font-size: 12px;
            }
            th, td{
              max-width: 90px;
              min-width: 70px;
            }
            td{
              word-wrap: break-word;
            }
          }
          label{
            text-align: left;
            display: block;
            margin-bottom: 10px;
          }
          .footer{
            display: flex;
            .left, .right{
              flex: 1;
            }
            label{
              text-align: center;
            }
          }
        }
      }
      .el-button{
        line-height: 0.4;
        background-color: #35d5ba;
        border-color: #35d5ba;
        color: white;
      }
    }
  }
}
@page{
  size: auto;
  margin: 3mm;
}
@media print{
  #form_print{
    text-align: center;
  }
  h3{
    text-align: center;
    margin: 20px 0;
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
    text-align: left;
    display: block;
    margin-bottom: 10px;
    font-size: 17px;
  }
  table {
    margin: 10px 10px 30px;
    border-collapse: collapse;
  }
  th, td{
    max-width: 80px;
    min-width:70px;
    padding:5px;
    font-size: 16px;
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
