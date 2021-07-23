import request from '@/utils/request'

const userApi = {
  account: '/user/v1/Account'
  // Login: '/user/v1/Account/login', // 登录
  // Logout: '/user/v1/Account/logout', // 登出
  // updatePwd:'/user/v1/Account', // 用户修改账户密码
  // getUserInfo:'/user/v1/Account/getuserinfo', // 用户修改账户密码
  // updatePwd:'/user/v1/Account', // 用户修改账户密码
  // ForgePassword: '/auth/forge-password',
  // Register: '/auth/register',
  // twoStepCode: '/auth/2step-code',
  // SendSms: '/account/sms',
  // SendSmsErr: '/account/sms_err',
  // // get my info
  // UserInfo: '/user/info',
  // UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: `${userApi.account}/login`,
    method: 'post',
    data: parameter
  })
}

export function logout () {
  return request({
    url: `${userApi.account}/logout`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

// 用户修改账户密码
export function updatePwd (parameter) {
  return request({
    url: `${userApi.account}`,
    method: 'put',
    data: parameter
  })
}

// 获取用户个人信息
export function getUserInfo (parameter) {
  return request({
    url: `${userApi.account}/getuserinfo`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params: parameter
  })
}

// 修改用户个人信息
export function updateUserInfo (parameter) {
  return request({
    url: `${userApi.account}/updatepersonalinfo`,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}

// export function getInfo () {
//   return request({
//     url: userApi.UserInfo,
//     method: 'get',
//     headers: {
//       'Content-Type': 'application/json;charset=UTF-8'
//     }
//   })
// }

// export function getCurrentUserNav () {
//   return request({
//     url: userApi.UserMenu,
//     method: 'get'
//   })
// }

// /**
//  * get user 2step code open?
//  * @param parameter {*}
//  */
// export function get2step (parameter) {
//   return request({
//     url: userApi.twoStepCode,
//     method: 'post',
//     data: parameter
//   })
// }
