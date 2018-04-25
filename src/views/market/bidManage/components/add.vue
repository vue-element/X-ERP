<template>
<!-- 社区建设单项目信息表 -->
<div class="form-container smartCommunity-add" ref="ele">
  <div class="commont-btn edit-btn" v-show="hasPerm('tenderOffer:update') && editShow">
    <el-button @click="toggleEditBtn">{{editWord}}</el-button>
  </div>
  <el-form :model="mainMsg" :rules="rules" ref="mainMsg">
    <div class="form-module">
      <h4 class="module-title">
        <p>投标报价|基础信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机编码" prop="business">
            <p v-if="disabled">{{mainMsg.business.code}}</p>
            <el-autocomplete v-show="!disabled" v-model="mainMsg.business.code" :fetch-suggestions="bussinessCodeSearch" @select="bussinessSelect" placeholder="请选择商机编码"></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机名称">
            <p v-if="disabled">{{mainMsg.business.name}}</p>
            <el-autocomplete v-show="!disabled" v-model="mainMsg.business.name" :fetch-suggestions="bussinessNameSearch" @select="bussinessSelect" placeholder="请选择商机名称"></el-autocomplete>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="客户名称">
            <p v-if="disabled">{{mainMsg.business.clientName}}</p>
            <el-input v-else v-model="mainMsg.business.clientName" placeholder="自动生成" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="预计成交金额">
            <p v-if="disabled">{{mainMsg.business.amount}}</p>
            <el-input v-else v-model="mainMsg.business.amount" placeholder="自动生成" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div class="commont-btn" v-show="hasPerm('tenderOffer:save') && !disabled">
      <el-button @click="add()" :loading="loading">保存</el-button>
      <!-- <el-button @click="reset">重置</el-button> -->
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-form>
</div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { isObjectValueEqual } from '@/utils'
export default {
  name: 'smartCommunityAdd',
  props: ['editData'],
  data() {
    const validateBusiness = (rule, value, callback) => {
      if (!value.id) {
        callback(new Error('请选择商机编号'))
      } else {
        callback()
      }
    }
    return {
      action: 'add',
      editWord: '编辑',
      loading: false,
      disabled: false,
      editShow: false,
      bussinessCode: '',
      bussinessName: '',
      rules: {
        business: [{ required: true, validator: validateBusiness, trigger: 'change' }]
      },
      mainMsg: {
        business: {
          id: null,
          code: '',
          name: '',
          amount: '',
          clientName: ''
        }
      },
      businessList: [],
      temp: {} // 保存新增，编辑的初始化对象
    }
  },
  created() {
    this.toggleAction()
    this.temp = _.cloneDeep(this.mainMsg)
  },
  mounted() {},
  methods: {
    add() {
      this.$refs.mainMsg.validate((valid) => {
        if (valid) {
          this.loading = true
          this.$post('/tenderOffer/save', this.mainMsg).then((res) => {
            this.loading = false
            if (res.data.success === true) {
              this.mainMsg = res.data.data
              this.temp = _.cloneDeep(res.data.data)
              this.successSave()
            } else {
              this.failSave()
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    // reset() {
    //   // console.log(this.mainMsg)
    //   // console.log(this.temp)
    //   this.mainMsg = _.cloneDeep(this.temp)
    // },
    cancel() {
      this.$emit('changeObj', false)
      this.$emit('toggleTab')
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.editWord = '编辑'
      } else {
        this.editWord = '取消编辑'
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
      }
    },
    // 商机编号变化
    bussinessCodeSearch(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/bussinessCode?role_code=' + this.roleCode + '&bussinessCode=' + queryString).then((res) => {
        list = res.data.objectList
        for (var i of list) {
          i.value = i.code
        }
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    // 商机名称变化
    bussinessNameSearch(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/bussinessName?role_code=' + this.roleCode + '&businessName=' + queryString).then((res) => {
        list = res.data.objectList
        for (var i of list) {
          i.value = i.name
        }
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    bussinessSelect(item) {
      this.mainMsg.business = item
    },
    bussinessFocus() {
      console.log('this.mainMsg.business', this.mainMsg.business)
    }
  },
  computed: {
    ...mapGetters([
      'roleCode'
    ])
  },
  watch: {
    mainMsg: {
      handler(obj) {
        if (isObjectValueEqual(obj.business, this.temp)) {
          this.$emit('changeObj', false)
        } else {
          this.$emit('changeObj', true)
        }
        if (obj.business.code === '' || obj.business.name === '') {
          obj.business.id = null
          obj.business.code = ''
          obj.business.name = ''
          obj.business.amount = ''
          obj.business.clientName = ''
          this.temp.business = obj.business // 商机清空，temp与business保持一致
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
      width: 18%!important;
      line-height: 30px;
    }
  }
  .element-table {
    margin-top: 20px;
  }
}
</style>
