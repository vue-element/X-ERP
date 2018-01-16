<template>
  <div class="price-system-container">
    <div class="form-container">
      <div class="form-module">
        <h4 class="module-title">
          <p>基本信息</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>产品名称：</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>单位</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>供应商</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>规格型号：</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>系统</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>供应商类型</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>产品类型：</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>品牌</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>产品最新报价（元）：</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>区域：</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="8">
            <div class="basic-item">
              <label>供货周期（天）：</label>
              <input type="text"  placeholder="请输入">
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xs="24" :sm="24" :lg="24">
            <div class="basic-item ref-describe">
              <label>参考描述：</label>
              <textarea type="text"  placeholder="请输入"></textarea>
            </div>
          </el-col>
        </el-row>
        <div class="form-btn">
          <button class="common-btn">保存</button>
          <button class="common-btn">重置</button>
          <button class="common-btn">取消</button>
        </div>
      </div>
      <div class="form-module">
        <h4 class="module-title">
          <p>产品报价历史</p>
        </h4>
        <el-table class="basic-form" style="width: 100%"  :data="historyPrice" :height="height" @selection-change="handleSelectionChange" ref="multipleTable">
          <el-table-column align="center" prop="0" fixed label="序号">
            <template slot-scope="scope">
             {{scope.$index  + 1}}
           </template>
          </el-table-column>
          <el-table-column prop="1" fixed label="产品报价"></el-table-column>
          <el-table-column prop="2" fixed label="修改人"></el-table-column>
          <el-table-column prop="3" fixed label="修改时间"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
// import { winHeight, dateline } from '@/utils'
export default {
  name: 'proceSystemAdd',
  data() {
    return {
      historyPrice: [{
        1: '600.00',
        2: '罗艺',
        3: '2017-12-20'
      }, {
        1: '600.00',
        2: '罗艺',
        3: '2017-12-20'
      }, {
        1: '600.00',
        2: '罗艺',
        3: '2017-12-20'
      }]
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },
  computed: {}
}
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
// .form-container {
//   overflow-y: auto;
//   @include noScroll;
// }
.price-system-container {
  .form-module .el-col:first-child {
    label {
      width: 22%;
    }
  }
  .ref-describe {
    label {
      width: 7%!important;
      display: inline-block;
      vertical-align: middle;
      margin-right: .4%;
    }
    textarea {
      width: 88%;
      vertical-align: middle;
      border: 1px solid #828282;
      padding: 10px;
      line-height: 18px;
      @include borderRadius(4px)
    }
  }
  .form-btn {
    // width: auto;
    text-align: center;
    button {
      margin-right: 10px;
    }
  }
}

</style>
<style  rel="stylesheet/scss" lang="scss">
</style>
