<template>
<!-- 社区建设单项目信息表 -->
<div class="form-container smartCommunity-add" ref="ele">
  <div class='project-msg basic-info form-module'>
    <h4 class="module-title">
      <p>项目基础信息</p>
    </h4>
    <el-row :gutter="40" class="select-row">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="basic-item customer-info">
          <label>客户信息：</label>
          <el-select v-model="mainMsg.client.id" placeholder="请选择">
           <el-option v-for="item in clientList" :label="item.name" :value="item.id" :key="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>区域：</label>
          <el-select v-model="mainMsg.region.id" placeholder="请选择">
           <el-option v-for="item in regionList" :key="item.id" :label="item.name" :value="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>城市：</label>
          <el-cascader :options="cityList" :show-all-levels="false" v-model="cityOption" @change="cityChange"></el-cascader>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>项目名称：</label>
          <input type="text" v-model="mainMsg.name" placeholder="请输入">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>楼道及单位数量：</label>
          <input type="text" v-model="mainMsg.buildNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>项目地址：</label>
          <input type="text" v-model="mainMsg.address">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item single-date">
          <label>首期入伙时间：</label>
          <!-- <input type="text" v-model="mainMsg.firstEntry"> -->
          <el-date-picker v-model="mainMsg.firstEntry" type="date" placeholder="选择日期" default-value="defaultDate"></el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>建筑业态：</label>
          <input type="text" v-model="mainMsg.archFormat">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>物业管理费：</label>
          <input type="text" v-model="mainMsg.manageFee">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>车位总数：</label>
          <input type="text" v-model="mainMsg.parkingNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>车位比：</label>
          <input type="text" v-model="mainMsg.carRatio">
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>户数(户)：</label>
          <input type="text" v-model="mainMsg.roomNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>容积率：</label>
          <input type="text" v-model="mainMsg.volumetricRate">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>地面车位数量：</label>
          <input type="text" v-model="mainMsg.groundParkingNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>地面车位收费标准：</label>
          <input type="text" v-model="mainMsg.groundParkingFee">
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>总户数(户)：</label>
          <input type="text" v-model="mainMsg.roomNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>总收费面积(平米)：</label>
          <input type="text" v-model="mainMsg.chargeArea">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>地库车位数量：</label>
          <input type="text" v-model="mainMsg.basementParkingNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>地库车位收费标准：</label>
          <input type="text" v-model="mainMsg.basementParkingFee">
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>土地面积(平米)：</label>
          <input type="text" v-model="mainMsg.landArea">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>总建筑面积(平米)：</label>
          <input type="text" v-model="mainMsg.builtArea">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>人防车位数量：</label>
          <input type="text" v-model="mainMsg.defenseParkingNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>人防车位收费标准：</label>
          <input type="text" v-model="mainMsg.defenseParkingFee">
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="10">
        <div class="basic-item radio-sel">
          <label>小区类型：</label>
          <el-radio-group v-model="mainMsg.communityType">
            <el-radio :label="'0'">封闭式小区</el-radio>
            <el-radio :label="'1'">开放式小区</el-radio>
          </el-radio-group>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="8">
        <div class="basic-item radio-sel">
          <label>合约模式：</label>
          <el-radio-group v-model="mainMsg.contractMode">
            <el-radio :label="'0'">酬金制</el-radio>
            <el-radio :label="'1'">包干制</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="basic-item radio-sel">
          <label>小区配套设施：</label>
          <el-radio-group v-model="mainMsg.facility">
            <el-radio :label="'0'">公司</el-radio>
            <el-radio :label="'1'">会所</el-radio>
            <el-radio :label="'2'">球场</el-radio>
            <el-radio :label="'3'">假山</el-radio>
            <el-radio :label="'4'">泳池</el-radio>
            <el-radio :label="'5'">人工湖</el-radio>
          </el-radio-group>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="project-msg form-module">
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
            <td><input type="text" v-model="carObj.a"></td>
            <td>出口数量(个)</td>
            <td><input type="text" v-model="carObj.a1"></td>
          </tr>
          <tr>
            <td>地库车行口</td>
            <td>入口数量(个)</td>
            <td><input type="text" v-model="carObj.b"></td>
            <td>出口数量(个)</td>
            <td><input type="text" v-model="carObj.b1"></td>
          </tr>
          <tr>
            <td>园区车行口</td>
            <td>入口数量(个)</td>
            <td><input type="text" v-model="carObj.c"></td>
            <td>出口数量(个)</td>
            <td><input type="text" v-model="carObj.c1"></td>
          </tr>
          <tr>
            <td rowspan="3">人行出入</td>
            <td>业务出入口</td>
            <td>入口数量(个)</td>
            <td><input type="text" v-model="personObj.a"></td>
            <td>出口数量(个)</td>
            <td><input type="text" v-model="personObj.a1"></td>
          </tr>
          <tr>
            <td>访客出入口</td>
            <td>入口数量(个)</td>
            <td><input type="text" v-model="personObj.b"></td>
            <td>出口数量(个)</td>
            <td><input type="text" v-model="personObj.b1"></td>
          </tr>
          <tr>
            <td>消防出入口</td>
            <td>入口数量(个)</td>
            <td><input type="text" v-model="personObj.c"></td>
            <td>出口数量(个)</td>
            <td><input type="text" v-model="personObj.c1"></td>
          </tr>
          <tr>
            <td rowspan="2">电梯出入</td>
            <td>客梯</td>
            <td colspan="4"><input type="text" v-model="elevatorObj.a"></td>
          </tr>
          <tr>
            <td>货梯</td>
            <td colspan="4"><input type="text" v-model="elevatorObj.b"></td>
          </tr>
        </table>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <table class="element-fr basic-table" cellspacing="0">
          <tr>
            <td rowspan="5">机房信息</td>
            <td>电梯机房</td>
            <td><input type="text" v-model="machineRoomObj.a"></td>
          </tr>
          <tr>
            <td>配电房</td>
            <td><input type="text" v-model="machineRoomObj.a1"></td>
          </tr>
          <tr>
            <td>水泵房</td>
            <td><input type="text" v-model="machineRoomObj.b"></td>
          </tr>
          <tr>
            <td>空调机房</td>
            <td><input type="text" v-model="machineRoomObj.b1"></td>
          </tr>
          <tr>
            <td>暖通机房</td>
            <td><input type="text" v-model="machineRoomObj.c"></td>
          </tr>
          <tr>
            <td colspan="2">监控中心</td>
            <td><input type="text" v-model="otherObj.a"></td>
          </tr>
          <tr>
            <td colspan="2">客户中心</td>
            <td><input type="text" v-model="otherObj.b"></td>
          </tr>
          <tr>
            <td colspan="2">会所</td>
            <td><input type="text" v-model="otherObj.c"></td>
          </tr>
        </table>
      </el-col>
    </el-row>
  </div>
  <el-button  @click="add" :loading="loading">提交</el-button>
