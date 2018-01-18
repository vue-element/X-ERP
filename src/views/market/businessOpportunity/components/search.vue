<template>
<div class="business-container business-search">
  <!-- 社区建设单项目信息表 -->
  <div class="form-container project-msg"  v-show="true">
    <div class="form-inner">
      <!-- 基本信息 -->
      <div class="form-module">
        <h4 class="module-title">
          <p>查询条件:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>商机名称：</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>商机编码：</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>审核状态：</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="24" :lg="8">
            <div class="basic-item customer-info">
              <label>客户信息：</label>
              <el-select v-model="msg.id" placeholder="请选择">
               <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>区域：</label>
              <el-select v-model="msg.id" placeholder="请选择">
               <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>城市：</label>
              <el-cascader :options="cityList" :show-all-levels="false" v-model="filterData.cityOption" @change="cityChange"></el-cascader>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item customer-info">
              <label>业务分类：</label>
              <el-select v-model="msg.id" placeholder="请选择">
               <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item customer-info">
              <label>商机跟进状态：</label>
              <el-select v-model="msg.id" placeholder="请选择">
               <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>商机执行状态：</label>
              <el-select v-model="msg.id" placeholder="请选择">
               <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item range-date">
              <label>修改日期：</label>
              <el-date-picker v-model="value" type="daterange"  start-placeholder="开始日期" range-separator="—" end-placeholder="结束日期" default-value="2017-01-01">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item range-date">
              <label>所属年月：</label>
              <el-date-picker v-model="value" type="daterange"  start-placeholder="开始日期" range-separator="—" end-placeholder="结束日期" default-value="2017-01-01">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>单据日期：</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item customer-info">
              <label>关联合同：</label>
              <el-select v-model="msg.id" placeholder="请选择">
               <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>业务分线负责人：</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="el-form-item money-item">
              <label class="el-form-item__label">金额：</label>
              <div class="el-form-item__content">
                <input placeholder="0">
                <span>~</span>
                <input placeholder="0">
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="common-btn">查  询</div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'businessOpportunitySearch',
  data() {
    return {
      filterData: {
        region: {},
        client: {},
        city: {},
        chargePerson: '业务线负责人',
        date: '单据日期',
        name: '商机名称',
        cityOption: [0, 1, 3]
      },
      msg: {
        1: 1
      },
      form: {
        region: '',
        name: ''
      },
      value: '',
      clientList: [],
      cityList: [],
      regionList: []
    }
  },
  created() {
    this.getInsertData()
  },
  methods: {
    getInsertData() {
      this.$get('/bussiness/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        // console.log('data', this.cityList)
        this.clientList = data.clientList
        this.regionList = data.regionList
      })
    },
    cityChange(val) {
      console.log('val', val)
      var len = val.length
      this.filterData.city.id = val[len - 1]
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.business-search {
  color: #000;
  font-size: 14px;
  .el-row {
    .el-form-item,
    .money-item {
      margin: 0;
      padding: 0;
      margin-top: 20px;
      @include flex;
    }
    .money-item {
      label.el-form-item__label {
        width: 26%!important;
        margin-right: 2%;
        padding:0;
        text-align: right;
      }
      .el-form-item__content{
        width: 62%;
        @include borderRadius(4px);
        @include flex;
        @include boxSizing;
        border: 1px solid #828282;
        padding:0 15px;
        padding-left: 15px;
        input {
          width: 40%;
          text-align: center;
        }
        span {
          width: 20%;
          text-align: center;
        }
      }
    }
  }
}
</style>
<style lang="scss">
@import "src/styles/mixin.scss";
</style>
