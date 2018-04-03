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
        <el-pagination class="page" background :current-page="currentPage" :page-sizes="[1, 2, 3, 4]"
    :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="100"></el-pagination>
      </div>
      <!-- 分包文件上传弹窗 -->
      <el-dialog title="变更附件上传" :visible.sync="upFiles" :modal-append-to-body="false">
        <form>
          <div class="describtion">
            <span>附件说明：</span>
            <textarea rows="4" v-model="fileForm.describtion" placeholder="请输入附件说明"></textarea>
          </div>
          <div class="person">
            <span>上传人：</span>
            <input type="text" v-model="fileForm.person" placeholder="请输入上传人">
          </div>
          <div class="upfile">
            <span>附件上传：</span>
            <input type="file" id="fileupload" @change="getFile($event)">
          </div>
          <button class="filebtn" @click="upFile($event)">上传</button>
        </form>
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
      currentPage: 1,
      contractChangeData: [],
      upFiles: false,
      fileForm: {
        ci_id: '',
        describtion: '',
        person: '',
        file: ''
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
    getFile(event) {
      this.fileForm.file = event.target.files[0]
    },
    upFile(event) {
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
    .describtion,
    .person,
    .upfile{
      font-size: 15px;
      color: black;
      margin: 15px 10% 20px;
      span{
        display: inline-block;
        width: 100px;
        height: 30px;
        text-align: right;
        vertical-align: top;
      }
      textarea{
        resize: both;
        max-width: 70%;
        min-width: 70%
      }
      textarea,
      input[type="text"]{
        &::-webkit-scrollbar{
          width: 0;
        }
        margin-left: 5px;
        padding-left: 8px;
        width: 70%;
        line-height: 26px;
        border: 1px solid #828282;
        border-radius: 5px;
        box-sizing: border-box;
      }
      input[type="file"]{
        margin-left: 7px;
      }
    }
    button.filebtn{
      font-size: 15px;
      margin: 0 0 20px 45%;
      width: 10%;
      height: 30px;
      background-color: #35d5ba;
      border: 1px solid #35d5ba;
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
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
