<template>
<div class="app-container roles-container">
  <div class="form-head-attached clearfix">
    <div class="form-inner">
      <div class="crud-btn fl">
        <button @click="showDialog">
          <i class="iconfont icon-add"></i>
          <span>新增</span>
        </button>
      </div>
    </div>
  </div>
  <el-table style="width: 100%"  :data="regionList" :height="height" v-loading.body="listLoading" element-loading-text="拼命加载中" border>
    <el-table-column  fixed="left" align="center" prop="0" label="序号" width="60">
      <template slot-scope="scope">{{scope.$index  + 1}}</template>
   </el-table-column>
   <el-table-column prop="name" label="区域名称"></el-table-column>
  <el-table-column prop="code" label="区域编号"></el-table-column>
   <el-table-column fixed="right" label="操作" width="120">
      <template slot-scope="scope">
        <el-button @click.native.prevent="updateRow(scope.row.id)" type="text" size="small">修改</el-button>
        <el-button @click.native.prevent="deleteRow(scope.row.id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 弹窗框 -->
  <el-dialog title="新增区域" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
    <el-form :model="regionInfo">
      <el-form-item label="区域名称" label-width="120px">
        <el-input v-model="regionInfo.name" placeholder="请输入权限名称"></el-input>
      </el-form-item>
      <el-form-item label="区域编号" label-width="120px">
        <el-input v-model="regionInfo.code" placeholder="请输入权限编号"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible=false">取 消</el-button>
      <el-button type="primary" @click.native.prevent="addRegion" :disabled="confirmShow">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  name: 'region',
  data() {
    return {
      regionList: [],
      regionInfo: {
        name: '',
        code: ''
      },
      dialogFormVisible: false
    }
  },
  created() {
    this.getRegionList()
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  mounted() {
  },
  methods: {
    addRegion() {
      this.$post('/region/save', this.regionInfo).then((res) => {
        this.dialogFormVisible = false
        this.$message({
          message: '增加成功',
          type: 'success'
        })
        this.getRegionList()
      })
    },
    getRegionList() {
      this.listLoading = true
      var url = '/region'
      this.$get(url).then((res) => {
        this.listLoading = false
        if (res.data.success === true) {
          var data = res.data.data
          this.regionList = data.content
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    confirmDel(id) {
      var roleId = { id: [id] }
      this.$post('/region/delete', roleId).then((res) => {
        if (res.data.success === true) {
          this.getRegionList()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    deleteRow(id) {
      this.$confirm('确认删除此信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.confirmDel(id)
      }).catch(() => {
        return false
      })
    },
    updateRow(id) {
      this.$get('/region/findUpdateData/' + id).then((res) => {
        var obj = res.data.data
        this.regionInfo = {
          id: obj.id,
          name: obj.name,
          code: obj.code
        }
        this.dialogFormVisible = true
      })
    },
    resize() {
      this.height = winHeight() - 210
    },
    showDialog() {
      this.dialogFormVisible = true
      this.regionInfo = {
        name: '',
        code: ''
      }
    },
    exportData(data) {
      this.exprotList = data
    },
    handleDownload() {
      this.downloadLoading = true
      require.ensure([], () => {
        const { export_json_to_excel } = require('@/vendor/Export2Excel')
        const tHeader = ['序号', '区域名称', '区域编号']
        const filterVal = ['index', 'name', 'code']
        const list = this.regionList
        var i = 1
        list.forEach((item) => {
          item.index = i
          i++
        })
        const data = this.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, '区域表')
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    }
  },
  computed: {
    confirmShow() {
      if (this.regionInfo.name && this.regionInfo.code) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.roles-container {
  width: 100%;
  @include scrolling
  .form-head-attached {
    position: static;
    button:active {
      color: #35d5ba !important;
    }
  }
}
</style>
