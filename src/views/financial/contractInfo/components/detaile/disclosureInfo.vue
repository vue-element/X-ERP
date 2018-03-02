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
          <el-col :xs="24" :sm="12" :lg="8">
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
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="材料成本：">
              <p v-if="disabled">{{contractBasis.materialCost}}</p>
              <el-input v-else v-model="contractBasis.materialCost" placeholder="请输入材料成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="人工成本：">
              <p v-if="disabled">{{contractBasis.artificialCost}}</p>
              <el-input v-else v-model="contractBasis.artificialCost" placeholder="请输入人工成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="综合成本：">
              <p v-if="disabled">{{contractBasis.comprehensiveCost}}</p>
              <el-input v-else v-model="contractBasis.comprehensiveCost" placeholder="请输入综合成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="管理费用：">
              <p v-if="disabled">{{contractBasis.manageCost}}</p>
              <el-input v-else v-model="contractBasis.manageCost" placeholder="请输入管理费用"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
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
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="毛利润">
              <p v-if="disabled">{{contractBasis.tax}}</p>
              <el-input v-else v-model="contractBasis.profit" placeholder="请输入毛利润"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="毛利润率">
              <p v-if="disabled">{{contractBasis.tax}}</p>
              <el-input v-else v-model="contractBasis.profitRate" placeholder="请输入毛利润率"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="btn" v-show="state">
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
        <el-table class="basic-form" style="width: 100%" :data="receiveData" ref="multipleTable">
          <el-table-column align="center" prop="0" label="序号">
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="paymentCondition" label="回款条件"></el-table-column>
          <el-table-column prop="date" label="计划回款时间"></el-table-column>
          <el-table-column prop="ratio" label="计划回款比例"></el-table-column>
          <el-table-column prop="" label="计划回款累计金额"></el-table-column>
          <el-table-column prop="" label="实际回款总金额"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="paymentPlanModify(scope.row)" type="text" size="small">修改</el-button>
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
        <el-form-item class="single-date" label="计划回款时间：">
          <el-date-picker v-model="paymentPlan.date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="paymentPlanAdd">保&nbsp;&nbsp;&nbsp;存</el-button>
        <el-button size="small" @click="planBox = false">取&nbsp;&nbsp;&nbsp;消</el-button>
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
      state: false,
      editWord: '编辑',
      disabled: false,
      loading: false,
      sourceFundsList: [],
      contractBasis: {
        id: '',
        sourceFunds: '',
        materialCost: '',
        artificialCost: '',
        comprehensiveCost: '',
        manageCost: '',
        tax: '',
        profit: '',
        profitRate: '',
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
    // 组件加载出来判断合同基础信息是否填写了 有继续填写 没有则禁用
    var contractMsg = sessionStorage.getItem('contractMsg')
    if (contractMsg) {
      this.disabled = false
      this.state = true
    } else {
      this.disabled = true
    }
    // 判断状态是查看还是新增
    if (this.editData.tabState === 'seeTab') {
      this.action = 'edit'
      this.editShow = true
      this.disabled = true
      this.showInfo()
    } else {
      this.action = 'add'
      this.state = false
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
      if (this.editData.tabState === 'seeTab') {
        var data = _.cloneDeep(this.editData.editData)
        this.$get('/contractBasis/findAllByContractInfo/' + data.id).then((res) => {
          this.contractBasis.id = res.data.data.content[0].id
          this.contractBasis.contractInfo.id = res.data.data.content[0].contractInfo.id
        })
      } else {
        var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
        this.contractBasis.id = contractMsg.contractBasis.id
        this.contractBasis.contractInfo.id = contractMsg.contractBasis.contractInfo.id
      }
      this.$post('/contractBasis/save', this.contractBasis).then((res) => {
        this.loading = false
        if (res.data.success === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    showInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.$get('/contractBasis/findAllByContractInfo/' + data.id).then((res) => {
        this.contractBasis = res.data.data.content[0]
      })
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.editWord = '编辑'
        this.state = false
        this.showInfo()
      } else {
        this.editWord = '取消编辑'
        this.state = true
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
    paymentPlanAdd() {
      var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
      this.paymentPlan.contractBasis.id = contractMsg.contractBasis.id
      this.$post('/paymentPlan/save', this.paymentPlan).then((res) => {
        if (res.data.success === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.paymentPlayShow()
          this.paymentPlan = {}
        }
        this.planBox = false
      })
    },
    // 回款计划展示列表
    paymentPlayShow() {
      var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
      var contractBasisID = contractMsg.contractBasis.id
      this.$get('/paymentPlan/findAllByContractBasis/' + contractBasisID).then((res) => {
        this.receiveData = res.data.data.content
      })
    },
    paymentPlanModify(id) {
      this.$get('/paymentPlan/findUpdateData/' + id.id).then((res) => {
        this.clickPlanBox()
        this.paymentPlan = res.data.data.paymentPlan
      })
    },
    // 回款计划删除数据
    deleteRow(id) {
      var paymentPlanID = { id: [id] }
      this.$post('/paymentPlan/delete', paymentPlanID).then((res) => {
        if (res.status === 200) {
          this.paymentPlayShow()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
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
