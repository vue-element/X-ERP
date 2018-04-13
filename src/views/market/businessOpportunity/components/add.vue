<template>
<div class="business-container busniess-add form-container"  ref="ele">
<!-- 社区建设单项目信息表 -->
<div class="commont-btn edit-btn" v-show="editShow">
  <el-button @click="toggleEditBtn" v-if="hasPerm('bussiness:findUpdateData')">{{editWord}}</el-button>
  <el-button v-show="(this.disabled === true) && hasPerm('bussiness:examine')" @click="passCheck">审批通过</el-button>
</div>
  <el-form :model="businessInfo" :rules="rules" ref="businessInfo">
    <!-- 基本信息 -->
    <div class="form-module">
      <h4 class="module-title">
        <p>基础信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="创建人:">
            <p v-if="disabled">{{businessInfo.createPerson}}</p>
            <el-input v-else placeholder="请输入创建人" v-model="businessInfo.createPerson" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="商机编码:">
            <p v-if="disabled">{{businessInfo.code}}</p>
            <el-input v-else placeholder="自动生成" v-model="businessInfo.code" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="商机录入日期:" class="single-date">
            <p v-if="disabled">{{businessInfo.date}}</p>
            <el-date-picker v-else type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="businessInfo.date"  placeholder="自动生成" disabled></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="商机名称:" prop="name">
            <p v-if="disabled">{{businessInfo.name}}</p>
            <el-input v-else v-model="businessInfo.name" placeholder="请输入商机名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="区域:" prop="region">
            <p v-if="disabled">{{businessInfo.region.name}}</p>
            <el-select v-else v-model="businessInfo.region.id" placeholder="请选择区域" filterable clearable>
              <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="城市:" prop="city">
            <p v-if="disabled">{{businessInfo.city.name}}</p>
            <el-cascader v-else :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange" placeholder="请选择城市" filterable clearable></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="商机提供人:" prop="sourcePerson">
            <p v-if="disabled">{{businessInfo.sourcePerson}}</p>
            <el-input v-else placeholder="请输入商机提供人" v-model="businessInfo.sourcePerson" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="业务分类:" prop="businessCategory">
            <p v-if="disabled">{{businessInfo.businessCategory.name}}</p>
            <el-select v-else v-model="businessInfo.businessCategory.id" placeholder="请选择" filterable clearable>
              <el-option v-for="item in businessCtgList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="客户名称:" prop="client">
            <p v-if="disabled">{{businessInfo.client.name}}</p>
            <el-select v-else v-model="businessInfo.client.id" placeholder="请选择客户名称" filterable clearable>
              <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="客户类别:">
            <p v-if="disabled">{{businessInfo.client.category}}</p>
            <el-select v-else v-model="businessInfo.client.id" placeholder="自动生成" disabled>
              <el-option v-for="item in clientList" :label="item.category" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="联系方式:">
            <p v-if="disabled">{{businessInfo.client.phone}}</p>
            <el-select v-else v-model="businessInfo.client.id" placeholder="自动生成" disabled>
              <el-option v-for="item in clientList" :label="item.phone" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="商机审批状态:">
            <p v-if="disabled">{{businessInfo.examineState}}</p>
            <el-input :rows="2" v-else v-model="businessInfo.examineState" placeholder="请输入项目关键信息" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <!-- 项目实施 -->
    <div class="form-module">
      <h4 class="module-title">
        <p>商务信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :sm="24" :md="24" :lg="24">
          <el-form-item label="项目需求描述:" class="pro_describe">
            <p v-if="disabled">{{businessInfo.keyword}}</p>
            <el-input v-else v-model="businessInfo.keyword" placeholder="请输入项目需求描述" type="textarea" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="甲方决策人:" prop="firstPerson">
            <p v-if="disabled">{{businessInfo.firstPerson}}</p>
            <el-input v-else v-model="businessInfo.firstPerson" placeholder="请输入甲方决策人"  min='0'></el-input>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="联系方式:" prop="firstPersonPhone">
            <p v-if="disabled">{{businessInfo.firstPersonPhone}}</p>
            <el-input v-else v-model="businessInfo.firstPersonPhone" placeholder="请输入联系方式"  min='0'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="项目预计启动时间:" class="single-date" prop="startDate">
            <p v-if="disabled">{{businessInfo.startDate}}</p>
            <el-date-picker v-else type="date" value-format="yyyy-MM-dd" v-model="businessInfo.startDate"  placeholder="请输入预计启动时间"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="预计成交金额:" prop="amount1">
            <p v-if="disabled">{{businessInfo.amount1}}</p>
            <el-input v-else v-model="businessInfo.amount1" @change="amountChange" placeholder="请输入预计成交金额" min='0'></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="合同签订时间:" class="single-date">
            <p v-if="disabled">{{contractInfo.signDate}}</p>
              <el-date-picker v-else type="date" v-model="contractInfo.signDate"  value-format="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="自动生成" disabled></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="实际合同金额:">
            <p v-if="disabled">{{contractInfo.contractTotalAmount}}</p>
            <el-input v-else v-model="contractInfo.contractTotalAmount" placeholder="自动生成"  min='0' disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="商机执行状态:">
            <p v-if="disabled">{{businessInfo.executeState}}</p>
            <el-select v-else v-model="businessInfo.executeState" placeholder="请选择">
              <el-option v-for="item in executeStateList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
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
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="业务负责人:" prop="businessPerson">
            <p v-if="disabled">{{businessInfo.businessPerson.name}}</p>
            <el-select v-else v-model="businessInfo.businessPerson.id" placeholder="请选择业务负责人" filterable>
              <el-option v-for="item in userList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
       <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="联系方式:">
            <p v-if="disabled">{{businessInfo.businessPerson.phone}}</p>
            <el-select v-else v-model="businessInfo.businessPerson.id" placeholder="自动生成" disabled>
              <el-option v-for="item in userList" :label="item.phone" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="设计负责人:">
            <p v-if="disabled">{{businessInfo.designPerson.name}}</p>
            <el-select v-else v-model="businessInfo.designPerson.id" placeholder="请选择设计负责人" filterable clearable>
              <el-option v-for="item in userList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
       <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="联系方式:">
            <p v-if="disabled">{{businessInfo.designPerson.phone}}</p>
            <el-select v-else v-model="businessInfo.designPerson.id" placeholder="自动生成" disabled>
              <el-option v-for="item in userList" :label="item.phone" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="成本负责人:">
            <p v-if="disabled">{{businessInfo.costPerson.name}}</p>
            <el-select v-else v-model="businessInfo.costPerson.id" placeholder="请选择成本负责人" filterable clearable>
              <el-option v-for="item in userList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
       <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="联系方式:">
            <p v-if="disabled">{{businessInfo.costPerson.phone}}</p>
            <el-select v-else v-model="businessInfo.costPerson.id" placeholder="自动生成" disabled>
              <el-option v-for="item in userList" :label="item.phone" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="工程负责人:">
            <p v-if="disabled">{{businessInfo.projectPerson.name}}</p>
            <el-select v-else v-model="businessInfo.projectPerson.id" placeholder="请选择工程负责人" filterable clearable>
              <el-option v-for="item in userList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
       <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="联系方式:">
            <p v-if="disabled">{{businessInfo.projectPerson.phone}}</p>
            <el-select v-else v-model="businessInfo.projectPerson.id" placeholder="自动生成" disabled>
              <el-option v-for="item in userList" :label="item.phone" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="项目经理:">
            <p v-if="disabled">{{businessInfo.projectManager.name}}</p>
            <el-select v-else v-model="businessInfo.projectManager.id" placeholder="请选择项目经理" filterable clearable>
              <el-option v-for="item in userList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
       <el-col :sm="24" :md="12" :lg="12">
          <el-form-item label="联系方式:">
            <p v-if="disabled">{{businessInfo.projectManager.phone}}</p>
            <el-select v-else v-model="businessInfo.projectManager.id" placeholder="自动生成" disabled>
              <el-option v-for="item in userList" :label="item.phone" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div class="commont-btn" v-show="hasPerm('bussiness:save') && !disabled">
      <el-button @click="add" :loading="loading">保存</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-form>
  <div class="revise-record form-module"  v-show="action === 'edit'">
    <h4 class="module-title">
      <p>修改记录</p>
    </h4>
    <el-table class="basic-form" style="width: 100%"  :data="historyRecord" ref="multipleTable" border>
      <el-table-column align="center" prop="0" label="序号" width="60">
        <template slot-scope="scope">{{scope.$index  + 1}}</template>
      </el-table-column>
      <el-table-column prop="person" label="修改人" width="100"></el-table-column>
      <el-table-column prop="time" label="修改时间" width="120"></el-table-column>
      <el-table-column prop="content" label="修改内容" min-width="280"></el-table-column>
      <el-table-column prop="dNumber" label="商机修改间隔(天)" width="140"></el-table-column>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
