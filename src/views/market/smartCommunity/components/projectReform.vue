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
      <el-table class="el-table-sm" style="width: 100%" :height='Height' :data="projectReforms" border>
        <el-table-column label="序号" width="60" fixed>
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="年份" min-width="160" prop="year" value-format="yyyy" format="yyyy"></el-table-column>
        <el-table-column label="金额" min-width="160" prop="amount"></el-table-column>
        <el-table-column label="操作" min-width="120">
          <template slot-scope="scope">
            <!-- <el-button @click.native.prevent="confirmEdit(scope.row, scope.$index)" type="text">完成</el-button> -->
            <el-button @click.native.prevent='editRow(scope.row.id)' type="text">编辑</el-button>
            <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <el-dialog id="projectReformDialog" title="新增项目角色" :visible.sync="dialogFormVisible" :modal-append-to-body="false" :before-close="hideDialog">
    <table class="element-fl basic-table" cellspacing="0">
      <tr>
        <td colspan="7">总体改造情况</td>
      </tr>
      <tr>
        <td>改造年份</td>
        <td colspan="2">
          <p v-if="disabled"></p>
          <el-date-picker v-model="year" type="year" placeholder="选择年" value-format="yyyy" format="yyyy">
         </el-date-picker>
          <!-- <input v-else type="text" v-model="year" placeholder="请输入"> -->
        </td>
        <td>投入金额</td>
        <td colspan="3">
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="amount" placeholder="自动生成" disabled>
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
          <input v-else type="text" v-model="yuntong.c" placeholder="请输入">
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
          <input v-else type="text" v-model="yunduijiang.c" placeholder="请输入">
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
          <el-date-picker v-else v-model="shebeiqwTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
          format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          <!-- <input v-else type="text" v-model="shebeiqw.a" placeholder="请输入"> -->
        </td>
        <td>项目面积（平方米）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="shebeiqw.a" placeholder="请输入">
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
          <el-date-picker v-else v-model="diantiqwTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
          format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          <!-- <input v-else type="text" v-model="diantiqw.a" placeholder="请输入"> -->
        </td>
        <td>电梯数量（个）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="diantiqw.a" placeholder="请输入">
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
          <el-date-picker v-else v-model="diantijgTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
          format="yyyy-MM-dd" value-format="yyyy-MM-dd"></el-date-picker>
          <!-- <input v-else type="text" v-model="diantijg.a" placeholder="请输入"> -->
        </td>
        <td>电梯数量（个）</td>
        <td>
          <p v-if="disabled"></p>
          <input v-else type="text" v-model="diantijg.a" placeholder="请输入">
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
          <el-date-picker v-else v-model="shebijy.a" type="year" placeholder="选择年"  value-format="yyyy" format="yyyy"></el-date-picker>
          <!-- <input v-else type="text" v-model="shebijy.a" placeholder="请输入"> -->
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
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click.native.prevent="addProjectReform">保 存</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  name: 'smartCommunityAdd',
  data() {
    return {
      dialogFormVisible: false,
      disabled: false,
      // carObj: {
      //   a1: ''
      // },
      year: '2034',
      amount: '',
      projectReformList: [],
      jifang: {
        category: 'jifang',
        amount: '100'
      },
      buxian: {
        category: 'buxian',
        amount: '100',
        a: 'buxian1'
      },
      tingchechang: {
        category: 'tingchechang',
        amount: '100',
        a: 'tingchechang1',
        b: 'tingchechang2',
        c: 'tingchechang3',
        d: 'tingchechang4'
      },
      menjin: {
        category: 'menjin',
        amount: '100',
        a: 'menjin1',
        b: 'menjin2'
      },
      fangke: {
        category: 'fangke',
        amount: '100',
        a: 'fangke1',
        b: 'fangke2'
      },
      tikong: {
        category: 'tikong',
        amount: '100',
        a: 'tikong1',
        b: 'tikong2'
      },
      yuntong: {
        category: 'yuntong',
        amount: '100',
        a: 'yuntong1',
        b: 'yuntong2',
        c: 'yuntong3'
      },
      xungeng: {
        category: 'xungeng',
        amount: '100',
        a: 'xungeng1',
        b: 'xungeng2'
      },
      zhoujie: {
        category: 'zhoujie',
        amount: '100',
        a: 'zhoujie1',
        b: 'zhoujie2'
      },
      yunduijiang: {
        category: 'yunduijiang',
        amount: '100',
        a: 'yunduijiang1',
        b: 'yunduijiang2',
        c: 'yunduijiang3'
      },
      xinxifabu: {
        category: 'xinxifabu',
        amount: '100',
        a: 'xinxifabu1',
        b: 'xinxifabu2'
      },
      bjyinyue: {
        category: 'bjyinyue',
        amount: '100',
        a: 'bjyinyue1',
        b: 'bjyinyue2'
      },
      jifangjk: {
        category: 'jifangjk',
        amount: '100',
        a: 'jifangjk1',
        b: 'jifangjk2'
      },
      diantijk: {
        category: 'diantijk',
        amount: '100',
        a: 'diantijk1',
        b: 'diantijk2'
      },
      LED: {
        category: 'LED',
        amount: '100',
        a: 'LED1'
      },
      shuibengjn: {
        category: 'shuibengjn',
        amount: '100',
        a: 'shuibengjn1'
      },
      kongdiaojn: {
        category: 'kongdiaojn',
        amount: '100',
        a: 'kongdiaojn1'
      },
      shebeiqw: {
        category: 'shebeiqw',
        amount: '100',
        a: 'shebeiqw1',
        // b: 'shebeiqw2',
        startDate: '',
        endDate: ''
      },
      diantiqw: {
        category: 'diantiqw',
        amount: '100',
        a: 'diantiqw1',
        // b: 'diantiqw2',
        startDate: '',
        endDate: ''
      },
      diantijg: {
        category: 'diantijg',
        amount: '100',
        a: 'diantijg1',
        // b: 'diantijg2',
        startDate: '',
        endDate: ''
      },
      shebijy: {
        category: 'shebijy',
        amount: '100',
        a: 'shebijy1',
        b: 'shebijy2'
      },
      action: 'add',
      editId: null,
      projectReforms: [],
      tempArr: [],
      shebeiqwTime: [],
      diantiqwTime: [],
      diantijgTime: []
    }
  },
  props: ['projectId'],
  created() {
  },
  mounted() {
    this.getData()
  },
  methods: {
    showDialog() {
      if (this.projectId === undefined) {
        this.$message({
          message: '请先保存项目基本信息',
          type: 'info'
        })
      } else {
        this.action = 'add'
        this.dialogFormVisible = true
        this.resetData()
      }
    },
    hideDialog() {
      this.$confirm('确认关闭？', '提示').then(() => {
        this.dialogFormVisible = false
      }).catch(() => {
        return
      })
    },
    getData() {
      this.$get('/project/findUpdateData/' + this.projectId).then((res) => {
        this.projectReforms = res.data.data.project.projectReforms
      }).catch(err => {
        console.log('err', err)
        return
      })
    },
    addProjectReform() {
      this.projectReformList = [this.jifang, this.buxian, this.tingchechang, this.menjin, this.fangke, this.tikong,
        this.yuntong, this.xungeng, this.zhoujie, this.yunduijiang, this.xinxifabu, this.bjyinyue, this.jifangjk,
        this.diantijk, this.LED, this.shuibengjn, this.kongdiaojn, this.shebeiqw, this.diantiqw, this.diantijg, this.shebijy]
      var data = {
        projectReformDetailes: this.projectReformList,
        year: this.year
      }
      if (this.action === 'edit') {
        data.id = this.editId
      }
      this.$post('/projectReform/save/' + this.projectId, data).then((res) => {
        this.dialogFormVisible = false
        if (res.data.success === true) {
          this.getData()
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      }).catch(err => {
        console.log('err', err)
        return
      })
    },
    editRow(rowId) {
      this.action = 'edit'
      this.editId = rowId
      this.dialogFormVisible = true
      this.$get('/projectReform/findUpdateData/' + rowId).then((res) => {
        if (res.data.success === true) {
          var data = res.data.data.projectReform
          this.handleData(data)
        }
      }).catch((err) => {
        console.log('err', err)
        return
      })
    },
    deleteRow(rowId) {
      console.log('deleteRow', rowId)
      this.$confirm('确认删除此信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.confirmDel(rowId)
      }).catch(() => {
        return false
      })
    },
    confirmDel(rowId) {
      this.$post('/projectReform/delete', { id: [rowId] }).then((res) => {
        if (res.data.success) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getData()
        } else {
          this.$message({
            message: '删除失败',
            type: 'fail'
          })
        }
      }).catch(err => {
        console.log('err', err)
        return
      })
    },
    resetData() {
      this.year = ''
      this.amount = ''
      this.jifang = { category: 'jifang', amount: 0 }
      this.buxian = { category: 'buxian', amount: 0, a: '' }
      this.tingchechang = { category: 'tingchechang', amount: '', a: '', b: '', c: '', d: '' }
      this.menjin = { category: 'menjin', amount: 0, a: '', b: '' }
      this.fangke = { category: 'fangke', amount: 0, a: '', b: '' }
      this.tikong = { category: 'tikong', amount: 0, a: '', b: '' }
      this.yuntong = { category: 'yuntong', amount: 0, a: '', b: '', c: '' }
      this.xungeng = { category: 'xungeng', amount: 0, a: '', b: '' }
      this.zhoujie = { category: 'zhoujie', amount: 0, a: '', b: '' }
      this.yunduijiang = { category: 'yunduijiang', amount: 0, a: '', b: '', c: '' }
      this.xinxifabu = { category: 'xinxifabu', amount: 0, a: '', b: '' }
      this.bjyinyue = { category: 'bjyinyue', amount: 0, a: '', b: '' }
      this.jifangjk = { category: 'jifangjk', amount: 0, a: '', b: '' }
      this.diantijk = { category: 'diantijk', amount: 0, a: '', b: '' }
      this.LED = { category: 'LED', amount: 0, a: '' }
      this.shuibengjn = { category: 'shuibengjn', amount: 0, a: '' }
      this.kongdiaojn = { category: 'kongdiaojn', amount: 0, a: '' }
      this.shebeiqw = { category: 'shebeiqw', amount: 0, a: '', startDate: '', endDate: '' }
      this.diantiqw = { category: 'diantiqw', amount: 0, a: '', startDate: '', endDate: '' }
      this.diantijg = { category: 'diantijg', amount: 0, a: '', startDate: '', endDate: '' }
      this.shebijy = { category: 'shebijy', amount: 0, a: '', b: '' }
      this.shebeiqwTime = []
      this.diantiqwTime = []
      this.diantijgTime = []
    },
    handleData(data) {
      this.year = data.year
      this.amount = data.amount
      data.projectReformDetailes.forEach((item) => {
        switch (item.category) {
          case 'jifang':
            this.jifang = item
            break
          case 'buxian':
            this.buxian = item
            break
          case 'tingchechang':
            this.tingchechang = item
            break
          case 'menjin':
            this.menjin = item
            break
          case 'fangke':
            this.fangke = item
            break
          case 'tikong':
            this.tikong = item
            break
          case 'yuntong':
            this.yuntong = item
            break
          case 'xungeng':
            this.xungeng = item
            break
          case 'zhoujie':
            this.zhoujie = item
            break
          case 'yunduijiang':
            this.yunduijiang = item
            break
          case 'xinxifabu':
            this.xinxifabu = item
            break
          case 'bjyinyue':
            this.bjyinyue = item
            break
          case 'jifangjk':
            this.jifangjk = item
            break
          case 'diantijk':
            this.diantijk = item
            break
          case 'LED':
            this.LED = item
            break
          case 'shuibengjn':
            this.shuibengjn = item
            break
          case 'kongdiaojn':
            this.kongdiaojn = item
            break
          case 'shebeiqw':
            this.shebeiqw = item
            break
          case 'diantiqw':
            this.diantiqw = item
            break
          case 'diantijg':
            this.diantijg = item
            break
          case 'shebijy':
            this.shebijy = item
            break
          default:
        }
      })
    }
  },
  computed: {
    Height() {
      var height = this.projectReforms.height * 42 + 100
      return height > 260 ? 260 : height
    }
  },
  watch: {
    shebeiqwTime() {
      this.shebeiqw.startDate = this.shebeiqwTime ? this.shebeiqwTime[0] : ''
      this.shebeiqw.endDate = this.shebeiqwTime ? this.shebeiqwTime[1] : ''
    },
    diantiqwTime() {
      this.diantiqw.startDate = this.diantiqwTime ? this.diantiqwTime[0] : ''
      this.diantiqw.endDate = this.diantiqwTime ? this.diantiqwTime[1] : ''
    },
    diantijgTime() {
      this.diantijg.startDate = this.diantijgTime ? this.diantijgTime[0] : ''
      this.diantijg.endDate = this.diantijgTime ? this.diantijgTime[1] : ''
    },
    projectId(id) {
      this.projectId = id
    }
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
  width: 66%;
  height: 90vh;
  min-width: 1000px;
  margin-top: 5vh!important;
  margin: 0 auto;
  padding: 0 10px;
  padding-bottom: 58px;
  @include borderRadius(16px)
  .el-dialog__header {
    padding-left: 20px;
    font-weight: bold;
  }
  .el-dialog__body {
    max-height: 90%;
    overflow-y: auto;
  }
  .el-dialog__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 58px;
    padding: 0;
    padding: 12px 0;
    background: #fff;
    border-radius: 0 0 12px 12px;
    // max-height: 8%;
    // margin: 0;
    // padding: 0;
    // margin-top: 10px;
  }
  .dialog-footer {
    margin: 0;
    padding: 0;
    margin: auto;
    button {
      padding: 8px 16px;
    }
  }
  .basic-table tr td {
    height: 32px;
    font-size: 16px;
    input, p {
      height: 30px;
      line-height: 32px;
      font-size: 16px;
    }
  }
  .el-date-editor--daterange {
    // width: 90%;
    border: none;
    input {
      width: 40%;
    }
    .el-range__close-icon {
      margin-top: -35px;
    }
  }
  .el-input {
    .el-input__prefix{
      font-size: 16px;
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
