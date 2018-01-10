<template>
<!-- 社区建设单项目信息表 -->
<div class="form-container smartCommunity-add" ref="ele">
  <div class='project-msg basic-info'>
    <h4>
      <p>项目基础信息</p>
    </h4>
    <el-row :gutter="40" class="select-row">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="basic-item customer-info">
          <label>客户信息:</label>
          <el-select v-model="mainMsg.client.id" placeholder="请选择">
           <el-option v-for="item in clientList" :label="item.name" :value="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>区域:</label>
          <el-select v-model="mainMsg.region.id" placeholder="请选择">
           <el-option
             v-for="item in regionList"
             :key="item.id"
             :label="item.name"
             :value="item.id">
           </el-option>
         </el-select>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>城市:</label>
          <!-- <input type="text" v-model="mainMsg.city"> -->
          <el-cascader :options="cityList" :show-all-levels="false"></el-cascader>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>项目名称:</label>
          <input type="text" v-model="mainMsg.name" placeholder="请输入">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>楼道及单位数量:</label>
          <input type="text" v-model="mainMsg.buildNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>项目地址:</label>
          <input type="text" v-model="mainMsg.address">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>首期入伙时间:</label>
          <input type="text" v-model="mainMsg.firstEntry">
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>建筑业态:</label>
          <input type="text" v-model="mainMsg.archFormat">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>物业管理费:</label>
          <input type="text" v-model="mainMsg.manageFee">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>车位总数:</label>
          <input type="text" v-model="mainMsg.parkingNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>车位比:</label>
          <input type="text" v-model="mainMsg.carRatio">
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>户数(户):</label>
          <input type="text" v-model="mainMsg.roomNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>容积率:</label>
          <input type="text" v-model="mainMsg.volumetricRate">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>地面车位数量:</label>
          <input type="text" v-model="mainMsg.groundParkingNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>地面车位收费标准:</label>
          <input type="text" v-model="mainMsg.groundParkingFee">
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>总户数(户):</label>
          <input type="text" v-model="mainMsg.roomNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>总收费面积(平米):</label>
          <input type="text" v-model="mainMsg.chargeArea">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>地库车位数量:</label>
          <input type="text" v-model="mainMsg.basementParkingNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>地库车位收费标准:</label>
          <input type="text" v-model="mainMsg.basementParkingFee">
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>土地面积(平米):</label>
          <input type="text" v-model="mainMsg.landArea">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>总建筑面积(平米):</label>
          <input type="text" v-model="mainMsg.builtArea">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>人防车位数量:</label>
          <input type="text" v-model="mainMsg.defenseParkingNum">
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item">
          <label>人防车位收费标准:</label>
          <input type="text" v-model="mainMsg.defenseParkingFee">
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="12" :sm="12" :lg="10">
        <div class="basic-item radio-sel">
          <label>小区类型:</label>
          <ul>
            <li><input type="radio" name="type" label="closeType"><span>封闭式小区</span></li>
            <li><input type="radio" name="type" label="openType"><span>开放式小区</span></li>
          </ul>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6">
        <div class="basic-item radio-sel">
          <label>合约模式:</label>
          <ul>
            <li><input type="radio" name="model" label="Remuneration"><span>酬金制</span></li>
            <li><input type="radio" name="model" label="Contract"><span>包干制</span></li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="basic-item radio-sel">
          <label>小区配套设施:</label>
          <ul>
            <li><input type="radio" name="facilities" label="company"><span>公司</span></li>
            <li><input type="radio" name="facilities" label="club"><span>会所</span></li>
            <li><input type="radio" name="facilities" label="court"><span>球场</span></li>
            <li><input type="radio" name="facilities" label="rockery"><span>假山</span></li>
            <li><input type="radio" name="facilities" label="pool"><span>泳池</span></li>
            <li><input type="radio" name="facilities" label="lake"><span>人工湖</span></li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="project-msg">
    <h4>
      <p>项目设计要素信息</p>
    </h4>
    <el-row class="element-table clearfix" :gutter="40">
      <el-col :xs="24" :sm="24" :lg="12">
        <table class="element-fl" cellspacing="0">
          <tr>
            <td rowspan="3">车行出入</td>
            <td>外围车行口</td>
            <td>入口数量(个)</td>
            <td><input type="text" v-model="carObj.a"></td>
            <td>出口数量(个)</td>
            <td><input type="text" v-model="carObj.b"></td>
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
            <td><input type="text" v-model="personObj.a"></td>
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
        <table class="element-fr" cellspacing="0">
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
  <div class="con-search-btn" @click="add" :loading="loading">提交</div>
