<template>
  <div class="search-container form-container">
    <div class="form-module">
      <h4 class="module-title">
        <p>查询条件</p>
      </h4>
      <el-form ref="form" :model="form">
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="8">
            <div class="item">
              <label>合同名称：</label>
              <input type="text">
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :lg="8">
            <div class="item">
              <label>合同编号：</label>
              <input type="text">
            </div>
          </el-col>

          <el-col :xs="24" :sm="12" :lg="8">
            <div class="item">
              <label>签订日期：</label>
              <input type="text">
            </div>
          </el-col>

          <el-col class="area" :xs="24" :sm="12" :lg="8">
            <label>所属区域：</label>
            <el-select v-model="form.region">
              <el-option label="深圳办事处" value="shanghai"></el-option>
              <el-option label="华南办事处" value="beijing"></el-option>
              <el-option label="西北办事处" value="beijing"></el-option>
            </el-select>
          </el-col>

          <el-col :xs="24" :sm="12" :lg="8">
            <div class="item">
              <label>签订日期：</label>
              <input type="text">
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="common-btn" @click="search">查  询</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        region: ''
      }
    }
  },
  methods: {
    search() {
      this.$refs.form.validate(function(res) {
        console.log(res)
      })
    }
  }
}
</script>

<style ref="stylesheet/scss" lang="scss" scope>
@import "src/styles/mixin.scss";
.search-container.form-container{
  .form-module{
    .el-row{
      margin-bottom:10px;
      .el-col{
        .item {
          margin-top: 20px;
          label {
            color: #000;
            width: 18%;
            line-height: 16px;
            word-wrap: wrap;
            font-size: 14px;
            vertical-align:middle;
            display:inline-block;
          }
          input {
            width: 50%;
            height: 32px;
            border: 1px solid #828282;
            @include borderRadius(4px);
            text-indent: 12px;
            vertical-align:middle;
          }
        }
      }
    }
    .area{
      margin-top:20px;
      input{
        width: 100%;
        height: 32px;
        border: 1px solid #828282;
        @include borderRadius(4px);
        text-indent: 12px;
        vertical-align:middle;
      }
    }
  }
}
</style>
