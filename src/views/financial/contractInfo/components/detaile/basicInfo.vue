<template>
    <div class="basicInfo-container form-container" ref="ele">
      <el-form :model="ruleForm" ref="ruleForm" class="basic">
        <div class="basic form-module">
          <h4 class="module-title">
            <p>基础信息</p>
          </h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同编号：" prop="name">
                <el-input v-model="ruleForm.code" placeholder="请输入合同编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同名称：" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入合同名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="业务类别：" prop="name">
                <el-select v-model="ruleForm.category" placeholder="请选择业务类别">
                  <el-option v-for="item in category" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="客户类型：" prop="name">
                <el-select v-model="ruleForm.clientList" placeholder="请选择客户类型">
                  <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="城市：" prop="name">
                <el-input v-model="ruleForm.city" placeholder="请输入城市"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="办事处：" prop="name">
                <el-select v-model="ruleForm.regionList" placeholder="请选择活动区域">
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
              <el-form-item label="合同文本：" prop="name">
                <el-select v-model="ruleForm.text" placeholder="请选择合同文本">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="single-date" label="签订时间：" prop="name">
                 <el-date-picker v-model="ruleForm.sign" type="date" placeholder="签订日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="single-date" label="合同所属期：" prop="name">
                <el-date-picker v-model="ruleForm.date" format="yyyy-MM" value-format="yyyy-MM" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="range-date" label="合同期限：" prop="name">
                  <el-date-picker v-model="ruleForm.firstEntryDate" type="daterange"  start-placeholder="开始日期" range-separator="—" end-placeholder="结束日期">
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
              <el-form-item label="合同金额：" prop="name">
                <el-input name="name" type="text" placeholder="请输入合同金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="变更金额：" prop="name">
                <el-input v-model="ruleForm.name" type="text" placeholder="请输入变更金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同总额：" prop="name">
                <el-input v-model="ruleForm.name" type="text" placeholder="请输入合同总额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="commont-btn">
          <el-button>保存</el-button>
          <el-button>重置</el-button>
          <el-button>取消</el-button>
        </div>
      </el-form>
    </div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  data() {
    return {
      cityList: '',
      clientList: '',
      regionList: '',
      category: [{
        id: '1',
        name: '科技-智慧社区工程全委'
      }, {
        id: '2',
        name: '科技-智慧社区改造'
      }, {
        id: '3',
        name: '科技-物联网大平台'
      }, {
        id: '4',
        name: '科技-设计服务'
      }, {
        id: '5',
        name: '科技-技术服务'
      }, {
        id: '6',
        name: '机电-设备运维平台'
      }, {
        id: '7',
        name: '机电-设备顾问'
      }, {
        id: '8',
        name: '机电-节能工程'
      }, {
        id: '9',
        name: '机电-设备查验'
      }, {
        id: '10',
        name: '机电-设备运维全委'
      }, {
        id: '11',
        name: '机电-设备升级改造'
      }, {
        id: '12',
        name: '机电-电梯第三方监管'
      }],
      ruleForm: {
        code: '',
        name: '',
        category: '',
        client: '',
        office: '',
        sign: '',
        year: '',
        city: ''
      },
      height: 100
    }
  },
  created() {
    this.data()
  },
  methods: {
    data() {
      this.$get('/contractInfo/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
      })
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
    margin:0;
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