</div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  name: 'smartCommunityAdd',
  data() {
    return {
      loading: true,
      tab: 'car',
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
      cityList: [
        {
          id: 1,
          label: '中国',
          value: 'zg',
          children: [{
            id: '',
            value: 'shejiyuanze',
            label: '设计原则',
            children: [
              {
                value: 'yizhi',
                label: '一致'
              },
              {
                value: 'yizhi',
                label: '一致'
              }
            ]
          }]
        }
      ],
      mainMsg: {
        city: {},
        region: {},
        client: {},
        address: '项目地址',
        archFormat: '建筑业态',
        basementParkingFee: '地库车位收费标准',
        basementParkingNum: '地库车位数量',
        buildNum: '楼栋及单元数量',
        builtArea: '总建筑面积',
        carRatio: '车位比',
        chargeArea: '总收费面积',
        communityType: '小区类型',
        contractMode: '合约模式',
        defenseParkingFee: '人防车位收费标准',
        defenseParkingNum: '人防车位数量',
        facility: '小区配套',
        firstEntry: '首期入伙时间',
        groundParkingFee: '地面车位收费标准',
        groundParkingNum: '地面车位数量',
        landArea: '土地面积',
        manageFee: '物业管理费',
        name: '项目名称',
        parkingNum: '车位总数',
        roomNum: '总户数',
        volumetricRate: '容积率',
        projectDesigns: []
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
        c1: '6',
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
    this.mainMsg.projectDesigns = []
  },
  mounted() {
    this.$refs.ele.style.height = winHeight() - 180 + 'px'
    window.addEventListener('resize', () => {
      this.$refs.ele.style.height = winHeight() - 180 + 'px'
    })
  },
  methods: {
    add() {
      this.mainMsg.projectDesigns.push(this.carObj, this.personObj, this.elevatorObj, this.machineRoomObj, this.otherObj)
      this.mainMsg.city.id = 1
      this.$emit('add', this.mainMsg)
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
    }
  },
  computed: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.form-container {
  color: #000;
  border: 1px solid #d2d2d2;
  margin: 16px 0;
  padding: 0 20px;
  @include borderRadius(4px);
  @include noScroll;
  @include boxSizing;
  overflow-y: scroll;
  h4 {
    height: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #d2d2d2;
    p {
      border-left: 5px solid #35d5ba;
      padding-left: 15px;
    }
  }
}
// 社区建设单项目信息表
.form-container {
  .basic-info {
    .el-row {
      .basic-item {
        margin-top: 20px;
        label {
          display: inline-block;
          color: #000;
          width: 30%;
          line-height: 16px;
          word-wrap: wrap;
          margin-right: 2%;
          font-size: 14px;
        }
        input {
          width: 62%;
          height: 32px;
          border: 1px solid #828282;
          @include borderRadius(4px);
          text-indent: 12px;
        }
      }
      .customer-info {
        label {
          width: 13%;
        }
        input {
          width: 82%;
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
        ul {
          @include flex;
          justify-content: space-around;
          width: 62%;
          height: 30px;
          background-color: #f8f8f8;
          @include borderRadius(4px);
          li {
            height: 30px;
            line-height: 30px;
            // margin-right: 30px;
            input {
              display: inline-block;
              vertical-align: center;
              width: auto;
              height: auto;
              margin-right: 4px;
            }
            span {
              display: inline-block;
              vertical-align: center;
            }
          }
        }
      }
    }
  }
  .element-table {
    table {
      width: 100%;
      margin-top: 20px;
      margin-right: 40px;
      border-left: 1px solid #828282;
      border-bottom: 1px solid #828282;
      tr {
        td {
          width: 110px;
          height: 28px;
          text-align: center;
          font-size: 14px;
          border-top: 1px solid #828282;
          border-right: 1px solid #828282;
          input {
            display: inline-block;
            width: 80%;
            height: 26px;
            line-height: 26px;
            text-align: center;
          }
        }
      }
    }
    .element-fr {
      tr {
        td {
          width: 217px;
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
      @include flex;
      label {
        display: inline-block;
        color: #000;
        width: 30%;
        line-height: 34px!important;
        word-wrap: wrap;
        margin-right: 2%;
        font-size: 14px;
      }
      .el-select {
          width: 64%;
      }
      .el-cascader{
        width: 64%;
      }
      input {
        width: 100%;
        height: 34px;
        border: 1px solid #828282;
        @include borderRadius(4px);
        text-indent: 12px;
      }
    }
    .basic-item.customer-info {
      label {
        width: 14%!important;
      }
      .el-select {
          width: 82%;
      }
    }
  }
}
</style>
