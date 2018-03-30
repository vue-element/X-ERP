<template>
  <div class="disclosure-info-container form-container" ref="ele">
    <div class="commont-btn edit-btn" v-show="editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="contractBasis" ref="contractBasis" class="basic">
      <div class="form-module">
        <h4 class="module-title">
          <p>资金来源</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="资金来源：">
              <p v-if="disabled">{{contractBasis.sourceFunds}}</p>
              <el-select v-else v-model="contractBasis.sourceFunds" placeholder="请选择资金来源">
                  <el-option v-for="item in sourceFundsList" :label="item.value" :value="item.value" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="cost form-module">
        <h4 class="module-title">
          <p>交底支出</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="材料成本：">
              <p v-if="disabled">{{contractBasis.materialCost}}</p>
              <el-input v-else v-model="contractBasis.materialCost" placeholder="请输入材料成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="人工成本：">
              <p v-if="disabled">{{contractBasis.artificialCost}}</p>
              <el-input v-else v-model.number="contractBasis.artificialCost" placeholder="请输入人工成本"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="综合成本：">
              <p v-if="disabled">{{contractBasis.comprehensiveCost}}</p>
              <el-input v-else v-model="contractBasis.comprehensiveCost" placeholder="请输入综合成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="管理费用：">
              <p v-if="disabled">{{contractBasis.manageCost}}</p>
              <el-input v-else v-model="contractBasis.manageCost" placeholder="请输入管理费用"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="税金：">
              <p v-if="disabled">{{contractBasis.tax}}</p>
              <el-input v-else v-model="contractBasis.tax" placeholder="请输入税金"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="profit form-module">
        <h4 class="module-title">
          <p>计划利润</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="毛利润">
              <p v-if="disabled">{{contractBasis.profit}}</p>
              <el-input v-else v-model="contractBasis.profit" placeholder="请输入毛利润"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="毛利润率">
              <p v-if="disabled">{{contractBasis.profitRate}}</p>
              <el-input v-else v-model="contractBasis.profitRate" placeholder="请输入毛利润率"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="btn" v-show="!disabled">
        <div class="common-btn" @click="add" :loading="loading">保&nbsp;&nbsp;&nbsp;存</div>
        <div class="common-btn" @click="reset">重&nbsp;&nbsp;&nbsp;置</div>
        <div class="common-btn" @click="cancel">取&nbsp;&nbsp;&nbsp;消</div>
      </div>
    </el-form>
    <!-- 回款计划 -->
    <div class="list form-module" style="margin-top:20px;">
      <h4 class="module-title">
        <p>回款计划</p>
        <el-button type="text" class="up-files common-btn" @click="clickPlanBox">新增回款</el-button>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="receiveData" ref="multipleTable" border>
          <el-table-column prop="0" label="序号" width="80" fixed>
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="paymentCondition" label="回款条件" width="300"></el-table-column>
          <el-table-column prop="date" label="计划回款时间"></el-table-column>
          <el-table-column prop="ratio" label="计划回款比例(%)"></el-table-column>
          <el-table-column prop="amount" label="计划回款金额"></el-table-column>
          <el-table-column prop="cumulativeAmount" label="计划回款累计金额"></el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button @click="paymentPlanModify(scope.row.id)" type="text" size="small">修改</el-button>
              <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 新增回款计划弹窗 -->
    <el-dialog title="回款计划" :visible.sync="planBox" :modal-append-to-body="false">
      <el-form :model="paymentPlan">
        <el-form-item label="回款条件：" class="textarea">
          <el-input type="textarea" v-model="paymentPlan.paymentCondition"></el-input>
        </el-form-item>
        <el-form-item label="计划回款比例(%)：">
          <el-input v-model="paymentPlan.ratio"></el-input>
        </el-form-item>
        <el-form-item label="计划回款金额(元)：">
          <el-input v-model="paymentPlan.amount"></el-input>
        </el-form-item>
        <el-form-item class="single-date" label="计划回款时间：">
          <el-date-picker v-model="paymentPlan.date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="paymentPlanSave">保&nbsp;&nbsp;&nbsp;存</el-button>
        <el-button size="small" @click="planBox = false">取&nbsp;&nbsp;&nbsp;消</el-button>
      </div>
    </el-dialog>
    <!-- 合同交底附加列表 -->
    <div class="list form-module" style="margin-top:40px;">
      <h4 class="module-title">
        <p>合同交底附件列表</p>
        <el-button class="up-files common-btn" type="text" @click="upFiles">附件上传</el-button>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="disclosureFile" ref="multipleTable" border>
          <el-table-column prop="0" label="序号" width="80" fixed>
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="1" label="附件名称" width="300"></el-table-column>
          <el-table-column prop="2" label="附件说明" width="350"></el-table-column>
          <el-table-column prop="3" label="上传人"></el-table-column>
          <el-table-column prop="4" label="上传时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button @click="modify(scope.row.id)" type="text" size="small">修改</el-button>
              <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 附件件上传弹窗 -->
    <el-dialog title="合同交底附件上传" :visible.sync="upFiles" :modal-append-to-body="false">
      <form>
        <div class="describtion">
          <span>附件说明：</span>
          <textarea rows="4" v-model="fileForm.describtion"></textarea>
        </div>
        <div class="person">
          <span>上传人：</span>
          <input type="text" v-model="fileForm.person">
        </div>
        <div class="upfile">
          <span>附件上传：</span>
          <input type="file" id="fileupload" @change="getFile($event)">
        </div>
        <button class="filebtn" @click="upFile($event)">上传</button>
      </form>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { formatDate } from '@/utils'
