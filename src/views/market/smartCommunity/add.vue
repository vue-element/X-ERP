<template>
<div class="app-container">
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
  <!-- 社区建设单项目信息表 -->
  <div class="form-container project-msg">
    <div class="form-inner">
      <div class='project-msg basic-info'>
        <h4>
          <p>项目基础信息</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="basic-item customer-info">
              <label>客户信息:</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>区域:</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>城市:</label>
              <input type="text">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>项目名称:</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>楼道及单位数量:</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>项目地址:</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>首期入伙时间:</label>
              <input type="text">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>建筑业态:</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>物业管理费:</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>车位总数:</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>车位比:</label>
              <input type="text">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>户数(户):</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>容积率:</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>地面车位数量:</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>地面车位收费标准:</label>
              <input type="text">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>总户数(户):</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>总收费面积(平米):</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>地库车位数量:</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>地库车位收费标准:</label>
              <input type="text">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>土地面积(平米):</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>土地面积(平米):</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>人防车位数量:</label>
              <input type="text">
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item">
              <label>人防车位收费标准:</label>
              <input type="text">
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item radio-sel">
              <label>小区类型:</label>
              <ul>
                <li><input type="radio" name="type"><span>封闭式小区</span></li>
                <li><input type="radio" name="type"><span>开放式小区</span></li>
              </ul>
            </div>
          </el-col>
          <el-col :xs="12" :sm="12" :lg="6">
            <div class="basic-item radio-sel">
              <label>合约模式:</label>
              <ul>
                <li><input type="radio" name="model"><span>酬金制</span></li>
                <li><input type="radio" name="model"><span>包干制</span></li>
              </ul>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <div class="basic-item radio-sel">
              <label>小区配套设施:</label>
              <ul>
                <li><input type="radio" name="facilities"><span>公司</span></li>
                <li><input type="radio" name="facilities"><span>会所</span></li>
                <li><input type="radio" name="facilities"><span>球场</span></li>
                <li><input type="radio" name="facilities"><span>假山</span></li>
                <li><input type="radio" name="facilities"><span>泳池</span></li>
                <li><input type="radio" name="facilities"><span>人工湖</span></li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="project-msg">
        <h4>
          <p>项目设计要素信息</p>
        </h4>
        <el-row class="element-table clearfix" :gutter="40">
          <el-col :xs="24" :sm="24" :lg="12">
            <table class="element-fl" cellspacing="0">
              <tr>
                <td rowspan="4">车行出入</td>
                <td>外围车行口</td>
                <td>入口数量(个)</td>
                <td></td>
                <td>出口数量(个)</td>
                <td></td>
              </tr>
              <tr>
                <td>地库车行口</td>
                <td>入口数量(个)</td>
                <td></td>
                <td>出口数量(个)</td>
                <td></td>
              </tr>
              <tr>
                <td>园区车行口</td>
                <td>入口数量(个)</td>
                <td></td>
                <td>出口数量(个)</td>
                <td></td>
              </tr>
              <tr>
                <td>有无嵌套</td>
                <td colspan="4"></td>
              </tr>
              <tr>
                <td rowspan="3">人行出入</td>
                <td>业务出入口</td>
                <td>入口数量(个)</td>
                <td></td>
                <td>出口数量(个)</td>
                <td></td>
              </tr>
              <tr>
                <td>访客出入口</td>
                <td>入口数量(个)</td>
                <td></td>
                <td>出口数量(个)</td>
                <td></td>
              </tr>
              <tr>
                <td>消防出入口</td>
                <td>入口数量(个)</td>
                <td></td>
                <td>出口数量(个)</td>
                <td></td>
              </tr>
              <tr>
                <td rowspan="2">电梯出入</td>
                <td>客梯</td>
                <td colspan="4"></td>
              </tr>
              <tr>
                <td>货梯</td>
                <td colspan="4"></td>
              </tr>
            </table>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <table class="element-fr" cellspacing="0">
              <tr>
                <td rowspan="5">机房信息</td>
                <td>电梯机房</td>
                <td></td>
              </tr>
              <tr>
                <td>配电房</td>
                <td></td>
              </tr>
              <tr>
                <td>水泵房</td>
                <td></td>
              </tr>
              <tr>
                <td>空调机房</td>
                <td></td>
              </tr>
              <tr>
                <td>暖通机房</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="2">监控中心</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="2">客户中心</td>
                <td></td>
              </tr>
              <tr>
                <td colspan="2">会所</td>
                <td></td>
              </tr>
            </table>
          </el-col>
        </el-row>
      </div>
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
  name: 'smartCommunity-add',
  data() {
    return {
      form: {
        region: ''
      },
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
<style  rel="stylesheet/scss" lang="scss" scoped>@import "src/styles/mixin.scss";

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
.form-container {
  border-top: 5px solid #d2d2d2;
  color: #000;
  .form-inner {
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
  }
}
// 社区建设单项目信息表
.project-msg {
  margin-bottom: 20px;
  .basic-info {
    .el-row {
      .basic-item {
        margin-top: 20px;
        label {
          display: inline-block;
          color: #000;
          width: 30%;
          line-height: 16px;
          word-wrap: wrap;
          margin-right: 2%;
          font-size: 14px;
        }
        input {
          width: 62%;
          height: 32px;
          border: 1px solid #828282;
          @include borderRadius(4px);
          text-indent: 12px;
        }
      }
      .customer-info {
        label {
          width: 13%;
        }
        input {
          width: 82%;
        }
      }
      .radio-sel {
        @include flex;
        font-size: 14px;
        label {
          width: 26%;
          max-width: 100px;
          line-height: 30px;
        }
        ul {
          @include flex;
          justify-content: space-around;
          width: 62%;
          height: 30px;
          background-color: #f8f8f8;
          @include borderRadius(4px);
          li {
            height: 30px;
            line-height: 30px;
            input {
              display: inline-block;
              vertical-align: center;
              width: auto;
              height: auto;
              margin-right: 4px;
            }
            span {
              display: inline-block;
              vertical-align: center;
            }
          }
        }
      }
    }
  }
  .element-table {
    table {
      width: 100%;
      margin-top: 20px;
      margin-right: 40px;
      border-left: 1px solid #828282;
      border-bottom: 1px solid #828282;
      tr {
        td {
          width: 110px;
          height: 28px;
          text-align: center;
          font-size: 14px;
          border-top: 1px solid #828282;
          border-right: 1px solid #828282;
        }
      }
    }
    .element-fr {
      tr {
        td {
          width: 217px;
        }
      }
    }
  }
}
</style>
