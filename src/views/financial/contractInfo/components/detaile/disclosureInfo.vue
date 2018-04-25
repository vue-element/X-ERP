<template>
  <div class="disclosure-info-container form-container">
    <div class="commont-btn edit-btn" v-show="editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="contractBasis" ref="contractBasis" class="basic" :rules="rules">
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
            <el-form-item label="材料成本：" prop="materialCost">
              <p v-if="disabled">{{contractBasis.materialCost}}</p>
              <el-input v-else v-model="contractBasis.materialCost" placeholder="请输入材料成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="人工成本：" prop="artificialCost">
              <p v-if="disabled">{{contractBasis.artificialCost}}</p>
              <el-input v-else v-model.number="contractBasis.artificialCost" placeholder="请输入人工成本"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="综合成本：" prop="comprehensiveCost">
              <p v-if="disabled">{{contractBasis.comprehensiveCost}}</p>
              <el-input v-else v-model="contractBasis.comprehensiveCost" placeholder="请输入综合成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="管理费用：" prop="manageCost">
              <p v-if="disabled">{{contractBasis.manageCost}}</p>
              <el-input v-else v-model="contractBasis.manageCost" placeholder="请输入管理费用"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="税金：" prop="tax">
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
            <el-form-item label="毛利润" prop="profit">
              <p v-if="disabled">{{contractBasis.profit}}</p>
              <el-input v-else v-model="contractBasis.profit" placeholder="请输入毛利润"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="毛利润率" prop="profitRate">
              <p v-if="disabled">{{contractBasis.profitRate}}</p>
              <el-input v-else v-model="contractBasis.profitRate" placeholder="请输入毛利润率"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="btn" v-show="hasPerm('contractBasis:save') && !disabled">
        <div class="common-btn" @click="add" :loading="loading">保&nbsp;&nbsp;&nbsp;存</div>
        <div class="common-btn" @click="reset">重&nbsp;&nbsp;&nbsp;置</div>
        <div class="common-btn" @click="cancel">取&nbsp;&nbsp;&nbsp;消</div>
      </div>
    </el-form>
    <!-- 回款计划 -->
    <div class="list form-module" style="margin-top:20px;">
      <h4 class="module-title">
        <p>回款计划</p>
        <el-button type="text" class="up-files common-btn" @click="clickShowBox">新增回款</el-button>
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
          <!-- <el-table-column prop="cumulativeAmount" label="计划回款累计金额"></el-table-column> -->
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
      <el-form :model="paymentPlan" ref="paymentPlan" :rules="rules">
        <el-form-item label="回款条件：" class="textarea" prop="paymentCondition">
          <el-input type="textarea" v-model="paymentPlan.paymentCondition"></el-input>
        </el-form-item>
        <el-form-item label="计划回款比例(%)：" prop="ratio">
          <el-input v-model="paymentPlan.ratio"></el-input>
        </el-form-item>
        <el-form-item label="计划回款金额(元)：" prop="amount">
          <el-input v-model="paymentPlan.amount"></el-input>
        </el-form-item>
        <el-form-item class="single-date" label="计划回款时间：" prop="date">
          <el-date-picker v-model="paymentPlan.date" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
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
        <el-button class="up-files common-btn" type="text" @click="filesBtn">附件上传</el-button>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="disclosureFile" ref="multipleTable" border>
          <el-table-column prop="0" label="序号" width="80" fixed>
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="fileName" label="附件名称" width="300"></el-table-column>
          <el-table-column prop="describtion" label="附件说明" width="350"></el-table-column>
          <el-table-column prop="person" label="上传人"></el-table-column>
          <el-table-column prop="date" label="上传时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button @click="downFile(scope.row)" type="text" size="small">文件下载</el-button>
              <el-button @click="deleteFile(scope.row.id)" type="text" size="small" v-if="hasPerm('contractBasisEnclosure:delete')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 附件件上传弹窗 -->
    <el-dialog title="合同交底附件上传" :visible.sync="upFiles" :modal-append-to-body="false">
      <el-form :model="fileForm" :rules="rules" class="demo-ruleForm" ref="fileForm">
        <el-form-item label="上传人" prop="person">
          <el-input v-model="fileForm.person"></el-input>
        </el-form-item>
        <el-form-item label="附件说明" class="textarea">
          <el-input type="textarea" v-model="fileForm.describtion"></el-input>
        </el-form-item>
        <el-form-item label="附件上传" prop="file">
          <input type="file" id="fileupload" @change="getFile($event)">
        </el-form-item>
        <el-button type="success" round @click="upFile($event)">上传</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import { isObjectValueEqual } from '@/utils'
