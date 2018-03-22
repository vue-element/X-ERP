<template>
  <div class="temporary-container">
    <div class="form-head-attached">
      <div class="form-inner">
        <div class="crud-btn fl">
          <button>
            <i class="iconfont icon-search"></i>
            <span>查询</span>
          </button>
          <button>
            <i class="iconfont icon-seeAll"></i>
            <span>查看明细</span>
          </button>
          <button>
            <i class="iconfont icon-add"></i>
            <span>新增</span>
          </button>
          <button>
            <i class="iconfont icon-delete"></i>
            <span>删除</span>
          </button>
        </div>
        <div class="export-btn fr">
          <button>
            <i class="iconfont icon-export"></i>
            <span>数据导出</span>
          </button>
        </div>
      </div>
    </div>
    <div class="temporary-list">
      <listComponent></listComponent>
    </div>
  </div>
</template>

<script>
import listComponent from './component/list.vue'
export default {
  components: {
    listComponent
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.temporary-container {
  width: 100%;
  .temporary-list{
    margin-top: 60px;
  }
}
</style>
