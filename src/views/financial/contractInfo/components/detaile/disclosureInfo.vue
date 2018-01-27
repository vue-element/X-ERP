<template>
  <div class="disclosure-info-container form-container" ref="ele">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="basic">
      <div class="capital form-module">
        <h4 class="module-title">
          <p>资金来源</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="资金来源：" prop="name">
              <el-select v-model="ruleForm.capital" placeholder="请选择资金来源">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="cost form-module">
        <h4 class="module-title">
          <p>交底支出</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="资金来源：" prop="name">
              <el-input v-model="ruleForm.cost" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="人工成本：" prop="name">
              <el-input v-model="ruleForm.manpower" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="综合成本：" prop="name">
              <el-input v-model="ruleForm.total" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="管理费用：" prop="name">
              <el-input v-model="ruleForm.manage" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="税金：" prop="name">
              <el-input v-model="ruleForm.Tax" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="profit form-module">
        <h4 class="module-title">
          <p>计划利润</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="毛利润" prop="name">
             <el-input v-model="ruleForm.profit" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="毛利润率" prop="name">
             <el-input v-model="ruleForm.crossProfit" placeholder="请输入您的账号" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="btn">
        <div class="common-btn">保&nbsp;&nbsp;&nbsp;存</div>
        <div class="common-btn">重&nbsp;&nbsp;&nbsp;置</div>
        <div class="common-btn">取&nbsp;&nbsp;&nbsp;消</div>
      </div>
    </el-form>
    <div class="list form-module">
      <h4 class="module-title">
        <p>合同交底附件列表</p>
        <el-button class="up-files common-btn" type="text" @click="upFiles = true">附件上传</el-button>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="tableData" ref="multipleTable">
          <el-table-column align="center" prop="0" label="序号">
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="1" label="附件名称"></el-table-column>
          <el-table-column align="center" prop="2" label="附件说明"></el-table-column>
          <el-table-column align="center" prop="3" label="上传人"></el-table-column>
          <el-table-column align="center" prop="4" label="上传时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 合同交底弹出框 -->
    <el-dialog title="合同交底附件上传" :visible.sync="upFiles" :modal-append-to-body="false">
      <el-form>
        <el-form-item label="附件说明">
          <el-input type="text" v-model="filesForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="附件人">
          <el-input type="text" v-model="filesForm.author"></el-input>
        </el-form-item>
        <el-form-item label="上传时间：" prop="name">
           <el-date-picker v-model="filesForm.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="上传附件：" prop="name">
          <el-upload class="upload" action="" :on-change="handleChange" :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
          <el-button size="small" @click="upFiles = false" type="success">保 存</el-button>
          <el-button size="small" type="info">重 置</el-button>
          <el-button size="small" @click="upFiles = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  data() {
    return {
      upFiles: false,
      tableData: [{
        1: '附件1：长春中海国际社区合同交底记录-国社.doc',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
      }, {
        1: '附件2：长春中海国际社区智能化工程设备采购粮单.xls',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
      }],
      height: 100,
      currentPage: 1,
      disabled: false,
      ruleForm: {
        name: '',
        capital: '',
        cost: '',
        manpower: '',
        total: '',
        manage: '',
        Tax: '',
        profit: '',
        crossProfit: ''
      },
      rules: {},
      filesForm: {
        desc: '',
        author: '',
        date: '',
        files: ''
      },
      fileList: []
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
      this.height = winHeight() - 450
    },
    handleChange() {

    }
  },
  mounted() {
    this.$refs.ele.style.height = winHeight() - 230 + 'px'
    window.addEventListener('resize', () => {
      this.$refs.ele.style.height = winHeight() - 230 + 'px'
    })
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.disclosure-info-container.form-container{
  overflow-y:auto;
  margin:0;
  &::-webkit-scrollbar{
    width:0;
  }
  .el-form{
    .capital.form-module{
      margin-bottom:15px;
    }
  }
  .btn{
    text-align:center;
    div.common-btn{
      margin-left:30px;
      display:inline-block;
    }
  }
  .list.form-module{
    margin-bottom:0;
    .module-title{
      position:relative;
      .up-files{
        background-color:#35d5ba;
        color:white;
        line-height:0;
        position:absolute;
        top:-20px;
        right:0;
      }
      .up-files:hover{
        background-color:#35d5ba;
        color:white;
      }
    }
  }
}
</style>
