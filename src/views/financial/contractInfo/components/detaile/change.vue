<template>
  <div class="change-container form-container">
    <div class="list form-module">
      <h4 class="module-title">
        <p>合同变更附件列表</p>
        <div class="up-files common-btn" @click="upFilesBtn">附件上传</div>
      </h4>
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="changeData" :height="height" ref="multipleTable" border>
          <el-table-column align="center" prop="0" label="序号" width="60" fixed>
            <template slot-scope="scope">
             {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="1" label="附件名称" width="300"></el-table-column>
          <el-table-column align="center" prop="2" label="附件说明" width="300"></el-table-column>
          <el-table-column align="center" prop="3" label="上传人"></el-table-column>
          <el-table-column align="center" prop="4" label="上传时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button @click="modify(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination class="page" background :current-page="currentPage" :page-sizes="[1, 2, 3, 4]"
    :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="100"></el-pagination>
      </div>
      <!-- 变更附件上传弹窗 -->
      <el-dialog title="变更附件上传" :visible.sync="upFiles" :modal-append-to-body="false">
        <el-form>
          <el-form-item label="附件说明">
            <el-input type="text" v-model="fileForm.describtion"></el-input>
          </el-form-item>
          <el-form-item label="上传附件" prop="name">
            <el-upload class="upload-demo" ref="upload" action="" :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" >
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">提交</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  props: ['editData'],
  data() {
    return {
      changeData: [],
      height: 100,
      currentPage: 1,
      upFiles: false,
      fileForm: {
        desc: '',
        author: '',
        date: ''
      }
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
      this.height = winHeight() - 335
    },
    upFilesBtn() {
      var contractMsg = sessionStorage.getItem('contractMsg')
      if (this.editData.tabState === 'addTab' && contractMsg === null) {
        this.$message({
          message: '请先输入合同基础信息'
        })
      } else {
        this.upFiles = true
      }
    },
    submitUpload() {
      this.$refs.upload.submit()
      console.log(1111)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.change-container.form-container{
  border:none;
  margin-top:140px;
  .list.form-module{
    margin-bottom:0;
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
