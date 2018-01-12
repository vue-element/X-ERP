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
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>创建人：</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>所属年月：</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>单据日期：</label>
              <input type="text" v-model="businessInfo.date" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>区域：</label>
              <el-select v-model="businessInfo.region.id" placeholder="请选择">
               <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id">
               </el-option>
             </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>商机类型：</label>
              <input type="text" v-model="businessInfo.type" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>商机来源：</label>
              <input type="text" v-model="businessInfo.source" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <!-- <div class="basic-item">
              <label>城市名称：</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div> -->
            <div class="basic-item">
              <label>城市：</label>
              <el-cascader :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange"></el-cascader>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>商机名称：</label>
              <input type="text" v-model="businessInfo.name" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 客户信息 -->
      <div class="form-module">
        <h4 class="module-title">
          <p>客户信息</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>客户名称：</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>客户类别：</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>业态：</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>联系人：</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>职位：</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>联系人电话：</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>QQ：</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>E-mail：</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="basic-item customer-address">
              <label>客户地址：</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
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
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>项目关键信息描述:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>业务分类:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>投标日期:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>方案投标日期:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>总体项目开工时间:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>预计开发或发货时间:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>预计合同签订时间:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>预计成交金额（元）:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>人员信息</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>业务线负责人:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>电话:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>项目具体跟进人:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>电话:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>进度状况</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>商机跟进状态:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>商机执行状态:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>合同原始金额（元）:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>合同变更金额（元）:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>变更后合同金额（元）:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>合约签订时间:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>合约开工时间:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>合约完工时间:</label>
              <input type="text" v-model="businessInfo.q" placeholder="请输入">
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="form-module approval-opinion">
        <h4 class="module-title">
          <p>审批意见</p>
        </h4>
        <div class="approval-textarea">
          <textarea placeholder="输入..."></textarea>
        </div>
      </div>
      <div class="con-search-btn">查  询</div>
    </div>
  </div>
</div>
</template>

<script>
import {
  winHeight
} from '@/utils'
// import { fetchList } from '@/api/article'
export default {
  name: 'businessOpportunity-index',
  data() {
    return {
      businessInfo: {
        q: 1,
        chargePerson: '业务线负责人',
        city: {},
        client: {},
        code: '编码',
        date: '单据日期',
        executState: '商机执行状态',
        followPerson: '项目跟进人',
        followState: '商机跟进状态',
        name: '商机名称',
        projectImpls: [],
        region: {},
        source: '商机来源',
        type: '商机类型'
      },
      cityOption: [1],
      regionList: [],
      cityList: [],
      height: 100
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
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
.customer-address {
  label {
    width: 11%!important;
  }
  input {
    width: 82%!important;
  }
}
.approval-opinion {
    textarea {
    @include boxSizing;
    width: 100%;
    padding: 8px 14px;
    height: 70px;
    border: 1px solid #828282;
    font-size: 14px;
    line-height: 16px;
  }
}

</style>
<style  rel="stylesheet/scss" lang="scss">
</style>
