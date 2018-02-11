<template>
<div class="business-container busniess-add form-container"  ref="ele">
<!-- 社区建设单项目信息表 -->
<div class="commont-btn edit-btn" v-show="editShow">
  <el-button @click="toggleEditBtn">{{editWord}}</el-button>
</div>
  <el-form :model="businessInfo" :rules="rules" ref="businessInfo">
    <!-- 基本信息 -->
    <div class="form-module">
      <h4 class="module-title">
        <p>基础信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="8" :lg="8">
          <el-form-item label="创建人:">
            <p v-if="disabled">{{userInfo.account.name}}</p>
            <el-input v-else placeholder="请输入创建人" v-model="userInfo.account.name" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="8">
          <el-form-item label="所属年月:" class="single-date">
            <p v-if="disabled">{{businessInfo.date}}</p>
            <el-date-picker v-else type="month" format="yyyy-MM" value-format="yyyy-MM-dd" placeholder="请选择日期" v-model="businessInfo.date"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="8">
          <el-form-item label="单据日期:" class="single-date">
            <p v-if="disabled">{{businessInfo.billDate}}</p>
            <el-date-picker v-else type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="businessInfo.billDate"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="8" :lg="8">
          <el-form-item label="商机名称:" prop="name">
            <p v-if="disabled">{{businessInfo.name}}</p>
            <el-input v-else v-model="businessInfo.name" placeholder="请输入商机名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="8">
          <el-form-item label="商机类型:">
            <p v-if="disabled">{{businessInfo.type}}</p>
            <el-select v-else v-model="businessInfo.type" placeholder="请选择商机类型">
              <el-option label="普通类型" value="普通类型"></el-option>
              <el-option label="机密线索" value="机密线索"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="8">
          <el-form-item label="商机来源:">
            <p v-if="disabled">{{businessInfo.source}}</p>
            <el-select v-else v-model="businessInfo.source" placeholder="请选择商机来源">
              <el-option label="公司" value="公司"></el-option>
              <el-option label="个人" value="个人"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="客户信息:">
            <p v-if="disabled">{{businessInfo.client.name}}</p>
            <el-select v-else v-model="businessInfo.client.id" placeholder="请选择客户信息">
              <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="8">
          <el-form-item label="城市:" prop="city">
            <p v-if="disabled">{{businessInfo.city.name}}</p>
            <el-cascader v-else :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange" placeholder="请选择城市"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="8" :lg="8">
          <el-form-item label="区域:" prop="region" required>
            <p v-if="disabled">{{businessInfo.region.name}}</p>
            <el-select v-else v-model="businessInfo.region.id" placeholder="请选择区域">
              <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <!-- 项目实施 -->
    <div class="form-module">
      <h4 class="module-title">
        <p>项目实施</p>
      </h4>
<<<<<<< HEAD
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
=======
      <el-row :gutter="40" class="keyMsg">
        <el-col :xs="24" :sm="24" :lg="12">
>>>>>>> b7abcd66461ee1ef942cfa5efc264d614b375a90
          <el-form-item label="项目关键信息描述:">
            <p v-if="disabled">{{businessInfo.projectImpls[0].keyword}}</p>
            <el-input v-else v-model="businessInfo.projectImpls[0].keyword" placeholder="请输入项目关键信息"></el-input>
          </el-form-item>
        </el-col>
<<<<<<< HEAD
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="8">
=======
        <el-col :xs="24" :sm="24" :lg="12">