import { mapState } from 'vuex'
export default {
  props: ['editData'],
  data() {
    return {
      height: 200,
      currentPage: 1,
      action: 'add',
      editShow: false,
      editWord: '编辑',
      disabled: false,
      loading: false,
      sourceFundsList: [],
      // 合同交底信息
      contractBasis: {
        id: '',
        sourceFunds: null,
        materialCost: null,
        artificialCost: null,
        comprehensiveCost: null,
        manageCost: null,
        tax: null,
        profit: null,
        profitRate: null,
        contractInfo: {
          id: ''
        }
      },
      // 回款计划
      receiveData: [],
      planBox: false,
      paymentPlan: {
        paymentCondition: '',
        ratio: '',
        amount: '',
        date: '',
        contractBasis: {
          id: ''
        }
      },
      // 附件上传
      upFiles: false,
      disclosureFile: [],
      fileForm: {
        describtion: '',
        person: '',
        file: ''
      }
    }
  },
  created() {
    this.getInsertData()
    if (this.editData.tabState === 'editTab') {
      this.action = 'edit'
      this.editShow = true
      this.disabled = true
      this.showInfo()
    } else {
      this.action = 'add'
      // var contractMsg = this.$store.state.contractMsg.contractMsg
      var contractMsg = sessionStorage.getItem('contractMsg')
      if (contractMsg) {
        this.disabled = false
      } else {
        this.disabled = true
        return
      }
    }
    // 渲染回款计划表格
    this.paymentPlayShow()
  },
  methods: {
    getInsertData() {
      this.sourceFundsList = [{ value: '酬金制' }, { value: '包干制' }, { value: '本体金' }]
    },
    add() {
      this.loading = true
      if (this.editData.tabState === 'editTab') {
        var data = _.cloneDeep(this.editData.editData)
        this.$get('/contractBasis/findAllByContractInfo/' + data.id).then((res) => {
          if (res.data.success === true) {
            this.contractBasis.id = res.data.data.content[0].id
            this.contractBasis.contractInfo.id = res.data.data.content[0].contractInfo.id
            this.disclosureAdd()
          }
        })
      } else {
        // var contractMsg = this.$store.state.contractMsg.contractMsg
        var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
        this.contractBasis.id = contractMsg.contractBasis.id
        this.contractBasis.contractInfo.id = contractMsg.contractBasis.contractInfo.id
        this.disclosureAdd()
      }
    },
    disclosureAdd() {
      console.log(JSON.stringify(this.contractBasis))
      this.$post('/contractBasis/save', this.contractBasis).then((res) => {
        this.loading = false
        if (res.data.success === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          if (this.action === 'edit') {
            this.$emit('back')
          }
        }
      })
    },
    showInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.$get('/contractBasis/findAllByContractInfo/' + data.id).then((res) => {
        this.contractBasis = res.data.data.content[0]
        this.paymentPlan.contractBasis.id = res.data.data.content[0].id
      })
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.editWord = '编辑'
        this.showInfo()
      } else {
        this.editWord = '取消编辑'
      }
    },
    reset() {
      if (this.action === 'add') {
        this.contractBasis = {
          sourceFunds: '',
          materialCost: '',
          artificialCost: '',
          comprehensiveCost: '',
          manageCost: '',
          tax: '',
          profit: '',
          profitRate: ''
        }
      } else {
        this.showInfo()
      }
    },
    cancel() {
      this.$emit('cancel')
    },
    // 点击新增回款计划前判断是否有合同交底的ID
    clickPlanBox() {
      if (this.contractBasis.id) {
        this.planBox = true
      } else {
        this.$message({
          message: '请先输入合同交底信息'
        })
      }
    },
    // 新增回款计划
    paymentPlanSave() {
      if (this.editData.tabState === 'editTab') {
        var data = _.cloneDeep(this.editData.editData)
        this.$get('/contractBasis/findAllByContractInfo/' + data.id).then((res) => {
          if (res.data.success === true) {
            this.paymentPlan.contractBasis.id = res.data.data.content[0].id
            this.paymentPlanAdd()
          }
        })
      } else {
        // var contractMsg = this.$store.state.contractMsg.contractMsg
        var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
        this.paymentPlan.contractBasis.id = contractMsg.contractBasis.id
        this.paymentPlanAdd()
      }
    },
    paymentPlanAdd() {
      this.$post('/paymentPlan/save', this.paymentPlan).then((res) => {
        this.planBox = false
        if (res.data.success === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.paymentPlayShow()
          this.paymentPlan = {
            paymentCondition: '',
            ratio: '',
            amount: '',
            date: '',
            contractBasis: {
              id: ''
            }
          }
        }
      })
    },
    // 回款计划展示列表
    paymentPlayShow() {
      if (this.editData.tabState === 'editTab') {
        var data = _.cloneDeep(this.editData.editData)
        this.$get('/contractBasis/findAllByContractInfo/' + data.id).then((res) => {
          if (res.data.success === true) {
            var contractBasisID = res.data.data.content[0].id
            this.$get('/paymentPlan/findAllByContractBasis/' + contractBasisID).then((res) => {
              var data = res.data.data
              console.log(data)
              for (var i = 0; i < data.content.length; i++) {
                var date = formatDate(data.content[i].date)
                data.content[i].date = date
              }
              this.receiveData = res.data.data.content
            })
          }
        })
      } else {
        // var contractMsg = this.$store.state.contractMsg.contractMsg
        var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
        var contractBasisID = contractMsg.contractBasis.id
        this.$get('/paymentPlan/findAllByContractBasis/' + contractBasisID).then((res) => {
          this.receiveData = res.data.data.content
        })
      }
    },
    paymentPlanModify(id) {
      this.$get('/paymentPlan/findUpdateData/' + id).then((res) => {
        this.clickPlanBox()
        this.paymentPlan = res.data.data.paymentPlan
        this.paymentPlan.date = formatDate(res.data.data.paymentPlan.date)
      })
    },
    // 回款计划删除数据
    deleteRow(id) {
      var paymentPlanID = { id: [id] }
      this.$post('/paymentPlan/delete/', paymentPlanID).then((res) => {
        if (res.status === 200) {
          this.paymentPlayShow()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    }
    // 数字格式化
    // materialCost(val) {
    //   this.contractBasis.materialCost = outputmoney(val)
    // },
    // artificialCost(val) {
    //   this.contractBasis.artificialCost = outputmoney(val)
    // },
    // comprehensiveCost(val) {
    //   this.contractBasis.comprehensiveCost = outputmoney(val)
    // },
    // manageCost(val) {
    //   this.contractBasis.manageCost = outputmoney(val)
    // },
    // tax(val) {
    //   this.contractBasis.tax = outputmoney(val)
    // }
  },
  mounted() {
  },
  computed: {
    ...mapState(['contractMsg'])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.disclosure-info-container.form-container{
  margin-top:140px;
  &::-webkit-scrollbar{
    width:0;
  }
  .btn{
    text-align:center;
    div.common-btn{
      display:inline-block;
      cursor:pointer;
    }
  }
  .list.form-module{
    .module-title{
      position:relative;
      .up-files{
        background-color:#35d5ba;
        color:white;
        line-height:0;
        position:absolute;
        top:-20px;
        right:0;
      }
    }
  }
  .describtion,
  .person,
  .upfile{
    font-size: 15px;
    color: black;
    margin: 15px 10% 20px;
    span{
      display: inline-block;
      width: 100px;
      height: 30px;
      text-align: right;
      vertical-align: top;
    }
    textarea{
      resize: both;
      max-width: 70%;
      min-width: 70%
    }
    textarea,
    input[type="text"]{
      &::-webkit-scrollbar{
        width: 0;
      }
      margin-left: 5px;
      padding-left: 8px;
      width: 70%;
      line-height: 26px;
      border: 1px solid #828282;
      border-radius: 5px;
      box-sizing: border-box;
    }
    input[type="file"]{
      margin-left: 7px;
    }
  }
  button.filebtn{
    font-size: 15px;
    margin: 0 0 20px 45%;
    width: 10%;
    height: 30px;
    background-color: #35d5ba;
    border: 1px solid #35d5ba;
    border-radius: 8px;
    color: #fff;
    cursor: pointer;
  }
}
</style>
