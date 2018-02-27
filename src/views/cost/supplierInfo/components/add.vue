<template>
  <div class="supply-add form-container">
    <div class="commont-btn edit-btn" v-show="editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="supplyInfo" :rules="rules" ref="supplyInfo">
      <div class="form-module">
        <h4 class="module-title">
          <p>基础信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="供应商名称:">
              <p v-if="disabled">{{supplyInfo.name}}</p>
              <el-input v-else v-model="supplyInfo.name" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="合作商类别:">
              <p v-if="disabled">{{supplyInfo.cooperativeType}}</p>
              <el-select v-else v-model="supplyInfo.cooperativeType" placeholder="请选择" filterable>
               <el-option v-for="item in cooperativeTypeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="企业法人:">
              <p v-if="disabled">{{supplyInfo.enterprisePerson}}</p>
              <el-input v-else v-model="supplyInfo.enterprisePerson" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="营业执照号:">
              <p v-if="disabled">{{supplyInfo.licenseNumber}}</p>
              <el-input v-else v-model="supplyInfo.licenseNumber" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="注册资金:">
              <p v-if="disabled">{{supplyInfo.regCapital}}</p>
              <el-input v-else v-model="supplyInfo.regCapital" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="注册地址:">
              <p v-if="disabled">{{supplyInfo.regAddress}}</p>
              <el-input v-else v-model="supplyInfo.regAddress" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="企业性质:">
              <p v-if="disabled">{{supplyInfo.enterpriseNature}}</p>
              <el-select v-else v-model="supplyInfo.enterpriseNature" placeholder="请选择" filterable>
               <el-option v-for="item in enterpriseNatureList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="供货周期:">
              <p v-if="disabled">{{supplyInfo.supplyCycle}}</p>
              <el-input v-else v-model="supplyInfo.supplyCycle" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="供货区域:">
              <p v-if="disabled">{{supplyInfo.region}}</p>
              <el-input v-else v-model="supplyInfo.region" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="物资类别:">
              <p v-if="disabled">{{supplyInfo.materialCategory}}</p>
              <el-select v-else v-model="supplyInfo.materialCategory" placeholder="请选择" filterable>
               <el-option v-for="item in materialCategoryList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="现址:">
              <p v-if="disabled">{{supplyInfo.address}}</p>
              <el-input v-else v-model="supplyInfo.address" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="业务联系人:">
              <p v-if="disabled">{{supplyInfo.person}}</p>
              <el-input v-else v-model="supplyInfo.person" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="联系电话:">
              <p v-if="disabled">{{supplyInfo.phone}}</p>
              <el-input v-else v-model="supplyInfo.phone" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="QQ:">
              <p v-if="disabled">{{supplyInfo.qq}}</p>
              <el-input v-else v-model="supplyInfo.qq" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>付款信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="开户银行:">
              <p v-if="disabled">{{supplyInfo.bank}}</p>
              <el-input v-else v-model="supplyInfo.bank" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="银行账号:">
              <p v-if="disabled">{{supplyInfo.bankAccount}}</p>
              <el-input v-else v-model="supplyInfo.bankAccount" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="发票类型:">
              <p v-if="disabled">{{supplyInfo.invoiceType}}</p>
              <el-select v-else v-model="supplyInfo.invoiceType" placeholder="请选择" filterable>
               <el-option v-for="item in invoiceTypeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="税率:">
              <p v-if="disabled">{{supplyInfo.taxRate}}</p>
              <el-input v-else v-model="supplyInfo.taxRate" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>评审信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="供应商类别:">
              <p v-if="disabled">{{supplyInfo.type}}</p>
              <el-select v-else v-model="supplyInfo.type" placeholder="请选择" filterable>
               <el-option v-for="item in typeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="供应商类型:">
              <p v-if="disabled">{{supplyInfo.category}}</p>
              <el-select v-else v-model="supplyInfo.category" placeholder="请选择" filterable>
               <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="评审状态:">
              <p v-if="disabled">{{supplyInfo.reviewState}}</p>
              <el-select v-else v-model="supplyInfo.reviewState" placeholder="请选择" filterable>
               <el-option v-for="item in reviewStateList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="结算方式:">
              <p v-if="disabled">{{supplyInfo.settlementMethod}}</p>
              <el-select v-else v-model="supplyInfo.settlementMethod" placeholder="请选择" filterable>
               <el-option v-for="item in settlementMethodList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="合作开始日期:" class="single-date">
              <p v-if="disabled">{{supplyInfo.startDate}}</p>
              <el-date-picker v-else type="date" v-model="supplyInfo.startDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="评审到期日期:" class="single-date">
              <p v-if="disabled">{{supplyInfo.endDate}}</p>
              <el-date-picker v-else type="date"v-model="supplyInfo.endDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn"  v-show="!disabled">
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
  name: 'supplierAdd',
  props: ['editData'],
  data() {
    return {
      action: 'add',
      editWord: '编辑',
      loading: false,
      disabled: false,
      editShow: false,
      contractInfoList: [],
      supplyInfo: {
        name: '供应商名称',
        cooperativeType: '物资供应商',
        address: '现址',
        enterpriseNature: '国企',
        enterprisePerson: '企业法人',
        licenseNumber: '营业执照号',
        materialCategory: '主材',
        person: '联系人',
        phone: '联系电话',
        qq: 'QQ号',
        regAddress: '注册地址',
        regCapital: '注册资金',
        region: '区域',
        supplyCycle: '供货周期',
        bank: '开户银行',
        bankAccount: '银行帐号',
        invoiceType: '小规模纳税人',
        taxRate: '税率',
        category: '常用型',
        type: '甲方指定',
        reviewState: '合格',
        settlementMethod: '月结',
        startDate: '',
        endDate: ''
      },
      cooperativeTypeList: [],
      enterpriseNatureList: [],
      materialCategoryList: [],
      invoiceTypeList: [],
      categoryList: [],
      typeList: [],
      reviewStateList: [],
      settlementMethodList: [],
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
      this.disabled = true
      this.editShow = true
    }
  },
  methods: {
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.supplyInfo = data.supply
    },
    save() {
      this.loading = true
      this.$post('/supply/save', this.supplyInfo).then(res => {
        if (res.data.success === true) {
          this.loading = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          if (this.action === 'edit') {
            this.$emit('toggleTab')
          }
        }
      })
    },
    reset() {
      if (this.action === 'add') {
        this.supplyInfo = {
          name: '',
          cooperativeType: '',
          address: '',
          enterpriseNature: '',
          enterprisePerson: '',
          licenseNumber: '',
          materialCategory: '',
          person: '',
          phone: '',
          qq: '',
          regAddress: '',
          regCapital: '',
          region: '',
          supplyCycle: '',
          bank: '',
          bankAccount: '',
          invoiceType: '',
          taxRate: '',
          category: '',
          type: '',
          reviewState: '',
          settlementMethod: '',
          startDate: '',
          endDate: ''
        }
      } else {
        this.editInfo()
      }
    },
    cancel() {
      this.$emit('toggleTab')
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
    getInsertData() {
      this.cooperativeTypeList = [
        { value: '物资供应商' },
        { value: '业务分包商' }
      ]
      this.enterpriseNatureList = [
        { value: '国企' },
        { value: '民企' },
        { value: '合资' },
        { value: '外企' }
      ]
      this.materialCategoryList = [
        { value: '主材' },
        { value: '线材' },
        { value: '工器具' },
        { value: '辅材' },
        { value: '其他' },
        { value: '行政类' }
      ]
      this.invoiceTypeList = [
        { value: '小规模纳税人' },
        { value: '一般纳税人' },
        { value: '普通' }
      ]
      this.categoryList = [
        { value: '常用型' },
        { value: '临时型' },
        { value: '历史型' }
      ]
      this.typeList = [
        { value: '战略供方' },
        { value: '甲方指定' },
        { value: '普通合格' },
        { value: '试用' },
        { value: '临时供方' }
      ]
      this.reviewStateList = [
        { value: '合格' },
        { value: '新引进' }
      ]
      this.settlementMethodList = [
        { value: '月结' },
        { value: '货到付款' },
        { value: '其他' }
      ]
    }
  },
  computed: {}
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