>>>>>>> b7abcd66461ee1ef942cfa5efc264d614b375a90
          <el-form-item label="业务分类:" prop="category" :error="businessInfo.projectImpls[0].category ? '': '请填写业务分类'">
            <p v-if="disabled">{{businessInfo.projectImpls[0].category}}</p>
            <el-select v-else v-model="businessInfo.projectImpls[0].category" placeholder="请选择" @change="categoryChange">
              <el-option v-for="item in projectCategoryList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="预计成交金额（元）:" prop="amount">
            <p v-if="disabled">{{businessInfo.projectImpls[0].amount}}</p>
            <el-input v-else v-model="businessInfo.projectImpls[0].amount" @change="amountChange" placeholder="请输入"  min='0'></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="投标日期:" class="single-date">
            <p v-if="disabled">{{businessInfo.projectImpls[0].bidDate}}</p>
            <el-date-picker v-else type="date" value-format="yyyy-MM-dd" v-model="businessInfo.projectImpls[0].bidDate"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="方案投标日期:" class="single-date">
            <p v-if="disabled">{{businessInfo.projectImpls[0].bidDate2}}</p>
            <el-date-picker v-else type="date" value-format="yyyy-MM-dd" v-model="businessInfo.projectImpls[0].bidDate2"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="总体项目开工时间:" class="single-date">
            <p v-if="disabled">{{businessInfo.projectImpls[0].startDate}}</p>
            <el-date-picker v-else type="date" value-format="yyyy-MM-dd" v-model="businessInfo.projectImpls[0].startDate"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="预计开发或发货时间:" class="single-date">
            <p v-if="disabled">{{businessInfo.projectImpls[0].developDate}}</p>
            <el-date-picker v-else type="date" value-format="yyyy-MM-dd" v-model="businessInfo.projectImpls[0].developDate"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="预计合同签订时间:" class="single-date">
            <p v-if="disabled">{{businessInfo.projectImpls[0].signDate}}</p>
            <el-date-picker v-else type="date" value-format="yyyy-MM-dd" v-model="businessInfo.projectImpls[0].signDate"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <!-- 人员信息 -->
    <div class="form-module">
      <h4 class="module-title">
        <p>人员信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="业务线负责人:" prop="chargePerson">
            <p v-if="disabled">{{businessInfo.chargePerson}}</p>
            <el-input v-else v-model="businessInfo.chargePerson" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
       <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="电话:" prop="chargePersonPhone">
            <p v-if="disabled">{{businessInfo.chargePersonPhone}}</p>
            <el-input v-else v-model="businessInfo.chargePersonPhone" placeholder="请输入"  type="phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="项目具体跟进人:" prop="followPerson">
            <p v-if="disabled">{{businessInfo.followPerson}}</p>
            <el-input v-else v-model="businessInfo.followPerson" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="电话:" prop="followPersonPhone">
            <p v-if="disabled">{{businessInfo.followPersonPhone}}</p>
            <el-input v-else v-model="businessInfo.followPersonPhone" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <!-- 进度状态 -->
    <div class="form-module">
      <h4 class="module-title">
        <p>进度状况</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机跟进状态:" prop="followState">
            <p v-if="disabled">{{businessInfo.followState}}</p>
            <el-select v-else v-model="businessInfo.followState" placeholder="请选择">
              <el-option v-for="item in followStateList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机执行状态:" prop="executState">
            <p v-if="disabled">{{businessInfo.executState}}</p>
            <el-select v-else v-model="businessInfo.executState" placeholder="请选择">
              <el-option v-for="item in executStateList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="商机审批状态:" prop="region">
            <p v-if="disabled">{{businessInfo.examineState}}</p>
            <el-select v-else v-model="businessInfo.examineState" placeholder="请选择区域">
              <el-option v-for="item in examineStateList" :label="item.value" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="合同原始金额:">
            <p>{{businessInfo.examineState}}</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="合同变更金额:">
            <p>{{businessInfo.examineState}}</p>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="合同总金额:">
            <p>{{businessInfo.examineState}}</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="合同签订时间:">
            <p>{{businessInfo.examineState}}</p>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="合同开工时间:">
            <p>{{businessInfo.examineState}}</p>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="合同完成时间:">
            <p>{{businessInfo.examineState}}</p>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div class="commont-btn" v-show="!disabled">
      <el-button @click="add" :loading="loading">提交</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-form>
