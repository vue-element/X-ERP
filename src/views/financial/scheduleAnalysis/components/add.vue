<template>
  <div class="invoice-add form-container">
    <div class="commont-btn edit-btn" v-show="hasPerm('contractSchedule:findUpdateData') && editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="scheduleAnalysisData" :rules="rules" ref="scheduleAnalysisData">
      <div class="form-module">
        <h4 class="module-title">
          <p>合同信息：</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同编号：">
              <p v-if="disabled">{{scheduleAnalysisData.contractInfo.code}}</p>
              <el-input v-else v-model="scheduleAnalysisData.contractInfo.code" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同名称：">
              <p v-if="disabled">{{scheduleAnalysisData.contractInfo.name}}</p>
              <el-input v-else v-model="scheduleAnalysisData.contractInfo.name" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>进度分析</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="项目所属阶段:" prop="stage">
              <p v-if="disabled">{{scheduleAnalysisData.stage}}</p>
              <el-select v-else v-model="scheduleAnalysisData.stage" placeholder="请选择">
                <el-option v-for="item in stageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="完工百分比:" prop="finishPercentage">
              <p v-if="disabled">{{scheduleAnalysisData.finishPercentage}}</p>
              <el-select v-else v-model="scheduleAnalysisData.finishPercentage" placeholder="请选择">
                <el-option v-for="item in finishPercentageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="项目状态:">
              <p v-if="disabled">{{scheduleAnalysisData.projectStatus}}</p>
              <el-input v-else v-model="scheduleAnalysisData.projectStatus" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="上次更新时间：" class="single-date">
              <p v-if="disabled">{{scheduleAnalysisData.time}}</p>
              <el-date-picker v-else v-model="scheduleAnalysisData.time" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" disabled></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>回款分析</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="回款比例:">
              <p v-if="disabled">{{scheduleAnalysisData.receivedPercentage}}</p>
              <el-input v-else v-model="scheduleAnalysisData.receivedPercentage" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="回款状态:">
              <p v-if="disabled">{{scheduleAnalysisData.receivedStatus}}</p>
              <el-input v-else v-model="scheduleAnalysisData.receivedStatus" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>支出分析</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="材料采购比例：">
              <p v-if="disabled">{{scheduleAnalysisData.materialPercentage}}</p>
              <el-input v-else v-model="scheduleAnalysisData.materialPercentage" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="材料进度匹配度：">
              <p v-if="disabled">{{scheduleAnalysisData.materialStatus}}</p>
              <el-input v-else v-model="scheduleAnalysisData.materialStatus" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="人工支出比例：">
              <p v-if="disabled">{{scheduleAnalysisData.artificialPercentage}}</p>
              <el-input v-else v-model="scheduleAnalysisData.artificialPercentage" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="人工进度匹配度：">
              <p v-if="disabled">{{scheduleAnalysisData.artificialStatus}}</p>
              <el-input v-else v-model="scheduleAnalysisData.artificialStatus" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="综合支出比例：">
              <p v-if="disabled">{{scheduleAnalysisData.comprehensivePercentage}}</p>
              <el-input v-else v-model="scheduleAnalysisData.comprehensivePercentage" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="综合进度匹配度：">
              <p v-if="disabled">{{scheduleAnalysisData.comprehensiveStatus}}</p>
              <el-input v-else v-model="scheduleAnalysisData.comprehensiveStatus" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>收支差异分析</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="收入成本差异收支差额(元)：">
              <p v-if="disabled">{{scheduleAnalysisData.paymentBalance}}</p>
              <el-input v-else v-model="scheduleAnalysisData.paymentBalance" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="收入成本差异状态：">
              <p v-if="disabled">{{scheduleAnalysisData.paymentBalanceStatus}}</p>
              <el-input v-else v-model="scheduleAnalysisData.paymentBalanceStatus" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="付现差异付现差额(元)：">
              <p v-if="disabled">{{scheduleAnalysisData.cashBalance}}</p>
              <el-input v-else v-model="scheduleAnalysisData.cashBalance" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="付现差异状态：">
              <p v-if="disabled">{{scheduleAnalysisData.cashBalanceStatus}}</p>
              <el-input v-else v-model="scheduleAnalysisData.cashBalanceStatus" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn" v-show="hasPerm('contractSchedule:save') && !disabled">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { isObjectValueEqual, getPercentage, toPoint } from '@/utils'
