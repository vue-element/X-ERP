<template>
<div class="container">
  <ul>
    <li v-for="item in msg">
      <span>{{item.name}}</span>
      <span>{{item.code}}</span>
    </li>
  </ul>
  <input type="number" placeholder="请输入手机号码" v-model="phone"/><br><br>
  <input type="id" placeholder="请输入名字" v-model="name">
  <button  @click="submit">提交</button>
</div>
</template>

<script>
// import { fetchList } from '@/api/article'
export default {
  name: 'smartCommunity',
  data() {
    return {
      phone: '13682561462',
      name: 'lsp',
      msg: []
    }
  },
  created() {
    this.getInfor()
  },
  methods: {
    getInfor() {
      this.$get('/role').then(res => {
        console.log(res.data)
        this.msg = res.data
      })
    },
    submit() {
      var role = {
        code: this.phone,
        name: this.name
      }
      // console.log(role)
      this.$post('/role/create', role).then((res) => {
        console.log(res)
        this.getInfor()
      })
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
