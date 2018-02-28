<template>
<!-- 社区建设单项目信息表 -->
<div class="form-container customer-input" ref="ele">
  <div class="commont-btn edit-top-btn" v-show="editShow">
    <el-button @click="toggleEditBtn">{{editWord}}</el-button>
  </div>
  <el-form :model="client" :rules="rules" ref="client">
    <div class="form-module">
      <h4 class="module-title">
        <p>客户基础信息</p>
      </h4>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="客户名称:" prop="name">
            <p v-if="disabled">{{client.name}}</p>
            <el-input v-else v-model="client.name" placeholder="请输入客户名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="客户类别:" prop="category">
            <p v-if="disabled">{{client.category}}</p>
            <el-select v-else v-model="client.category" placeholder="请选择客户类别">
              <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="业态:" prop="type">
            <p v-if="disabled">{{client.type}}</p>
            <el-select v-else v-model="client.type" placeholder="请选择业态">
              <el-option v-for="item in typeList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="企业性质:" prop="nature">
            <p v-if="disabled">{{client.nature}}</p>
            <el-select v-else v-model="client.nature" placeholder="请选择企业性质">
              <el-option v-for="item in natureList" :label="item.value" :value="item.value" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="在建项目数:" prop="projectNu">
            <p v-if="disabled">{{client.projectNu}}</p>
            <el-input v-else v-model="client.projectNu" placeholder="请输入在建项目数"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="联系人:" prop="person">
            <p v-if="disabled">{{client.person}}</p>
            <el-input v-else v-model="client.person" placeholder="请输入联系人"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="职位:" prop="position">
            <p v-if="disabled">{{client.position}}</p>
            <el-input v-else v-model="client.position" placeholder="请输入职位"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="联系人电话:" prop="phone">
            <p v-if="disabled">{{client.phone}}</p>
            <el-input v-else v-model="client.phone" placeholder="请输入联系人电话"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="QQ:" prop="qq">
            <p v-if="disabled">{{client.qq}}</p>
            <el-input v-else v-model="client.qq" placeholder="请输入QQ"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Email:" prop="email">
            <p v-if="disabled">{{client.email}}</p>
            <el-input v-else v-model="client.email" placeholder="请输入Email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :lg="24">
          <el-form-item label="客户地址:" prop="address" class="customer-address">
            <p v-if="disabled">{{client.address}}</p>
            <el-input v-else v-model="client.address" placeholder="请输入客户地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div class="commont-btn" v-show="!disabled">
      <el-button @click="add" :loading="loading">提交</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-form>
</div>
</template>
<script>
import _ from 'lodash'
import { isObjectValueEqual } from '@/utils'
import { validatePhone, validateMobile } from '@/utils/validate'
export default {
  name: 'customer',
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
        projectNu: '',
        qq: '',
        type: ''
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
    if (this.editData.tabState === 'seeTab') {
      this.action = 'edit'
      this.client = _.cloneDeep(this.editData.editData)
      this.editShow = true
      this.disabled = true
    } else {
      this.action = 'add'
    }
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
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$emit('changeObj', false)
              if (this.action === 'edit') {
                this.$emit('toggleTab')
              }
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
      if (this.disabled === true) {
        this.editWord = '编辑'
        this.editInfo()
      } else {
        this.editWord = '取消编辑'
      }
    },
    getInsertData() {
      this.categoryList = [
        { value: '中海物业' },
        { value: '外部物业' },
        { value: '中海地产' },
        { value: '外部地产' },
        { value: '其他客户' }
      ]
      this.typeList = [
        { value: '多层' },
        { value: '高层' },
        { value: '小高层' },
        { value: '别墅' },
        { value: '商业' },
        { value: '写字楼' },
        { value: '其他' }
      ]
      this.natureList = [
        { value: '国有' },
        { value: '上市公司' },
        { value: '私有企业' },
        { value: '其他' }
      ]
    }
  },
  computed: {},
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
