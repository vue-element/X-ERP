<template>
  <div class="supply-add form-container">
    <div class="commont-btn edit-btn" v-show="editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="priceInfo" :rules="rules" ref="priceInfo">
      <div class="form-module">
        <h4 class="module-title">
          <p>基础信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="产品名称:">
              <p v-if="disabled">{{priceInfo.name}}</p>
              <el-input v-else v-model="priceInfo.name" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="单位:">
              <p v-if="disabled">{{priceInfo.unit}}</p>
              <el-input v-else v-model="priceInfo.unit" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="产品类型:">
              <p v-if="disabled">{{priceInfo.type}}</p>
              <el-select v-else v-model="priceInfo.type" placeholder="请选择" filterable>
               <el-option v-for="item in typeList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="系统:">
              <p v-if="disabled">{{priceInfo.system}}</p>
              <el-select v-else v-model="priceInfo.system" placeholder="请选择" filterable>
               <el-option v-for="item in systemList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="规格型号:">
              <p v-if="disabled">{{priceInfo.specModel}}</p>
              <el-input v-else v-model="priceInfo.specModel" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="品牌:">
              <p v-if="disabled">{{priceInfo.brand}}</p>
              <el-input v-else v-model="priceInfo.brand" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="供应商:">
              <p v-if="disabled">{{priceInfo.supply.name}}</p>
              <el-select v-else v-model="priceInfo.supply.id" placeholder="请选择" filterable>
               <el-option v-for="item in supplyList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="产品最新报价（元）:">
              <p v-if="disabled">{{priceInfo.productQuotation}}</p>
              <el-input v-else v-model="priceInfo.productQuotation" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="区域:">
              <p v-if="disabled">{{priceInfo.region.name}}</p>
              <el-select v-else v-model="priceInfo.region.id" placeholder="请选择" filterable>
               <el-option v-for="item in regionList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="供货周期（天）:">
              <p v-if="disabled">{{priceInfo.supplyCycle}}</p>
              <el-input v-else v-model="priceInfo.supplyCycle" placeholder="请输入您的账号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :xs="24" :sm="8" :lg="8">
            <el-form-item label="参考描述:" class="ref-describe">
              <p class="textarea" v-if="disabled">{{priceInfo.description}}</p>
              <el-input v-else v-model="priceInfo.description" placeholder="请输入您的账号" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn"  v-show="!disabled">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
      <!-- 查看显示的产品报价 -->
      <div class="form-module" v-show="action === 'edit'">
        <h4 class="module-title">
          <p>产品报价历史</p>
        </h4>
        <el-table class="basic-form" style="width: 100%"  :data="historyPrice" ref="multipleTable">
          <el-table-column align="center" prop="0" label="序号">
            <template slot-scope="scope">{{scope.$index  + 1}}</template>
          </el-table-column>
          <el-table-column prop="productQuotation" label="产品报价"></el-table-column>
          <el-table-column prop="person" label="修改人"></el-table-column>
          <el-table-column prop="time" label="修改时间"></el-table-column>
          </el-table-column>
        </el-table>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { parseTime } from '@/utils'
export default {
  name: 'supplierAdd',
  props: ['editData'],
  data() {
    return {
      action: 'add',
      editWord: '编辑',
      loading: false,
      disabled: false,
      editShow: false,
      priceInfo: {
        brand: '品牌',
        code: '产品编码',
        description: '参数描述',
        name: '产品名称',
        productQuotation: '产品报价',
        region: { id: 2 },
        specModel: '规格型号',
        supply: { id: 20 },
        supplyCycle: '供货周期',
        system: '消防系统',
        type: '主材',
        unit: '个'
      },
      regionList: [],
      supplyList: [],
      systemList: [],
      typeList: [],
      rules: {},
      historyPrice: [{
        1: '600.00',
        2: '罗艺',
        3: '2017-12-20'
      }, {
        1: '600.00',
        2: '罗艺',
        3: '2017-12-20'
      }, {
        1: '600.00',
        2: '罗艺',
        3: '2017-12-20'
      }]
    }
  },
  created() {
    this.getInsertData()
    if (this.editData.tabState === 'addTab') {
      this.action = 'add'
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
      this.priceInfo = data.price
      this.historyPrice = data.price.priceHistoryList
      this.historyPrice.forEach((item) => {
        item.time = parseTime(item.time, '{y}-{m}-{d}')
      })
    },
    save() {
      this.loading = true
      this.$post('/price/save', this.priceInfo).then(res => {
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
      })
    },
    reset() {
      if (this.action === 'add') {
        this.priceInfo = {
          brand: '',
          code: '',
          description: '',
          name: '',
          productQuotation: '',
          region: { id: '' },
          specModel: '',
          supply: { id: '' },
          supplyCycle: '',
          system: '',
          type: ''
        }
      } else {
        this.editInfo()
      }
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
    getInsertData() {
      this.$get('/price/findInsertData').then(res => {
        var data = res.data.data
        this.regionList = data.regionList
        this.supplyList = data.supplyList
      })
      this.systemList = [
        { value: '停车场系统' },
        { value: '监控系统' },
        { value: '门禁系统' },
        { value: '巡更系统' },
        { value: '电子围栏系统' },
        { value: '对讲系统' },
        { value: '背景音乐系统' },
        { value: '会议系统' },
        { value: '机房工程系统' },
        { value: '报警系统' },
        { value: '消防系统' },
        { value: '综合布线系统' },
        { value: '通用类' }
      ]
      this.typeList = [
        { value: '主材' },
        { value: '线材' },
        { value: '工器具' },
        { value: '辅材' },
        { value: '其他' },
        { value: '行政类' }
      ]
    }
  },
  computed: {}
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.supply-add.form-container{
  .edit-btn {
    margin: 0;
    button {
      float: right;
    }
  }
  .el-form-item.ref-describe {
    width: 100%;
    .el-form-item__label {
      width: 10%!important;
    }
  }
}
</style>
