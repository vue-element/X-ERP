<template>
  <div class="invoice-add form-container">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <div class="form-module">
        <h4 class="module-title">
          <p>新增开票信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同编码:">
              <p>{{ruleForm.contractInfo.code}}</p>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="合同名称:">
                <p>{{ruleForm.contractInfo.name}}</p>
            </el-form-item>
          </el-col>
        </el-row>
        <h4 class="module-title">
          <p>进度录入</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="项目所属阶段:">
              <el-select v-model="ruleForm.stage" placeholder="请选择">
               <el-option v-for="item in stageList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="完工百分比:">
              <el-select v-model="ruleForm.finishPercentage" placeholder="请选择">
               <el-option v-for="item in finishPercentageList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="项目状态:">
              <el-select v-model="ruleForm.status" placeholder="请选择">
               <el-option v-for="item in statusList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="12">
            <el-form-item label="上次更新时间:">
              <p>{{ruleForm.time | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</p>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'scheduleManageAdd',
  props: ['editData'],
  data() {
    return {
      action: 'add',
      loading: false,
      disabled: false,
      contractInfoList: [],
      stageList: [],
      finishPercentageList: [],
      statusList: [],
      ruleForm: {
        billingPercentage: '开票百分比',
        finishPercentage: '完工百分比',
        stage: '项目所属阶段',
        status: '项目状态',
        time: '更新时间'
      },
      rules: {}
    }
  },
  created() {
    this.getInsertData()
    if (this.editData.tabState === 'addTab') {
      this.action = 'add'
    } else {
      this.action = 'edit'
      this.editInfo()
    }
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
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.contractInfoList = data.contractInfoList
      this.ruleForm = data.contractSchedule
    },
    save() {
      this.loading = true
      this.ruleForm.time = new Date()
      this.$post('/ContractSchedule/save', this.ruleForm).then(res => {
        if (res.data.success === true) {
          console.log('this.ruleForm', this.ruleForm)
          this.loading = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          if (this.editData.tabState === 'editTab') {
            this.$emit('toggleTab')
          }
        }
      })
    },
    reset() {
      if (this.editData.tabState === 'addTab') {
        console.log('isaddTab')
        this.ruleForm = {
          amount: '',
          content: '',
          contractInfo: {
            id: 1
          },
          date: '',
          name: '',
          number: ''
        }
      } else {
        this.editInfo()
      }
    },
    cancel() {
      this.$emit('toggleTab')
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
</style>
