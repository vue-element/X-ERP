<template>
<!-- 社区建设单项目信息表 -->
<div class="form-container smartCommunity-add" ref="ele">
  <div class="commont-btn edit-btn" v-show="hasPerm('project:update') && editShow">
    <el-button @click="toggleEditBtn">{{editWord}}</el-button>
  </div>
  <el-form :model="mainMsg" :rules="rules" ref="mainMsg">
    <div class="form-module">
      <h4 class="module-title">
        <p>项目基础信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="客户信息：" prop="client">
            <p v-if="disabled">{{mainMsg.client.name}}</p>
            <el-autocomplete v-else v-model="mainMsg.client.name" :fetch-suggestions="clientSearchAsync" @select="clientSelect" placeholder="请选择客户名称"></el-autocomplete>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="区域：" prop="region">
            <p v-if="disabled">{{mainMsg.region.name}}</p>
            <el-select v-else v-model="mainMsg.region.id" placeholder="请选择区域" filterable clearable>
              <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="城市：" prop="city">
            <p v-if="disabled">{{mainMsg.city.name}}</p>
            <el-cascader v-else :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange" placeholder="请选择城市" filterable clearable></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="项目名称："  prop="name">
            <p v-if="disabled">{{mainMsg.name}}</p>
            <el-input v-else v-model="mainMsg.name" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="楼栋及单元数量：" prop="buildNum">
            <p v-if="disabled">{{mainMsg.buildNum}}</p>
            <el-input v-else v-model="mainMsg.buildNum" type="number" min="0" placeholder="请输入楼栋及单位数量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="项目地址：" prop="address">
            <p v-if="disabled">{{mainMsg.address}}</p>
            <el-input v-else v-model="mainMsg.address" placeholder="请输入项目地址"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="首期入伙时间：" class="single-date">
            <p v-if="disabled">{{mainMsg.firstEntry}}</p>
            <el-date-picker  v-else type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="mainMsg.firstEntry" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="建筑业态：" prop="archFormat">
            <p v-if="disabled">{{mainMsg.archFormat}}</p>
            <el-select v-else v-model="mainMsg.archFormat" placeholder="请输入建筑业态" filterable clearable>
              <el-option v-for="item in archFormatList" :label="item.name" :value="item.name" :key="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="物业管理费：">
            <p v-if="disabled">{{mainMsg.manageFee}}</p>
            <el-input v-else v-model="mainMsg.manageFee" @change="amountChange" placeholder="请输入物业管理费"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="车位总数：" prop="parkingNum">
            <p v-if="disabled">{{mainMsg.parkingNum}}</p>
            <el-input v-else v-model="mainMsg.parkingNum" type="number" min="0" placeholder="请输入车位总数"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="车位比：">
            <p v-if="disabled">{{mainMsg.carRatio}}</p>
            <el-input v-else v-model="mainMsg.carRatio" placeholder="请输入车位比"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="户数(户)：" prop="roomNum">
            <p v-if="disabled">{{mainMsg.roomNum}}</p>
            <el-input v-else v-model="mainMsg.roomNum" type="number" min="0" placeholder="请输入总户数"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="容积率：">
            <p v-if="disabled">{{mainMsg.volumetricRate}}</p>
            <el-input v-else v-model="mainMsg.volumetricRate" placeholder="请输入容积率"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="总收费面积(平米)：">
            <p v-if="disabled">{{mainMsg.chargeArea}}㎡</p>
            <el-input v-else v-model="mainMsg.chargeArea" type="number" min="0" placeholder="请输入总收费面积"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="土地面积(平米)：">
            <p v-if="disabled">{{mainMsg.landArea}}㎡</p>
            <el-input v-else v-model="mainMsg.landArea" type="number" min="0" placeholder="请输入土地面积"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="总建筑面积(平米)：" prop="builtArea">
            <p v-if="disabled">{{mainMsg.builtArea}}㎡</p>
            <el-input v-else v-model="mainMsg.builtArea" type="number" min="0" placeholder="请输入总建筑面积"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="地面车位数量：">
            <p v-if="disabled">{{mainMsg.groundParkingNum}}</p>
            <el-input v-else v-model="mainMsg.groundParkingNum" type="number" min="0" placeholder="请输入地面车位数量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="地面车位收费标准：">
            <p v-if="disabled">{{mainMsg.groundParkingFee}}</p>
            <el-input v-else v-model="mainMsg.groundParkingFee" placeholder="请输入地面车位收费标准"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="地库车位数量：">
            <p v-if="disabled">{{mainMsg.basementParkingNum}}</p>
            <el-input v-else v-model="mainMsg.basementParkingNum" type="number" min="0" placeholder="请输入地库车位数量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="地库车位收费标准：">
            <p v-if="disabled">{{mainMsg.basementParkingFee}}</p>
            <el-input v-else v-model="mainMsg.basementParkingFee" placeholder="请输入地库车位收费标准"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="人防车位数量：">
            <p v-if="disabled">{{mainMsg.defenseParkingNum}}</p>
            <el-input v-else v-model="mainMsg.defenseParkingNum" type="number" min="0" placeholder="请输入人防车位数量"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="人防车位收费标准：">
            <p v-if="disabled">{{mainMsg.defenseParkingFee}}</p>
            <el-input v-else v-model="mainMsg.defenseParkingFee" placeholder="请输入人防车位收费收费标准"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="小区类型：" class="radio-sel" prop="communityType">
            <p v-if="disabled">{{mainMsg.communityType}}</p>
            <el-radio-group v-else v-model="mainMsg.communityType">
              <el-radio :label="'封闭式小区'">封闭式小区</el-radio>
              <el-radio :label="'开放式小区'">开放式小区</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="12">
          <el-form-item label="合约模式：" class="radio-sel">
            <p v-if="disabled">{{mainMsg.contractMode}}</p>
            <el-radio-group v-else v-model="mainMsg.contractMode" placeholder="请选择合约模式">
              <el-radio :label="'酬金制'">酬金制</el-radio>
              <el-radio :label="'包干制'">包干制</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="24">
          <el-form-item label="小区配套设施：" class="checkbox-sel community-facility" prop="facilityList">
            <p v-if="disabled">{{facilityWord}}</p>
            <el-checkbox-group v-else @change="facilityChange" v-model="mainMsg.facilityList">
              <el-checkbox :label="'公司'">公司</el-checkbox>
              <el-checkbox :label="'会所'">会所</el-checkbox>
              <el-checkbox :label="'球场'">球场</el-checkbox>
              <el-checkbox :label="'假山'">假山</el-checkbox>
              <el-checkbox :label="'泳池'">泳池</el-checkbox>
              <el-checkbox :label="'人工湖'">人工湖</el-checkbox>
            </el-checkbox-group                                                     >
          </el-form-item>
        </el-col>
      </el-row>
    </div>
    <div class="form-module">
      <h4 class="module-title">
        <p>项目设计要素信息</p>
      </h4>
      <el-row class="element-table clearfix" :gutter="40">
        <el-col :xs="24" :sm="24" :lg="12">
          <table class="element-fl basic-table" cellspacing="0">
            <tr>
              <td rowspan="3">车行出入</td>
              <td>外围车行口</td>
              <td>入口数量(个)</td>
              <td>
                <p v-if="disabled">{{carObj.a}}</p>
                <input v-else type="text" v-model="carObj.a" placeholder="请输入">
              </td>
              <td>出口数量(个)</td>
              <td>
                <p v-if="disabled">{{carObj.a1}}</p>
                <input v-else type="text" v-model="carObj.a1" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td>地库车行口</td>
              <td>入口数量(个)</td>
              <td>
                <p v-if="disabled">{{carObj.b}}</p>
                <input v-else type="text" v-model="carObj.b" placeholder="请输入">
              </td>
              <td>出口数量(个)</td>
              <td>
                <p v-if="disabled">{{carObj.b1}}</p>
                <input v-else type="text" v-model="carObj.b1" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td>园区车行口</td>
              <td>入口数量(个)</td>
              <td>
                <p v-if="disabled">{{carObj.c}}</p>
                <input v-else type="text" v-model="carObj.c" placeholder="请输入">
              </td>
              <td>出口数量(个)</td>
              <td>
                <p v-if="disabled">{{carObj.c1}}</p>
                <input v-else type="text" v-model="carObj.c1" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td rowspan="3">人行出入</td>
              <td>业务出入口</td>
              <td>入口数量(个)</td>
              <td>
                <p v-if="disabled">{{personObj.a}}</p>
                <input v-else type="text" v-model="personObj.a" placeholder="请输入">
              </td>
              <td>出口数量(个)</td>
              <td>
                <p v-if="disabled">{{personObj.a1}}</p>
                <input v-else type="text" v-model="personObj.a1" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td>访客出入口</td>
              <td>入口数量(个)</td>
              <td>
                <p v-if="disabled">{{personObj.b}}</p>
                <input v-else type="text" v-model="personObj.b" placeholder="请输入">
              </td>
              <td>出口数量(个)</td>
              <td>
                <p v-if="disabled">{{personObj.b1}}</p>
                <input v-else type="text" v-model="personObj.b1" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td>消防出入口</td>
              <td>入口数量(个)</td>
              <td>
                <p v-if="disabled">{{personObj.c}}</p>
                <input v-else type="text" v-model="personObj.c" placeholder="请输入">
              </td>
              <td>出口数量(个)</td>
              <td>
                <p v-if="disabled">{{personObj.c1}}</p>
                <input v-else type="text" v-model="personObj.c1" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td rowspan="2">电梯出入</td>
              <td>客梯</td>
              <td colspan="4">
                <p v-if="disabled">{{elevatorObj.a}}</p>
                <input v-else type="text" v-model="elevatorObj.a" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td>货梯</td>
              <td colspan="4">
                <p v-if="disabled">{{elevatorObj.b}}</p>
                <input v-else type="text" v-model="elevatorObj.b" placeholder="请输入">
              </td>
            </tr>
          </table>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <table class="element-fr basic-table" cellspacing="0">
            <tr>
              <td rowspan="5">机房信息</td>
              <td>电梯机房</td>
              <td>
                <p v-if="disabled">{{machineRoomObj.a}}</p>
                <input v-else type="text" v-model="machineRoomObj.a" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td>配电房</td>
              <td>
                <p v-if="disabled">{{machineRoomObj.a1}}</p>
                <input v-else type="text" v-model="machineRoomObj.a1" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td>水泵房</td>
              <td>
                <p v-if="disabled">{{machineRoomObj.b}}</p>
                <input v-else type="text" v-model="machineRoomObj.b" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td>空调机房</td>
              <td>
                <p v-if="disabled">{{machineRoomObj.b1}}</p>
                <input v-else type="text" v-model="machineRoomObj.b1" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td>暖通机房</td>
              <td>
                <p v-if="disabled">{{machineRoomObj.c}}</p>
                <input v-else type="text" v-model="machineRoomObj.c" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td colspan="2">监控中心</td>
              <td>
                <p v-if="disabled">{{otherObj.a}}</p>
                <input v-else type="text" v-model="otherObj.a" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td colspan="2">客户中心</td>
              <td>
                <p v-if="disabled">{{otherObj.b}}</p>
                <input v-else type="text" v-model="otherObj.b" placeholder="请输入">
              </td>
            </tr>
            <tr>
              <td colspan="2">会所</td>
              <td>
                <p v-if="disabled">{{otherObj.c}}</p>
                <input v-else type="text" v-model="otherObj.c" placeholder="请输入">
              </td>
            </tr>
          </table>
        </el-col>
      </el-row>
    </div>
    <div class="commont-btn" v-show="hasPerm('project:save') && !disabled">
      <el-button @click="add('mainMsg')" :loading="loading">保存</el-button>
      <el-button @click="reset">重置</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </el-form>