</div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { outputmoney } from '@/utils'
import { validatePhone, validateMobile } from '@/utils/validate'
export default {
  name: 'businessOpportunityAdd',
  props: ['editData'],
  data() {
    var validateRegion = (rule, value, callback) => {
      if (!value.id) {
        callback(new Error('请选择区域'))
      } else {
        callback()
      }
    }
    var validateCity = (rule, value, callback) => {
      if (!value.id) {
        callback(new Error('请选择城市'))
      } else {
        callback()
      }
    }
    const validPhone = (rule, value, callback) => {
      if ((!validateMobile(value)) && (!validatePhone(value))) {
        callback(new Error('请输入正确的手机或电话号码'))
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
      inputPerson: '',
      businessInfo: {
        city: { id: '' },
        client: { id: 1 },
        region: { id: '' },
        category: '',
        amount: '',
        projectImpls: [
          {
            amount: '',
            bidDate: '2018-01-01',
            bidDate2: '2018-01-01',
            category: '',
            developDate: '2018-01-01',
            keyword: '',
            signDate: '2018-01-01',
            startDate: '2018-01-01'
          }
        ],
        code: '编码',
        billDate: '2018-01-01',
        date: '2018-02-01',
        executState: '',
        followState: '',
        examineState: '',
        name: '',
        source: '',
        type: '',
        chargePerson: '业务线负责人',
        followPerson: '项目跟进人',
        chargePersonPhone: '13682571372',
        followPersonPhone: '13233471372',
        oldCity: ''
      },
      cityOption: [],
      regionList: [],
      cityList: [],
      clientList: [],
      followStateList: [],
      executStateList: [],
      projectCategoryList: [],
      examineStateList: [],
      dateline: '',
      rules: {
        name: [{ required: true, message: '请输入商机名称', trigger: 'blur' }],
        region: [{ required: true, validator: validateRegion, trigger: 'change' }],
        city: [{ required: true, validator: validateCity, trigger: 'change' }],
        amount: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        category: [{ required: true, message: '请输入业务分类', trigger: 'blur' }],
        chargePerson: [{ required: true, message: '请输入业务线负责人', trigger: 'blur' }],
        chargePersonPhone: [{ required: true, validator: validPhone, trigger: 'blur' }],
        followPerson: [{ required: true, message: '请输入项目具体跟进人', trigger: 'blur' }],
        followPersonPhone: [{ required: true, validator: validPhone, trigger: 'blur' }],
        followState: [{ required: true, message: '请输入商机跟进状态', trigger: 'change' }],
        executState: [{ required: true, message: '请输入商机执行状态', trigger: 'change' }]
      }
    }
  },
  created() {
    // this.businessInfo.date = new Date()
    // this.dateline =
    this.getInsertData()
    console.log('tabState', this.editData)
    if (this.editData.tabState === 'seeTab') {
      this.action = 'edit'
      this.editShow = true
      this.disabled = true
      this.editInfo()
    } else {
      this.action = 'add'
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    add() {
      this.$refs.businessInfo.validate(valid => {
        if (valid) {
          this.loading = true
          this.businessInfo.oldCity = this.cityOption.join('-')
          this.$post('/bussiness/save', this.businessInfo).then((res) => {
            this.loading = false
            if (res.data.success === true) {
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              if (this.action === 'edit') {
                this.$emit('toggleTab')
              }
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message({
            message: '信息未填写完整',
            type: 'success'
          })
        }
      })
    },
    reset() {
      if (this.action === 'add') {
        this.businessInfo = {
          city: { id: '' },
          client: { id: '' },
          region: { id: '' },
          projectImpls: [
            {
              amount: '',
              bidDate: '',
              bidDate2: '',
              category: '',
              developDate: '',
              keyword: '',
              signDate: '',
              startDate: ''
            }
          ],
          amount: '',
          code: '',
          date: '',
          billDate: '',
          executState: '',
          followState: '',
          examineState: '',
          name: '',
          source: '',
          type: '',
          chargePerson: '',
          followPerson: '',
          chargePersonPhone: '',
          followPersonPhone: '',
          oldCity: ''
        }
        this.cityOption = []
      } else {
        this.editInfo()
      }
    },
    cancel() {
      this.$emit('toggleTab')
    },
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.businessInfo = data.business
      var cityOption = data.business.oldCity.split('-')
      this.cityOption = []
      cityOption.forEach((item) => {
        this.cityOption.push(parseInt(item))
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
    getInsertData() {
      this.$get('/bussiness/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
      })
      this.followStateList = [{ value: '浅度跟进' }, { value: '深度跟进' }, { value: '已定未签' }, { value: '已签订' }, { value: '放弃' }]
      this.executStateList = [{ value: '前期接洽' }, { value: '方案编制' }, { value: '投标' }, { value: '中标' }, { value: '合同会签' }, { value: '纸质版合同签订' }]
      this.projectCategoryList = [
        { value: '科技-智慧工程全委' }, { value: '科技-智慧社区改造' }, { value: '科技-物联网大数据平台' }, { value: '科技-设计服务' },
        { value: '科技-技术服务' }, { value: '科技-技术服务+材料采购' }, { value: '科技-产品营销' }, { value: '机电-设备查验' }, { value: '机电-设施设备运维平台' },
        { value: '机电-设备运维全委' }, { value: '机电-电梯第三方监管' }, { value: '机电-节能工程' }, { value: '机电-设备升级改造' }, { value: '机电-设备顾问' }
      ]
      this.examineStateList = [{ value: '审核中' }, { value: '已审批' }, { value: '重新审批' }]
    },
    cityChange(val) {
      var len = val.length
      this.businessInfo.city.id = val[len - 1]
    },
    categoryChange(val) {
      this.businessInfo.category = val
    },
    amountChange(val) {
      this.businessInfo.amount = outputmoney(val)
      this.businessInfo.projectImpls[0].amount = outputmoney(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>@import "src/styles/mixin.scss";
.busniess-add {
  .edit-btn {
    margin: 0;
    button {
      float: right;
    }
  }
}
</style>