import { isObjectValueEqual } from '@/utils'
import { mapGetters } from 'vuex'
import { outputmoney } from '@/utils'
import { validatePhone, validateMobile } from '@/utils/validate'
export default {
  name: 'businessOpportunityAdd',
  props: ['editData'],
  data() {
    var validateRegion = this.validateMsg('请选择区域信息')
    var validateCity = this.validateMsg('请选择城市信息')
    var validateClient = this.validateMsg('请选择客户信息')
    var validateCategory = this.validateMsg('请选择业务分类信息')
    var businessPerson = this.validateMsg('请选择业务负责人')
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
      contractInfo: {
        signDate: '',
        contractTotalAmount: ''
      },
      businessInfo: {
        city: { id: null },
        client: { id: null },
        region: { id: '' },
        businessCategory: { id: null },
        oldCity: '',
        createPerson: '',
        code: '',
        date: '',
        name: '',
        sourcePerson: '',
        examineState: '商机线索',
        keyword: null,
        firstPerson: '',
        firstPersonPhone: '',
        startDate: '',
        amount: null,
        amount1: '',
        executeState: null,
        businessPerson: {
          id: '',
          name: '',
          phone: ''
        },
        designPerson: {
          id: '',
          name: '',
          phone: ''
        },
        costPerson: {
          id: '',
          name: '',
          phone: ''
        },
        projectPerson: {
          id: '',
          name: '',
          phone: ''
        },
        projectManager: {
          id: '',
          name: '',
          phone: ''
        }
      },
      cityOption: [],
      regionList: [],
      cityList: [],
      clientList: [],
      userList: [],
      businessCtgList: [],
      executeStateList: [],
      rules: {
        name: [{ required: true, message: '请输入商机名称', trigger: 'blur' }],
        region: [{ required: true, validator: validateRegion, trigger: 'change' }],
        city: [{ required: true, validator: validateCity, trigger: 'change' }],
        sourcePerson: [{ required: true, message: '请输入商机提供人', trigger: 'blur' }],
        client: [{ required: true, validator: validateClient, trigger: 'change' }],
        businessCategory: [{ required: true, validator: validateCategory, trigger: 'change' }],
        firstPerson: [{ required: true, message: '请输入甲方决策人', trigger: 'blur' }],
        firstPersonPhone: [{ required: true, validator: validPhone, trigger: 'blur' }],
        businessPerson: [{ required: true, validator: businessPerson, trigger: 'change' }],
        startDate: [{ required: true, message: '请输入预计启动时间', trigger: 'blur' }],
        amount1: [{ required: true, message: '请输入预计成交金额', trigger: 'blur' }]
      },
      temp: {},
      dialogFormVisible: false,
      historyRecord: [],
      lastTime: ''
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.businessInfo)
    if (this.businessInfo.id !== null) {
      this.getRecordHistory()
    }
  },
  computed: {
    ...mapGetters([
      'accountName'
    ])
  },
  methods: {
    add() {
      this.$refs.businessInfo.validate(valid => {
        if (valid) {
          // this.loading = true
          this.businessInfo.oldCity = this.cityOption.join('-')
          var businessInfo = {}
          var arr = ['designPerson', 'costPerson', 'projectPerson', 'projectManager']
          for (var key in this.businessInfo) {
            if (arr.indexOf(key) > -1) { // arr向后台传值都是一个个实体，所以值为空，应该删不向后台传送
              if (this.businessInfo[key].id !== '') {
                businessInfo[key] = this.businessInfo[key]
              }
            } else {
              if (this.businessInfo[key]) {
                businessInfo[key] = this.businessInfo[key]
              }
            }
          }
          this.$post('/bussiness/save', businessInfo).then((res) => {
            this.loading = false
            if (res.data.success === true) {
              this.businessInfo = res.data.data
              this.editInfo()
              this.temp = _.cloneDeep(this.businessInfo)
              this.saveRecordHistory()
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
        }
      })
    },
    reset() {
      this.businessInfo = _.cloneDeep(this.temp)
      this.editInfo()
    },
    cancel() {
      this.$emit('changeObj', false)
      this.$emit('toggleTab')
    },
    editInfo() {
      // 人员信息负责人信息需要保存实体，如果未保存，查看会返回null需要转换为对象进行数值保定
      var arr = ['designPerson', 'costPerson', 'projectPerson', 'projectManager']
      for (var key in this.businessInfo) {
        if (arr.indexOf(key) > -1 && this.businessInfo[key] === null) {
          this.businessInfo[key] = {
            id: '',
            name: '',
            phone: ''
          }
        }
      }
      this.businessInfo.amount1 = outputmoney('' + this.businessInfo.amount)
      var cityOption = this.businessInfo.oldCity.split('-')
      this.cityOption = []
      cityOption.forEach((item) => {
        this.cityOption.push(parseInt(item))
      })
      this.$get('/contractInfo/findAllByBussiness/' + this.businessInfo.id).then((res) => {
        if (res.data.success === true && res.data.data) {
          this.contractInfo = res.data.data
          // this.contractInfo.contractTotalAmount = outputmoney('' + this.businessInfo.contractTotalAmount)
        }
      })
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.editWord = '编辑'
        this.businessInfo = _.cloneDeep(this.temp)
      } else {
        this.editWord = '取消编辑'
      }
    },
    passCheck() {
      this.businessInfo.examineState = '有效商机'
      this.add()
    },
    getInsertData() {
      this.$get('/bussiness/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
        this.userList = data.userList
        this.businessCtgList = data.businessCtgList
      })
      this.executeStateList = [{ value: '前期接洽' }, { value: '招投标' }, { value: '中标' }, { value: '合同会签' }, { value: '纸质版合同签订' }, { value: '放弃' }]
      this.businessInfo.createPerson = this.accountName
    },
    cityChange(val) {
      var len = val.length
      this.businessInfo.city.id = val[len - 1]
    },
    amountChange(val) {
      this.businessInfo.amount = val
      this.businessInfo.amount1 = outputmoney(val)
    },
    //  所属年月日转化为年月格式
    dateChange(date) {
      // var d = new Date(date)
      // var newDate = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).substr(-2)
      // this.businessInfo.date = newDate
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
    },
    // 切换状态
    toggleAction() {
      if (this.editData.tabState === 'addTab') {
        this.action = 'add'
        this.disabled = false
        this.editShow = false
      } else {
        this.action = 'edit'
        this.disabled = true
        this.editShow = true
        this.businessInfo = this.editData.editData.business
        this.editInfo()
      }
    },
    validateMsg(errMsg) {
      return (rule, value, callback) => {
        if (!value.id) {
          callback(new Error(errMsg))
        } else {
          callback()
        }
      }
    },
    // 修改记录
    getRecordHistory() {
      this.$get('/businessHistory/findAllByBusiness/' + this.businessInfo.id).then((res) => {
        if (res.data.success === true) {
          this.historyRecord = res.data.data.content
          var len = this.historyRecord.length - 1
          var lastTime = len > 0 ? new Date(this.historyRecord[len].time) : new Date()
          this.lastTime = lastTime.getTime()
          // console.log('lastTime', this.lastTime)
          this.setSession()
        }
      })
    },
    saveRecordHistory() {
      var businessHistoryObj = JSON.parse(sessionStorage.getItem('businessHistoryObj')) || {}
      var content = '' // 监听多字段的变化
      if (businessHistoryObj.keyword !== this.businessInfo.keyword) {
        content += '项目需求描述：' + this.businessInfo.keyword + ';  '
      }
      if (businessHistoryObj.amount !== this.businessInfo.amount1) {
        content += '预计成交金额：' + this.businessInfo.amount1 + ';  '
      }
      if (businessHistoryObj.startDate !== this.businessInfo.startDate) {
        content += '项目预计启动时间：' + this.businessInfo.startDate + ';  '
      }
      if (businessHistoryObj.firstPerson !== this.businessInfo.firstPerson) {
        content += '甲方决策人：' + this.businessInfo.firstPerson + ';  '
      }
      if (businessHistoryObj.firstPersonPhone !== this.businessInfo.firstPersonPhone) {
        content += '甲方决策人联系方式：' + this.businessInfo.firstPersonPhone + ';  '
      }
      if (businessHistoryObj.executeState !== this.businessInfo.executeState) {
        content += '商机执行状态：' + this.businessInfo.executeState
      }
      if ((businessHistoryObj.id === this.businessInfo.id) && (content !== '')) { // 有值的改变，新增一条修改记录
        var dNumber = parseInt((new Date().getTime() - parseInt(businessHistoryObj.time)) / (1000 * 60 * 60 * 24))
        var obj = {
          business_id: this.businessInfo.id,
          content: content,
          dNumber: dNumber
        }
        this.$post('/businessHistory/save', obj).then((res) => {
          this.getRecordHistory()
        })
      } else {
        this.getRecordHistory()
      }
    },
    setSession() {
      var oldObj = {
        id: this.businessInfo.id,
        keyword: this.businessInfo.keyword,
        amount: this.businessInfo.amount1,
        startDate: this.businessInfo.startDate,
        firstPerson: this.businessInfo.firstPerson,
        firstPersonPhone: this.businessInfo.firstPersonPhone,
        executeState: this.businessInfo.executeState,
        time: this.lastTime
      }
      sessionStorage.setItem('businessHistoryObj', JSON.stringify(oldObj))
    }
  },
  watch: {
    disabled (status) {
      if (status === false) {
        this.editWord = '取消编辑'
        this.$emit('changeObj', true)
      } else {
        this.editWord = '编辑'
      }
    },
    businessInfo: {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.busniess-add {
  .edit-btn {
    margin: 0;
    button {
      float: right;
    }
  }
}
</style>
<style  rel="stylesheet/scss" lang="scss" >
@import "src/styles/mixin.scss";
.busniess-add {
  .form-module {
    .el-form-item.pro_describe {
      .el-form-item__label {
        width: 13.5% !important;
      }
      .el-form-item__content {
        width: 81.5% !important;
      }
    }
  }
  .revise-record {
    .el-table .cell {
      white-space: normal;
      height: auto;
    }
  }
}
</style>
