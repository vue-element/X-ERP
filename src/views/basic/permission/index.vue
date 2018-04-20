<template>
  <div class="app-container">
    <div class="form-head-attached clearfix">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button @click="toggleTab('listTab')">
            <i class="iconfont icon-seeAll"></i>
            <span>查看</span>
          </button>
        </div>
      </div>
    </div>
    <div class="permission-list compotent-tab">
      <!-- <div class="filter-container">
        <el-form>
          <el-form-item>
            <el-button type="success" icon="plus" @click="showCreate">添加角色
            </el-button>
          </el-form-item>
        </el-form>
      </div> -->
      <el-table :data="list" v-loading.body="listLoading" :height="height" element-loading-text="拼命加载中" border>
        <el-table-column fixed="left" label="序号" width="60">
          <template slot-scope="scope">{{scope.$index  + 1}}</template>
        </el-table-column>
        <el-table-column align="center" label="角色" prop="roleName" width="150"></el-table-column>
        <el-table-column align="center" label="菜单&权限" min-width="420">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.roleName==='管理员'" type="success">全部</el-tag>
            <div v-else>
              <div v-for="menu in scope.row.menus" class="menu-row">
                <span class="menu-name">{{menu.menuName}}</span>
                <div class="menu-permissions">
                 <el-tag v-for="perm in menu.permissions" :key="perm.permissionName" v-text="perm.permissionName" type="primary"></el-tag>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120" >
          <template slot-scope="scope">
            <div v-if="scope.row.roleName!='管理员'">
              <el-button type="text" icon="edit"  @click="showUpdate(scope.$index)">修改</el-button>
              <el-button type="text" icon="delete" @click.native.prevent="removeRole(scope.row.roleId)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="false" class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
       @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
       <!-- 模态框 -->
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
        <el-form :model="tempRole" label-position="left" :style="{height: dialogH + 'px'}">
          <el-form-item label="角色名称" required>
            <el-select v-model="tempRole.roleId" placeholder="请选择角色名称" @change="roleChange" disabled>
            <!-- <el-select v-model="tempRole.roleId" placeholder="请选择角色名称" @change="roleChange"> -->
              <el-option v-for="item in roleList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单&权限" class="permission-list" required>
            <div v-for=" (menu,_index) in allPermission" :key="menu.menuName">
            <el-button :type="isMenuNone(_index)?'':(isMenuAll(_index)?'success':'primary')" size="mini" @click="checkAll(_index)">
              {{menu.menuName}}
            </el-button>
            <el-checkbox-group v-model="tempRole.permissions">
              <el-checkbox v-for="perm in menu.permissions" :label="perm.id" @change="checkRequired(perm,_index)" :key="perm.id">
                <span :class="{requiredPerm:perm.requiredPerm===1}">{{perm.permissionName}}</span>
              </el-checkbox>
            </el-checkbox-group>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button v-if="dialogStatus=='create'" type="success" @click="createRole">创 建</el-button>
          <el-button type="primary" v-else @click="updateRole">修 改</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { winHeight } from '@/utils'
