<template>
    <div class="basicInfo-container form-container" ref="ele">
      <el-form :model="contractInfo" ref="contractInfo" class="basic">
        <div class="basic form-module">
          <h4 class="module-title">
            <p>基础信息</p>
          </h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同编号：">
                <el-input v-model="contractInfo.code" placeholder="请输入合同编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同名称：">
                <el-input v-model="contractInfo.name" placeholder="请输入合同名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="业务类别：">
                <el-select v-model="contractInfo.category" placeholder="请选择业务类别">
                  <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="客户类型：">
                <el-select v-model="contractInfo.client.id" placeholder="请选择客户类型">
                  <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="城市：">
                <el-cascader :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange" placeholder="请选择城市"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="办事处：">
                <el-select v-model="contractInfo.region.id" placeholder="请选择活动区域">
                  <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id"></el-option>
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
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同文本：">
                <el-select v-model="contractInfo.text" placeholder="请选择合同文本">
                  <el-option v-for="item in textList" :label="item.value" :value="item.value" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="single-date" label="签订时间：">
                 <el-date-picker v-model="contractInfo.signDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date" placeholder="签订日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="single-date" label="合同所属期：">
                <el-date-picker v-model="contractInfo.term" format="yyyy-MM" value-format="yyyy-MM" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="range-date" label="合同期限：">
                  <el-date-picker v-model="contractInfo.date" type="daterange"  start-placeholder="开始日期" range-separator="—" end-placeholder="结束日期">
                  </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="invoice form-module">
          <h4 class="module-title">
            <p>金额信息</p>
          </h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同金额：">
                <el-input v-model="contractInfo.originalAmount" type="text" placeholder="请输入合同金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="变更金额：">
                <el-input v-model="contractInfo.changeAmount" type="text" placeholder="请输入变更金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同总额：">
                <el-input v-model="contractInfo.contractTotalAmount" type="text" placeholder="请输入合同总额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="commont-btn">
          <el-button @click="add" :loading="loading">保存</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="cancel('listTab')">取消</el-button>
        </div>
      </el-form>
    </div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  data() {
    return {
      height: 100,
      loading: false,
      cityList: [],
      cityOption: [],
      clientList: [],
      regionList: [],
      textList: [],
      categoryList: [],
      contractInfo: {
        code: '',
        name: '',
        category: '',
        client: {
          id: ''
        },
        city: {
          id: ''
        },
        region: {
          id: ''
        },
        text: '',
        signDate: '',
        term: '',
        date: '',
        originalAmount: '',
        changeAmount: '',
        contractTotalAmount: '',
        oldCity: ''
      }
    }
  },
  created() {
    this.data()
  },
  methods: {
    add() {
      this.contractInfo.oldCity = this.cityOption.join('-')
      this.$post('/contractInfo/save', this.contractInfo).then((res) => {
        console.log(res)
      })
    },
    data() {
      this.$get('/contractInfo/findInsertData').then((res) => {
        var data = res.data.data
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
    reset() {
      this.ruleForm = {
        code: '',
        name: '',
        category: '',
        clientList: '',
        city: '',
        regionList: '',
        textList: '',
        signDate: '',
        term: '',
        date: '',
        originalAmount: '',
        changeAmount: '',
        contractTotalAmount: ''
      }
    },
    cityChange(val) {
      var len = val.length
      this.contractInfo.city.id = val[len - 1]
    }
  },
  mounted() {
    this.$refs.ele.style.height = winHeight() - 230 + 'px'
    window.addEventListener('resize', () => {
      this.$refs.ele.style.height = winHeight() - 230 + 'px'
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .basicInfo-container.form-container{
    margin-top:140px;
    overflow-y:auto;
    @include noScroll;
    .form-module{
      .el-row{
        margin-bottom:10px;
        .el-col{
          .item {
            margin-top: 20px;
            label {
              color: #000;
              width: 30%;
              line-height: 16px;
              word-wrap: wrap;
              font-size: 14px;
              vertical-align:middle;
              display:inline-block;
              text-align:right;
            }
            input {
              width: 38%;
              height: 28px;
              border: 1px solid #828282;
              @include borderRadius(4px);
              text-indent: 12px;
              vertical-align:middle;
            }
          }
        }
      }
    }
    .btn{
      text-align:center;
      margin-bottom:30px;
      div.common-btn{
        margin-left:30px;
        display:inline-block;
      }
    }
    .invoice{
      label{
        text-align:left !important;
      }
    }
  }
</style>
