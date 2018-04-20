<template>
  <div class="basicInfo-container form-container">
    <div class="commont-btn edit-btn" v-show="hasPerm('contractInfo:findUpdateData') && editShow">
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
              <el-select v-else v-model="contractInfo.business.id" placeholder="请选择商机编码" @change="category" filterable clearable>
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
              <el-date-picker v-else v-model="contractInfo.signDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择签订日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item class="single-date" label="合同所属期：" prop="term">
              <p v-if="disabled">{{contractInfo.term}}</p>
              <el-date-picker v-else v-model="contractInfo.term" type="date" format="yyyy-MM" value-format="yyyy-MM" placeholder="选择合同所属日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item class="range-date" label="合同期限：" prop="limit">
              <p v-if="disabled">{{contractInfo.dateShow}}</p>
              <el-date-picker v-else v-model="contractInfo.limit" @change="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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
            <el-form-item label="变更金额：" prop="changeAmount">
              <p v-if="disabled">{{contractInfo.changeAmount}}</p>
              <el-input v-else v-model="contractInfo.changeAmount" placeholder="请输入变更金额" error="8989"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="合同总额：">
              <p v-if="disabled">{{contractInfo.contractTotalAmount}}</p>
              <el-input v-else v-model="contractTotalAmount" placeholder="自动填充" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn" v-show="hasPerm('contractInfo:save') && !disabled">
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
    var validateOriginalAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('合同金额不能为空'))
      } else {
        if (!Number(value)) {
          callback(new Error('请输入数字值'))
        } else {
          callback()
        }
      }
    }
    var validateChangeAmount = (rule, value, callback) => {
      if (!Number(value) && value !== '') {
        callback(new Error('请输入数字值'))
      } else {
        callback()
      }
    }
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
      contractInfo: {
        name: '',
        business: { id: null },
        businessCategory: { id: null },
        region: { id: null },
        city: { id: null },
        client: { id: null },
        text: '',
        signDate: '',
        term: '',
        originalAmount: '',
        changeAmount: '',
        contractTotalAmount: null,
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
        originalAmount: [{ required: true, validator: validateOriginalAmount, trigger: 'blur' }],
        changeAmount: [{ validator: validateChangeAmount, trigger: 'blur' }]
      },
      temp: {}
    }
  },
  created() {
    this.temp = _.cloneDeep(this.contractInfo)
    this.getInsertData()
    this.toggleAction()
  },
  methods: {
    date() {
      this.disabled = true
      this.disabled = false
    },
    category(value) {
      for (var i = 0; i < this.businessList.length; i++) {
        if (this.businessList[i].id === value) {
          this.contractInfo.businessCategory.id = this.businessList[i].businessCategory.id
          this.contractInfo.region.id = this.businessList[i].region.id
          this.contractInfo.city.id = this.businessList[i].city.id
          this.contractInfo.client.id = this.businessList[i].client.id
        }
      }
    },
    getInsertData() {
      this.$get('/contractInfo/findInsertData').then((res) => {
        console.log(res)
        var data = res.data.data
        for (var i = 0; i < data.businessList.length; i++) {
          if (data.businessList[i].region.name === '' || data.businessList[i].city.name === '') {
            data.businessList[i].region.name = null
            data.businessList[i].city.name === null
          }
        }
        this.businessList = data.businessList
        console.log(this.businessList)
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
      })
      this.textList = [{ value: '是' }, { value: '否' }]
    },
    add() {
      this.$refs.contractInfo.validate(valid => {
        if (valid) {
          this.loading = true
          this.contractInfo.oldCity = this.cityOption.join('-')
          this.contractInfo.startDate = this.contractInfo.limit[0]
          this.contractInfo.endDate = this.contractInfo.limit[1]
          this.contractInfo.term = this.contractInfo.term + '-01'
          var container = {}
          for (var key in this.contractInfo) {
            if (this.contractInfo[key]) {
              container[key] = this.contractInfo[key]
            }
          }
          this.$post('/contractInfo/save', container).then((res) => {
            var contractMsg = res.data.data
            sessionStorage.setItem('contractMsg', JSON.stringify(contractMsg))
            this.loading = false
            if (res.data.success === true) {
              this.temp = _.cloneDeep(res.data.data.contractInfo)
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
    successSave() {
      this.$emit('changeObj', false)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      if (this.action === 'add') {
        this.$emit('toggleTab')
      }
      this.disabled = true
      this.editShow = true
      this.contractInfo = _.cloneDeep(this.temp)
      this.contractInfo.dateShow = [this.contractInfo.startDate, this.contractInfo.endDate].join(' 至 ')
      this.contractInfo.limit = [this.contractInfo.startDate, this.contractInfo.endDate]
      this.contractInfo.contractTotalAmount = this.contractInfo.originalAmount + this.contractInfo.changeAmount
    },
    failSave() {
      this.$message({
        message: '保存失败',
        type: 'error'
      })
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      this.contractInfo = _.cloneDeep(this.temp)
      this.contractInfo.dateShow = [this.contractInfo.startDate, this.contractInfo.endDate].join(' 至 ')
      this.contractInfo.limit = [this.contractInfo.startDate, this.contractInfo.endDate]
      this.contractInfo.contractTotalAmount = (this.contractInfo.originalAmount + this.contractInfo.changeAmount).toFixed(2)
      this.temp = _.cloneDeep(this.contractInfo)
    },
    toggleAction() {
      if (this.editData.tabState === 'addTab') {
        this.action = 'add'
      } else {
        this.action = 'edit'
        this.editShow = true
        this.disabled = true
        this.clone()
      }
    },
    clone() {
      this.contractInfo = _.cloneDeep(this.editData.editData.contractInfo)
      this.contractInfo.dateShow = [this.contractInfo.startDate, this.contractInfo.endDate].join(' 至 ')
      this.contractInfo.limit = [this.contractInfo.startDate, this.contractInfo.endDate]
      this.contractInfo.contractTotalAmount = (this.contractInfo.originalAmount + this.contractInfo.changeAmount).toFixed(2)
      this.temp = _.cloneDeep(this.contractInfo)
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
  &::-webkit-scrollbar{
    width: 0;
  }
  h4.form-module{
    padding: 10px 0;
  }
  .btn{
    text-align: center;
    margin-bottom: 30px;
  }
}
</style>
