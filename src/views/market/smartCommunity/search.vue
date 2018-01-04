<template>
<div class="app-container smartCommunity-search">
  <ul class="form-attached clearfix">
    <ul class="crud-btn fl">
      <li>
        <i class="iconfont icon-search"></i>
        <span>查询</span>
      </li>
      <li>
        <i class="iconfont icon-seeAll"></i>
        <span>查看明细</span>
      </li>
      <li>
        <i class="iconfont icon-add"></i>
        <span>新增</span>
      </li>
      <li>
        <i class="iconfont icon-edit"></i>
        <span>修改</span>
      </li>
      <li>
        <i class="iconfont icon-delete"></i>
        <span>删除</span>
      </li>
    </ul>
    <li class="fr data-export">
      <i class="iconfont icon-export"></i>
      <span>数据导出</span>
    </li>
  </ul>
  <!-- 查询功能 -->
  <div class="search-container">
    <div class="search-form">
      <h4>
        <p>查询条件</p>
      </h4>
      <el-form ref="form" :model="form">
        <el-row type="flex" justify="space-between">
          <el-form-item label="活动名称">
            <el-input v-model="form.name" placeholder="请填写活动名称"></el-input>
          </el-form-item>
          <el-form-item label="区域">
            <el-select v-model="form.region" placeholder="请选择区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="合约模式">
            <el-select v-model="form.region" placeholder="请选择合约模式">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-form-item label="客户信息" :span="6">
            <el-input v-model="form.msg" placeholder="请填写客户信息"></el-input>
          </el-form-item>
          <el-form-item label="城市" :span="6">
            <el-select v-model="form.city" placeholder="请选择城市">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="首期入伙时间" :span="6">
            <el-date-picker v-model="value9" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" default-value="2010-10-01" size="mini">
            </el-date-picker>
          </el-form-item>
        </el-row>
      </el-form>
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
  name: 'smartCommunity-search',
  data() {
    return {
      rulesForm: {
        type: []
      },
      form: {
        region: ''
      },
      value9: '',
      height: 100
    }
  },
  created() {
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
      // this.height = 0
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

.app-container {
    padding: 0 10px;
    @include boxSizing;
}
.form-attached {
  margin: 0 15px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #828282;
  ul.crud-btn {
    li {
      display: inline-block;
      margin-right: 35px;
      i {
        display: inline-block;
        margin-right: 6px;
      }
    }
  }
  .data-export {
    i {
      display: inline-block;
      margin-right: 6px;
    }
  }
}
.basic-form {
  .el-table__fixed-body-wrapper {
    margin: 28px 0;
  }
}
.search-container {
  border-top: 5px solid #d2d2d2;
  color: #000;
.search-form {
    border: 1px solid #d2d2d2;
    margin: 16px 0;
    padding: 0 20px;
    @include borderRadius(4px);
    h4 {
      height: 20px;
      padding: 10px 0;
      border-bottom: 1px solid #d2d2d2;
      p {
        border-left: 5px solid #35d5ba;
        padding-left: 15px;
      }
    }
    .el-form {
      color: #000;
      .el-row {
        .el-form-item {
          margin: 0;
          padding: 0;
          margin-top: 20px;
          @include flex;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.smartCommunity-search{
  .el-form{
    .el-form-item{
      .el-form-item__label{
        width: 70px;
      }
      .el-form-item__content {
        width: 210px;
      }
      .el-input__inner {
        width: 210px
      }
    }
    .el-form-item:last-child {
      .el-form-item__label{
        width: 96px;
      }
    }
  }
}
</style>
