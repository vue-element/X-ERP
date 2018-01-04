<template>
<div class="business-container">
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
  <div class="form-container project-msg"  v-show="true">
    <div class="form-inner">
      <!-- 基本信息 -->
      <div class="form-module">
        <h4>
          <p>基础信息</p>
        </h4>
        <table class="element-fl" cellspacing="0" width="100">
          <tr>
            <td class="title" width="18%">创建人</td>
            <td width="32%"><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td width="18%">商机名称</td>
            <td width="32%"><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
          <tr>
            <td>单据日期</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td>商机类型</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
          <tr>
            <td>商机来源</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td>所属年月</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
          <tr>
            <td>区域</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td>城市名称</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
        </table>
      </div>
      <!-- 客户信息 -->
      <div class="form-module">
        <h4>
          <p>客户信息</p>
        </h4>
        <table class="element-fl" cellspacing="0" width="100%">
          <tr>
            <td width="18%">客户名称</td>
            <td width="32%"><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td width="18%">客户类别</td>
            <td width="32%"><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
          <tr>
            <td>业态</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td>企业性质</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
          <tr>
            <td>联系人</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td>职位</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
          <tr>
            <td>联系人电话</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td>QQ</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
          <tr>
            <td>E-mail</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td>客户地址</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
        </table>
      </div>
      <!-- 项目实施 -->
      <div class="form-module">
        <h4>
          <p>项目实施</p>
        </h4>
        <table class="element-fl" cellspacing="0" width="100%">
          <tr>
            <td width="18%">项目关键信息描述</td>
            <td width="32%"><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td width="18%">业务分类</td>
            <td width="32%"><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
          <tr>
            <td>投标日期</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td>方案投标日期</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
          <tr>
            <td>总体项目开工时间</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td>预计开发或发货时间</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
          <tr>
            <td>预计合同签订时间</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
            <td>预计成交金额（元）</td>
            <td><input v-show="inputable" type="text" v-model="msg.q"></td>
          </tr>
        </table>
      </div>
      <div class="form-module">
        <h4>
          <p>人员信息</p>
        </h4>
        <table class="element-fl" cellspacing="0"  width="100%">
          <tr>
            <td width="18%">业务线负责人</td>
            <td width="32%"></td>
            <td width="18%">电话</td>
            <td width="32%"></td>
          </tr>
          <tr>
            <td>项目具体跟进人</td>
            <td></td>
            <td>电话</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="form-module">
        <h4>
          <p>进度状况</p>
        </h4>
        <table class="element-fl" cellspacing="0" width="100%">
          <tr>
            <td width="18%">商机跟进状态</td>
            <td width="32%"></td>
            <td width="18%">商机执行状态</td>
            <td width="32%"></td>
          </tr>
          <tr>
            <td>合同原始金额（元）</td>
            <td></td>
            <td>合同变更金额（元）</td>
            <td></td>
          </tr>
          <tr>
            <td>变更后合同金额（元）</td>
            <td></td>
            <td>合约签订时间</td>
            <td></td>
          </tr>
          <tr>
            <td>合约签订时间</td>
            <td></td>
            <td>合约完工时间</td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="form-module approval-opinion">
        <h4>
          <p>审批意见</p>
        </h4>
        <div class="approval-textarea">
          <textarea placeholder="输入..."></textarea>
        </div>
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
  name: 'businessOpportunity-index',
  data() {
    return {
      msg: {
        1: 1
      },
      inputable: true,
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

.business-container {
    padding: 0 10px;
    @include boxSizing;
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
.form-module table{
  tr {
    td {
      // width: auto;
      input {
        display: inline-block;
        height:  90%;
        width: 90%;
        text-align: center;
      }
    }
  }
}

</style>
