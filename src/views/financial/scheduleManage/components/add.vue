<template>
  <div class="invoice-add form-container">
    <div class="commont-btn edit-btn" v-show="editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="scheduleManageData" :rules="rules" ref="scheduleManageData">
      <div class="form-module">
        <h4 class="module-title">
          <p>合同信息：</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同编码:">
              <p>{{scheduleManageData.contractInfo.code}}</p>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同名称:">
                <p>{{scheduleManageData.contractInfo.name}}</p>
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
              <p v-if="disabled">{{scheduleManageData.stage}}</p>
              <el-select v-else v-model="scheduleManageData.stage" placeholder="请选择">
               <el-option v-for="item in stageList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="完工百分比:" prop="finishPercentage">
              <p v-if="disabled">{{scheduleManageData.finishPercentage}}</p>
              <el-select v-else v-model="scheduleManageData.finishPercentage" placeholder="请选择">
               <el-option v-for="item in finishPercentageList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="项目状态:">
              <p v-if="disabled">{{scheduleManageData.status}}</p>
              <el-select v-else v-model="scheduleManageData.status" placeholder="自动填充" disabled>
               <el-option v-for="item in statusList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="上次更新时间：" class="single-date">
              <!-- <p>{{scheduleManageData.time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</p> -->
              <p v-if="disabled">{{scheduleManageData.time}}</p>
              <el-date-picker v-else v-model="scheduleManageData.time" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" disabled></el-date-picker>
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
              <p v-if="disabled">{{scheduleManageData.stage}}</p>
              <el-select v-else v-model="scheduleManageData.stage" disabled>
                <el-option v-for="item in stageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="回款状态:">
              <p v-if="disabled">{{scheduleManageData.finishPercentage}}</p>
              <el-select v-else v-model="scheduleManageData.finishPercentage" disabled>
                <el-option v-for="item in finishPercentageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
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
              <p v-if="disabled">{{scheduleManageData.stage}}</p>
              <el-select v-else v-model="scheduleManageData.stage" disabled>
                <el-option v-for="item in stageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="材料进度匹配度：">
              <p v-if="disabled">{{scheduleManageData.finishPercentage}}</p>
              <el-select v-else v-model="scheduleManageData.finishPercentage" disabled>
                <el-option v-for="item in finishPercentageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="人工支出比例：">
              <p v-if="disabled">{{scheduleManageData.stage}}</p>
              <el-select v-else v-model="scheduleManageData.stage" disabled>
                <el-option v-for="item in stageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="人工进度匹配度：">
              <p v-if="disabled">{{scheduleManageData.finishPercentage}}</p>
              <el-select v-else v-model="scheduleManageData.finishPercentage" disabled>
                <el-option v-for="item in finishPercentageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="综合支出比例：">
              <p v-if="disabled">{{scheduleManageData.stage}}</p>
              <el-select v-else v-model="scheduleManageData.stage" disabled>
                <el-option v-for="item in stageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="综合进度匹配度：">
              <p v-if="disabled">{{scheduleManageData.finishPercentage}}</p>
              <el-select v-else v-model="scheduleManageData.finishPercentage" disabled>
                <el-option v-for="item in finishPercentageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
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
            <el-form-item label="收入成本差异收支差额：">
              <p v-if="disabled">{{scheduleManageData.stage}}</p>
              <el-select v-else v-model="scheduleManageData.stage" disabled>
                <el-option v-for="item in stageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="收入成本差异状态：">
              <p v-if="disabled">{{scheduleManageData.finishPercentage}}</p>
              <el-select v-else v-model="scheduleManageData.finishPercentage" disabled>
                <el-option v-for="item in finishPercentageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="付现差异付现差额：">
              <p v-if="disabled">{{scheduleManageData.stage}}</p>
              <el-select v-else v-model="scheduleManageData.stage" disabled>
                <el-option v-for="item in stageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="付现差异状态：">
              <p v-if="disabled">{{scheduleManageData.finishPercentage}}</p>
              <el-select v-else v-model="scheduleManageData.finishPercentage" disabled>
                <el-option v-for="item in finishPercentageList" :label="item.value" :value="item.value" :key="item.id"></el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div class="commont-btn" v-show="!disabled">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { formatDate, isObjectValueEqual } from '@/utils'
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
      scheduleManageData: {
        // billingPercentage: '开票百分比',
        finishPercentage: null,
        stage: '',
        // status: '',
        time: ''
      },
      rules: {
        stage: [{ required: true, message: '项目所属阶段不能为空', trigger: 'change' }],
        finishPercentage: [{ required: true, message: '完工百分比不能为空', trigger: 'change' }],
        status: [{ required: true, message: '项目状态不能为空', trigger: 'change' }]
      },
      temp: {}
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.scheduleManageData)
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
      this.$refs.scheduleManageData.validate((valid) => {
        if (valid) {
          this.loading = true
          this.scheduleManageData.time = new Date()
          console.log(this.scheduleManageData)
          this.$post('/contractSchedule/save', this.scheduleManageData).then(res => {
            this.loading = false
            if (res.data.success === true) {
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
      this.scheduleManageData = _.cloneDeep(this.temp)
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      this.scheduleManageData = _.cloneDeep(this.temp)
    },
    toggleAction() {
      if (this.editData.tabState === 'addTab') {
        this.action = 'add'
      } else {
        this.action = 'edit'
        this.editShow = true
        this.disabled = true
        this.scheduleManageData = _.cloneDeep(this.editData.editData.contractSchedule)
        this.scheduleManageData.time = formatDate(this.editData.editData.contractSchedule.time)
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
      }
    },
    failSave() {
      this.$message({
        message: '保存失败',
        type: 'error'
      })
    }
  },
  watch: {
    scheduleManageData: {
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
