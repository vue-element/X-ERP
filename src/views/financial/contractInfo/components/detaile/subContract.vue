<template>
  <div class="subContract-container form-container">
    <div class="list form-module">
      <h4 class="module-title">
        <p>合同分包附件列表</p>
        <div class="up-files common-btn" @click="upFiles=true">附件上传</div>
      </h4>
      <!-- 分包文件上传 -->
      <el-dialog title="合同分包附件上传" :visible.sync="upFiles" :modal-append-to-body="false">
        <el-form>
          <el-form-item label="分包金额">
            <el-input type="text" v-model="filesForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="附件说明">
            <el-input type="text" v-model="filesForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="上传人">
            <el-input type="text" v-model="filesForm.author"></el-input>
          </el-form-item>
          <el-form-item label="上传时间" prop="name">
             <el-date-picker v-model="filesForm.date" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="添加附件" prop="name">
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
      <div class="table">
        <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" ref="multipleTable">
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
        <el-pagination class="page" background :current-page="currentPage" :page-sizes="[1, 2, 3, 4]"
    :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="100"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  data() {
    return {
      tableData: [{
        1: '附件1：长春中海国际社区合同交底记录-国社.doc',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
      }, {
        1: '附件1：长春中海国际社区合同交底记录-国社.doc',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
      }, {
        1: '附件1：长春中海国际社区合同交底记录-国社.doc',
        2: '附件说明',
        3: '罗艺',
        4: '2018-01-12'
      }],
      height: 100,
      currentPage: 1,
      upFiles: false,
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
      this.height = winHeight() - 335
    },
    handleChange() {

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
