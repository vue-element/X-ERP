<template>
    <div class="basicInfo-container form-container" ref="ele">
      <div class="commont-btn edit-btn" v-show="editShow">
        <el-button @click="toggleEditBtn">{{editWord}}</el-button>
      </div>
      <el-form :model="contractInfo" ref="contractInfo" class="basic">
        <div class="basic form-module">
          <h4 class="module-title">
            <p>基础信息</p>
          </h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同编号：">
                <p v-if="disabled">{{contractInfo.code}}</p>
                <el-input v-else v-model="contractInfo.code" placeholder="请输入合同编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同名称：">
                <p v-if="disabled">{{contractInfo.name}}</p>
                <el-input v-else v-model="contractInfo.name" placeholder="请输入合同名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="业务类别：">
                <p v-if="disabled">{{contractInfo.category}}</p>
                <el-select v-else v-model="contractInfo.category" placeholder="请选择业务类别">
                  <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="客户类型：">
                <p v-if="disabled">{{contractInfo.client.name}}</p>
                <el-select v-else v-model="contractInfo.client.id" placeholder="请选择客户类型">
                  <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="城市：">
                <p v-if="disabled">{{contractInfo.city.name}}</p>
                <el-cascader v-else :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange" placeholder="请选择城市"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="办事处：">
                <p v-if="disabled">{{contractInfo.region.name}}</p>
                <el-select v-else v-model="contractInfo.region.id" placeholder="请选择活动区域">
                  <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="所属商机：">
                <p v-if="disabled">{{contractInfo.business.name}}</p>
                <el-select v-else v-model="contractInfo.business.id" placeholder="请选择商机">
                  <el-option v-for="item in businessList" :label="item.name" :value="item.id" :key="item.id"></el-option>
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
                <p v-if="disabled">{{contractInfo.text}}</p>
                <el-select v-else v-model="contractInfo.text" placeholder="请选择合同文本">
                  <el-option v-for="item in textList" :label="item.value" :value="item.value" :key="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="single-date" label="签订时间：">
                <p v-if="disabled">{{contractInfo.signDate}}</p>
                <el-date-picker v-else v-model="contractInfo.signDate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="签订日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="single-date" label="合同所属期：">
                <p v-if="disabled">{{contractInfo.term}}</p>
                <el-date-picker v-else v-model="contractInfo.term" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="limit" :gutter="40">
            <!-- 第一种 -->
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="range-date" label="合同期限：">
                <p v-if="disabled">{{contractInfo.dateShow}}</p>
                <el-date-picker v-else v-model="contractInfo.limit" @change="change" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
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
                <p v-if="disabled">{{contractInfo.originalAmount}}</p>
                <el-input v-else v-model="contractInfo.originalAmount" type="text" placeholder="请输入合同金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="变更金额：">
                <p v-if="disabled">{{contractInfo.changeAmount}}</p>
                <el-input v-else v-model="contractInfo.changeAmount" type="text" placeholder="请输入变更金额"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同总额：">
                <p v-if="disabled">{{contractInfo.contractTotalAmount}}</p>
                <el-input v-else v-model="contractInfo.contractTotalAmount" type="text" placeholder="请输入合同总额"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="commont-btn">
          <el-button @click="add" :loading="loading">保存</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </el-form>
    </div>
</template>

<script>
import _ from 'lodash'
import { winHeight } from '@/utils'
export default {
  props: ['editData'],
  data() {
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
        code: '',
        name: '',
        business: {
          id: ''
        },
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
        originalAmount: '',
        changeAmount: '',
        contractTotalAmount: '',
        startDate: '',
        endDate: '',
        oldCity: '',
        limit: [],
        dateShow: ''
      }
    }
  },
  created() {
    this.getInsertData()
    if (this.editData.tabState === 'seeTab') {
      this.action = 'edit'
      this.editShow = true
      this.disabled = true
      this.editInfo()
    } else {
      this.action = 'add'
    }
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
      this.loading = true
      this.contractInfo.oldCity = this.cityOption.join('-')
      this.contractInfo.startDate = this.contractInfo.limit[0]
      this.contractInfo.endDate = this.contractInfo.limit[1]
      this.$post('/contractInfo/save', this.contractInfo).then((res) => {
        var contractMsg = res.data.data
        console.log(contractMsg)
        sessionStorage.setItem('contractMsg', JSON.stringify(contractMsg))
        this.loading = false
        if (res.data.success === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.contractInfo = data.contractInfo
      var cityOption = data.contractInfo.oldCity.split('-')
      this.cityOption = []
      cityOption.forEach((item) => {
        this.cityOption.push(parseInt(item))
      })
      var dateShow = [data.contractInfo.startDate, data.contractInfo.endDate].join('-')
      this.contractInfo.dateShow = dateShow
      this.contractInfo.limit = [data.contractInfo.startDate, data.contractInfo.endDate]
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
    reset() {
      if (this.action === 'add') {
        this.cityOption = []
        this.limit = []
        this.contractInfo = {
          code: '',
          name: '',
          business: {
            id: ''
          },
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
          limit: '',
          originalAmount: '',
          changeAmount: '',
          contractTotalAmount: ''
        }
      } else {
        this.editInfo()
      }
    },
    cityChange(val) {
      var len = val.length
      this.contractInfo.city.id = val[len - 1]
    },
    cancel() {
      this.$emit('cancel')
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
    .edit-btn{
      margin: 0;
      button{
        float: right;
      }
    }
    margin-top:140px;
    overflow-y:auto;
    @include noScroll;
    .edit-btn{
      margin: 0;
      text-align: right;
    }
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
      .limit{
        .el-form-item{
          margin-top: 0;
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

<style  rel="stylesheet/scss" lang="scss">
  .single-date.endDate{
    margin-left: -200px;
  }
  .limit .el-form-item__content p{
    padding-left: 10px;
  }
</style>
