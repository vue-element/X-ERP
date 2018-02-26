<template>
  <div class="disclosure-info-container form-container" ref="ele">
    <div class="commont-btn edit-btn" v-show="editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="contractInfo" ref="contractInfo" class="basic">
      <div class="form-module">
        <h4 class="module-title">
          <p>资金来源</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="资金来源：">
              <p v-if="disabled">{{contractInfo.sourceFunds}}</p>
              <el-select v-else v-model="contractInfo.sourceFunds" placeholder="请选择资金来源">
                  <el-option v-for="item in sourceFundsList" :label="item.value" :value="item.value" :key="item.id"></el-option>
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
            <el-form-item label="材料成本：">
              <p v-if="disabled">{{contractInfo.materialCost}}</p>
              <el-input v-else v-model="contractInfo.materialCost" placeholder="请输入材料成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="人工成本：">
              <p v-if="disabled">{{contractInfo.artificialCost}}</p>
              <el-input v-else v-model="contractInfo.artificialCost" placeholder="请输入人工成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="综合成本：">
              <p v-if="disabled">{{contractInfo.comprehensiveCost}}</p>
              <el-input v-else v-model="contractInfo.comprehensiveCost" placeholder="请输入综合成本"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="管理费用：">
              <p v-if="disabled">{{contractInfo.manageCost}}</p>
              <el-input v-else v-model="contractInfo.manageCost" placeholder="请输入管理费用"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="税金：">
              <p v-if="disabled">{{contractInfo.tax}}</p>
              <el-input v-else v-model="contractInfo.tax" placeholder="请输入税金"></el-input>
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
            <el-form-item label="毛利润">
              <p v-if="disabled">{{contractInfo.tax}}</p>
              <el-input v-else v-model="contractInfo.profit" placeholder="请输入毛利润"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-form-item label="毛利润率">
              <p v-if="disabled">{{contractInfo.tax}}</p>
              <el-input v-else v-model="contractInfo.profitRate" placeholder="请输入毛利润率"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="btn">
        <div class="common-btn" @click="add" :loading="loading">保&nbsp;&nbsp;&nbsp;存</div>
        <div class="common-btn" @click="reset">重&nbsp;&nbsp;&nbsp;置</div>
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
    <!-- 合同交底文件上传 -->
    <el-dialog title="合同交底附件上传" :visible.sync="upFiles" :modal-append-to-body="false">
      <el-form>
        <el-form-item label="附件说明">
          <el-input type="text" v-model="fileForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="附件人">
          <el-input type="text" v-model="fileForm.author"></el-input>
        </el-form-item>
        <el-form-item label="上传时间" prop="name">
           <el-date-picker v-model="fileForm.date" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="上传附件" prop="name">
          <el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" >
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { winHeight } from '@/utils'
export default {
  props: ['editData'],
  data() {
    return {
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
      height: 200,
      currentPage: 1,
      action: 'add',
      editShow: false,
      editWord: '编辑',
      disabled: false,
      loading: false,
      sourceFundsList: [],
      contractInfo: {
        sourceFunds: '',
        materialCost: '',
        artificialCost: '',
        comprehensiveCost: '',
        manageCost: '',
        tax: '',
        profit: '',
        profitRate: ''
      },
      // 文件上传地址----------------------------------------
      upFiles: false,
      fileForm: {
        desc: '',
        author: '',
        date: ''
      },
      // 后台传输接口
      importFileUrl: 'http:dtc.com/cpy/add',
      upLoadData: {
        cpyId: '123456',
        occurTime: '2018-01'
      },
      fileList: []
    }
  },
  created() {
    this.getInsertData()
    if (this.editData.tabState === 'seeTab') {
      this.action = 'edit'
      this.editShow = true
      this.disabled = true
      this.editInfo()
    } else {
      this.action = 'add'
    }
  },
  methods: {
    getInsertData() {
      this.sourceFundsList = [{ value: '酬金制' }, { value: '包干制' }, { value: '本体金' }]
    },
    add() {
      this.loading = true
      this.$post('/contractBasis/save', this.contractInfo).then((res) => {
        this.loading = false
        if (res.data.success === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
        }
      })
    },
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      console.log(data)
      // this.contractInfo = data.contractInfo
      // console.log(this.contractInfo)
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.editWord = '编辑'
        this.editInfo()
      } else {
        this.editWord = '取消编辑'
      }
    },
    reset() {
      this.contractInfo = {
        sourceFunds: '',
        materialCost: '',
        artificialCost: '',
        comprehensiveCost: '',
        manageCost: '',
        tax: '',
        profit: '',
        profitRate: ''
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
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
  margin-top:140px;
  &::-webkit-scrollbar{
    width:0;
  }
  .edit-btn{
    margin: 0;
    button{
      float: right;
    }
  }
  .btn{
    text-align:center;
    div.common-btn{
      display:inline-block;
      cursor:pointer;
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
    }
  }
}
</style>