export default {
  props: ['editData'],
  data() {
    var validateMaterialCost = this.validateAmount('请输入数字值')
    var validateArtificialCost = this.validateAmount('请输入数字值')
    var validateComprehensiveCost = this.validateAmount('请输入数字值')
    var validateManageCost = this.validateAmount('请输入数字值')
    var validateTax = this.validateAmount('请输入数字值')
    var validateProfit = this.validateAmount('请输入数字值')
    var validateProfitRate = this.validateAmount('请输入数字值')
    return {
      height: 200,
      currentPage: 1,
      action: 'add',
      editShow: false,
      editWord: '编辑',
      disabled: false,
      loading: false,
      sourceFundsList: [],
      // 合同交底信息form表单
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
      // 回款计划表单form表单
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
      },
      rules: {
        materialCost: [{ validator: validateMaterialCost, trigger: 'blur' }],
        artificialCost: [{ validator: validateArtificialCost, trigger: 'blur' }],
        comprehensiveCost: [{ validator: validateComprehensiveCost, trigger: 'blur' }],
        manageCost: [{ validator: validateManageCost, trigger: 'blur' }],
        tax: [{ validator: validateTax, trigger: 'blur' }],
        profit: [{ validator: validateProfit, trigger: 'blur' }],
        profitRate: [{ validator: validateProfitRate, trigger: 'blur' }],
        person: [{ required: true, message: '请输入上传人', trigger: 'blur' }],
        file: [{ required: true, message: '请选择文件', trigger: 'change' }],
        paymentCondition: [{ required: true, message: '请输入回款条件', trigger: 'blur' }],
        ratio: [{ required: true, message: '请输入回款比例', trigger: 'blur' }],
        amount: [{ required: true, message: '请输入回款金额', trigger: 'blur' }],
        date: [{ required: true, message: '请输入回款日期', trigger: 'change' }]
      },
      temp: {}
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.getcontractBasisFile()
    this.paymentPlayShow()
  },
  methods: {
    getInsertData() {
      this.sourceFundsList = [{ value: '酬金制' }, { value: '包干制' }, { value: '本体金' }]
    },
    // 查看或新增进来的获取contractBasis.id和contractBasis.contractInfo.id值
    add() {
      this.loading = true
      // 查看状态
      if (this.editData.tabState === 'editTab') {
        var data = _.cloneDeep(this.editData.editData)
        this.$get('/contractBasis/findAllByContractInfo/' + data.id).then((res) => {
          if (res.data.success === true) {
            this.contractBasis.id = res.data.data.content[0].id
            this.contractBasis.contractInfo.id = res.data.data.content[0].contractInfo.id
            // 调取新增函数
            this.disclosureAdd()
          }
        })
      // 新增状态
      } else {
        var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
        this.contractBasis.id = contractMsg.contractBasis.id
        this.contractBasis.contractInfo.id = contractMsg.contractBasis.contractInfo.id
        this.disclosureAdd()
      }
    },
    // 新增
    disclosureAdd() {
      var container = {}
      for (var key in this.contractBasis) {
        if (this.contractBasis[key]) {
          container[key] = this.contractBasis[key]
        }
      }
      this.$post('/contractBasis/save', container).then((res) => {
        this.loading = false
        if (res.data.success === true) {
          this.temp = _.cloneDeep(res.data.data)
          this.successSave()
        } else {
          this.failSave()
        }
      })
    },
    // 通过ID获取交底信息内容渲染
    showInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.$get('/contractBasis/findAllByContractInfo/' + data.id).then((res) => {
        this.contractBasis = _.cloneDeep(res.data.data.content[0])
        this.temp = _.cloneDeep(this.contractBasis)
        this.paymentPlan.contractBasis.id = res.data.data.content[0].id
      })
    },
    successSave() {
      this.$emit('changeObj', false)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      if (this.action === 'add') {
        this.$emit('toggleTab')
      }
      this.contractBasis = _.cloneDeep(this.temp)
      this.disabled = true
      this.editShow = true
    },
    failSave() {
      this.$message({
        message: '保存失败',
        type: 'error'
      })
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      this.showInfo()
    },
    toggleAction() {
      if (this.editData.tabState === 'editTab') {
        this.action = 'edit'
        this.editShow = true
        this.disabled = true
        this.showInfo()
      } else {
        this.action = 'add'
        var contractMsg = sessionStorage.getItem('contractMsg')
        if (contractMsg) {
          this.disabled = false
        } else {
          this.disabled = true
          return
        }
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
    clickShowBox() {
      if (this.contractBasis.id) {
        this.planBox = true
      } else {
        this.$message({
          message: '请先输入合同交底信息'
        })
      }
    },
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
        var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
        this.paymentPlan.contractBasis.id = contractMsg.contractBasis.id
        this.paymentPlanAdd()
      }
    },
    paymentPlanAdd() {
      this.$refs.paymentPlan.validate(valid => {
        if (valid) {
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
        }
      })
    },
    paymentPlayShow() {
      if (this.editData.tabState === 'editTab') {
        var data = _.cloneDeep(this.editData.editData)
        this.$get('/contractBasis/findAllByContractInfo/' + data.id).then((res) => {
          if (res.data.success === true) {
            var contractBasisID = res.data.data.content[0].id
            this.$get('/paymentPlan/findAllByContractBasis/' + contractBasisID).then((res) => {
              this.receiveData = res.data.data.content
            })
          }
        })
      } else {
        var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
        if (contractMsg) {
          var contractBasisID = contractMsg.contractBasis.id
          this.$get('/paymentPlan/findAllByContractBasis/' + contractBasisID).then((res) => {
            this.receiveData = res.data.data.content
          })
        } else {
          return
        }
      }
    },
    paymentPlanModify(id) {
      this.$get('/paymentPlan/findUpdateData/' + id).then((res) => {
        this.clickShowBox()
        this.paymentPlan = res.data.data.paymentPlan
      })
    },
    deleteRow(id) {
      this.$confirm('此操作将删除该条信息, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var paymentPlanID = { id: [id] }
        this.$post('/paymentPlan/delete/', paymentPlanID).then((res) => {
          if (res.data.success === true) {
            this.paymentPlayShow()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    filesBtn() {
      var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
      if (this.editData.tabState === 'addTab' && contractMsg === null) {
        this.$message({
          message: '请先输入合同基础信息'
        })
      } else {
        if (this.editData.tabState === 'editTab') {
          this.upFiles = true
          this.fileForm.cb_id = this.contractBasis.id
        } else {
          if (this.contractBasis.id) {
            this.upFiles = true
            this.fileForm.cb_id = this.contractBasis.id
          } else {
            this.$message({
              message: '请先输入合同交底信息'
            })
          }
        }
      }
    },
    getcontractBasisFile() {
      if (this.editData.tabState === 'editTab') {
        var ci = _.cloneDeep(this.editData.editData)
        this.$get('/contractBasis/findAllByContractInfo/' + ci.id).then((res) => {
          if (res.data.success === true) {
            var cb = res.data.data.content[0]
            this.$get('/contractBasisEnclosure/findAllByContractBasis/' + cb.id).then((res) => {
              this.disclosureFile = res.data.data.content
            })
          }
        })
      } else {
        var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
        if (contractMsg === null) {
          return
        } else {
          var cb = contractMsg.contractBasis
          this.$get('/contractBasisEnclosure/findAllByContractBasis/' + cb.id).then((res) => {
            this.disclosureFile = res.data.data.content
          })
        }
      }
    },
    getFile(event) {
      this.fileForm.file = event.target.files[0]
    },
    upFile(event) {
      this.$refs.fileForm.validate(valid => {
        if (valid) {
          event.preventDefault()
          var fd = new FormData()
          fd.append('cb_id', this.fileForm.cb_id)
          fd.append('describtion', this.fileForm.describtion)
          fd.append('person', this.fileForm.person)
          fd.append('file', this.fileForm.file)
          this.$post('/contractBasisEnclosure/save', fd).then((res) => {
            if (res.data.success === true) {
              this.getcontractBasisFile()
              this.fileForm = {
                ci_id: '',
                describtion: '',
                person: '',
                file: ''
              }
              var obj = document.getElementById('fileupload')
              obj.value = ''
              this.upFiles = false
            }
          })
        }
      })
    },
    deleteFile(id) {
      this.$confirm('此操作将删除该条信息, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var fileID = { id: [id] }
        this.$post('/contractBasisEnclosure/delete', fileID).then((res) => {
          if (res.data.success === true) {
            this.getcontractBasisFile()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    downFile(row) {
      window.location.href = row.url
    },
    validateAmount(tipMsg) {
      return (rule, value, callback) => {
        if (!Number(value) && value !== '') {
          callback(new Error(tipMsg))
        } else {
          callback()
        }
      }
    }
  },
  watch: {
    contractBasis: {
      handler(obj) {
        if (isObjectValueEqual(obj, this.temp)) {
          this.$emit('changeObj', false)
        } else {
          this.$emit('changeObj', true)
        }
      },
      deep: true
    },
    disabled (status) {
      if (status === false) {
        this.editWord = '取消编辑'
        this.$emit('changeObj', true)
      } else {
        this.editWord = '编辑'
      }
    },
    upFiles() {
      if (!this.upFiles) {
        this.fileForm = {
          ci_id: '',
          describtion: '',
          person: '',
          file: ''
        }
        var obj = document.getElementById('fileupload')
        obj.value = ''
      }
    }
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
  .el-dialog__wrapper{
    .el-dialog__body{
      button{
        line-height: 0.4;
        background-color: #35d5ba;
        border-color: #35d5ba;
        margin: 20px 0 10px 45%;
        border-radius: 5px;
      }
    }
  }
}
</style>
