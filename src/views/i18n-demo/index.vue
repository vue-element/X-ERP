<template>
  <div>

    <el-row :gutter="20" style="margin:100px 15px 50px;">
      <el-col :span="12">
        <div class="block">
          <el-date-picker v-model="date" type="date" placeholder="请选择日期"></el-date-picker>
        </div>
        <div class="block">
          <el-pagination background :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next"
            :total="400">
          </el-pagination>
        </div>
        <div class="block">
          <el-button class="item-btn" size="small">默认按钮</el-button>
          <el-button class="item-btn" size="small" type="primary">主要按钮</el-button>
          <el-button class="item-btn" size="small" type="success">成功按钮</el-button>
          <el-button class="item-btn" size="small" type="info">信息按钮</el-button>
          <el-button class="item-btn" size="small" type="warning">警告按钮</el-button>
          <el-button class="item-btn" size="small" type="danger">危险按钮</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'i18n',
  data() {
    return {
      date: '',
      currentPage: 5,
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }]
    }
  },
  created() {
    // if (!this.$i18n.getLocaleMessage('en')[viewName]) {
    //   this.$i18n.mergeLocaleMessage('en', local.en)
    //   this.$i18n.mergeLocaleMessage('zh', local.zh)
    // }
  },
  computed: {
    // lang: {
    //   get() {
    //     return this.$store.state.app.language
    //   },
    //   set(lang) {
    //     this.$i18n.locale = lang
    //     this.$store.dispatch('setLanguage', lang)
    //   }
    // }
  }
}
</script>

<style scoped>
.box-card {
  width: 600px;
  margin: 20px auto;
}
.item-btn{
  margin-bottom: 15px;
  margin-left: 0px;
}
.block {
  padding: 25px;
}
</style>
