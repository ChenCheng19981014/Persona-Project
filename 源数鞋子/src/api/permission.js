import request from '@/utils/request'
const Ecm = '/ecm/v1'
const api = {
  permission: `${Ecm}/Permission`
}

/**
 * 获取权限列表
 * @param parameter
 * @returns {*}
 */
export function permissionList (parameter) {
  return request({
    url: `${api.permission}/rolepermissionlist`,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取权限列表
 * @param parameter
 * @returns {*}
 */
 export function updatePermission (parameter) {
  return request({
    url: `${api.permission}/operaterolepermission?roleId=${parameter.roleId}`,
    method: 'post',
    data: parameter.checkedIds
  })
}
