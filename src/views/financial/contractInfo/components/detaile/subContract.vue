<template>
  <div class="subContract-container form-container">
    <div class="list form-module">
      <h4 class="module-title">
        <p>合同分包附件列表</p>
        <div class="up-files common-btn" @click="filesBtn">附件上传</div>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="subContractData" :height="height" ref="multipleTable" border>
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
              <!-- <el-button @click="modify(scope.row.id)" type="text" size="small">修改</el-button> -->
              <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="page" background :current-page="currentPage" :page-sizes="[1, 2, 3, 4]"
    :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="100"></el-pagination>
      </div>
      <!-- 分包文件上传弹窗 -->
      <el-dialog title="合同分包附件上传" :visible.sync="upFiles" :modal-append-to-body="false">
        <form>
          <div class="describtion">
            <span>附件说明：</span>
            <textarea rows="5" v-model="fileForm.describtion"></textarea>
          </div>
          <div class="person">
            <span>上传人：</span>
            <input type="text" v-model="fileForm.person">
          </div>
          <div class="upfile">
            <span>附件上传：</span>
            <input type="file" id="fileupload" @change="getFile($event)">
          </div>
          <button class="filebtn" @click="upFile($event)">提交</button>
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
      subContractData: [],
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
    this.getSubContractFile()
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 335
    },
    // 点击'附件上传'获取ci_id
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
    // 渲染附件信息
    getSubContractFile() {
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
      this.$get('/contractSubcontract/findAllByContractInfo/' + subContract.id).then((res) => {
        this.subContractData = res.data.data.content
      })
    },
    // 附件上传之前获取文件信息
    getFile(event) {
      this.fileForm.file = event.target.files[0]
      console.log(this.fileForm.file)
    },
    // 附件上传
    upFile(event) {
      event.preventDefault()
      var _this = this
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200 || xhr.status === 304) {
          _this.upFiles = false
          var res = JSON.parse(xhr.responseText)
          if (res.success === true) {
            _this.getSubContractFile()
            _this.fileForm = {
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
      var fd = new FormData()
      fd.append('ci_id', this.fileForm.ci_id)
      fd.append('describtion', this.fileForm.describtion)
      fd.append('person', this.fileForm.person)
      fd.append('file', this.fileForm.file)
      var src = 'http://202.105.96.131:8081'
      xhr.open('POST', src + '/contractSubcontract/save', true)
      xhr.send(fd)
    },
    // 附件修改
    modify(id) {
      this.$get('/contractSubcontract/findUpdateData/' + id).then((res) => {
        this.upFiles = true
        this.fileForm = res.data.data.contractSubcontract
      })
    },
    // 附件删除
    deleteRow(id) {
      this.$confirm('此操作将删除该条信息, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var fileID = { id: [id] }
        this.$post('/contractSubcontract/delete', fileID).then((res) => {
          if (res.data.success === true) {
            this.getSubContractFile()
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.subContract-container.form-container{
  border:none;
  margin-top:140px;
  .list.form-module{
    margin-bottom: 0;
    .describtion,
    .person,
    .upfile{
      font-size: 17px;
      color: black;
      margin: 10px 5% 30px;
      span{
        display: inline-block;
        width: 100px;
        height: 30px;
        text-align: right;
        vertical-align: top;
      }
      textarea,
      input[type="text"]{
        &::-webkit-scrollbar{
          width: 0;
        }
        margin-left: 5px;
        padding-left: 10px;
        width: 70%;
        line-height: 30px;
        border: 1px solid #828282;
        border-radius: 5px;
        box-sizing: border-box;
      }
    }
    button.filebtn{
      margin: 0 0 20px 47%;
      width: 12%;
      height: 35px;
      background-color: #67c23a;
      border: 1px solid #67c23a;
      border-radius: 10px;
      color: #fff;
      cursor: pointer;
      font-size: 17px;
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