export default {
  name: 'scheduleManageAdd',
  props: ['editData'],
  data() {
    return {
      action: 'add',
      loading: false,
      disabled: false,
      editShow: true,
      editWord: '编辑',
      contractInfoList: [],
      stageList: [],
      finishPercentageList: [],
      statusList: [],
      scheduleAnalysisData: {
        contractInfo_id: '',
        finishPercentage: null,
        stage: ''
      },
      rules: {
        stage: [{ required: true, message: '项目所属阶段不能为空', trigger: 'change' }],
        finishPercentage: [{ required: true, message: '完工百分比不能为空', trigger: 'change' }]
      },
      temp: {}
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.scheduleAnalysisData)
  },
  methods: {
    getInsertData() {
      this.stageList = [{ value: '未进场' }, { value: '施工中' }, { value: '已完工' }]
      this.finishPercentageList = [
        { value: '5%' }, { value: '10%' }, { value: '15%' }, { value: '20%' },
        { value: '25%' }, { value: '30%' }, { value: '35%' }, { value: '40%' },
        { value: '45%' }, { value: '50%' }, { value: '55%' }, { value: '60%' },
        { value: '65%' }, { value: '70%' }, { value: '75%' }, { value: '80%' },
        { value: '85%' }, { value: '90%' }, { value: '95%' }, { value: '100%' }
      ]
      this.statusList = [{ value: '正常' }, { value: '滞后' }, { value: '严重滞后' }]
    },
    save() {
      this.$refs.scheduleAnalysisData.validate((valid) => {
        if (valid) {
          this.loading = true
          this.getTopoint()
          var container = {}
          for (var key in this.scheduleAnalysisData) {
            if (this.scheduleAnalysisData[key]) {
              container[key] = this.scheduleAnalysisData[key]
            }
          }
          this.$post('/contractSchedule/save', container).then(res => {
            this.loading = false
            if (res.data.success === true) {
              this.scheduleAnalysisData = res.data.data
              this.turnPercentage()
              this.temp = _.cloneDeep(res.data.data)
              this.successSave()
            } else {
              this.failSave()
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    reset() {
      this.scheduleAnalysisData = _.cloneDeep(this.temp)
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      this.scheduleAnalysisData = _.cloneDeep(this.temp)
    },
    toggleAction() {
      if (this.editData.tabState === 'addTab') {
        this.action = 'add'
      } else {
        this.action = 'edit'
        this.editShow = true
        this.disabled = true
        this.scheduleAnalysisData = _.cloneDeep(this.editData.editData)
        this.turnPercentage()
      }
    },
    cancel() {
      this.$emit('changeObj', false)
      this.$emit('toggleTab')
    },
    successSave() {
      this.$emit('changeObj', false)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      if (this.action === 'add') {
        this.$emit('toggleTab')
      } else {
        this.editShow = true
        this.disabled = true
        this.scheduleAnalysisData = _.cloneDeep(this.temp)
      }
    },
    failSave() {
      this.$message({
        message: '保存失败',
        type: 'error'
      })
    },
    getTopoint() {
      this.scheduleAnalysisData.finishPercentage = toPoint(this.scheduleAnalysisData.finishPercentage)
      this.scheduleAnalysisData.receivedPercentage = toPoint(this.scheduleAnalysisData.receivedPercentage)
      this.scheduleAnalysisData.materialPercentage = toPoint(this.scheduleAnalysisData.materialPercentage)
      this.scheduleAnalysisData.artificialPercentage = toPoint(this.scheduleAnalysisData.artificialPercentage)
      this.scheduleAnalysisData.comprehensivePercentage = toPoint(this.scheduleAnalysisData.comprehensivePercentage)
    },
    turnPercentage() {
      this.scheduleAnalysisData.finishPercentage = getPercentage(this.scheduleAnalysisData.finishPercentage)
      this.scheduleAnalysisData.receivedPercentage = getPercentage(this.scheduleAnalysisData.receivedPercentage)
      this.scheduleAnalysisData.materialPercentage = getPercentage(this.scheduleAnalysisData.materialPercentage)
      this.scheduleAnalysisData.artificialPercentage = getPercentage(this.scheduleAnalysisData.artificialPercentage)
      this.scheduleAnalysisData.comprehensivePercentage = getPercentage(this.scheduleAnalysisData.comprehensivePercentage)
    }
  },
  watch: {
    scheduleAnalysisData: {
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
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.invoice-add{
  &::-webkit-scrollbar{
    width: 0;
  }
}
</style>
