<template>
  <div class="contractChange-container form-container">
    <div class="list form-module">
      <h4 class="module-title">
        <p>合同变更附件列表</p>
        <div class="up-files common-btn" @click="filesBtn">附件上传</div>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="contractChangeData" :height="height" ref="multipleTable" border>
          <el-table-column prop="0" label="序号" width="80" fixed>
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column prop="fileName" label="附件名称" width="300"></el-table-column>
          <el-table-column prop="describtion" label="附件说明" width="300"></el-table-column>
          <el-table-column prop="person" label="上传人"></el-table-column>
          <el-table-column prop="date" label="上传时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="downFile(scope.row)" type="text" size="small">文件下载</el-button>
              <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
       <!--  <el-pagination class="page" background :current-page="currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper" :total="100"></el-pagination> -->
      </div>
      <el-dialog title="变更附件上传" :visible.sync="upFiles" :modal-append-to-body="false">
        <el-form :model="fileForm" :rules="rules" class="demo-ruleForm" ref="fileForm">
          <el-form-item label="上传人" prop="person">
            <el-input v-model="fileForm.person"></el-input>
          </el-form-item>
          <el-form-item label="附件说明" class="textarea">
            <el-input type="textarea" v-model="fileForm.describtion"></el-input>
          </el-form-item>
          <el-form-item label="附件上传" prop="file">
            <input type="file" id="fileupload" @change="getFile($event)">
          </el-form-item>
          <el-button type="success" round @click="upFile($event)">上传</el-button>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { winHeight } from '@/utils'
import _ from 'lodash'
export default {
  props: ['editData'],
  data() {
    return {
      height: 100,
      contractChangeData: [],
      upFiles: false,
      fileForm: {
        ci_id: '',
        describtion: '',
        person: '',
        file: ''
      },
      rules: {
        person: [{ required: true, message: '请输入上传人', trigger: 'blur' }],
        file: [{ required: true, message: '请选择文件', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getChangeFile()
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 335
    },
    // 点击获取ci_id
    filesBtn() {
      var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
      if (this.editData.tabState === 'addTab' && contractMsg === null) {
        this.$message({
          message: '请先输入合同基础信息'
        })
      } else {
        this.upFiles = true
        if (this.editData.tabState === 'editTab') {
          var data = _.cloneDeep(this.editData.editData)
          this.$get('/contractBasis/findAllByContractInfo/' + data.id).then((res) => {
            if (res.data.success === true) {
              this.fileForm.ci_id = res.data.data.content[0].contractInfo.id
            }
          })
        } else {
          this.fileForm.ci_id = contractMsg.contractBasis.contractInfo.id
        }
      }
    },
    // 获取上传附件列表
    getChangeFile() {
      var subContract = null
      if (this.editData.tabState === 'editTab') {
        subContract = _.cloneDeep(this.editData.editData)
      } else {
        var contractMsg = JSON.parse(sessionStorage.getItem('contractMsg'))
        if (contractMsg === null) {
          return
        } else {
          subContract = contractMsg.contractBasis.contractInfo
        }
      }
      this.$get('/contractChange/findAllByContractInfo/' + subContract.id).then((res) => {
        this.contractChangeData = res.data.data.content
      })
    },
    // 获取附件信息
    getFile(event) {
      this.fileForm.file = event.target.files[0]
    },
    // 附件上传
    upFile(event) {
      this.$refs.fileForm.validate(valid => {
        if (valid) {
          event.preventDefault()
          var fd = new FormData()
          fd.append('ci_id', this.fileForm.ci_id)
          fd.append('describtion', this.fileForm.describtion)
          fd.append('person', this.fileForm.person)
          fd.append('file', this.fileForm.file)
          this.$post('/contractChange/save', fd).then((res) => {
            if (res.data.success === true) {
              this.getChangeFile()
              this.fileForm = {
                ci_id: '',
                describtion: '',
                person: '',
                file: ''
              }
              var obj = document.getElementById('fileupload')
              obj.value = ''
              this.upFiles = false
            }
          })
        }
      })
    },
    deleteRow(id) {
      this.$confirm('此操作将删除该条信息, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var fileID = { id: [id] }
        this.$post('/contractChange/delete', fileID).then((res) => {
          if (res.data.success === true) {
            this.getChangeFile()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    downFile(row) {
      window.location.href = row.url
    }
  },
  watch: {
    upFiles() {
      if (!this.upFiles) {
        this.fileForm = {
          ci_id: '',
          describtion: '',
          person: '',
          file: ''
        }
        var obj = document.getElementById('fileupload')
        obj.value = ''
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.contractChange-container.form-container{
  border:none;
  margin-top:140px;
  .list.form-module{
    margin-bottom: 0;
    .el-dialog__wrapper{
      .el-dialog__body{
        button{
          line-height: 0.4;
          background-color: #35d5ba;
          border-color: #35d5ba;
          margin: 20px 0 10px 45%;
          border-radius: 5px;
        }
      }
    }
    .module-title{
      position:relative;
      .up-files{
        position:absolute;
        top:-20px;
        right:0;
        cursor:pointer;
      }
    }
  }
}
</style>
