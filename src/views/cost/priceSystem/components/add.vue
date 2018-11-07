<template>
  <div class="supply-add form-container">
      <div class="commont-btn edit-btn" v-show="hasPerm('price:update') && editShow">
      <el-button @click="toggleEditBtn">{{editWord}}</el-button>
    </div>
    <el-form :model="priceInfo" :rules="rules" ref="priceInfo">
      <div class="form-module">
        <h4 class="module-title">
          <p>基础信息:</p>
        </h4>
        <el-row :gutter="40">
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="产品名称:" prop="name">
              <p v-if="disabled">{{priceInfo.name}}</p>
              <el-input v-else v-model="priceInfo.name" placeholder="请输入产品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="产品编号:">
              <p v-if="disabled">{{priceInfo.code}}</p>
              <el-input v-else v-model="priceInfo.code" placeholder="自动生成" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="单位:" prop="unit">
              <p v-if="disabled">{{priceInfo.unit}}</p>
              <el-input v-else v-model="priceInfo.unit" placeholder="请输入单位"></el-input>
            </el-form-item>
          </el-col>
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="产品类型:" prop="type">
              <p v-if="disabled">{{priceInfo.type}}</p>
              <el-select v-else v-model="priceInfo.type" placeholder="请选择产品类型" filterable clearable>
               <el-option v-for="item in typeList" :label="item.name" :value="item.id" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="系统:" prop="system">
              <p v-if="disabled">{{priceInfo.system}}</p>
              <el-select v-else v-model="priceInfo.system" placeholder="请选择系统" filterable clearable>
               <el-option v-for="item in systemList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="规格型号:" prop="specModel">
              <p v-if="disabled">{{priceInfo.specModel}}</p>
              <el-input v-else v-model="priceInfo.specModel" placeholder="请输入规格型号"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="品牌:" prop="brand">
              <p v-if="disabled">{{priceInfo.brand}}</p>
              <el-input v-else v-model="priceInfo.brand" placeholder="请输入品牌"></el-input>
            </el-form-item>
          </el-col>
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="供应商:" prop="supply">
              <p v-if="disabled">{{priceInfo.supply.name}}</p>
              <el-autocomplete v-else v-model="priceInfo.supply.name" :fetch-suggestions="supplySearchAsync" @select="supplySelect" placeholder="请选择供应商"></el-autocomplete>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="供应商类型:">
              <p v-if="disabled">{{priceInfo.supply.type}}</p>
              <el-input v-else v-model="priceInfo.supply.type" placeholder="自动生成" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="供应区域:">
              <p v-if="disabled">{{priceInfo.supply.supplyRegion.name}}</p>
              <el-input v-else v-model="priceInfo.supply.supplyRegion.name" placeholder="自动生成" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="供货周期(天):">
              <p v-if="disabled">{{priceInfo.supply.supplyCycle}}</p>
              <el-input v-else v-model="priceInfo.supply.supplyCycle" placeholder="自动生成" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="产品最新报价(元):" prop="productQuotation1">
              <p v-if="disabled">{{priceInfo.productQuotation1}}</p>
              <el-input v-else v-model="priceInfo.productQuotation1" placeholder="请输入产品最新报价" @change="amountChange"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="价格来源:" prop="source">
              <p v-if="disabled">{{priceInfo.source}}</p>
              <el-select v-else v-model="priceInfo.source" placeholder="请选择价格来源" filterable clearable>
               <el-option v-for="item in sourceList" :label="item.value" :value="item.value" :key="item.id">
               </el-option>
             </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="24" :md="12" :lg="12">
            <el-form-item label="价格有效期限:" class="range-date validDate" prop="validDate">
              <p v-if="disabled">{{validDateStr}}</p>
              <el-date-picker v-else v-model="priceInfo.validDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="daterange" @change="validDateChange"
              start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :ms="24" :md="12" :lg="12">
            <el-form-item label="文件链接:">
              <p v-if="disabled">{{priceInfo.url}}</p>
              <el-input v-else v-model="priceInfo.url" placeholder="请填写文件链接"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :ms="24" :md="24" :lg="24">
            <el-form-item label="参考描述:" class="ref-describe">
              <p class="textarea" v-if="disabled">{{priceInfo.description}}</p>
              <el-input v-else v-model="priceInfo.description" placeholder="请输入参考描述" type="textarea"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="commont-btn"  v-show="hasPerm('price:save') && !disabled">
        <el-button :loading="loading" @click="save">保存</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
      <!-- 查看显示的产品报价 -->
      <div class="form-module" v-show="action === 'edit'">
        <h4 class="module-title">
          <p>产品报价历史</p>
        </h4>
        <el-table class="basic-form" style="width: 100%" :height="priceHeight"  :data="historyPriceList" ref="multipleTable">
          <el-table-column align="center" prop="0" label="序号">
            <template slot-scope="scope">{{scope.$index  + 1}}</template>
          </el-table-column>
          <el-table-column prop="productQuotation" label="产品报价"></el-table-column>
          <el-table-column prop="person" label="修改人"></el-table-column>
          <el-table-column prop="time" label="修改时间"></el-table-column>
          </el-table-column>
        </el-table>
        <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
         @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
      </div>
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { materialCtgList } from '@/utils/selectList'
import { mapGetters } from 'vuex'
import { outputmoney, isObjectValueEqual } from '@/utils'
export default {
  name: 'supplierAdd',
  props: ['editData'],
  data() {
    var validateSupply = (rules, value, callback) => {
      if (!value.id) {
        callback(new Error('请选择供应商信息'))
      } else {
        callback()
      }
    }
    var validateRegion = (rules, value, callback) => {
      if (!value.id) {
        callback(new Error('请选择区域信息'))
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
      priceId: null,
      validDate: [],
      validDateStr: '',
      priceInfo: {
        brand: '',
        code: '',
        description: '',
        name: '',
        productQuotation: '',
        productQuotation1: '',
        specModel: '',
        supply: {
          id: null,
          name: '',
          type: '',
          supplyCycle: '',
          supplyRegion: {
            name: ''
          }
        },
        supplyCycle: '',
        system: '',
        type: '',
        unit: '',
        url: '',
        source: '',
        validDate: []
      },
      // oldproductQuotation: '',
      // supplyType: '',
      // supplyRegion: '',
      // supplyCycle: '',
      supplyList: [],
      systemList: [],
      typeList: [],
      historyPriceList: [],
      sourceList: [],
      rules: {
        name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
        unit: [{ required: true, message: '请输入单位', trigger: 'blur' }],
        type: [{ required: true, message: '请选择产品类型', trigger: 'change' }],
        system: [{ required: true, message: '请输入系统', trigger: 'change' }],
        specModel: [{ required: true, message: '请输入规格型号', trigger: 'blur' }],
        brand: [{ required: true, message: '请输入品牌', trigger: 'blur' }],
        supply: [{ required: true, validator: validateSupply, trigger: 'change' }],
        productQuotation1: [{ required: true, message: '请输入产品最新报价', trigger: 'blur' }],
        region: [{ required: true, validator: validateRegion, trigger: 'change' }],
        applicationPerson: [{ required: true, message: '请输入申请人', trigger: 'blur' }],
        source: [{ required: true, message: '请输入价格来源', trigger: 'change' }],
        validDate: [{ required: true, message: '请输入价格有效期限', trigger: 'change' }]
      },
      temp: {},
      // 产品报价历史
      total: 5,
      currentPage: 1,
      pageSizes: [15, 20, 25],
      pageSize: 15
    }
  },
  created() {
    this.getInsertData()
    this.toggleAction()
    if (this.priceId !== null) {
      this.getPriceHistory()
    }
  },
  methods: {
    validDateChange(val) {
      this.disabled = true
      this.disabled = false
      // console.log('val', val)
    },
    save() {
      this.$refs.priceInfo.validate((valid) => {
        if (valid) {
          this.loading = true
          this.priceInfo.startDate = this.priceInfo.validDate[0]
          this.priceInfo.endDate = this.priceInfo.validDate[1]
          this.$post('/price/save', this.priceInfo).then(res => {
            this.loading = false
            if (res.data.success === true) {
              this.priceInfo = res.data.data
              this.editInfo()
              this.temp = _.cloneDeep(this.priceInfo)
              this.priceId = this.priceInfo.id
              this.savePriceHistory()
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
      this.priceInfo = _.cloneDeep(this.temp)
      this.editInfo()
    },
    cancel() {
      this.$emit('toggleTab')
    },
    editInfo() {
      this.priceInfo.productQuotation1 = outputmoney('' + this.priceInfo.productQuotation)
      this.priceId = this.priceInfo.id
      // 有效期限
      if (this.priceInfo.startDate === null || this.priceInfo.endDate === null) {
        this.validDateStr = ''
      } else {
        this.validDateStr = this.priceInfo.startDate + '  至  ' + this.priceInfo.endDate
        this.priceInfo.validDate = [this.priceInfo.startDate, this.priceInfo.endDate]
      }
    },
    toggleEditBtn() {
      this.disabled = !this.disabled
      if (this.disabled === true) {
        this.editWord = '编辑'
        this.priceInfo = _.cloneDeep(this.temp)
        // console.log('priceInfo', this.priceInfo)
        this.editInfo()
      } else {
        this.editWord = '取消编辑'
      }
    },
    getInsertData() {
      materialCtgList().then((data) => {
        this.typeList = data
      })
      this.systemList = [{ value: '停车场系统' }, { value: '监控系统' }, { value: '门禁系统' }, { value: '巡更系统' }, { value: '电子围栏系统' }, { value: '对讲系统' },
        { value: '背景音乐系统' }, { value: '会议系统' }, { value: '机房工程系统' }, { value: '报警系统' }, { value: '消防系统' }, { value: '综合布线系统' }, { value: '通用类' }]
      this.sourceList = [{ value: '地产集采价格' }, { value: '集团集采价格' }, { value: '公司集采价格' }, { value: '询价价格' }]
    },
    //  页码处理
    handleSizeChange(val) {
      this.pageSize = val
      this.getPriceHistory()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getPriceHistory()
    },
    getPriceHistory() {
      var pageSize = this.pageSize || 5
      var page = this.currentPage - 1 || 0
      var url = '/priceHistory/findAllByPrice/' + this.priceId
      this.$get(url + '?size=' + pageSize + '&page=' + page).then((res) => {
        if (res.data.success === true) {
          var data = res.data.data
          this.historyPriceList = data.content
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.historyPriceList.forEach((item) => {
            console.log('item', item)
            item.productQuotation = outputmoney('' + item.productQuotation)
            console.log('item.productQuotation', item.productQuotation)
          })
        }
      })
    },
    savePriceHistory() {
      var oldPriceObj = JSON.parse(sessionStorage.getItem('oldPrice'))
      if (oldPriceObj.id === this.priceId && oldPriceObj.num !== this.priceInfo.productQuotation1) {
        var obj = {
          person: this.userName,
          price_id: this.priceId,
          productQuotation: this.priceInfo.productQuotation
        }
        this.$post('/priceHistory/save', obj).then((res) => {
          this.getPriceHistory()
          var oldPriceObj = {
            num: this.priceInfo.productQuotation1,
            id: this.priceInfo.id
          }
          sessionStorage.setItem('oldPrice', JSON.stringify(oldPriceObj))
        })
      } else {
        this.getPriceHistory()
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
        this.editWord = '编辑'
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
        this.priceInfo = _.cloneDeep(this.editData.editData.price)
        this.editInfo()
        var oldPriceObj = {
          num: this.priceInfo.productQuotation1,
          id: this.priceInfo.id
        }
        sessionStorage.setItem('oldPrice', JSON.stringify(oldPriceObj))
        // sessionStorage.setItem('oldPrice', this.priceInfo.productQuotation1)
      }
      this.temp = _.cloneDeep(this.priceInfo)
    },
    amountChange(val) {
      this.priceInfo.productQuotation = val
      this.priceInfo.productQuotation1 = outputmoney(val)
    },
    // 供应商搜索
    supplySearchAsync(queryString, callback) {
      var list = [{}]
      this.$get('/keywordQuery/supplyName?supplyName=' + queryString).then((res) => {
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
    supplySelect(item) {
      this.priceInfo.supply = item
      this.temp.supply = item
    }
  },
  computed: {
    ...mapGetters([
      'userName'
    ]),
    priceHeight() {
      var height = this.historyPriceList.length * 34 + 100
      return height > 200 ? 200 : height
    }
  },
  watch: {
    disabled(status) {
      if (status === false) {
        this.$emit('changeObj', true)
      }
    },
    priceInfo: {
      handler(obj) {
        if (isObjectValueEqual(obj, this.temp)) {
          this.$emit('changeObj', false)
        } else {
          this.$emit('changeObj', true)
        }
        // 供应商关联数据
        if (obj.supply.name === '') {
          obj.supply.id = null
          obj.supply.type = ''
          obj.supply.supplyCycle = ''
          obj.supply.supplyRegion = ''
        }
      },
      deep: true
    }
  }
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
}
</style>
<style  rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
.supply-add.form-container{
  .el-form-item.ref-describe {
    width: 100%;
    .el-form-item__label {
      width: 13%!important;
    }
    .el-form-item__content {
      width: 82%!important;
    }
  }
}
</style>
