<template>
<!-- 社区建设单项目信息表 -->
<div class="form-container smartCommunity-add" ref="ele">
  <div class="commont-btn edit-btn" v-show="editShow">
    <el-button @click="toggleEditBtn">{{editWord}}</el-button>
  </div>
  <el-form :model="mainMsg" :rules="rules" ref="mainMsg">
    <div class="form-module">
      <h4 class="module-title">
        <p>项目基础信息</p>
      </h4>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="客户信息：" prop="client.id">
            <p v-if="disabled">{{mainMsg.client.name}}</p>
            <el-select v-else v-model="mainMsg.client.id" placeholder="请选择">
              <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="区域：" prop="region.id">
            <p v-if="disabled">{{mainMsg.client.name}}</p>
            <el-select v-else v-model="mainMsg.region.id" placeholder="请选择">
              <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="城市：">
            <p v-if="disabled">{{mainMsg.city.name}}</p>
            <el-cascader v-else :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange"></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="项目名称：">
            <p v-if="disabled">{{mainMsg.name}}</p>
            <el-input v-else v-model="mainMsg.name" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="楼道及单位数量：">
            <p v-if="disabled">{{mainMsg.buildNum}}</p>
            <el-input v-else v-model="mainMsg.buildNum" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="项目地址：">
            <p v-if="disabled">{{mainMsg.address}}</p>
            <el-input v-else v-model="mainMsg.address" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="首期入伙时间：" class="single-date">
            <p v-if="disabled">{{mainMsg.firstEntry}}</p>
            <el-date-picker  v-else type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="mainMsg.firstEntry" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="建筑业态：">
            <p v-if="disabled">{{mainMsg.archFormat}}</p>
            <el-input v-else v-model="mainMsg.archFormat" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="物业管理费：">
            <p v-if="disabled">{{mainMsg.manageFee}}</p>
            <el-input v-else v-model="mainMsg.manageFee" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="车位总数：">
            <p v-if="disabled">{{mainMsg.parkingNum}}</p>
            <el-input v-else v-model="mainMsg.parkingNum" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="车位比：">
            <p v-if="disabled">{{mainMsg.carRatio}}</p>
            <el-input v-else v-model="mainMsg.carRatio" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="户数(户)：">
            <p v-if="disabled">{{mainMsg.roomNum}}</p>
            <el-input v-else v-model="mainMsg.roomNum" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="容积率：">
            <p v-if="disabled">{{mainMsg.volumetricRate}}</p>
            <el-input v-else v-model="mainMsg.volumetricRate" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="地面车位数量：">
            <p v-if="disabled">{{mainMsg.groundParkingNum}}</p>
            <el-input v-else v-model="mainMsg.groundParkingNum" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="地面车位收费标准：">
            <p v-if="disabled">{{mainMsg.groundParkingFee}}</p>
            <el-input v-else v-model="mainMsg.groundParkingFee" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="总收费面积(平米)：">
            <p v-if="disabled">{{mainMsg.chargeArea}}</p>
            <el-input v-else v-model="mainMsg.chargeArea" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="地库车位数量：">
            <p v-if="disabled">{{mainMsg.basementParkingNum}}</p>
            <el-input v-else v-model="mainMsg.basementParkingNum" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="地库车位收费标准：">
            <p v-if="disabled">{{mainMsg.basementParkingFee}}</p>
            <el-input v-else v-model="mainMsg.basementParkingFee" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="土地面积(平米)：">
            <p v-if="disabled">{{mainMsg.landArea}}</p>
            <el-input v-else v-model="mainMsg.landArea" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="总建筑面积(平米)：">
            <p v-if="disabled">{{mainMsg.builtArea}}</p>
            <el-input v-else v-model="mainMsg.builtArea" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="人防车位数量：">
            <p v-if="disabled">{{mainMsg.defenseParkingNum}}</p>
            <el-input v-else v-model="mainMsg.defenseParkingNum" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="8" :lg="8">
          <el-form-item label="人防车位收费标准：">
            <p v-if="disabled">{{mainMsg.defenseParkingFee}}</p>
            <el-input v-else v-model="mainMsg.defenseParkingFee" placeholder="请输入您的账号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="小区类型：" class="radio-sel">
            <p v-if="disabled">{{mainMsg.communityType}}</p>
            <el-radio-group v-else v-model="mainMsg.communityType">
              <el-radio :label="'封闭式小区'">封闭式小区</el-radio>
              <el-radio :label="'开放式小区'">开放式小区</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="8">
          <el-form-item label="合约模式：" class="radio-sel">
            <p v-if="disabled">{{mainMsg.contractMode}}</p>
            <el-radio-group v-else v-model="mainMsg.contractMode">
              <el-radio :label="'酬金制'">酬金制</el-radio>
              <el-radio :label="'包干制'">包干制</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="16">
          <el-form-item label="小区配套设施：" class="radio-sel community-facility">
            <p v-if="disabled">{{mainMsg.facility}}</p>
            <el-radio-group v-else v-model="mainMsg.facility">
              <el-radio :label="'公司'">公司</el-radio>
              <el-radio :label="'会所'">会所</el-radio>
              <el-radio :label="'球场'">球场</el-radio>
              <el-radio :label="'假山'">假山</el-radio>
              <el-radio :label="'泳池'">泳池</el-radio>
              <el-radio :label="'人工湖'">人工湖</el-radio>
            </el-radio-group>
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
                <input v-else type="text" v-model="carObj.a">
              </td>
              <td>出口数量(个)</td>
              <td>
                <p v-if="disabled">{{carObj.a1}}</p>
                <input v-else type="text" v-model="carObj.a1">
              </td>
            </tr>
            <tr>
              <td>地库车行口</td>
              <td>入口数量(个)</td>
              <td>
                <p v-if="disabled">{{carObj.b}}</p>
                <input v-else type="text" v-model="carObj.b">
              </td>
              <td>出口数量(个)</td>
              <td>
                <p v-if="disabled">{{carObj.b1}}</p>
                <input v-else type="text" v-model="carObj.b1">
              </td>
            </tr>
            <tr>
              <td>园区车行口</td>
              <td>入口数量(个)</td>
              <td>
                <p v-if="disabled">{{carObj.c}}</p>
                <input v-else type="text" v-model="carObj.c">
              </td>
              <td>出口数量(个)</td>
              <td>
                <p v-if="disabled">{{carObj.c1}}</p>
                <input v-else type="text" v-model="carObj.c1">
              </td>
            </tr>
            <tr>
              <td rowspan="3">人行出入</td>
              <td>业务出入口</td>
              <td>入口数量(个)</td>
              <td>
                <p v-if="disabled">{{personObj.a}}</p>
                <input v-else type="text" v-model="personObj.a">
              </td>
              <td>出口数量(个)</td>
              <td>
                <p v-if="disabled">{{personObj.a1}}</p>
                <input v-else type="text" v-model="personObj.a1">
              </td>
            </tr>
            <tr>
              <td>访客出入口</td>
              <td>入口数量(个)</td>
              <td>
                <p v-if="disabled">{{personObj.b}}</p>
                <input v-else type="text" v-model="personObj.b">
              </td>
              <td>出口数量(个)</td>
              <td>
                <p v-if="disabled">{{personObj.b1}}</p>
                <input v-else type="text" v-model="personObj.b1">
              </td>
            </tr>
            <tr>
              <td>消防出入口</td>
              <td>入口数量(个)</td>
              <td>
                <p v-if="disabled">{{personObj.c}}</p>
                <input v-else type="text" v-model="personObj.c">
              </td>
              <td>出口数量(个)</td>
              <td>
                <p v-if="disabled">{{personObj.c1}}</p>
                <input v-else type="text" v-model="personObj.c1">
              </td>
            </tr>
            <tr>
              <td rowspan="2">电梯出入</td>
              <td>客梯</td>
              <td colspan="4">
                <p v-if="disabled">{{elevatorObj.a}}</p>
                <input v-else type="text" v-model="elevatorObj.a">
              </td>
            </tr>
            <tr>
              <td>货梯</td>
              <td colspan="4">
                <p v-if="disabled">{{elevatorObj.b}}</p>
                <input v-else type="text" v-model="elevatorObj.b">
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
                <input v-else type="text" v-model="machineRoomObj.a">
              </td>
            </tr>
            <tr>
              <td>配电房</td>
              <td>
                <p v-if="disabled">{{machineRoomObj.a1}}</p>
                <input v-else type="text" v-model="machineRoomObj.a1">
              </td>
            </tr>
            <tr>
              <td>水泵房</td>
              <td>
                <p v-if="disabled">{{machineRoomObj.b}}</p>
                <input v-else type="text" v-model="machineRoomObj.b">
              </td>
            </tr>
            <tr>
              <td>空调机房</td>
              <td>
                <p v-if="disabled">{{machineRoomObj.b1}}</p>
                <input v-else type="text" v-model="machineRoomObj.b1">
              </td>
            </tr>
            <tr>
              <td>暖通机房</td>
              <td>
                <p v-if="disabled">{{machineRoomObj.c}}</p>
                <input v-else type="text" v-model="machineRoomObj.c">
              </td>
            </tr>
            <tr>
              <td colspan="2">监控中心</td>
              <td>
                <p v-if="disabled">{{otherObj.a}}</p>
                <input v-else type="text" v-model="otherObj.a">
              </td>
            </tr>
            <tr>
              <td colspan="2">客户中心</td>
              <td>
                <p v-if="disabled">{{otherObj.b}}</p>
                <input v-else type="text" v-model="otherObj.b">
              </td>
            </tr>
            <tr>
              <td colspan="2">会所</td>
              <td>
                <p v-if="disabled">{{otherObj.c}}</p>
                <input v-else type="text" v-model="otherObj.c">
              </td>
            </tr>
          </table>
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
export default {
  name: 'smartCommunityAdd',
  props: ['editData'],
  data() {
    return {
      action: 'add',
      editWord: '编辑',
      loading: false,
      disabled: false,
      editShow: false,
      rules: {},
      tab: 'car',
      cityOption: [0, 1, 3],
      regionList: [],
      clientList: [],
      cityList: [],
      defaultMsg: {},
      mainMsg: {
        city: {
          id: 3
        },
        client: {
          id: 1
        },
        region: {
          id: 1
        },
        address: '项目地址',
        archFormat: '建筑业态',
        basementParkingFee: '地库车位收费标准',
        basementParkingNum: '地库车位数量',
        buildNum: '楼栋及单元数量',
        builtArea: '总建筑面积',
        carRatio: '车位比',
        chargeArea: '总收费面积',
        communityType: '',
        contractMode: '',
        facility: '',
        defenseParkingFee: '人防车位收费标准',
        defenseParkingNum: '人防车位数量',
        firstEntry: '',
        groundParkingFee: '地面车位收费标准',
        groundParkingNum: '地面车位数量',
        landArea: '土地面积',
        manageFee: '物业管理费',
        name: '项目名称',
        parkingNum: '车位总数',
        roomNum: '总户数',
        volumetricRate: '容积率',
        projectDesigns: [],
        oldCity: ''
      },
      carObj: {
        a: '1',
        a1: '2',
        b: '3',
        b1: '4',
        c: '5',
        c1: '6',
        category: 0
      },
      personObj: {
        a: '1',
        a1: '2',
        b: '3',
        b1: '4',
        c: '5',
        c1: '6',
        category: 1
      },
      elevatorObj: {
        a: '1',
        b: '3',
        category: 2
      },
      machineRoomObj: {
        a: '1',
        a1: '2',
        b: '3',
        b1: '4',
        c: '5',
        category: 3
      },
      otherObj: {
        a: '1',
        b: '1',
        c: '1',
        category: 4
      }
    }
  },
  created() {
    this.mainMsg.firstEntry = new Date()
    this.getInsertData()
    if (this.editData.tabState === 'seeTab') {
      this.action = 'edit'
      this.editInfo()
      this.editShow = true
      this.disabled = true
    } else {
      this.action = 'add'
    }
  },
  mounted() {},
  methods: {
    add() {
      this.loading = true
      this.mainMsg.projectDesigns = [this.carObj, this.personObj, this.elevatorObj, this.machineRoomObj, this.otherObj]
      this.mainMsg.oldCity = this.cityOption.join('-')
      console.log(this.mainMsg)
      this.$post('/project/save', this.mainMsg).then((res) => {
        this.loading = false
        if (res.data.success === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          if (this.action === 'edit') {
            this.$emit('toggleTab')
          }
        }
      })
    },
    reset() {
      if (this.action === 'add') {
        this.mainMsg = {
          city: { id: 3 },
          client: { id: 1 },
          region: { id: 1 },
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
          facility: '',
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
        this.carObj = {
          a: '',
          a1: '',
          b: '',
          b1: '',
          c: '',
          c1: '',
          category: 0
        },
        this.personObj = {
          a: '',
          a1: '',
          b: '',
          b1: '',
          c: '',
          c1: '',
          category: 1
        },
        this.elevatorObj = {
          a: '',
          b: '',
          category: 2
        },
        this.machineRoomObj = {
          a: '',
          a1: '',
          b: '',
          b1: '',
          c: '',
          category: 3
        },
        this.otherObj = {
          a: '',
          b: '',
          c: '',
          category: 4
        }
        // this.carObj = {}
        // this.personObj = {}
        // this.elevatorObj = {}
        // this.machineRoomObj = {}
        // this.otherObj = {}
      } else {
        this.editInfo()
      }
    },
    cancel() {
      this.$emit('toggleTab')
    },
    editInfo() {
      var data = this.editData.editData
      this.mainMsg = _.cloneDeep(data.project)
      console.log('mainMsg', this.mainMsg)
      data.project.projectDesigns.forEach((item) => {
        if (item.category === '0') {
          this.carObj = _.cloneDeep(item)
        } else if (item.category === '1') {
          this.personObj = _.cloneDeep(item)
        } else if (item.category === '2') {
          this.elevatorObj = _.cloneDeep(item)
        } else if (item.category === '3') {
          this.machineRoomObj = _.cloneDeep(item)
        } else if (item.category === '4') {
          this.otherObj = _.cloneDeep(item)
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
        this.editWord = "编辑"
        this.editInfo()
      } else {
        this.editWord = "取消编辑"
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
    cityChange(val) {
      console.log('val', val)
      var len = val.length
      this.mainMsg.city.id = val[len - 1]
    }
  },
  computed: {}
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
        .el-form-item.radio-sel {
            @include flex;
            font-size: 14px;
            label.el-form-item__label {
                width: 20%!important;
                // max-width: 100px;
                // line-height: 30px;
            }
            .el-radio-group {
                @include flex;
                justify-content: space-around;
                width: 62%;
                height: 30px;
                background-color: #f8f8f8;
                @include borderRadius(4px);
            }
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
      width: 34%!important;
      line-height: 30px;
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
      width: 16%!important;
      line-height: 30px;
    }
  }
  .element-table {
    margin-top: 20px;
  }
}
</style>
