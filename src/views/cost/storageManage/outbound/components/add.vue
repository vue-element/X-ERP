<template>
  <div class="payment-contract-add form-container">
    <div class="commont-btn edit-btn" v-show="editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="paymentContract" :rules="rules" ref="paymentContract">
      <div class="form-module">
        <h4 class="module-title">
          <p>出库信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="合同编号:">
              <p v-if="disabled">{{paymentContract.category}}</p>
              <el-select v-else v-model="paymentContract.category" placeholder="请选择" filterable>
               <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="采购计划单号:">
              <p v-if="disabled">{{paymentContract.category}}</p>
              <el-select v-else v-model="paymentContract.category" placeholder="请选择" filterable>
               <el-option v-for="item in categoryList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="出库单编号:">
              <p v-if="disabled">{{paymentContract.applicationPerson}}</p>
              <el-input v-else v-model="paymentContract.applicationPerson" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="项目:">
              <p v-if="disabled">{{paymentContract.business.code}}</p>
              <el-select v-else v-model="paymentContract.business.id" placeholder="请选择" filterable>
               <el-option v-for="item in businessList" :label="item.code" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="办事处:">
              <p v-if="disabled">{{paymentContract.business.name}}</p>
              <el-select v-else v-model="paymentContract.business.id" placeholder="请选择" filterable>
               <el-option v-for="item in businessList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="出库日期:" class="single-date">
                <p v-if="disabled">{{paymentContract.payTime}}</p>
              <el-date-picker v-else type="date" v-model="paymentContract.payTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn"  v-show="!disabled">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
      <table-component :contractId="contractId" :editShow="editShow"></table-component>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import tableComponent from './table.vue'
export default {
  name: 'paymentContractAdd',
  props: ['editData'],
  components: { tableComponent },
  data() {
    return {
      action: 'add',
      editWord: '编辑',
      loading: false,
      disabled: false,
      editShow: false,
      paymentContract: {
        applicationPerson: '廖淑萍',
        applicationTime: '2018-01-10',
        business: { id: '' },
        category: '科技-智慧社区改造',
        deliveryStatus: '已发货',
        department: '财务部',
        mention: '是',
        optCost: '优化成本',
        payTime: '',
        payableAmount: '200',
        paymentObject: '个人',
        term: '一个月'
      },
      businessList: [],
      categoryList: [],
      contractId: '',
      rules: {}
    }
  },
  created() {
    if (this.editData.tabState === 'addTab') {
      this.action = 'add'
      this.getInsertData()
    } else {
      this.action = 'edit'
      this.editInfo()
      this.disabled = true
      this.editShow = true
    }
  },
  methods: {
    editInfo() {
      var data = _.cloneDeep(this.editData.editData)
      this.paymentContract = data.paymentContractList
      this.businessList = data.businessList
      this.contractId = this.paymentContract.id
    },
    save() {
      this.loading = true
      console.log('payment', JSON.stringify(this.paymentContract))
      this.$post('/paymentContract/save', this.paymentContract).then(res => {
        if (res.data.success === true) {
          this.loading = false
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          if (this.action === 'edit') {
            this.$emit('toggleTab')
          }
        }
      }).catch(() => {
        this.loading = false
      })
    },
    reset() {
      if (this.action === 'add') {
        console.log('add')
      } else {
        this.editInfo()
      }
    },
    cancel() {
      this.$emit('toggleTab')
    },
    toggleEditBtn() {
      // console.log('disabledASdd', this.disabled)
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.editWord = '编辑'
        this.editInfo()
      } else {
        this.editWord = '取消编辑'
      }
    },
    // uploadList(data) {
    //   console.log('uploadList', this.purchaseList)
    //   this.paymentContract.purchaseList = data
    // },
    getInsertData() {
      this.$get('/paymentContract/findInsertData').then((res) => {
        var data = res.data.data
        this.businessList = data.businessList
        this.categoryList = [{
          value: '科技-智慧社区工程全委'
        }, {
          value: '科技-智慧社区改造'
        }, {
          value: '科技-物联网大平台'
        }, {
          value: '科技-设计服务'
        }, {
          value: '科技-技术服务'
        }]
      })
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.payment-contract-add.form-container{
  .edit-btn {
    margin: 0;
    button {
      float: right;
    }
  }
}
</style>
