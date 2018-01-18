<template>
  <div class="contractInfo-search form-container">
    <div class="form-module">
      <h4 class="module-title">
        <p>查询条件:</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="8">
          <div class="basic-item">
            <label>合同名称：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <div class="basic-item">
            <label>合同编码：</label>
            <input type="text">
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <div class="basic-item">
            <label>业务分类：</label>
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in categoryList" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <div class="basic-item basic-date">
            <label>合同所属年月：</label>
            <el-date-picker v-model="value1" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <div class="basic-item basic-date">
            <label>签订时间：</label>
            <el-date-picker v-model="value2" type="daterange"  start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期">
            </el-date-picker>
          </div>
        </el-col>
         <el-col :xs="12" :sm="12" :lg="8">
          <div class="basic-item">
            <label>所属区域：</label>
            <el-select v-model="value3" placeholder="请选择">
              <el-option v-for="item in region" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <div class="basic-item">
            <label>是否执行结束：</label>
            <el-select v-model="value4" placeholder="请选择">
              <el-option v-for="item in isExecute" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <div class="common-btn">查  询</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      categoryList: [],
      clientList: [],
      region: [],
      isExecute: [{
        value: '1',
        label: '是'
      }, {
        value: '2',
        label: '否'
      }]
    }
  },
  created() {

  },
  methods: {

  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.contractInfo-search.form-container{
  .form-module{
    .el-row{
      margin-bottom:10px;
      .el-col{
        .item {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
