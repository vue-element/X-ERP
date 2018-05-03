<template>
<div class="contract-list">
  <div class="table">
    <el-table class="basic-form" style="width: 100%" :data="tableData" :height="height" v-loading.body="listLoading" border>
      <el-table-column prop="0" label="序号" fixed width="60">
        <template slot-scope="scope">{{scope.$index + 1}}</template>
       </el-table-column>
       <el-table-column prop="contractInfo.name" label="合同名称／所属项目" fixed width="180"></el-table-column>
       <el-table-column prop="contractInfo.code" label="合同编号" width="180"></el-table-column>
       <el-table-column prop="contractInfo.business.businessCategory.name" label="业务线"  width="160"></el-table-column>
       <el-table-column prop="code" label="付款合同编号" fixed width="160"></el-table-column>
       <el-table-column prop="supply.name" label="供应商" width="100"></el-table-column>
       <el-table-column prop="applicationPerson" label="申请人"  width="100"></el-table-column>
       <el-table-column prop="applicationTime" label="申请时间" width="100"></el-table-column>
       <el-table-column prop="department" label="申请部门" width="120"></el-table-column>
       <el-table-column prop="paymentObject" label="支付对象" width="100"></el-table-column>
       <el-table-column prop="acAmount" label="实际采购金额" width="100"></el-table-column>
       <el-table-column prop="adAmount" label="计划采购金额" width="100"></el-table-column>
       <el-table-column prop="payableAmount" label="应付金额" width="140"></el-table-column>
       <el-table-column prop="payTime" label="到付时间" width="100"></el-table-column>
       <el-table-column prop="deliveryStatus" label="发货状态" width="100" fixed="right"></el-table-column>
       <el-table-column prop="mention" label="是否自提" width="100"></el-table-column>
       <el-table-column prop="term" label="账期" width="100"></el-table-column>
       <el-table-column label="操作" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button @click.native.prevent="seeRow(scope.row.id)" type="text" v-if="hasPerm('paymentContract:findUpdateData')">查看</el-button>
          <el-dropdown @command="handleCommand">
            <el-button class="el-dropdown-link" type="text">更多</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a" @click.native.prevent="downloadPL(scope.row.id)">生成采购清单</el-dropdown-item>
              <!-- <el-dropdown-item command="b" @click.native.prevent="downloadPC(scope.row.id)">生成采购合同</el-dropdown-item> -->
              <!-- <el-dropdown-item command="c" @click.native.prevent="deleteRow(scope.row.id)" >删除</el-dropdown-item> -->
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
     </el-table>
     <el-pagination class="page" background :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize"  :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
   </div>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { winHeight } from '@/utils'
export default {
  name: 'paymentContractList',
  props: ['searchData', 'pageObj'],
  data() {
    return {
      listLoading: false,
      height: 100,
      total: 5,
      currentPage: 1,
      pageSizes: [15, 20, 25],
      pageSize: 15,
      tableData: []
    }
  },
  created() {
    if (this.pageObj.currentPage) {
      this.currentPage = this.pageObj.currentPage
      this.pageSize = this.pageObj.pageSize
    }
    this.resize()
    window.addEventListener('resize', () => {
      this.resize()
    })
    this.getSupplierData()
  },
  methods: {
    resize() {
      this.height = winHeight() - 210
    },
    getSupplierData() {
      this.listLoading = true
      var pageSize = this.pageSize || 15
      var page = this.currentPage - 1 || 0
      this.searchData.role_code = this.roleCode
      var url = '/paymentContract/search?size=' + pageSize + '&page=' + page
      this.$post(url, this.searchData, false).then(res => {
        this.listLoading = false
        if (res.data.success === true) {
          var data = res.data.data
          this.total = data.totalElements
          this.currentPage = data.number + 1
          this.pageSize = data.size
          this.tableData = data.content
          this.$emit('exportData', data.content)
        }
      }).catch(() => {
        this.listLoading = false
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getSupplierData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getSupplierData()
    },
    seeRow(id) {
      this.$get('/paymentContract/findUpdateData/' + id).then((res) => {
        var data = res.data.data
        data.currentPage = this.currentPage
        data.pageSize = this.pageSize
        this.$emit('editRow', data)
      })
    },
    handleCommand(command) {
      console.log('command', command)
    },
    downloadPL(id) {
      this.$get('/purchaseList/findAllByPaymentContract/' + id).then((res) => {
        var data = res.data.data
        this.purchaseList = data
        require.ensure([], () => {
          const {
            export_json_to_excel
          } = require('@/vendor/Export2Excel')
          const tHeader = ['序号', '物料名称', '品牌', '规格型号', '单价', '实际数量', '实际金额', '单位']
          const filterVal = ['index', 'name', 'brand', 'model', 'unitPrice', 'acNumber', 'acAmount', 'unit']
          const list = this.purchaseList
          var i = 1
          list.forEach((item) => {
            item.index = i
            i++
          })
          const data = this.formatJson(filterVal, list)
          export_json_to_excel(tHeader, data, '采购清单')
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    }
  },
  watch: {},
  computed: {
    ...mapGetters([
      'roleCode'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>@import "src/styles/mixin.scss";</style>
