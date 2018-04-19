<template>
<div class="app-container userManage-container">
  <div class="form-head-attached clearfix">
    <div class="form-inner">
      <div class="crud-btn fl">
        <div class="user-search" v-show="tab === 'listTab'">
          <el-input placeholder="查询用户" v-model="searchWord" clearable @change='searchChange' @keyup.enter.native="hanlderSearch"></el-input>
          <el-button @click="hanlderSearch">
            <i class="iconfont icon-search"></i>
            <!-- <span>查询</span> -->
          </el-button>
        </div>
        <button :class="tab === 'listTab' ? 'is-active' : ''" @click="toggleTab('listTab')" v-show="tab === 'addTab'">
          <i class="iconfont icon-seeAll"></i>
          <span>查看</span>
        </button>
        <!-- <button :class="(tab === 'addTab' && editData.tabState ==='addTab') ? 'is-active' : ''" @click="addBtn">
          <i class="iconfont icon-add"></i>
          <span>新增</span>
        </button> -->
        <button v-show="tab === 'addTab' && editData.tabState ==='editTab'" :class="(tab === 'addTab' && editData.tabState ==='editTab')? 'is-active' : ''">
          <i class="iconfont icon-seeAll"></i>
          <span>查看明细</span>
        </button>
      </div>
    </div>
  </div>
  <div class="compotent-tab" >
    <transition name="fade" mode="out-in">
      <AddComponent v-if="tab === 'addTab'" :editData="editData" @toggleTab="toggleTab('listTab')" @changeObj="changeObj"></AddComponent>
      <ListComponent v-if="tab === 'listTab'" @seeRow="seeRow" :searchWord="searchWord"  ref="search" :pageObj="pageObj"></ListComponent>
    </transition>
  </div>
</div>
</template>

<script>
import AddComponent from './components/add'
import ListComponent from './components/list'
export default {
  name: 'user',
  components: {
    AddComponent,
    ListComponent
  },
  data() {
    return {
      searchWord: '',
      editData: {},
      listData: '',
      tab: 'listTab',
      selArr: [],
      deleteShow: false,
      isChange: false,
      pageObj: {}
    }
  },
  mounted() {
  },
  created() {
  },
  methods: {
    toggleTab(tab) {
      if (this.tab === 'addTab' && this.isChange === true) {
        this.showPopWin(() => {
          this.tab = tab
        })
        return
      }
      this.tab = tab
    },
    addBtn() {
      if (this.editData.tabState === 'editTab') { // 编辑状态点击新增
        if (this.isChange === true) { // 有值的变化
          this.showPopWin(() => {
            this.tab = '' // tab为空，在变为 ‘addTab’重新渲染add组件
            setTimeout(() => {
              this.tab = 'addTab'
            }, 50)
            this.editData.tabState = 'addTab'
          })
        } else { // 没有值的变化
          this.tab = ''
          setTimeout(() => {
            this.tab = 'addTab'
          }, 50)
          this.editData.tabState = 'addTab'
        }
      } else {
        this.tab = 'addTab'
        this.editData.tabState = 'addTab'
      }
    },
    seeRow(data) {
      this.pageObj = {
        currentPage: data.currentPage,
        pageSize: data.pageSize
      }
      this.toggleTab('addTab')
      this.editData = {
        editData: data,
        tabState: 'editTab'
      }
    },
    hanlderSearch() {
      this.pageObj = {}
      this.$refs.search.getUserData()
    },
    searchChange(searchWord) {
      this.searchWord = searchWord
    },
    showPopWin(callback) {
      this.$confirm('信息未保存，是否离开当前页面?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        callback()
        this.isChange = false
      }).catch(() => {
        this.isChange = true
      })
    },
    changeObj(res) {
      this.isChange = res
    }
  },
  computed: {},
  watch: {
  }
}
</script>

<style  rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-container {
  width: 100%;
  @include scrolling;
}
.user-search {
  width: 300px;
  height: 36px;
  line-height: 36px;
  margin-left: 10px;
  .el-input{
    width: 200px;
    height: 36px;
    float: left;
    display: inline-block;
    input.el-input__inner {
      height: 34px;
    }
  }
  .el-button{
    width: 50px;
    height: 34px;
    float: left;
    display: inline-block;
    margin:0;
    padding:6px;
    background-color: #35d5ba !important;
  }
}
</style>
<style  rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
  .userManage-container {
    .user-search{
      .el-input {
       input {
         height: 34px;
         line-height: 34px;
       }
      }
    }
  }
</style>
