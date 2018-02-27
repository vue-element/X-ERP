<template>
  <div class="disclosure-info-container form-container" ref="ele">
    <div class="commont-btn edit-btn" v-show="editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <div class="commont-btn edit-btn" v-show="addShow">
      <el-button @click="toggleAddBtn">{{addWord}}</el-button>
    </div>
    <el-form :model="ContractBasis" ref="ContractBasis" class="basic">
      <div class="form-module">
        <h4 class="module-title">
          <p>资金来源</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="资金来源：">
              <p v-if="disabled">{{ContractBasis.sourceFunds}}</p>
              <el-select v-else v-model="ContractBasis.sourceFunds" placeholder="请选择资金来源">
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
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="材料成本：">
              <p v-if="disabled">{{ContractBasis.materialCost}}</p>
              <el-input v-else v-model="ContractBasis.materialCost" placeholder="请输入材料成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="人工成本：">
              <p v-if="disabled">{{ContractBasis.artificialCost}}</p>
              <el-input v-else v-model="ContractBasis.artificialCost" placeholder="请输入人工成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="综合成本：">
              <p v-if="disabled">{{ContractBasis.comprehensiveCost}}</p>
              <el-input v-else v-model="ContractBasis.comprehensiveCost" placeholder="请输入综合成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="管理费用：">
              <p v-if="disabled">{{ContractBasis.manageCost}}</p>
              <el-input v-else v-model="ContractBasis.manageCost" placeholder="请输入管理费用"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="税金：">
              <p v-if="disabled">{{ContractBasis.tax}}</p>
              <el-input v-else v-model="ContractBasis.tax" placeholder="请输入税金"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="profit form-module">
        <h4 class="module-title">
          <p>计划利润</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="毛利润">
              <p v-if="disabled">{{ContractBasis.tax}}</p>
              <el-input v-else v-model="ContractBasis.profit" placeholder="请输入毛利润"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="毛利润率">
              <p v-if="disabled">{{ContractBasis.tax}}</p>
              <el-input v-else v-model="ContractBasis.profitRate" placeholder="请输入毛利润率"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="btn" v-show="state">
        <div class="common-btn" @click="add" :loading="loading">保&nbsp;&nbsp;&nbsp;存</div>
        <div class="common-btn" @click="reset">重&nbsp;&nbsp;&nbsp;置</div>
        <div class="common-btn">取&nbsp;&nbsp;&nbsp;消</div>
      </div>
    </el-form>
    <!-- 回款计划 -->
    <div class="list form-module" style="margin-top:20px;">
      <h4 class="module-title">
        <p>回款计划</p>
        <el-button type="text" class="up-files common-btn" @click="planBox = true">新增回款</el-button>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="receiveData" ref="multipleTable">
          <el-table-column align="center" prop="0" label="序号">
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="1" label="回款条件"></el-table-column>
          <el-table-column align="center" prop="2" label="计划回款时间"></el-table-column>
          <el-table-column align="center" prop="3" label="计划回款比例"></el-table-column>
          <el-table-column align="center" prop="4" label="计划回款累计金额"></el-table-column>
          <el-table-column align="center" prop="4" label="实际回款总金额"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 新增回款计划弹窗 -->
    <el-dialog title="回款计划" :visible.sync="planBox" :modal-append-to-body="false">
      <el-form :model="paymentPlan">
        <el-form-item label="回款条件：">
          <el-input v-model="paymentPlan.paymentCondition"></el-input>
        </el-form-item>
        <el-form-item label="计划回款比例(%)：">
          <el-input v-model="paymentPlan.ratio"></el-input>
        </el-form-item>
        <el-form-item label="计划回款金额(元)：">
          <el-input v-model="paymentPlan.amount"></el-input>
        </el-form-item>
        <el-form-item label="计划回款时间：">
          <el-date-picker v-model="paymentPlan.date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save">保&nbsp;&nbsp;&nbsp;存</el-button>
        <el-button type="info">重&nbsp;&nbsp;&nbsp;置</el-button>
        <el-button @click="planBox = false">取&nbsp;&nbsp;&nbsp;消</el-button>
      </div>
    </el-dialog>
    <!-- 合同交底附加列表 -->
    <div class="list form-module" style="margin-top:40px;">
      <h4 class="module-title">
        <p>合同交底附件列表</p>
        <el-button class="up-files common-btn" type="text" @click="upFiles = true">附件上传</el-button>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="tableData" ref="multipleTable">
          <el-table-column align="center" prop="0" label="序号">
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="1" label="附件名称"></el-table-column>
          <el-table-column align="center" prop="2" label="附件说明"></el-table-column>
          <el-table-column align="center" prop="3" label="上传人"></el-table-column>
          <el-table-column align="center" prop="4" label="上传时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 合同交底文件上传 -->
    <el-dialog title="合同交底附件上传" :visible.sync="upFiles" :modal-append-to-body="false">
      <el-form>
        <el-form-item label="附件说明">
          <el-input type="text" v-model="fileForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="附件人">
          <el-input type="text" v-model="fileForm.author"></el-input>
        </el-form-item>
        <el-form-item label="上传时间" prop="name">
           <el-date-picker v-model="fileForm.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="上传附件" prop="name">
          <el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { winHeight } from '@/utils'
