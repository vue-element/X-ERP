<template>
  <div class="filter-item">
     <el-autocomplete v-show="!disabled" v-model="businessInfo.client.name" :fetch-suggestions="querySearchAsync" @select="handleSelect" placeholder="请输入内容"></el-autocomplete>
  </div>
</template>
<script>
export default {
  name: 'SelectRemote',
  // props: ['label', 'listData', 'onchange'],
  data() {
    return {

    }
  },
  mounted() {
    // console.log('clients', this.clients)
    // this.clients = this.listData
  },
  watch: {

  },
  computed: {

  },
  methods: {
    querySearchAsync(queryString, callback) {
      var list = [{}]
      this.$get('/bussiness/findInsertData?clientName=' + queryString).then((res) => {
        var data = res.data.data
        for (var i of data.clientNameList) {
          i.value = i.name
        }
        list = data.clientNameList
        if (list.length === 0) {
          list = [{ value: '暂无数据' }]
        }
        console.log('list', list)
        callback(list)
      }).catch((error) => {
        console.log(error)
      })
    },
    handleSelect(item) {
      // console.log('client', item)
      this.businessInfo.client = item
    }
  }

}
</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.
</style>
