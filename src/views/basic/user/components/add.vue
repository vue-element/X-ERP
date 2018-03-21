<template>
<!-- 社区建设单项目信息表 -->
<div class="form-container smartCommunity-add" ref="ele">
  <!-- <div class="commont-btn edit-btn" v-show="editShow">
    <el-button @click="toggleEditBtn">{{editWord}}</el-button>
  </div> -->
  <el-form :model="userMsg" :rules="rules" ref="userMsg">
    <div class="form-module">
      <h4 class="module-title">
        <p>用户基础信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="姓名:" prop="client">
            <p v-if="disabled">{{userMsg.name}}</p>
            <el-input v-else v-model="userMsg.name" placeholder="请输入账户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="工号:" prop="region">
            <p v-if="disabled">{{userMsg.name}}</p>
            <el-input v-else v-model="userMsg.name" placeholder="请输入工号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="所属组织名称:" prop="city">
            <p v-if="disabled">{{userMsg.role.name}}</p>
            <el-input v-else v-model="userMsg.role.name" placeholder="请输入工号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="所属组织编号:"  prop="name">
            <p v-if="disabled">{{userMsg.role.code}}</p>
            <el-input v-else v-model="userMsg.role.code" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="角色:" prop="buildNum">
            <p v-if="disabled">{{userMsg.role.name}}</p>
            <el-input v-else v-model="userMsg.role.name" type="number" min="0" placeholder="请输入楼栋及单位数量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="账号:" prop="address">
            <p v-if="disabled">{{userMsg.name}}</p>
            <el-input v-else v-model="userMsg.name" placeholder="请输入项目地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div class="commont-btn" v-show="!disabled">
      <el-button @click="add('userMsg')" :loading="loading">提交</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-form>
</div>
</template>
<script>
import _ from 'lodash'
import { isObjectValueEqual } from '@/utils'
export default {
  name: 'userAdd',
  props: ['editData'],
  data() {
    return {
      action: 'add',
      editWord: '编辑',
      loading: false,
      disabled: false,
      editShow: false,
      rules: {},
      userMsg: {
        name: '',
        role: {
          name: '',
          code: ''
        }
      },
      temp: {} // 保存新增，编辑的初始化对象
    }
  },
  created() {
    // this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.userMsg)
  },
  mounted() {},
  methods: {
    add(userMsg) {
      this.$refs[userMsg].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$post('/project/save', this.userMsg).then((res) => {
            this.loading = false
            if (res.data.success === true) {
              this.temp = _.cloneDeep(res.data.data)
              this.userMsg = res.data.data
              this.editInfo()
              this.successSave()
            } else {
              this.failSave()
            }
          })
        } else {
          this.$message({
            message: '信息未填写完整',
            type: 'warning'
          })
        }
      })
    },
    reset() {
      this.userMsg = _.cloneDeep(this.temp)
    },
    cancel() {
      this.$emit('changeObj', false)
      this.$emit('toggleTab')
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.userMsg = _.cloneDeep(this.temp)
        this.editInfo()
      }
    },
    getInsertData() {
      this.$get('/project/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
      })
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
        // console.log('editData', this.editData)
        this.userMsg = _.cloneDeep(this.editData.editData)
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
  computed: {},
  watch: {
    disabled (status) {
      if (status === false) {
        this.editWord = '取消编辑'
        this.$emit('changeObj', true)
      } else {
        this.editWord = '编辑'
      }
    },
    userMsg: {
      handler(obj) {
        if (isObjectValueEqual(obj, this.temp)) {
          this.$emit('changeObj', false)
        } else {
          this.$emit('changeObj', true)
        }
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>@import "src/styles/mixin.scss";
.form-container {
    @include noScroll;
    overflow-y: scroll;
}
// 社区建设单项目信息表
.form-container {
    .el-row {
        .el-form-item.radio-sel,
        .el-form-item.checkbox-sel{
            @include flex;
            font-size: 14px;
            label.el-form-item__label {
                width: 20%!important;
            }
        }
        .el-form-item.radio-sel .el-radio-group,
        .el-form-item.checkbox-sel .el-checkbox-group{
            padding-left: 20px;
            justify-content: space-around;
            width: 62%;
            height: 30px;
            background-color: #f8f8f8;
            @include borderRadius(4px);
        }
        .el-form-item.checkbox-sel .el-checkbox-group {
          width: 100%!important;
        }
    }
    ul.design-msg {
        @include flex;
        border: 1px solid #d2d2d2;
        li {
            width: 148px;
            height: 28px;
            line-height: 30px;
            margin: 5px;
            text-align: center;
            border: solid 1px #d2d2d2;
            overflow: hidden;
        }
        li.is-active {
            border: solid 1px #35d5ba;
            color: #35d5ba;
        }
    }
}
</style>
<style  rel="stylesheet/scss" lang="scss">@import "src/styles/mixin.scss";
.smartCommunity-add {
  .edit-btn {
    margin: 0;
    button {
      float: right;
    }
  }
  .el-form-item.radio-sel {
    display: flex;
    label.el-form-item__label {
      line-height: 30px;
        margin-top: 0!important;
    }
    .el-form-item__content {
      .el-radio-group {
        width: 100%!important;
        .el-radio__label {
          line-height: 30px;
        }
      }
    }
  }
  .el-form-item.community-facility {
    label.el-form-item__label {
      margin-top: 0!important;
      width: 13.5%!important;
      line-height: 30px;
    }
  }
  .element-table {
    margin-top: 20px;
  }
}
</style>
