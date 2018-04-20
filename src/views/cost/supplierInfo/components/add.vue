<template>
  <div class="supply-add form-container">
    <div class="commont-btn edit-btn" v-show="hasPerm('supply:findUpdateData') && editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="supplyInfo" :rules="rules" ref="supplyInfo">
      <div class="form-module">
        <h4 class="module-title">
          <p>基础信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="供应商名称:" prop="name">
              <p v-if="disabled">{{supplyInfo.name}}</p>
              <el-input v-else v-model="supplyInfo.name" placeholder="请输入供应商名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="合作商类别:" prop="cooperativeType">
              <p v-if="disabled">{{supplyInfo.cooperativeType}}</p>
              <el-select v-else v-model="supplyInfo.cooperativeType" placeholder="请选择合作商类别" filterable clearable>
               <el-option v-for="item in cooperativeTypeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="企业法人:" prop="enterprisePerson">
              <p v-if="disabled">{{supplyInfo.enterprisePerson}}</p>
              <el-input v-else v-model="supplyInfo.enterprisePerson" placeholder="请输入企业法人"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="营业执照号:" prop="licenseNumber">
              <p v-if="disabled">{{supplyInfo.licenseNumber}}</p>
              <el-input v-else v-model="supplyInfo.licenseNumber" placeholder="请输入营业执照号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="注册资金(元):">
              <p v-if="disabled">{{supplyInfo.regCapital}}</p>
              <el-input v-else v-model="supplyInfo.regCapital" @change="amountChange" placeholder="请输入注册资金"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="企业性质:" prop="enterpriseNature">
              <p v-if="disabled">{{supplyInfo.enterpriseNature}}</p>
              <el-select v-else v-model="supplyInfo.enterpriseNature" placeholder="请选择企业性质" filterable clearable>
               <el-option v-for="item in enterpriseNatureList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="供货周期(天):">
              <p v-if="disabled">{{supplyInfo.supplyCycle}}</p>
              <el-input v-else v-model="supplyInfo.supplyCycle" placeholder="请输入供货周期" type="number" min="0"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="供货区域:" prop="supplyRegion">
              <p v-if="disabled">{{supplyInfo.supplyRegion.name}}</p>
              <el-select v-else v-model="supplyInfo.supplyRegion.id" placeholder="请输入供货区域" filterable clearable>
                <el-option v-for="item in supplyRegionList" :label="item.name" :value="item.id" :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="物资类别:" prop="materialCategory">
              <p v-if="disabled">{{supplyInfo.materialCategory}}</p>
              <el-select v-else v-model="supplyInfo.materialCategory" placeholder="请选择物资类别" filterable clearable>
               <el-option v-for="item in materialCategoryList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="联系人:" prop="person">
              <p v-if="disabled">{{supplyInfo.person}}</p>
              <el-input v-else v-model="supplyInfo.person" placeholder="请输入业务联系人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="联系电话:" prop="phone">
              <p v-if="disabled">{{supplyInfo.phone}}</p>
              <el-input v-else v-model="supplyInfo.phone" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="8" :lg="8">
            <el-form-item label="QQ:">
              <p v-if="disabled">{{supplyInfo.qq}}</p>
              <el-input v-else v-model="supplyInfo.qq" placeholder="请输入QQ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="物资明细:" class="address">
              <p v-if="disabled">{{supplyInfo.materialDetails}}</p>
              <el-input v-else v-model="supplyInfo.materialDetails" placeholder="请输入物资明细"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="注册地址:" prop="regAddress" class="address">
              <p v-if="disabled">{{supplyInfo.regAddress}}</p>
              <el-input v-else v-model="supplyInfo.regAddress" placeholder="请输入注册地址"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="现址:" class="address">
              <p v-if="disabled">{{supplyInfo.address}}</p>
              <el-input v-else v-model="supplyInfo.address" placeholder="请输入现址"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>付款信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="开户银行:" prop="bank">
              <p v-if="disabled">{{supplyInfo.bank}}</p>
              <el-input v-else v-model="supplyInfo.bank" placeholder="请输入开户银行"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="银行账号:" prop="bankAccount">
              <p v-if="disabled">{{supplyInfo.bankAccount}}</p>
              <el-input v-else v-model="supplyInfo.bankAccount" placeholder="请输入银行账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="发票类型:" prop="invoiceType">
              <p v-if="disabled">{{supplyInfo.invoiceType}}</p>
              <el-select v-else v-model="supplyInfo.invoiceType" placeholder="请选择发票类型" filterable clearable>
               <el-option v-for="item in invoiceTypeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="税率(%):" prop="taxRate">
              <p v-if="disabled">{{supplyInfo.taxRate}}</p>
              <el-input v-else v-model="supplyInfo.taxRate" placeholder="请输入税率" @change="taxChange"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>评审信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="供应商类别:" prop="type">
              <p v-if="disabled">{{supplyInfo.type}}</p>
              <el-select v-else v-model="supplyInfo.type" placeholder="请选择供应商类别" filterable clearable>
               <el-option v-for="item in typeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="供应商类型:" prop="category">
              <p v-if="disabled">{{supplyInfo.category}}</p>
              <el-select v-else v-model="supplyInfo.category" placeholder="请选择供应商类型" filterable clearable>
               <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="供应商来源:" prop="source">
              <p v-if="disabled">{{supplyInfo.source}}</p>
              <el-select v-else v-model="supplyInfo.source" placeholder="请选择供应商来源" filterable clearable>
               <el-option v-for="item in sourceList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="供应商等级:" prop="grade">
              <p v-if="disabled">{{supplyInfo.grade}}</p>
              <el-select v-else v-model="supplyInfo.grade" placeholder="请选择供应商等级" filterable clearable>
               <el-option v-for="item in gradeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="评审状态:" prop="reviewState">
              <p v-if="disabled">{{supplyInfo.reviewState}}</p>
              <el-select v-else v-model="supplyInfo.reviewState" placeholder="请选择评审状态" filterable clearable>
               <el-option v-for="item in reviewStateList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="结算方式:" prop="settlementMethod">
              <p v-if="disabled">{{supplyInfo.settlementMethod}}</p>
              <el-select v-else v-model="supplyInfo.settlementMethod" placeholder="请选择结算方式" filterable clearable>
               <el-option v-for="item in settlementMethodList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="等级评审处理:" prop="reviewHandle">
              <p v-if="disabled">{{supplyInfo.reviewHandle}}</p>
              <el-select v-else v-model="supplyInfo.reviewHandle" placeholder="请选择评审状态" filterable clearable>
               <el-option v-for="item in reviewHandleList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="处理有效期限:" class="range-date validDate">
              <p v-if="disabled">{{validDateStr}}</p>
              <el-date-picker v-else v-model="validDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :sm="24" :md="24" :lg="24">
            <el-form-item label="等级评审说明:" class="reviewDescription">
              <p v-if="disabled">{{supplyInfo.reviewDescription}}</p>
              <el-input v-else type="textarea" v-model="supplyInfo.reviewDescription" placeholder="请输入等级评审说明"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn"  v-show="hasPerm('supply:save') && !disabled">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { outputmoney, isObjectValueEqual } from '@/utils'
