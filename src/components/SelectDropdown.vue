<template>
  <div class="filter-item">
    <el-input v-model="value" :placeholder="'请输入' + label" clearable @focus="inputFocus" @blur="inputBlur"></el-input>
     <div class="el-select-dropdown el-popper" x-placement="top-start" v-show="dropdownShow" :style="{height: listHeight + 'px'}">
       <div class="el-scrollbar">
         <p v-if="clients.length === 0" class="el-select-dropdown__empty">无匹配数据</p>
         <div v-else class="el-select-dropdown__wrap el-scrollbar__wrap">
           <ul class="filter-ul el-scrollbar__view el-select-dropdown__list" :style="{height: listHeight + 'px'}">
             <li class="el-select-dropdown__item" v-for="(item, index) in clients" @click.prevent="selectClick(index)">{{item.name}}</li>
           </ul>
         </div>
       </div>
     </div>
  </div>
</template>
<script>
export default {
  name: 'SelectDropdown',
  props: ['label', 'listData', 'onchange'],
  data() {
    return {
      dropdownShow: false,
      value: '',
      clients: [],
      cancelBlur: false
    }
  },
  mounted() {
    // console.log('clients', this.clients)
    // this.clients = this.listData
  },
  watch: {
    value(name) {
      this.$emit('onchange', this.value)
      if (name) {
        this.clients = this.listData.filter(function(item) {
          return Object.keys(item).some(function(key) {
            return String(item[key]).toLowerCase().indexOf(name) > -1
          })
        })
      } else {
        this.clients = this.listData
      }
    },
    listData(val) {
      this.clients = val
    }
  },
  computed: {
    listHeight() {
      var height = this.clients.length * 34 + 20
      return height > 200 ? 200 : height
    }
  },
  methods: {
    inputBlur(e) {
      setTimeout(() => {
        this.handleBlur()
      }, 200)
    },
    handleBlur() {
      this.$emit('onchange', this.value)
      // console.log('this.cancelBlur1', this.cancelBlur)
      // if (this.cancelBlur) {
      //   return
      // }
      this.dropdownShow = false
      // this.cancelBlur = false
    },
    inputFocus(val) {
      this.dropdownShow = true
      this.$emit('onchange', this.value)
      // this.cancelBlur = false
    },
    selectClick(index) {
      this.value = this.clients[index].name
      // this.$emit('onchange', this.value)
      // this.dropdownShow = true
      // this.cancelBlur = true
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/styles/mixin.scss";
.filter-item {
  position: relative;
  .filter-ul{
    position: absolute;
    width: 100%;
    overflow: auto;
  }
}
.el-select-dropdown {
  height: 200px;
  width: 100%;
  margin-top: 10px;
  .el-scrollbar {
    height: 200px;
    .el-scrollbar__wrap{
      overflow:auto;
    }
    .el-select-dropdown__empty {
      background-color: #fff;
      padding:10px 0;
      border: 1px solid #ccc;
    }
  }
}
</style>