</div>
</template>

<script>
import { winHeight, parseTime } from '@/utils'
export default {
  name: 'smartCommunityAdd',
  props: ['editData'],
  data() {
    return {
      loading: false,
      tab: 'car',
      defaultDate: '2018-01-17',
      cityOption: [0, 1, 3],
      regionList: [
        {
          id: 1,
          name: '华南办事处',
          code: 'hn'
        },
        {
          id: 2,
          name: '西部办事处',
          code: 'xb'
        }
      ],
      clientList: [
        {
          id: 1,
          name: '中海物业',
          category: '1',
          nature: '1',
          type: '2',
          person: '1',
          phone: '1',
          position: '12',
          qq: '32',
          email: '1',
          projectNum: '32'
        }
      ],
      cityList: [],
      mainMsg: {
        city: { id: 3 },
        client: { id: 1 },
        region: { id: 1 },
        address: '项目地址',
        archFormat: '建筑业态',
        basementParkingFee: '地库车位收费标准',
        basementParkingNum: '地库车位数量',
        buildNum: '楼栋及单元数量',
        builtArea: '总建筑面积',
        carRatio: '车位比',
        chargeArea: '总收费面积',
        communityType: '0',
        contractMode: '0',
        facility: '0',
        defenseParkingFee: '人防车位收费标准',
        defenseParkingNum: '人防车位数量',
        firstEntry: '2018-01-17',
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
    this.getInsertData()
    console.log('editData', this.editData)
    this.editTab()
  },
  mounted() {
    this.$refs.ele.style.height = winHeight() - 180 + 'px'
    window.addEventListener('resize', () => {
      this.$refs.ele.style.height = winHeight() - 180 + 'px'
    })
  },
  methods: {
    add() {
      this.mainMsg.projectDesigns = [this.carObj, this.personObj, this.elevatorObj, this.machineRoomObj, this.otherObj]
      this.mainMsg.oldCity = this.cityOption.join('-')
      this.mainMsg.firstEntry = parseTime(this.mainMsg.firstEntry, '{y}-{m}-{d}')
      console.log('mainMsg', this.mainMsg)
      this.$post('/project/save', this.mainMsg).then((res) => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      })
    },
    editTab() {
      if (this.editData.tabState === 'editTab') {
        var data = this.editData.editData
        this.mainMsg = data.project
        data.project.projectDesigns.forEach((item) => {
          if (item.category === '车行出入') {
            this.carObj = item
            this.carObj.category = 0
          } else if (item.category === '人行出入') {
            this.personObj = item
            this.personObj.category = 1
          } else if (item.category === '电梯出入') {
            this.elevatorObj = item
            this.elevatorObj.category = 2
          } else if (item.category === '机房信息') {
            this.machineRoomObj = item
            this.machineRoomObj.category = 3
          } else if (item.category === '其他信息') {
            this.otherObj = item
            this.otherObj.category = 4
          }
        })
        var cityOption = data.project.oldCity.split('-')
        this.cityOption = []
        cityOption.forEach((item) => {
          this.cityOption.push(parseInt(item))
        })
      }
    },
    toggleTab(tab) {
      this.tab = tab
    },
    getInsertData() {
      this.$get('/project/findInsertData').then((res) => {
        console.log('res', res)
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
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.form-container {
  @include noScroll;
  overflow-y: scroll;
}
// 社区建设单项目信息表
.form-container {
  .basic-info {
    .el-row {
      .customer-info {
        label {
          width: 12%!important;
        }
      }
      .radio-sel {
        @include flex;
        font-size: 14px;
        label {
          width: 26%;
          max-width: 100px;
          line-height: 30px;
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
<style  rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.smartCommunity-add {
  .select-row {
    .basic-item {
      .el-select,
      .el-cascader{
        width: 62%;
        input {
          width: 100%;
          height: 34px;
          border: 1px solid #828282;
          @include borderRadius(4px);
        }
      }
    }
    .basic-item.customer-info {
      .el-select {
          width: 83%;
      }
    }
  }
}
</style>
