<template>
  <div class="price-summary">
    <div class="table-header">
      <p class="table-title">主材汇总表</p>
      <ul class="table-attached">
        <li>保存并计算</li>
        <li>数据导出</li>
      </ul>
    </div>
    <table cellspacing="0" width="100%">
      <tr>
        <td width="8%">序号</td>
        <td width="52%">系统名称</td>
        <td width="20%">材料报价</td>
        <td width="20%">材料成本（元）</td>
      </tr>
      <tr>
        <td>1</td>
        <td>数据机房工程</td>
        <td></td>
        <td>￥0.00</td>
      </tr>
      <tr>
        <td>2</td>
        <td>数字化终端</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td>2.1</td>
        <td>数字化终端-门禁梯控访客系统</td>
        <td></td>
        <td>￥0.00</td>
      </tr>
      <tr>
        <td>2.2</td>
        <td>数字化终端-云瞳系统</td>
        <td></td>
        <td>￥0.00</td>
      </tr>
      <tr>
        <td>..</td>
        <td>...</td>
        <td></td>
        <td></td>
      </tr>
      <tr>
        <td></td>
        <td>总计（元）</td>
        <td></td>
        <td>¥0.00</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'primaryMaterial',
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