</div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import { isObjectValueEqual, outputmoney } from '@/utils'
import { cityList, regionList } from '@/utils/selectList'
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
          id: '',
          name: ''
        },
        address: '',
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
              this.mainMsg = res.data.data
              this.editInfo()
              this.temp = _.cloneDeep(this.mainMsg)
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
      this.mainMsg = _.cloneDeep(this.temp)
      if (this.action === 'add') {
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
      this.facilityWord = _.cloneDeep(this.mainMsg.facility)
      this.mainMsg.facilityList = this.mainMsg.facility.split('、')
      this.mainMsg.projectDesigns.forEach((item) => {
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
      var cityOption = this.mainMsg.oldCity.split('-')
      this.cityOption = []
      cityOption.forEach((item) => {
        this.cityOption.push(parseInt(item))
      })
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.mainMsg = _.cloneDeep(this.temp)
        this.editInfo()
        // this.temp=
      }
    },
    getInsertData() {
      cityList().then((data) => {
        this.cityList = data
      })
      regionList().then((data) => {
        this.regionList = data
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
        this.mainMsg = this.editData.editData.project
        this.editInfo()
      }
      this.temp = _.cloneDeep(this.mainMsg)
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
    },
    // 客户搜索
    clientSearchAsync(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/clientName?clientName=' + queryString).then((res) => {
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
    clientSelect(item) {
      this.mainMsg.client = item
    }
  },
  computed: {
    ...mapGetters([
      'userName'
    ])
  },
  watch: {
    disabled (status) {
      if (status === false) {
        this.editWord = '取消编辑'
        this.$emit('changeObj', true)
      } else {
        this.editWord = '编辑'
      }
    },
    mainMsg: {
      handler(obj) {
        if (isObjectValueEqual(obj, this.temp)) {
          this.$emit('changeObj', false)
        } else {
          this.$emit('changeObj', true)
        }
        if (obj.client.name === '') {
          obj.client.id = ''
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
