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
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="创建人：">
            <p v-if="disabled"></p>
            <el-input v-else placeholder="创建人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="所属年月：" class="single-date">
            <p v-if="disabled">{{dateline}}</p>
            <el-date-picker v-else type="month" format="yyyy-MM" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="dateline"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="单据日期：" class="single-date">
            <p v-if="disabled">{{businessInfo.date}}</p>
            <el-date-picker v-else type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="businessInfo.date"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="商机名称：">
            <p v-if="disabled">{{businessInfo.name}}</p>
            <el-input v-else v-model="businessInfo.name" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="商机类型：">
            <p v-if="disabled">{{businessInfo.type}}</p>
            <el-input v-else v-model="businessInfo.type" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="商机类型：">
            <p v-if="disabled">{{businessInfo.source}}</p>
            <el-input v-else v-model="businessInfo.source" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item label="客户信息：" prop="client.id">
            <p v-if="disabled">{{businessInfo.client.name}}</p>
            <el-select v-else v-model="businessInfo.client.id" placeholder="请选择">
              <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="城市：">
            <p v-if="disabled">{{businessInfo.city.name}}</p>
            <el-cascader v-else :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="区域：" prop="region.id">
            <p v-if="disabled">{{businessInfo.region.name}}</p>
            <el-select v-else v-model="businessInfo.region.id" placeholder="请选择">
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
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item label="项目关键信息描述：">
            <p v-if="disabled">{{projectInfo.keyword}}</p>
            <el-input v-else v-model="projectInfo.keyword" placeholder="请输入"></el-input>
            <!-- <el-input v-else v-model="projectInfo.keyword" placeholder="请输入"></el-input> -->
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <el-form-item label="业务分类：" prop="region.id">
            <p v-if="disabled">{{projectInfo.category}}</p>
            <el-select v-else v-model="projectInfo.category" placeholder="请选择">
              <el-option v-for="item in projectCategoryList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="预计成交金额（元）：">
            <p v-if="disabled">{{projectInfo.amount}}</p>
            <el-input v-else v-model="projectInfo.amount" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="投标日期：" class="single-date">
            <p v-if="disabled">{{projectInfo.bidDate}}</p>
            <el-date-picker v-else type="date" value-format="yyyy-MM-dd" v-model="projectInfo.bidDate"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="方案投标日期：" class="single-date">
            <p v-if="disabled">{{projectInfo.bidDate2}}</p>
            <el-date-picker v-else type="date" value-format="yyyy-MM-dd" v-model="projectInfo.bidDate2"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="总体项目开工时间：" class="single-date">
            <p v-if="disabled">{{projectInfo.startDate}}</p>
            <el-date-picker v-else type="date" value-format="yyyy-MM-dd" v-model="projectInfo.startDate"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="预计开发或发货时间：" class="single-date">
            <p v-if="disabled">{{projectInfo.developDate}}</p>
            <el-date-picker v-else type="date" value-format="yyyy-MM-dd" v-model="projectInfo.developDate"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="预计合同签订时间：" class="single-date">
            <p v-if="disabled">{{projectInfo.signDate}}</p>
            <el-date-picker v-else type="date" value-format="yyyy-MM-dd" v-model="projectInfo.signDate"  placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div class="form-module">
      <h4 class="module-title">
        <p>人员信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="业务线负责人：">
            <p v-if="disabled">{{businessInfo.chargePerson}}</p>
            <el-input v-else v-model="businessInfo.chargePerson" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="电话：">
            <p v-if="disabled">{{businessInfo.chargePersonPhone}}</p>
            <el-input v-else v-model="businessInfo.chargePersonPhone" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="项目具体跟进人：">
            <p v-if="disabled">{{businessInfo.followPerson}}</p>
            <el-input v-else v-model="businessInfo.followPerson" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="电话：">
            <p v-if="disabled">{{businessInfo.followPersonPhone}}</p>
            <el-input v-else v-model="businessInfo.followPersonPhone" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div class="form-module">
      <h4 class="module-title">
        <p>进度状况</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="商机跟进状态：" prop="region.id">
            <p v-if="disabled">{{businessInfo.followState}}</p>
            <el-select v-else v-model="businessInfo.followState" placeholder="请选择">
              <el-option v-for="item in followStateList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="商机执行状态：" prop="region.id">
            <p v-if="disabled">{{businessInfo.executState}}</p>
            <el-select v-else v-model="businessInfo.executState" placeholder="请选择">
              <el-option v-for="item in executStateList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
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
export default {
  name: 'businessOpportunityAdd',
  props: ['editData'],
  data() {
    return {
      action: 'add',
      editWord: '编辑',
      loading: false,
      disabled: false,
      editShow: false,
      rules: {},
      businessInfo: {
        city: {
          id: 3
        },
        client: {
          id: 1
        },
        region: {
          id: 1
        },
        projectImpls: [],
        code: '编码',
        date: '2018-01-01',
        executState: '',
        followState: '',
        name: '商机名称',
        source: '商机来源',
        type: '商机类型',
        chargePerson: '业务线负责人',
        followPerson: '项目跟进人',
        chargePersonPhone: '业务线负责人 - 联系电话',
        followPersonPhone: '项目跟进人 - 联系电话',
        oldCity: 3
      },
      projectInfo: {
        amount: '预计成交金额',
        bidDate: '2018-01-01',
        bidDate2: '2018-01-01',
        category: '',
        developDate: '2018-01-01',
        keyword: '项目关键信息',
        signDate: '2018-01-01',
        startDate: '2018-01-01'
      },
      cityOption: [0, 1, 3],
      regionList: [],
      cityList: [],
      clientList: [],
      followStateList: [],
      executStateList: [],
      projectCategoryList: [],
      dateline: ''
    }
  },
  created() {
    this.businessInfo.date = new Date()
    this.dateline = new Date()
    this.getInsertData()
    console.log('tabState', this.editData.tabState)
    if (this.editData.tabState === 'seeTab') {
      this.action = 'edit'
      this.editShow = true
      this.disabled = true
      this.editInfo()
    } else {
      this.action = 'add'
    }
  },
  mounted() {},
  methods: {
    add() {
      this.loading = true
      this.businessInfo.oldCity = this.cityOption.join('-')
      this.businessInfo.projectImpls = [this.projectInfo]
      console.log(this.businessInfo)
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
      })
    },
    reset() {
      if (this.action === 'add') {
        this.businessInfo = {
          city: { id: '' },
          client: { id: '' },
          region: { id: '' },
          projectImpls: [],
          code: '',
          executState: '',
          followState: '',
          name: '',
          source: '',
          type: '',
          chargePerson: '',
          followPerson: '',
          chargePersonPhone: '',
          followPersonPhone: '',
          oldCity: ''
        }
        this.projectInfo = {
          amount: '',
          bidDate: '',
          bidDate2: '',
          category: '',
          developDate: '',
          keyword: '',
          signDate: '',
          startDate: ''
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
      this.projectInfo = data.business.projectImpls[0]
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
      this.followStateList = [{
        value: '浅度跟进'
      }, {
        value: '深度跟进'
      }, {
        value: '已定未签'
      }, {
        value: '已签订'
      }, {
        value: '放弃'
      }]
      this.executStateList = [{
        value: '前期接洽'
      }, {
        value: '方案编制'
      }, {
        value: '投标'
      }, {
        value: '中标'
      }, {
        value: '合同会签'
      }, {
        value: '纸质版合同签订'
      }]
      this.projectCategoryList = [{
        value: '科技-智慧社区工程全委'
      }, {
        value: '科技-智慧社区改造'
      }, {
        value: '科技-物联网大平台'
      }, {
        value: '科技-设计服务'
      }, {
        value: '科技-技术服务'
      }]
    },
    cityChange(val) {
      var len = val.length
      this.businessInfo.city.id = val[len - 1]
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>@import "src/styles/mixin.scss";
.form-container {
    overflow-y: auto;
    @include noScroll;
}
.busniess-add {
  .edit-btn {
    margin: 0;
    button {
      float: right;
    }
  }
}
</style>
<style  rel="stylesheet/scss" lang="scss">
</style>
