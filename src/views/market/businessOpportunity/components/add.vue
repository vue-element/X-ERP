<template>
<div class="business-container busniess-add">
  <!-- 社区建设单项目信息表 -->
  <div class="form-container project-msg" ref="ele">
    <div class="form-inner">
      <!-- 基本信息 -->
      <div class="form-module">
        <h4 smartCommunity-search>
          <p>基础信息</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>创建人：</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>所属年月：</label>
              <input type="text"  placeholder="请输入" v-model="dateline">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>单据日期：</label>
              <input type="text" v-model="businessInfo.date" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>商机名称：</label>
              <input type="text" v-model="businessInfo.name" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>商机类型：</label>
              <input type="text" v-model="businessInfo.type" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>商机来源：</label>
              <input type="text" v-model="businessInfo.source" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="24" :lg="8">
            <div class="basic-item customer-info">
              <label>客户信息：</label>
              <el-select v-model="businessInfo.client.id" placeholder="请选择">
               <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>城市：</label>
              <el-cascader :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange"></el-cascader>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>区域：</label>
              <el-select v-model="businessInfo.region.id" placeholder="请选择">
               <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id">
               </el-option>
             </el-select>
            </div>
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
            <div class="basic-item">
              <label>项目关键信息描述：</label>
              <input type="text" v-model="projectInfo.keyword" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="8">
            <div class="basic-item">
              <label>业务分类：</label>
              <input type="text" v-model="projectInfo.category" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>投标日期：</label>
              <input type="text" v-model="projectInfo.bidDate" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>方案投标日期：</label>
              <input type="text" v-model="projectInfo.bidDate2" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>总体项目开工时间：</label>
              <input type="text" v-model="projectInfo.startDate" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>预计开发或发货时间：</label>
              <input type="text" v-model="projectInfo.developDate" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>预计合同签订时间：</label>
              <input type="text" v-model="projectInfo.signDate" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>预计成交金额（元）：</label>
              <input type="text" v-model="projectInfo.amount" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>人员信息</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>业务线负责人：</label>
              <input type="text" v-model="businessInfo.chargePerson" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>电话：</label>
              <input type="text" v-model="businessInfo.chargePersonPhone" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>项目具体跟进人：</label>
              <input type="text" v-model="businessInfo.followPerson" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>电话：</label>
              <input type="text" v-model="businessInfo.followPersonPhone" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>进度状况</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>商机跟进状态</label>
              <el-select v-model="businessInfo.followState" placeholder="请选择">
               <el-option v-for="item in followStateList" :key="item.id" :label="item.value" :value="item.id">
               </el-option>
             </el-select>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>商机执行状态</label>
              <el-select v-model="businessInfo.executState" placeholder="请选择">
               <el-option v-for="item in executStateList" :key="item.id" :label="item.value" :value="item.id">
               </el-option>
             </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="con-search-btn" @click="addData"><span>提  交</span></div>
    </div>
  </div>
</div>
</template>

<script>
import { winHeight, dateline } from '@/utils'
export default {
  name: 'businessOpportunity-index',
  data() {
    return {
      businessInfo: {
        city: {},
        client: {},
        projectImpls: [],
        region: {},
        code: '编码',
        date: '单据日期',
        executState: '',
        followState: '',
        name: '商机名称',
        source: '商机来源',
        type: '商机类型',
        chargePerson: '业务线负责人',
        followPerson: '项目跟进人',
        chargePersonPhone: '业务线负责人 - 联系电话',
        followPersonPhone: '项目跟进人 - 联系电话',
        oldCity: ''
      },
      projectInfo: {
        amount: '预计成交金额',
        bidDate: '投标日期',
        bidDate2: '方案投标日期',
        category: '业务分类',
        developDate: '预计开发或发货时间',
        keyword: '项目关键信息',
        signDate: '预计合同签订时间',
        startDate: '总体项目开工时间'
      },
      cityOption: [1],
      regionList: [],
      cityList: [],
      followStateList: [
        {
          id: 0,
          value: '浅度跟进'
        }, {
          id: 1,
          value: '深度跟进'
        }, {
          id: 2 ,
          value: '已定未签'
        }, {
          id: 3,
          value: '已签订'
        }, {
          id: 4,
          value: '放弃'
        }
      ],
      executStateList: [
        {
          id: 0,
          value: '前期接洽'
        }, {
          id: 1,
          value: '方案编制'
        }, {
          id: 2,
          value: '投标'
        }, {
          id: 3,
          value: '中标'
        }, {
          id: 4,
          value: '合同会签'
        }, {
          id: 5,
            value: '纸质版合同签订'
        }
      ],
      height: 100,
      dateline: ''
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    this.dateline = dateline()
    console.log('dateline', this.dateline)
    this.getInsertData()
  },
  mounted() {
    this.$refs.ele.style.height = winHeight() - 180 + 'px'
    window.addEventListener('resize', () => {
      this.$refs.ele.style.height = winHeight() - 180 + 'px'
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
    },
    getInsertData() {
      this.$get('/bussiness/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
      })

    },
    cityChange(val) {
      var len = val.length
      this.businessInfo.city.id = val[len - 1]
    },
    addData() {
      this.businessInfo.oldCity = this.cityOption.join('-')
      var bussinessObj = {
        Business: this.businessInfo
      }
      bussinessObj.Business.projectImpls[0] = this.projectInfo
      console.log('obj', bussinessObj)
      this.$post('/bussiness/save', bussinessObj).then((res) => {
        console.log('res', res)
      })
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.form-container {
  overflow-y: auto;
  @include noScroll;
}

</style>
<style  rel="stylesheet/scss" lang="scss">
</style>
