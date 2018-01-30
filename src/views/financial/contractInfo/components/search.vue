<template>
  <div class="contractInfo-search form-container" ref="ele">
     <el-form class="basic">
        <div class="search form-module">
          <h4 class="module-title">
            <p>查询条件</p>
          </h4>
          <el-row :gutter="40">
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同名称：" prop="name">
                <el-input v-model="searchForm.name" placeholder="请输入合同名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="合同编码：" prop="name">
                <el-input v-model="searchForm.code" placeholder="请输入合同编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="业务分类：" prop="name">
                <el-select v-model="searchForm.category" placeholder="请选择业务类别">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="range-date" label="合同所属年月：" prop="name">
                <el-date-picker v-model="searchForm.date" type="daterange"  start-placeholder="开始日期" range-separator="—" end-placeholder="结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item class="single-date" label="签订时间：" prop="name">
                <el-date-picker v-model="searchForm.signDate" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="所属区域：" prop="name">
                <el-select v-model="searchForm.region_id" placeholder="请选择所属区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="8">
              <el-form-item label="是否执行结束：" prop="name">
                <el-select v-model="searchForm.isExecute" placeholder="请选择是否执行结束">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="commont-btn">
          <el-button @click="search">查  询</el-button>
        </div>
      </el-form>
  </div>
</template>

<script>
import { winHeight } from '@/utils'
export default {
  data() {
    return {
      searchForm: {
        name: '',
        code: '',
        category: '',
        date: '',
        signDate: '',
        region_id: '',
        isExecute: [{
          value: '0',
          label: '是'
        }, {
          value: '1',
          label: '否'
        }]
      }
      // searchData: []
    }
  },
  created() {

  },
  methods: {
    search() {
      console.log(this.searchForm)
    }
  },
  mounted() {
    this.$refs.ele.style.height = winHeight() - 230 + 'px'
    window.addEventListener('resize', () => {
      this.$refs.ele.style.height = winHeight() - 230+ 'px'
    })
  },
  computed: {

  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.contractInfo-search.form-container{
  overflow-y:auto;
  &::-webkit-scrollbar{
    width:0;
  }
  .form-module{
    .el-row{
      margin-bottom:10px;
      .el-col{
        .item {
          margin-top: 20px;
        }
      }
    }
  }
}
</style>
