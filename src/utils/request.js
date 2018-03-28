import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import qs from 'qs'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  // baseURL: 'http://10.51.23.71:8080',
  // baseURL: 'http://10.51.39.106:8085',
  // baseURL: 'http://10.51.36.108:8081',
  // baseURL: 'http://202.105.96.131:8081',
  baseURL: '/api',
  // withCredentials: true,
  timeout: 5000 // 请求超时时间
})
axios.defaults.withCredentials = true
// request拦截器
service.interceptors.request.use(
  config => {
    if (!config.headers) {
      config.headers = {}
    }
    // Do something before request is sent
    if (store.getters.token) {
      var token = getToken()
      config.headers['X-Token'] = token
    }
    return config
  }, error => {
  // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })

// respone拦截器
service.interceptors.response.use(
  response => response,
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })
export default service

// get 请求方法
export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: params
    }).then(respone => {
      resolve(respone)
    }, err => {
      reject(err)
    })
  })
}

// post 请求方法
export function post(url, data = {}, isJson = true) {
  return new Promise((resolve, reject) => {
    var config = {}
    // console.log('isJson', isJson)
    if (isJson) {
      config.headers = { 'Content-Type': 'application/json;charset=utf-8' }
    } else {
      config.headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
      data = qs.stringify(data)
    }
    // console.log('config', config)
    service.post(url, data, config).then(response => {
      resolve(response)
    }, err => {
      reject(err)
    })
  })
}