export default {
  props: ['editData'],
  data() {
    return {
      height: 200,
      currentPage: 1,
      action: 'add',
      editShow: false,
      addShow: false,
      state: false,
      editWord: '编辑',
      addWord: '新增',
      disabled: false,
      loading: false,
      sourceFundsList: [],
      ContractBasis: {
        sourceFunds: '',
        materialCost: '',
        artificialCost: '',
        comprehensiveCost: '',
        manageCost: '',
        tax: '',
        profit: '',
        profitRate: ''
      },
      // 回款计划
      receiveData: [],
      planBox: false,
      paymentPlan: {
        paymentCondition: '',
        ratio: '',
        amount: '',
        date: ''
      },
      // 附件上传
      tableData: [],
      upFiles: false,
      fileForm: {
        desc: '',
        author: '',
        date: ''
      },
      importFileUrl: 'http:dtc.com/cpy/add',
      upLoadData: {
        cpyId: '123456',
        occurTime: '2018-01'
      },
      fileList: []
    }
  },
  created() {
    this.getInsertData()
    if (this.editData.tabState === 'seeTab') {
      this.action = 'edit'
      this.editShow = true
      this.disabled = true
      this.editInfo()
    } else {
      this.action = 'add'
      this.addShow = true
      this.disabled = true
    }
  },
  methods: {
    getInsertData() {
      this.sourceFundsList = [{ value: '酬金制' }, { value: '包干制' }, { value: '本体金' }]
    },
    add() {
      var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
      contractMsg.contractBasis.sourceFunds = this.ContractBasis.sourceFunds
      contractMsg.contractBasis.artificialCost = this.ContractBasis.artificialCost
      contractMsg.contractBasis.comprehensiveCost = this.ContractBasis.comprehensiveCost
      contractMsg.contractBasis.manageCost = this.ContractBasis.manageCost
      contractMsg.contractBasis.tax = this.ContractBasis.tax
      contractMsg.contractBasis.profit = this.ContractBasis.profit
      contractMsg.contractBasis.profitRate = this.ContractBasis.profitRate
      console.log(JSON.stringify(contractMsg))
      this.loading = true
      this.$post('/contractBasis/save', contractMsg).then((res) => {
        this.loading = false
        if (res.data.success === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.$get('/contractBasis/findAllByContractBasis/' + data.id).then((res) => {
        console.log(res)
      })
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.editWord = '编辑'
        this.editInfo()
      } else {
        this.editWord = '取消编辑'
      }
    },
    toggleAddBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.addWord = '新增'
        this.state = false
      } else {
        this.addWord = '取消'
        this.state = true
      }
    },
    reset() {
      this.ContractBasis = {
        sourceFunds: '',
        materialCost: '',
        artificialCost: '',
        comprehensiveCost: '',
        manageCost: '',
        tax: '',
        profit: '',
        profitRate: ''
      }
    },
    save() {
      console.log(JSON.stringify(this.paymentPlan))
      this.$post('/paymentPlan/save', this.paymentPlan).then((res) => {
        console.log(res)
      })
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  },
  mounted() {
    this.$refs.ele.style.height = winHeight() - 230 + 'px'
    window.addEventListener('resize', () => {
      this.$refs.ele.style.height = winHeight() - 230 + 'px'
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.disclosure-info-container.form-container{
  overflow-y:auto;
  margin-top:140px;
  &::-webkit-scrollbar{
    width:0;
  }
  .edit-btn{
    margin: 0;
    button{
      float: right;
    }
  }
  .btn{
    text-align:center;
    div.common-btn{
      display:inline-block;
      cursor:pointer;
    }
  }
  .list.form-module{
    margin-bottom:0;
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
}
</style>
