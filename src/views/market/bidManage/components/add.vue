<template>
<!-- 社区建设单项目信息表 -->
<div class="form-container smartCommunity-add" ref="ele">
  <div class="commont-btn edit-btn" v-show="editShow">
    <el-button @click="toggleEditBtn">{{editWord}}</el-button>
  </div>
  <el-form :model="mainMsg" :rules="rules" ref="mainMsg">
    <div class="form-module">
      <h4 class="module-title">
        <p>投标报价|基础信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机编码" prop="client">
            <p v-if="disabled">{{mainMsg.client.name}}</p>
            <el-select v-else v-model="mainMsg.client.id" placeholder="请选择客户信息" filterable>
              <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="商机名称" prop="region">
            <p v-if="disabled">{{mainMsg.region.name}}</p>
            <el-select v-else v-model="mainMsg.region.id" placeholder="请选择区域">
              <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="客户名称" prop="city">
            <p v-if="disabled">{{mainMsg.city.name}}</p>
            <el-cascader v-else :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange" placeholder="请选择城市"></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="所属年月"  prop="name">
            <p v-if="disabled">{{mainMsg.name}}</p>
            <el-input v-else v-model="mainMsg.name" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="预计成交金额" prop="buildNum">
            <p v-if="disabled">{{mainMsg.buildNum}}</p>
            <el-input v-else v-model="mainMsg.buildNum" type="number" min="0" placeholder="请输入楼栋及单位数量"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div class="commont-btn" v-show="!disabled">
      <el-button @click="add('mainMsg')" :loading="loading">提交</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-form>
