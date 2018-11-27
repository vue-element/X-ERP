<template>
<!-- 社区建设单项目信息表 -->
<div class="" ref="ele">
  <!-- 项目改造信息 -->
  <div class="form-module">
    <h4 class="module-title">
      <p>项目改造信息</p>
      <div class="material-table-head fr">
        <button @click.prevent="showDialog">
          <i class="iconfont icon-add"></i>
          <span>新增项目改造信息</span>
        </button>
      </div>
    </h4>
    <div>
      <el-table class="el-table-sm" style="width: 100%" :height='purchaseHeight' border>
        <el-table-column label="序号" width="60" fixed>
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="年份" min-width="160">
          <template slot-scope="scope">
            <!-- <el-input v-if="scope.row.edit" type="text" v-model="scope.row.name" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.name}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="金额" min-width="160">
          <template slot-scope="scope">
            <!-- <el-input v-if="scope.row.edit" type="text" v-model="scope.row.model" placeholder="请填写"></el-input>
            <span v-else>{{scope.row.model}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="120" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button @click.native.prevent="confirmEdit(scope.row, scope.$index)" type="text">完成</el-button>
            <el-button @click.native.prevent='editRow(scope.row, scope.$index)' type="text">编辑</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id, scope.$index)" type="text">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog id="projectReformDialog" title="新增项目角色" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
    <table class="element-fl basic-table" cellspacing="0">
      <tr>
        <td colspan="7">总体改造情况</td>
      </tr>
      <tr>
        <td>改造年份</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <el-date-picker v-model="year" type="year" placeholder="选择年">
         </el-date-picker>
          <!-- <input v-else type="text" v-model="year" placeholder="请输入"> -->
        </td>
        <td>投入金额</td>
        <td colspan="3">
          <p v-if="disabled"></p>
          <input v-else type="text" placeholder="自动生成" disabled>
        </td>
      </tr>
      <tr>
        <td>各系统改造情况</td>
        <td colspan="6">具体如下</td>
      </tr>
      <tr>
        <td colspan="1">机房工程</td>
        <td colspan="1">投入金额（元）</td>
        <td colspan="5">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="jifang.amount" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td colspan="1">综合布线工程</td>
        <td colspan="1">改造数量（米）</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="buxian.a" placeholder="请输入">
        </td>
        <td colspan="1">投入金额（元）</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="buxian.amount" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td rowspan="2">停车场系统</td>
        <td>改造数量（套）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="tingchechang.a" placeholder="请输入">
        </td>
        <td>几进几出</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="tingchechang.b" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="tingchechang.amount" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>品牌</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="tingchechang.c" placeholder="请输入">
        </td>
        <td>改造方式</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <el-select  v-else v-model="tingchechang.d" placeholder="请选择" clearable>
            <el-option key="网络利旧" label="网络利旧" value="网络利旧"></el-option>
            <el-option key="车场设备利旧全更换" label="车场设备利旧全更换" value="车场设备利旧全更换"></el-option>
            <el-option key="平台接入" label="平台接入" value="平台接入"></el-option>
            <el-option key="网络设备" label="网络设备" value="网络设备"></el-option>
          </el-select>
          <!-- <input v-else type="text" v-model="tingchechang.d" placeholder="请输入"> -->
          <!-- 网络利旧；车场设备利旧全更换；平台接入	；网络设备 -->
        </td>
      </tr>
      <tr>
        <td>门禁系统</td>
        <td>改造数量（个）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="menjin.a" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="menjin.amount" placeholder="请输入">
        </td>
        <td>品牌</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="menjin.b" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>访客系统</td>
        <td>改造数量（个）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="fangke.a" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="fangke.amount" placeholder="请输入">
        </td>
        <td>品牌</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="fangke.b" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>梯控系统</td>
        <td>改造数量（台）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="tikong.a" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="tikong.amount" placeholder="请输入">
        </td>
        <td>品牌</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="tikong.b" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td rowspan="2">云瞳系统</td>
        <td>改造岗位数</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="yuntong.a" placeholder="请输入">
        </td>
        <td>改造点位数</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="yuntong.b" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>投入金额（元）</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="yuntong.amount" placeholder="请输入">
        </td>
        <td>品牌</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="yuntong.d" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>电子巡更系统</td>
        <td>改造数量（套）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="xungeng.a" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="xungeng.amount" placeholder="请输入">
        </td>
        <td>品牌</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="xungeng.b" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>周界防范系统</td>
        <td>改造数量（米）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="zhoujie.a" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="zhoujie.amount" placeholder="请输入">
        </td>
        <td>品牌</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="zhoujie.b" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td rowspan="2">云对讲系统</td>
        <td>改造围墙机数量（个）</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="yunduijiang.a" placeholder="请输入">
        </td>
        <td>改造门口机数量（个）</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="yunduijiang.b" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>投入金额（元）</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="yunduijiang.amount" placeholder="请输入">
        </td>
        <td>品牌</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="yunduijiang.d" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>信息发布系统</td>
        <td>改造数量（个）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="xinxifabu.a" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="xinxifabu.amount" placeholder="请输入">
        </td>
        <td>品牌</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="xinxifabu.b" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>背景音乐系统</td>
        <td>改造数量（个）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="bjyinyue.a" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="bjyinyue.amount" placeholder="请输入">
        </td>
        <td>品牌</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="bjyinyue.b" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>机房监控系统</td>
        <td>改造数量（个）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="jifangjk.a" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="jifangjk.amount" placeholder="请输入">
        </td>
        <td>品牌</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="jifangjk.b" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>电梯监控系统</td>
        <td>改造数量（个）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="diantijk.a" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="diantijk.amount" placeholder="请输入">
        </td>
        <td>品牌</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="diantijk.b" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>LED节能</td>
        <td>改造数量（个）</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="LED.a" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="LED.amount" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>水泵节能</td>
        <td>改造数量（个）</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="shuibengjn.a" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="shuibengjn.amount" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>空调节能</td>
        <td>改造数量（个）</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="kongdiaojn.a" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="kongdiaojn.amount" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>设备全委</td>
        <td>合约起止日</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="shebeiqw.a" placeholder="请输入">
        </td>
        <td>项目面积（平方米）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="shebeiqw.b" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="shebeiqw.amount" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>电梯全委</td>
        <td>合约起止日</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="diantiqw.a" placeholder="请输入">
        </td>
        <td>电梯数量（个）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="diantiqw.b" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="diantiqw.amount" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>电梯监管</td>
        <td>合约起止日</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="diantijg.a" placeholder="请输入">
        </td>
        <td>电梯数量（个）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="diantijg.b" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="diantijg.amount" placeholder="请输入">
        </td>
      </tr>
      <tr>
        <td>设备查验</td>
        <td>改造年份</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="shebijy.a" placeholder="请输入">
        </td>
        <td>项目面积（平方米）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="shebijy.b" placeholder="请输入">
        </td>
        <td>投入金额（元）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="shebijy.amount" placeholder="请输入">
        </td>
      </tr>
    </table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click.native.prevent="addProjectReform">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  name: 'smartCommunityAdd',
  data() {
    return {
      dialogFormVisible: true,
      disabled: false,
      // carObj: {
      //   a1: ''
      // },
      year: '',
      projectReformList: [],
      jifang: {
        category: 'jifang',
        amount: ''
      },
      buxian: {
        category: 'buxian',
        amount: '',
        a: ''
      },
      tingchechang: {
        category: 'tingchechang',
        amount: '',
        a: '',
        b: '',
        c: '',
        d: ''
      },
      menjin: {
        category: 'menjin',
        amount: '',
        a: '',
        b: ''
      },
      fangke: {
        category: 'fangke',
        amount: '',
        a: '',
        b: ''
      },
      tikong: {
        category: 'tikong',
        amount: '',
        a: '',
        b: ''
      },
      yuntong: {
        category: 'tikong',
        amount: '',
        a: '',
        b: '',
        c: ''
      },
      xungeng: {
        category: 'tikong',
        amount: '',
        a: '',
        b: ''
      },
      zhoujie: {
        category: 'zhoujie',
        amount: '',
        a: '',
        b: ''
      },
      yunduijiang: {
        category: 'yunduijiang',
        amount: '',
        a: '',
        b: '',
        c: ''
      },
      xinxifabu: {
        category: 'xinxifabu',
        amount: '',
        a: '',
        b: ''
      },
      bjyinyue: {
        category: 'bjyinyue',
        amount: '',
        a: '',
        b: ''
      },
      jifangjk: {
        category: 'jifangjk',
        amount: '',
        a: '',
        b: ''
      },
      diantijk: {
        category: 'diantijk',
        amount: '',
        a: '',
        b: ''
      },
      LED: {
        category: 'LED',
        amount: '',
        a: ''
      },
      shuibengjn: {
        category: 'shuibengjn',
        amount: '',
        a: ''
      },
      kongdiaojn: {
        category: 'kongdiaojn',
        amount: '',
        a: ''
      },
      shebeiqw: {
        category: 'shebeiqw',
        amount: '',
        a: '',
        b: ''
      },
      diantiqw: {
        category: 'diantiqw',
        amount: '',
        a: '',
        b: ''
      },
      diantijg: {
        category: 'diantijg',
        amount: '',
        a: '',
        b: ''
      },
      shebijy: {
        category: 'shebijy',
        amount: '',
        a: '',
        b: ''
      }
    }
  },
  props: ['projectId'],
  created() {
    console.log('this.projectId', this.projectId)
  },
  mounted() {},
  methods: {
    showDialog() {
      this.dialogFormVisible = true
    },
    addProjectReform() {
      this.projectReformList = [this.jifang, this.buxian, this.tingchechang, this.menjin, this.fangke, this.tikong,
        this.yuntong, this.xungeng, this.zhoujie, this.yunduijiang, this.xinxifabu, this.bjyinyue, this.jifangjk,
        this.diantijk, this.LED, this.shuibengjn, this.kongdiaojn, this.shebeiqw, this.diantiqw, this.diantijg, this.shebijy]
        console.log('this.projectReformList', this.projectReformList)
      var data = {
        projectReformDetailes: this.projectReformList,
        year: '2017'
      }
      this.$post('/projectReform/save/' + this.projectId, data).then((res) => {

      }).catch(err => {
        console.log('err', err)
        return
      })
    }
    // 项目改造信息
  },
  computed: {
    purchaseHeight() {
      var height = 1 * 42 + 100
      return height > 260 ? 260 : height
    },
  },
  watch: {
    // projectId() {
    //   this.projectId =
    // }
    // disabled (status) {
    //   if (status === false) {
    //     this.editWord = '取消编辑'
    //     this.$emit('changeObj', true)
    //   } else {
    //     this.editWord = '编辑'
    //   }
    // },
    // mainMsg: {
    //   handler(obj) {
    //     if (isObjectValueEqual(obj, this.temp)) {
    //       this.$emit('changeObj', false)
    //     } else {
    //       this.$emit('changeObj', true)
    //     }
    //     if (obj.client.name === '') {
    //       obj.client.id = ''
    //     }
    //   },
    //   deep: true
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>@import "src/styles/mixin.scss";
// 社区建设单项目信息表

</style>
<style  rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
#projectReformDialog .el-dialog {
  width: 70%;
  height: 90vh;
  margin-top: 5vh!important;
  margin: 0 auto;
  padding: 0 10px;
  @include borderRadius(16px)
  .el-dialog__header {
    padding-left: 20px;
    font-weight: bold;
  }
  .el-dialog__body {
    max-height: 80%;
    overflow-y: auto;
  }
  .el-dialog__footer {
    max-height: 8%;
    margin: 0;
    padding: 0;
    margin-top: 10px;
  }
  .dialog-footer {
    margin: 0;
    padding: 0;
    margin: auto;
  }
  .basic-table tr td {
    height: 32px;
    font-size: 18px;
    input, p {
      height: 30px;
      line-height: 32px;
      font-size: 18px;
    }
  }
  .el-input {
    .el-input__prefix{
      font-size: 18px;
      line-height: 20px;
      margin-top: -4px;
    }
    .el-input__suffix  {
    }
    input {
      width: 90%;
      height: 100%;
      border: none;
    }
  }
}
</style>
