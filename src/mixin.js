export default {
  methods: {
    findFromPermission (key) {
      var list = this.permissionList.filter(permission => permission.indexOf(key) > -1)
      return list.length > 0
    }
  },
  computed: {
    listPermission () {
      if (!this.permissionKey) {
        return false
      }
      var key = this.permissionKey + ':findAllBy'

      return this.findFromPermission(key)
    },
    savePermission () {
      if (!this.permissionKey) {
        return false
      }
      var key = this.permissionKey + ':save'

      return this.findFromPermission(key)
    },
    deletePermission () {
      if (!this.permissionKey) {
        return false
      }
      var key = this.permissionKey + ':delete'

      return this.findFromPermission(key)
    },
    permissionList () {
      return this.$store.getters.permissions
    }
  }
}