export default {
  data() {
    return {
      height: 100,
      dialogH: 100,
      list: [], // 表格的数据
      allPermission: [],
      listLoading: false, // 数据加载等待动画
      dialogStatus: 'create',
      dialogFormVisible: false,
      textMap: {
        update: '修改角色权限',
        create: '新建角色'
      },
      tempRole: {
        roleName: '',
        roleId: '',
        permissions: []
      },
      adminName: '管理员',
      roleList: [],
      total: 5,
      currentPage: 1,
      pageSizes: [12, 15, 16],
      pageSize: 15
    }
  },
  created() {
    this.getAllRole()
    this.getAllPermisson()
    this.getList()
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
      this.dialogH = winHeight() - 260
    },
    getAllRole() {
      this.$get('/role/findAll').then((res) => {
        if (res.data.success === true) {
          this.roleList = res.data.data
        } else {
          return
        }
      })
    },
    getAllPermisson() {
      this.$get('/permission/findAll').then((res) => {
        if (res.data.success === true) {
          this.allPermission = res.data.data.List
        }
      })
    },
    getList() {
      // 查询列表
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      this.listLoading = true
      this.$get('/permission/listRolePermission?pageSize=' + pageSize + '&page=' + page).then((res) => {
        this.listLoading = false
        this.list = res.data.data.List
        // console.log('listRolePermission', res)
        // // this.clientList = data.content
        // this.total = data.totalElements
        // this.currentPage = data.number + 1
        // this.pageSize = data.size
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    getIndex($index) {
      // 表格序号
      return $index + 1
    },
    showCreate() {
      // 显示新增对话框
      this.tempRole.roleName = ''
      this.tempRole.roleId = ''
      this.tempRole.permissions = []
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    showUpdate($index) {
      var role = this.list[$index]
      this.tempRole.roleName = role.roleName
      this.tempRole.roleId = role.roleId
      this.tempRole.permissions = []
      for (var i = 0; i < role.menus.length; i++) {
        var perm = role.menus[i].permissions
        for (var j = 0; j < perm.length; j++) {
          this.tempRole.permissions.push(perm[j].permissionId)
        }
      }
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    createRole() {
      // if (!this.checkRoleNameUnique()) {
      //   return
      // }
      // if (!this.checkPermissionNum()) {
      //   return
      // }
      var permissions = []
      this.tempRole.permissions.forEach((permissionId) => {
        var obj = {
          p_id: permissionId
        }
        permissions.push(obj)
      })
      var roleObj = {
        role_id: this.tempRole.roleId,
        permissions: permissions
      }
      this.$post('/permission/insertRolePermission', roleObj).then((res) => {
        if (res.data.success === true) {
          this.getList()
          this.dialogFormVisible = false
        }
        // console.log('res', res)
      })
    },
    updateRole() {
      this.createRole()
    },
    checkPermissionNum() {
      // 校验至少有一种权限
      if (this.tempRole.permissions.length === 0) {
        this.$message.error('请至少选择一种权限')
        return false
      }
      return true
    },
    checkRoleNameUnique(roleId) {
      // 校验名称重复
      var roleName = this.tempRole.roleName
      if (!roleName) {
        this.$message.error('请填写角色名称')
        return false
      }
      var roles = this.list
      var result = true
      for (var j = 0; j < roles.length; j++) {
        if (roles[j].roleName === roleName && (!roleId || roles[j].roleId !== roleId)) {
          this.$message.error('角色名称已存在')
          result = false
          break
        }
      }
      return result
    },
    removeRole(id) {
      this.$confirm('确定删除此角色权限?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post('/permission/delRolePermission/' + id).then((res) => {
          if (res.data.success === true) {
            this.getList()
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
      })
    },
    isMenuNone(_index) {
      // 判断本级菜单内的权限是否一个都没选
      var menu = this.allPermission[_index].permissions
      var result = true
      for (var j = 0; j < menu.length; j++) {
        if (this.tempRole.permissions.indexOf(menu[j].id) > -1) {
          result = false
          break
        }
      }
      return result
    },
    isMenuAll(_index) {
      // 判断本级菜单内的权限是否全选了
      var menu = this.allPermission[_index].permissions
      var result = true
      for (var j = 0; j < menu.length; j++) {
        if (this.tempRole.permissions.indexOf(menu[j].id) < 0) {
          result = false
          break
        }
      }
      return result
    },
    checkAll(_index) {
      // 点击菜单   相当于全选按钮
      var v = this
      if (v.isMenuAll(_index)) {
        // 如果已经全选了,则全部取消
        v.noPerm(_index)
      } else {
        // 如果尚未全选,则全选
        v.allPerm(_index)
      }
    },
    allPerm(_index) {
      // 全部选中
      var menu = this.allPermission[_index].permissions
      for (var j = 0; j < menu.length; j++) {
        this.addUnique(menu[j].id, this.tempRole.permissions)
      }
    },
    noPerm(_index) {
      // 全部取消选中
      var menu = this.allPermission[_index].permissions
      for (var j = 0; j < menu.length; j++) {
        var idIndex = this.tempRole.permissions.indexOf(menu[j].id)
        if (idIndex > -1) {
          this.tempRole.permissions.splice(idIndex, 1)
        }
      }
    },
    addUnique(val, arr) {
      // 数组内防重复地添加元素
      var _index = arr.indexOf(val)
      if (_index < 0) {
        arr.push(val)
      }
    },
    checkRequired(_perm, _index) {
      // 本方法会在勾选状态改变之后触发
      var permId = _perm.id
      if (this.tempRole.permissions.indexOf(permId) > -1) {
        // 选中事件
        // 如果之前未勾选本权限,现在勾选完之后,tempRole里就会包含本id
        // 那么就要将必选的权限勾上
        this.makeReuqiredPermissionChecked(_index)
      } else {
        // 取消选中事件
        if (_perm.requiredPerm === 1) {
          // 如果是必勾权限,就把本菜单的权限全部移出
          // (其实也可以提示用户本权限是菜单里的必选,请先取消勾选另外几个权限,交互太麻烦,此处就直接全部取消选中了)
          this.noPerm(_index)
        }
      }
    },
    makeReuqiredPermissionChecked(_index) {
      // 将本菜单必选的权限勾上
      var menu = this.allPermission[_index].permissions
      for (var j = 0; j < menu.length; j++) {
        var perm = menu[j]
        if (perm.requiredPerm === 1) {
          // 找到本菜单的必选权限,将其勾上
          this.addUnique(perm.id, this.tempRole.permissions)
        }
      }
    },
    roleChange(val) {
      this.roleList.forEach((item) => {
        if (item.id === val) {
          this.tempRole.roleName = item.name
        }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.permission-list {
  .el-table tbody tr td div.cell{
    white-space: normal;
    height: auto;
  }
  .requiredPerm {
    color: #ff0e13;
  }
  //展示页表格
  .el-table tbody tr td div.cell{
    .menu-row {
      text-align: left;
      .menu-name {
        width: 18%;
        display: inline-block;
        text-align: right;
        vertical-align:top;
      }
      .menu-permissions {
        width: 78%;
        display:inline-block
      }
    }
  }
  .el-dialog__wrapper {
    .el-dialog {
      margin-top: 70px!important;
      width: 80%;
      .el-dialog__body{
        position: relative;
        overflow-y: auto;
        .el-form-item {
          .el-form-item__label {
            width: 13%!important;
          }
          .el-form-item__content {
            width: 30%!important;
          }
        }
        .permission-list.el-form-item {
          .el-form-item__label {
            vertical-align: top;
          }
          .el-form-item__content {
            width: 84%!important;
            .el-button {
              display:inline-block;
              width: 18%;
              padding:7px;
              margin-right: 2%;
              font-weight: bold;
              color: #000;
              vertical-align: top;
            }
            .el-checkbox-group {
              width:78%;
              display:inline-block;
            }
            .el-checkbox {
              margin-left: 0;
              margin-right: 20px;
              .el-checkbox__label {
                padding-left: 6px;
              }
            }
          }
        }
      }
      .el-dialog__footer{
        margin-top:6px;
        padding-bottom:10px;
        button {
          padding: 10px 20px;
        }
      }
    }
  }
}
</style>
