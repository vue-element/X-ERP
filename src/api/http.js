import Vue from 'vue'

// var SERVICE_URL = config.SERVER_URL + '/ChinesePK/public'
var SERVICE_URL = 'http://10.51.22.62:8080'

function request(method, path, data = {}) {
  var url = SERVICE_URL + path

  method = method.toLowerCase()
  // 每次向后台请求数据都自带token请求 注：后台的token的参数toker

  return Vue.http[method](url, data, { emulateJSON: true }, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }).then((response) => {
    console.log(response)
    return response.json()
  })
}

export default {
  SERVICE_URL,
  request,
  get(path, data = {}) {
    return request('get', path, data)
  },
  post(path, data = {}) {
    return request('post', path, data)
  }
}