</div>
</template>
<script>
import _ from 'lodash'
import { isObjectValueEqual, outputmoney } from '@/utils'
export default {
  name: 'smartCommunityAdd',
  props: ['editData'],
  data() {
    var validateClient = (rules, value, callback) => {
      if (!value.id) {
        callback(new Error('客户信息不能为空'))
      } else {
        callback()
      }
    }
    var validateRegion = (rules, value, callback) => {
      if (!value.id) {
        callback(new Error('区域不能为空'))
      } else {
        callback()
      }
    }
    var validateCity = (rules, value, callback) => {
      if (!value.id) {
        callback(new Error('城市不能为空'))
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
      rules: {
        client: [{ required: true, validator: validateClient, trigger: 'change' }],
        region: [{ required: true, validator: validateRegion, trigger: 'change' }],
        city: [{ required: true, validator: validateCity, trigger: 'change' }],
        name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        archFormat: [{ required: true, message: '请选择建筑业态', trigger: 'change' }],
        buildNum: [{ required: true, message: '请输入楼栋及单位数量', trigger: 'blur' }],
        roomNum: [{ required: true, message: '请输入总户数', trigger: 'blur' }],
        address: [{ required: true, message: '请输入项目地址', trigger: 'blur' }],
        builtArea: [{ required: true, message: '请输入总建筑面积', trigger: 'blur' }],
        communityType: [{ required: true, message: '请选择小区类型', trigger: 'change' }],
        parkingNum: [{ required: true, message: '请输入车位总数', trigger: 'blur' }],
        facilityList: [{ required: true, message: '请选择小区配套设施', trigger: 'change' }]
      },
      tab: 'car',
      cityOption: [],
      regionList: [],
      clientList: [],
      cityList: [],
      archFormatList: [],
      defaultMsg: {},
      mainMsg: {
        city: {
          id: ''
        },
        region: {
          id: ''
        },
        client: {
          id: ''
        },
        address: '22222',
        archFormat: '',
        basementParkingFee: '',
        basementParkingNum: '',
        buildNum: '',
        builtArea: '',
        carRatio: '',
        chargeArea: '',
        communityType: '',
        contractMode: '',
        facilityList: [],
        defenseParkingFee: '',
        defenseParkingNum: '',
        firstEntry: '',
        groundParkingFee: '',
        groundParkingNum: '',
        landArea: '',
        manageFee: '',
        name: '',
        parkingNum: '',
        roomNum: '',
        volumetricRate: '',
        projectDesigns: [],
        oldCity: ''
      },
      carObj: {
        a: '',
        a1: '',
        b: '',
        b1: '',
        c: '',
        c1: '',
        category: 0
      },
      personObj: {
        a: '',
        a1: '',
        b: '',
        b1: '',
        c: '',
        c1: '',
        category: 1
      },
      elevatorObj: {
        a: '',
        b: '',
        category: 2
      },
      machineRoomObj: {
        a: '',
        a1: '',
        b: '',
        b1: '',
        c: '',
        category: 3
      },
      otherObj: {
        a: '',
        b: '',
        c: '',
        category: 4
      },
      facilityWord: '',
      temp: {} // 保存新增，编辑的初始化对象
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    this.temp = _.cloneDeep(this.mainMsg)
  },
  mounted() {},
  methods: {
    add(mainMsg) {
      this.$refs[mainMsg].validate((valid) => {
        if (valid) {
          this.loading = true
          this.mainMsg.projectDesigns = [this.carObj, this.personObj, this.elevatorObj, this.machineRoomObj, this.otherObj]
          this.mainMsg.oldCity = this.cityOption.join('-')
          this.mainMsg.facility = this.mainMsg.facilityList.join('、')
          console.log(this.mainMsg)
          this.$post('/project/save', this.mainMsg).then((res) => {
            this.loading = false
            if (res.data.success === true) {
              this.$emit('changeObj', false)
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              if (this.action === 'edit') {
                this.$emit('toggleTab')
              }
            }
          })
        } else {
          return false
        }
      })
    },
    reset() {
      if (this.action === 'add') {
        this.mainMsg = _.cloneDeep(this.temp)
        this.carObj = { a: '', a1: '', b: '', b1: '', c: '', c1: '', category: 0 }
        this.personObj = { a: '', a1: '', b: '', b1: '', c: '', c1: '', category: 1 }
        this.elevatorObj = { a: '', b: '', category: 2 }
        this.machineRoomObj = { a: '', a1: '', b: '', b1: '', c: '', category: 3 }
        this.otherObj = { a: '', b: '', c: '', category: 4 }
        this.cityOption = []
      } else {
        this.editInfo()
      }
    },
    cancel() {
      this.$emit('changeObj', false)
      this.$emit('toggleTab')
    },
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.mainMsg = data.project
      this.facilityWord = _.cloneDeep(this.mainMsg.facility)
      this.mainMsg.facilityList = this.mainMsg.facility.split('、')
      data.project.projectDesigns.forEach((item) => {
        if (item.category === '0') {
          this.carObj = item
        } else if (item.category === '1') {
          this.personObj = item
        } else if (item.category === '2') {
          this.elevatorObj = item
        } else if (item.category === '3') {
          this.machineRoomObj = item
        } else if (item.category === '4') {
          this.otherObj = item
        }
      })
      var cityOption = data.project.oldCity.split('-')
      this.cityOption = []
      cityOption.forEach((item) => {
        this.cityOption.push(parseInt(item))
      })
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
      this.$get('/project/findInsertData').then((res) => {
        var data = res.data.data
        this.cityList = data.cityList
        this.clientList = data.clientList
        this.regionList = data.regionList
      })
      this.archFormatList = [{ name: '多层' }, { name: '高层' }, { name: '小高层' }, { name: '别墅' }, { name: '商业' }, { name: '写字楼' }]
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
        this.editInfo()
      }
    },
    cityChange(val) {
      var len = val.length
      this.mainMsg.city.id = val[len - 1]
    },
    amountChange(val) {
      this.mainMsg.manageFee = outputmoney(val)
    },
    facilityChange() {
      this.disabled = true
      this.disabled = false
    }
  },
  computed: {},
  watch: {
    mainMsg: {
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
      width: 18%!important;
      line-height: 30px;
    }
  }
  .element-table {
    margin-top: 20px;
  }
}
</style>
