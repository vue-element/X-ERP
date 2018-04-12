<template>
<!-- 社区建设单项目信息表 -->
<div class="form-container customer-input" ref="ele">
  <div class="basic-container">
    <div class="commont-btn edit-top-btn" v-show="hasPerm('client:findUpdateData') && editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="client" :rules="rules" ref="client">
      <div class="form-module">
        <h4 class="module-title">
          <p>组织基本信息</p>
        </h4>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="角色名称:" prop="name">
              <p v-if="disabled">{{client.name}}</p>
              <el-input v-else v-model="client.name" placeholder="请输入客户名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="角色编号:" prop="category">
              <p v-if="disabled">{{client.category}}</p>
              <el-select v-else v-model="client.category" placeholder="请选择客户类别" filterable clearable>
                <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="所属组织名称:" prop="type">
              <p v-if="disabled">{{client.type}}</p>
              <el-select v-else v-model="client.type" placeholder="请选择业态"  filterable clearable>
                <el-option v-for="item in typeList" :label="item.value" :value="item.value" :key="item.id">
                </el-option>
              </el-select >
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="上级组织名称:" prop="nature">
              <p v-if="disabled">{{client.nature}}</p>
              <el-select v-else v-model="client.nature" placeholder="请选择企业性质" filterable clearable>
                <el-option v-for="item in natureList" :label="item.value" :value="item.value" :key="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="角色类型:" prop="projectNu">
              <p v-if="disabled">{{client.projectNum}}</p>
              <el-input v-else v-model="client.projectNum" placeholder="请输入在建项目数"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn"  v-show="hasPerm('client:save') && !disabled">
        <el-button @click="add" :loading="loading">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </el-form>
  </div>
  <div class="permission-container">
    <el-tree :data="data2" show-checkbox node-key="id" ref="tree" highlight-current :props="defaultProps"></el-tree>
  </div>

</div>
</template>
<script>
import _ from 'lodash'
import { isObjectValueEqual } from '@/utils'
import { validatePhone, validateMobile } from '@/utils/validate'
export default {
  props: ['editData'],
  data() {
    const validPhone = (rule, value, callback) => {
      if ((!validateMobile(value)) && (!validatePhone(value))) {
        callback(new Error('请输入正确的手机或电话号码'))
      } else {
        callback()
      }
    }
    return {
      categoryList: [],
      typeList: [],
      natureList: [],
      client: {
        address: '',
        category: '',
        email: '',
        name: '',
        nature: '',
        person: '',
        phone: '',
        position: '',
        projectNum: '',
        qq: '',
        type: ''
      },
      data2: [{
        id: 1,
        label: '基本管理',
        children: [{
          id: 4,
          label: '组织架构',
          children: [{
            id: 9,
            label: '查看'
          }, {
            id: 10,
            label: '编辑'
          }, {
            id: 10,
            label: '新增'
          }, {
            id: 10,
            label: '删除'
          }]
        }, {
          id: 4,
          label: '用户管理',
          children: [{
            id: 9,
            label: '查看'
          }, {
            id: 10,
            label: '编辑'
          }, {
            id: 10,
            label: '新增'
          }, {
            id: 10,
            label: '删除'
          }]
        }]
      }, {
        id: 2,
        label: '市场管理',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      action: 'add',
      editWord: '编辑',
      loading: false,
      disabled: false,
      editShow: false,
      rules: {
        name: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
        category: [{ required: true, message: '请输入客户类别', trigger: 'change' }],
        type: [{ required: true, message: '请输入业态', trigger: 'change' }],
        person: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        position: [{ required: true, message: '请输入职位', trigger: 'blur' }],
        phone: [{ required: true, trigger: 'blur', validator: validPhone }]
      },
      temp: {}
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.client)
  },
  mounted() {
  },
  methods: {
    add() {
      this.$refs.client.validate(valid => {
        if (valid) {
          this.loading = true
          this.$post('/client/save', this.client).then((res) => {
            this.loading = false
            if (res.data.success === true) {
              this.client = res.data.data
              this.temp = _.cloneDeep(res.data.data)
              this.successSave()
            } else {
              this.failSave()
            }
          }).catch(() => {
            this.loading = false
          })
        }
      })
    },
    reset() {
      this.client = _.cloneDeep(this.temp)
    },
    cancel() {
      this.$emit('changeObj', false)
      this.$emit('toggleTab')
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      this.client = _.cloneDeep(this.temp)
    },
    getInsertData() {
      this.categoryList = [{ value: '中海物业' }, { value: '外部物业' }, { value: '中海地产' }, { value: '外部地产' }, { value: '其他客户' }]
      this.typeList = [{ value: '多层' }, { value: '高层' }, { value: '小高层' }, { value: '别墅' }, { value: '商业' }, { value: '写字楼' }, { value: '其他' }]
      this.natureList = [{ value: '国有' }, { value: '上市公司' }, { value: '私有企业' }, { value: '其他' }]
    },
    toggleAction() {
      if (this.editData.tabState === 'addTab') {
        this.action = 'add'
        this.disabled = false
        this.editShow = false
      } else {
        this.action = 'edit'
        this.disabled = true
        this.editShow = true
        this.client = _.cloneDeep(this.editData.editData)
      }
    },
    successSave() {
      this.$emit('changeObj', false)
      this.$message({
        message: '保存成功',
        type: 'success'
      })
      if (this.action === 'add') {
        this.$emit('toggleTab')
      } else {
        this.editShow = true
        this.disabled = true
      }
    },
    failSave() {
      this.$message({
        message: '保存失败',
        type: 'error'
      })
    }
  },
  watch: {
    client: {
      handler(obj) {
        if (isObjectValueEqual(obj, this.temp)) {
          this.$emit('changeObj', false)
        } else {
          this.$emit('changeObj', true)
        }
      },
      deep: true
    },
    disabled (status) {
      if (status === false) {
        this.editWord = '取消编辑'
        this.$emit('changeObj', true)
      } else {
        this.editWord = '编辑'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.form-container {
    @include noScroll;
    overflow-y: scroll;
}

</style>
<style  rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.customer-input {
  .el-form {
    .el-form-item.customer-address{
      label.el-form-item__label {
        width: 14%!important;
      }
      .el-form-item__content{
        width: 81%!important;
      }
    }
  }
}
</style>
