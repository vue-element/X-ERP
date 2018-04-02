<template>
    <div class="basicInfo-container form-container">
      <div class="commont-btn edit-btn" v-show="editShow">
        <el-button @click="toggleEditBtn">{{editWord}}</el-button>
      </div>
      <el-form :model="contractInfo" :rules="rules" ref="contractInfo" class="basic">
        <div class="basic form-module">
          <h4 class="module-title">
            <p>基础信息</p>
          </h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="商机编码：" prop="business">
                <p v-if="disabled">{{contractInfo.business.code}}</p>
                <el-select v-else v-model="contractInfo.business.id" placeholder="请选择商机编码" filterable clearable>
                  <el-option v-for="item in businessList" :label="item.code" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="商机名称：">
                <p v-if="disabled">{{contractInfo.business.name}}</p>
                <el-select v-else v-model="contractInfo.business.id" placeholder="请选择商机名称" filterable clearable>
                  <el-option v-for="item in businessList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="合同编号：">
                <p v-if="disabled">{{contractInfo.code}}</p>
                <el-select v-else v-model="contractInfo.business.id" placeholder="自动填充" disabled>
                  <el-option v-for="item in businessList" :label="item.code" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="合同名称：" prop="name">
                <p v-if="disabled">{{contractInfo.name}}</p>
                <el-input v-else v-model="contractInfo.name" placeholder="请输入合同名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="业务类别：">
                <p v-if="disabled">{{contractInfo.business.businessCategory.name}}</p>
                <el-select v-else v-model="contractInfo.business.id" placeholder="自动填充" disabled>
                  <el-option v-for="item in businessList" :label="item.businessCategory.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="客户类别：">
                <p v-if="disabled">{{contractInfo.business.client.category}}</p>
                <el-select v-else v-model="contractInfo.business.id" placeholder="自动填充" disabled>
                  <el-option v-for="item in businessList" :label="item.client.category" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="城市：" prop="city">
                <p v-if="disabled">{{contractInfo.business.city.name}}</p>
                <el-select v-else v-model="contractInfo.business.id" placeholder="自动填充" disabled>
                  <el-option v-for="item in businessList" :label="item.city.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="办事处：">
                <p v-if="disabled">{{contractInfo.business.region.name}}</p>
                <el-select v-else v-model="contractInfo.business.id" placeholder="自动填充" disabled>
                  <el-option v-for="item in businessList" :label="item.region.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="timeNodes form-module">
          <h4 class="module-title">
            <p>时间信息</p>
          </h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="合同文本：" prop="text">
                <p v-if="disabled">{{contractInfo.text}}</p>
                <el-select v-else v-model="contractInfo.text" placeholder="请选择合同文本">
                  <el-option v-for="item in textList" :label="item.value" :value="item.value" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item class="single-date" label="签订时间：">
                <p v-if="disabled">{{contractInfo.signDate}}</p>
                <el-date-picker v-else v-model="contractInfo.signDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item class="single-date" label="合同所属期：" prop="term">
                <p v-if="disabled">{{contractInfo.term}}</p>
                <el-date-picker v-else v-model="contractInfo.term" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item class="range-date" label="合同期限：" prop="limit">
                <p v-if="disabled">{{contractInfo.dateShow}}</p>
                <el-date-picker v-else v-model="contractInfo.limit" @change="change" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="form-module">
          <h4 class="module-title">
            <p>金额信息</p>
          </h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="合同金额：" prop="originalAmount">
                <p v-if="disabled">{{contractInfo.originalAmount}}</p>
                <el-input v-else v-model="contractInfo.originalAmount" placeholder="请输入合同金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="变更金额：">
                <p v-if="disabled">{{contractInfo.changeAmount}}</p>
                <el-input v-else v-model="contractInfo.changeAmount" placeholder="请输入变更金额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="合同总额：">
                <p v-if="disabled">{{contractInfo.contractTotalAmount}}</p>
                <el-input v-else v-model="contractTotalAmount" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="commont-btn" v-show="!disabled">
          <el-button @click="add" :loading="loading">保存</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-form>
    </div>
</template>

