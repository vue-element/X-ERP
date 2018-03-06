import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

// export function getUserInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }
export function getUserInfo(token) {
  return new Promise((resolve, reject) => {
    resolve({
      data: { username: 'admin', name: 'admin', 'role': ['admin'] }
      // console.log('getUserInfo', data)
    })
  })
}
// export function getUserInfo(userInfo) {
//   return request({
//      url: '/login',
//      method: 'post',
//      params: { userInfo }
//    })
// }
