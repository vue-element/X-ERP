<template>
  <div class="price-summary">
    <div class="table-header">
      <p class="table-title">报价汇总表</p>
      <ul class="table-attached">
        <li>保存并计算</li>
        <li>数据导出</li>
      </ul>
    </div>
    <table cellspacing="0" width="100%">
      <tr>
        <td width="10%">序号</td>
        <td width="53%">系统名称</td>
        <td width="37%">合价（元）</td>
      </tr>
      <tr>
        <td>1</td>
        <td>数据机房工程</td>
        <td>￥0.00</td>
      </tr>
      <tr>
        <td>2</td>
        <td>数据机房</td>
        <td>￥0.00</td>
      </tr>
      <tr>
        <td>..</td>
        <td>...</td>
        <td>￥0.00</td>
      </tr>
      <tr>
        <td></td>
        <td>投标总价</td>
        <td>¥0.00</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'priceSummary',
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";

</style>

<style rel="stylesheet/scss" lang="scss">

</style>