<script>
import _ from 'lodash'
import { isObjectValueEqual } from '@/utils'
export default {
  props: ['editData'],
  data() {
    var validateBusiness = this.validateMsg('商机信息不能为空')
    return {
      action: 'add',
      height: 100,
      loading: false,
      editShow: false,
      editWord: '编辑',
      disabled: false,
      businessList: [],
      cityList: [],
      cityOption: [],
      clientList: [],
      regionList: [],
      textList: [],
      categoryList: [],
      contractInfo: {
        name: '',
        business: { id: '' },
        text: '',
        signDate: '',
        term: '',
        originalAmount: '',
        changeAmount: '',
        contractTotalAmount: '',
        startDate: '',
        endDate: '',
        oldCity: '',
        limit: [],
        dateShow: ''
      },
      rules: {
        business: [{ required: true, validator: validateBusiness, trigger: 'change' }],
        name: [{ required: true, message: '请输入合同名称', trigger: 'blur' }],
        text: [{ required: true, message: '请选择合同文本', trigger: 'blur' }],
        term: [{ required: true, message: '请选择合同所属期', trigger: 'blur' }],
        limit: [{ required: true, message: '请选择合同期限', trigger: 'blur' }],
        originalAmount: [{ required: true, message: '请输入合同金额' }]
      },
      temp: {}
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.contractInfo)
  },
  methods: {
    change() {
      this.disabled = true
      this.disabled = false
    },
    getInsertData() {
      this.$get('/contractInfo/findInsertData').then((res) => {
        var data = res.data.data
        this.businessList = data.businessList
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
      })
      this.categoryList = [
        { value: '科技-智慧工程全委' }, { value: '科技-智慧社区改造' }, { value: '科技-物联网大数据平台' }, { value: '科技-设计服务' },
        { value: '科技-技术服务' }, { value: '科技-技术服务+材料采购' }, { value: '科技-产品营销' }, { value: '机电-设备查验' }, { value: '机电-设施设备运维平台' }, { value: '机电-设备运维全委' }, { value: '机电-电梯第三方监管' }, { value: '机电-节能工程' }, { value: '机电-设备升级改造' }, { value: '机电-设备顾问' }
      ]
      this.textList = [{ value: '是' }, { value: '否' }]
    },
    add() {
      this.$refs.contractInfo.validate(valid => {
        if (valid) {
          this.loading = true
          this.contractInfo.oldCity = this.cityOption.join('-')
          this.contractInfo.startDate = this.contractInfo.limit[0]
          this.contractInfo.endDate = this.contractInfo.limit[1]
          console.log(this.contractInfo.contractTotalAmount)
          console.log(this.contractInfo)
          this.$post('/contractInfo/save', this.contractInfo).then((res) => {
            var contractMsg = res.data.data
            sessionStorage.setItem('contractMsg', JSON.stringify(contractMsg))
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
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.contractInfo = data.contractInfo
      this.contractInfo.dateShow = [data.contractInfo.startDate, data.contractInfo.endDate].join(' 至 ')
      this.contractInfo.limit = [data.contractInfo.startDate, data.contractInfo.endDate]
      this.contractInfo.contractTotalAmount = data.contractInfo.originalAmount + data.contractInfo.changeAmount
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
    toggleAction() {
      if (this.editData.tabState === 'editTab') {
        this.action = 'edit'
        this.editShow = true
        this.disabled = true
        this.editInfo()
      } else {
        this.action = 'add'
      }
    },
    reset() {
      this.contractInfo = _.cloneDeep(this.temp)
    },
    cancel() {
      this.$emit('cancel')
    },
    cityChange(val) {
      var len = val.length
      this.contractInfo.city.id = val[len - 1]
    },
    validateMsg(errMsg) {
      return (rule, value, callback) => {
        if (!value.id) {
          callback(new Error(errMsg))
        } else {
          callback()
        }
      }
    }
  },
  watch: {
    contractInfo: {
      handler(obj) {
        if (isObjectValueEqual(obj, this.temp)) {
          this.$emit('changeObj', false)
        } else {
          this.$emit('changeObj', true)
        }
      },
      deep: true
    }
  },
  computed: {
    contractTotalAmount() {
      if (!this.contractInfo.originalAmount && !this.contractInfo.changeAmount || !this.contractInfo.originalAmount && this.contractInfo.changeAmount) {
        this.contractInfo.contractTotalAmount = null
        return null
      } else if (this.contractInfo.originalAmount && !this.contractInfo.changeAmount) {
        this.changeAmount = null
        this.contractInfo.contractTotalAmount = parseFloat(this.contractInfo.originalAmount)
        return parseFloat(this.contractInfo.originalAmount)
      } else {
        this.contractInfo.contractTotalAmount = (parseFloat(this.contractInfo.originalAmount) + parseFloat(this.contractInfo.changeAmount)).toFixed(2)
        return (parseFloat(this.contractInfo.originalAmount) + parseFloat(this.contractInfo.changeAmount)).toFixed(2)
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.basicInfo-container.form-container{
  margin-top: 140px;
  margin-bottom: 20px;
  &::-webkit-scrollbar{
    width: 0;
  }
  .btn{
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>