import { validatePhone, validateMobile } from '@/utils/validate'
export default {
  name: 'supplierAdd',
  props: ['editData'],
  data() {
    const validPhone = (rule, value, callback) => {
      if ((!validateMobile(value)) && (!validatePhone(value))) {
        callback(new Error('请输入正确的手机或电话号码'))
      } else {
        callback()
      }
    }
    var validateRegion = (rules, value, callback) => {
      if (!value.id) {
        callback(new Error('请输入供货区域'))
      } else {
        callback()
      }
    }
    return {
      action: 'add',
      editWord: '编辑',
      loading: false,
      disabled: false,
      editShow: false,
      contractInfoList: [],
      validDate: [],
      validDateStr: '',
      supplyInfo: {
        name: '',
        cooperativeType: '',
        address: '',
        enterpriseNature: '',
        enterprisePerson: '',
        licenseNumber: '',
        materialCategory: '',
        materialDetails: '',
        person: '',
        phone: '',
        qq: '',
        regAddress: '',
        regCapital: '',
        supplyRegion: { id: '' },
        supplyCycle: '',
        bank: '',
        bankAccount: '',
        invoiceType: '',
        taxRate: '',
        category: '',
        type: '',
        source: '',
        grade: '',
        reviewState: '',
        settlementMethod: '',
        startDate: '',
        endDate: '',
        reviewDescription: ''
      },
      cooperativeTypeList: [],
      enterpriseNatureList: [],
      materialCategoryList: [],
      invoiceTypeList: [],
      categoryList: [],
      typeList: [],
      reviewStateList: [],
      reviewHandleList: [],
      settlementMethodList: [],
      taxRateList: [],
      supplyRegionList: [],
      sourceList: [],
      gradeList: [],
      rules: {
        name: [{ required: true, message: '请输入供应商名称', trigger: 'blur' }],
        cooperativeType: [{ required: true, message: '请选择合作商类别', trigger: 'change' }],
        enterprisePerson: [{ required: true, message: '请输入企业法人', trigger: 'blur' }],
        licenseNumber: [{ required: true, message: '请输入营业执照号', trigger: 'blur' }],
        regAddress: [{ required: true, message: '请输入注册地址', trigger: 'blur' }],
        enterpriseNature: [{ required: true, message: '请选择企业性质', trigger: 'change' }],
        supplyRegion: [{ required: true, validator: validateRegion, trigger: 'blur' }],
        materialCategory: [{ required: true, message: '请选择物料类型', trigger: 'change' }],
        person: [{ required: true, message: '请输入业务联系人', trigger: 'blur' }],
        phone: [{ required: true, validator: validPhone, trigger: 'blur' }],
        bank: [{ required: true, message: '请输入开户银行', trigger: 'blur' }],
        bankAccount: [{ required: true, message: '请输入银行账号', trigger: 'blur' }],
        invoiceType: [{ required: true, message: '请选择发票类型', trigger: 'change' }],
        taxRate: [{ required: true, message: '请输入税率', trigger: 'change' }],
        type: [{ required: true, message: '请选择供应商类别', trigger: 'change' }],
        category: [{ required: true, message: '请选择供应商类型', trigger: 'change' }],
        source: [{ required: true, message: '请选择供应商来源', trigger: 'change' }],
        grade: [{ required: true, message: '请选择供应商等级', trigger: 'change' }],
        reviewState: [{ required: true, message: '请选择评审状态', trigger: 'change' }],
        settlementMethod: [{ required: true, message: '请选择结算方式', trigger: 'change' }],
        reviewHandle: [{ required: true, message: '请选择等级评审处理', trigger: 'change' }]
      },
      temp: {}
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction() // 当前组件是新增状态还是编辑状态
    this.temp = _.cloneDeep(this.supplyInfo)
  },
  methods: {
    save() {
      this.$refs.supplyInfo.validate(valid => {
        if (valid) {
          this.loading = true
          this.supplyInfo.startDate = this.validDate[0]
          this.supplyInfo.endDate = this.validDate[1]
          console.log('this.supplyInfo', JSON.stringify(this.supplyInfo))
          this.$post('/supply/save', this.supplyInfo).then(res => {
            this.loading = false
            if (res.data.success === true) {
              this.supplyInfo = res.data.data
              this.temp = _.cloneDeep(res.data.data)
              this.handlerDate()
              this.successSave()
            } else {
              this.failSave()
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message({
            message: '信息未填写完整',
            type: 'warning'
          })
          return false
        }
      })
    },
    handlerDate() {
      if (this.supplyInfo.startDate === null || this.supplyInfo.endDate === null) {
        this.validDateStr = ''
      } else {
        this.validDateStr = this.supplyInfo.startDate + '  至  ' + this.supplyInfo.endDate
        this.validDate = [this.supplyInfo.startDate, this.supplyInfo.endDate]
      }
    },
    reset() {
      this.supplyInfo = _.cloneDeep(this.temp)
    },
    cancel() {
      this.$emit('toggleTab')
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.editWord = '编辑'
        this.supplyInfo = _.cloneDeep(this.temp)
      } else {
        this.editWord = '取消编辑'
      }
    },
    getInsertData() {
      this.$get('/supply/findInsertData').then((res) => {
        if (res.data.success === true) {
          this.supplyRegionList = res.data.data.supplyRegionList
        }
      })
      this.cooperativeTypeList = [{ value: '物资供应商' }, { value: '业务分包商' }]
      this.enterpriseNatureList = [{ value: '国企' }, { value: '民企' }, { value: '合资' }, { value: '外企' }]
      this.materialCategoryList = [{ value: '主材' }, { value: '线材' }, { value: '工器具' }, { value: '辅材' }, { value: '其他' }, { value: '行政类' }]
      this.invoiceTypeList = [{ value: '小规模纳税人' }, { value: '一般纳税人' }, { value: '普通' }]
      this.categoryList = [{ value: '常用型' }, { value: '临时型' }, { value: '历史型' }]
      this.typeList = [{ value: '战略供方' }, { value: '甲方指定' }, { value: '普通合格' }, { value: '试用' }, { value: '临时供方' }]
      this.reviewStateList = [{ value: '合格' }, { value: '新引进' }]
      this.settlementMethodList = [{ value: '月结' }, { value: '货到付款' }, { value: '其他' }]
      this.sourceList = [{ value: '地产合作商' }, { value: '集团合作商' }, { value: '城市公司合作商' }, { value: '公司集采合作商' }, { value: '办事处推荐' }]
      this.gradeList = [{ value: 'A级' }, { value: 'B级' }, { value: 'C级' }, { value: 'D级' }]
      this.reviewHandleList = [{ value: '继续使用' }, { value: '暂停使用' }, { value: '终止使用' }]
    },
    amountChange(val) {
      this.supplyInfo.regCapital = outputmoney(val)
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
        this.editWord = '编辑'
      }
    },
    failSave() {
      this.$message({
        message: '保存失败',
        type: 'error'
      })
    },
    toggleAction() { // 当前组件是新增状态还是编辑状态
      if (this.editData.tabState === 'addTab') {
        this.action = 'add'
        this.disabled = false
        this.editShow = false
      } else {
        this.action = 'edit'
        this.disabled = true
        this.editShow = true
        this.supplyInfo = _.cloneDeep(this.editData.editData.supply)
        this.handlerDate()
      }
    },
    taxChange(val) {
      // this.supplyInfo.taxRate =
      // this.supplyInfo.taxRate = val + '%'
      // console.log('taxChange', val)
    }
  },
  computed: {},
  watch: {
    disabled(status) {
      if (status === false) {
        this.$emit('changeObj', true)
      }
    },
    supplyInfo: {
      handler(obj) {
        if (isObjectValueEqual(obj, this.temp)) {
          this.$emit('changeObj', false)
        } else {
          this.$emit('changeObj', true)
        }
      },
      deep: true
    }
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.supply-add.form-container{
  .edit-btn {
    margin: 0;
    button {
      float: right;
    }
  }
}
</style>
<style  rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.supply-add.form-container {
  .el-form {
    .el-form-item.address{
      label.el-form-item__label {
        width: 8.5%!important;
      }
      .el-form-item__content{
        width: 88.5%!important;
      }
    }
    .el-form-item.reviewDescription {
      label.el-form-item__label {
        width: 13.5%!important;
      }
      .el-form-item__content{
        width: 81.5%!important;
      }
    }
  }
}
</style>
