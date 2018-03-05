<template>
  <div class="payment-contract-add">
    <div class="inner-tab-toggle">
      <ul>
        <li :class="actionTab === 'inboundInfo' ? 'is-active' : ''" @click="toggleTab('inboundInfo')">入库填写</li>
        <li :class="actionTab === 'officeCheck' ? 'is-active' : ''" @click="toggleTab('officeCheck')">办事处审核</li>
        <li :class="actionTab === 'costCheck' ? 'is-active' : ''" @click="toggleTab('costCheck')">成本部审核</li>
      </ul>
    </div>
    <div class="form-container">
      <div class="commont-btn edit-btn" v-show="editShow">
        <el-button @click="toggleEditBtn">{{editWord}}</el-button>
      </div>
      <el-form :model="outboundInfo" :rules="rules" ref="outboundInfo">
        <div class="form-module">
          <h4 class="module-title">
            <p>出库信息:</p>
          </h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="合同编号:">
                <p v-if="disabled">{{outboundInfo.contractInfo.name}}</p>
                <el-select v-else v-model="outboundInfo.contractInfo.id" placeholder="请选择" filterable>
                 <el-option v-for="item in contractList" :label="item.name" :value="item.id" :key="item.id">
                 </el-option>
               </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="办事处:">
                <p v-if="disabled">{{outboundInfo.region.name}}</p>
                <el-select v-else v-model="outboundInfo.region.id" placeholder="请选择" filterable>
                 <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
                 </el-option>
               </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="采购计划单号:" class="single-date">
                <p v-if="disabled">{{outboundInfo.applicationTime}}</p>
                <el-input v-else v-model="outboundInfo.applicationPerson" placeholder="请输入您的账号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="项目:">
                <p v-if="disabled">{{outboundInfo.project.name}}</p>
                <el-select v-else v-model="outboundInfo.project.id" placeholder="请选择" filterable>
                 <el-option v-for="item in projectList" :label="item.name" :value="item.id" :key="item.id">
                 </el-option>
               </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="出库单编号:">
                <p v-if="disabled">{{outboundInfo.code}}</p>
                <el-input v-else v-model="outboundInfo.code" placeholder="请输入您的账号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="出库日期:" class="single-date">
                <p v-if="disabled">{{outboundInfo.date}}</p>
                <el-date-picker  v-else type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="outboundInfo.date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="commont-btn"  v-show="!disabled">
          <el-button :loading="loading" @click="save">保存</el-button>
          <el-button @click="reset">重置</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
        <table-component :outboundId="outboundId" :editShow="editShow" :actionTab="actionTab"></table-component>
      </el-form>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import tableComponent from './table.vue'
export default {
  props: ['editData'],
  components: { tableComponent },
  data() {
    return {
      action: 'add',
      actionTab: 'inboundInfo',
      editWord: '编辑',
      loading: false,
      disabled: false,
      editShow: false,
      outboundInfo: {
        code: '出库单编号',
        contractInfo: { id: '' },
        date: '',
        project: { id: '' },
        region: { id: '' }
      },
      contractList: [],
      projectList: [],
      regionList: [],
      contractId: '',
      outboundId: '',
      rules: {},
      temp: {}
    }
  },
  created() {
    this.getInsertData()
    if (this.editData.tabState === 'addTab') {
      this.action = 'add'
    } else {
      this.action = 'edit'
      this.disabled = true
      this.editShow = true
      this.editInfo()
    }
    this.temp = _.cloneDeep(this.outboundInfo)
  },
  methods: {
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.outboundInfo = data.outboundList
      this.contractId = this.outboundInfo.contractInfo.id
      this.outboundId = this.outboundInfo.id
    },
    save() {
      this.loading = true
      this.$post('/outboundList/save', this.outboundInfo).then(res => {
        this.loading = false
        if (res.data.success === true) {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.disabled = true
          this.editShow = true
          this.outboundId = res.data.data
        } else {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
        }
      }).catch(() => {
        this.loading = false
      })
    },
    reset() {
      this.outboundInfo = _.cloneDeep(this.temp)
    },
    cancel() {
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
    toggleTab(tab) {
      this.actionTab = tab
    },
    getInsertData() {
      this.$get('/outboundList/findInsertData').then((res) => {
        var data = res.data.data
        console.log('data', data)
        this.contractList = data.contractInfoList
        this.projectList = data.projectList
        this.regionList = data.regionList
      })
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.payment-contract-add {
  .form-container{
    margin-top:50px;
    .edit-btn {
      margin: 0;
      button {
        float: right;
      }
    }
  }
}
</style>
