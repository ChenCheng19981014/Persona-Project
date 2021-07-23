import request from '@/utils/request'
const User = '/user/v1'
const api = {
  account: `${User}/Account`,
  department: `${User}/Department`,
  post: `${User}/Post`,
  user: `${User}/User`,
  role: `${User}/Role`,
  operationRecord: `${User}/OperationRecord`
}

/**
 * 禁用/启用用户
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function enableUser (parameter) {
  return request({
    url: `${api.user}/enable`,
    method: 'post',
    data: parameter
  })
}

/**
 * 更新密码
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function updatePassword (parameter) {
  return request({
    url: `${api.user}/updatepassword`,
    method: 'post',
    data: parameter
  })
}

/**
 * 创建用户
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function addUser (parameter) {
  return request({
    url: `${api.user}/adduser`,
    method: 'post',
    data: parameter
  })
}

/**
 * 根据id(批量)删除用户--用户列表用
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function deleteUser (parameter) {
  return request({
    url: `${api.user}`,
    method: 'delete',
    data: parameter
  })
}

/**
 * 获取用户常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function userInfo (parameter) {
  return request({
    url: `${api.user}`,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取用户列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function userList (parameter) {
  return request({
    url: `${api.user}/list`,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取用户岗位列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function userPostList (parameter) {
  return request({
    url: `${api.user}/postlist`,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取用户角色列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function userRoleList (parameter) {
  return request({
    url: `${api.user}/rolelist`,
    method: 'get',
    params: parameter
  })
}

/**
 * 根据用户id修改用户常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function updateUsual (parameter) {
  return request({
    url: `${api.user}/updateusual`,
    method: 'put',
    data: parameter
  })
}

/**
 * 根据id(批量)删除某个用户的岗位
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function deleteUserPosts (parameter) {
  return request({
    url: `${api.user}/deleteuserposts`,
    method: 'delete',
    data: parameter
  })
}

/**
 * 获取(顶级)部门列表(分页)
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function departmentList (parameter) {
  return request({
    url: `${api.department}/list`,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取子部门列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function departmentSonList (parameter) {
  return request({
    url: `${api.department}/list`,
    method: 'get',
    params: parameter
  })
}

/**
 * 添加部门
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function addDepartment (parameter) {
  return request({
    url: `${api.department}/adddepartment`,
    method: 'post',
    data: parameter
  })
}

/**
 * 批量删除部门
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function deleteDepartment (parameter) {
  return request({
    url: `${api.department}`,
    method: 'delete',
    data: parameter
  })
}

/**
 * 获取部门常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function departmentInfo (parameter) {
  return request({
    url: `${api.department}`,
    method: 'get',
    params: parameter
  })
}

/**
 * 修改部门常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function updateDepartment (parameter) {
  return request({
    url: `${api.department}`,
    method: 'put',
    data: parameter
  })
}

/**
 * 根据部门ID获取包含岗位列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function departmentPostList (parameter) {
  return request({
    url: `${api.department}/postlist`,
    method: 'get',
    params: parameter
  })
}

/**
 * 根据部门ID获取包含用户列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function departmentUserList (parameter) {
  return request({
    url: `${api.department}/userlist`,
    method: 'get',
    params: parameter
  })
}

/**
 * 禁用/启用用户
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function enableRole (parameter) {
  return request({
    url: `${api.role}/enable`,
    method: 'post',
    data: parameter
  })
}

/**
 * 创建角色
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function addRole (parameter) {
  return request({
    url: `${api.role}/addrole`,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取角色列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function roleList (parameter) {
  return request({
    url: `${api.role}/list`,
    method: 'post',
    data: parameter
  })
}

/**
 * 批量删除角色
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function deleteRole (parameter) {
  return request({
    url: `${api.role}`,
    method: 'delete',
    data: parameter
  })
}

/**
 * 获取角色的常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function roleInfo (parameter) {
  return request({
    url: `${api.role}`,
    method: 'get',
    params: parameter
  })
}

/**
 * 修改某个角色的常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function updateRoleInfo (parameter) {
  return request({
    url: `${api.role}`,
    method: 'put',
    data: parameter
  })
}

/**
 * 获取某个角色包含用户列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function roleUserList (parameter) {
  return request({
    url: `${api.role}/userList`,
    method: 'get',
    params: parameter
  })
}

/**
 * 添加角色的包含用户
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function addRoleUser (parameter) {
  return request({
    url: `${api.role}/addroleuser`,
    method: 'post',
    data: parameter
  })
}

/**
 * 批量删除角色的包含用户
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function delRoleUser (parameter) {
  return request({
    url: `${api.role}/deleteroleuser`,
    method: 'delete',
    data: parameter
  })
}

/**
 * 获取某个角色包含岗位列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function rolePostList (parameter) {
  return request({
    url: `${api.role}/postlist`,
    method: 'get',
    params: parameter
  })
}

/**
 * 添加某个角色的岗位
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function addRolePost (parameter) {
  return request({
    url: `${api.role}/addrolepost`,
    method: 'post',
    data: parameter
  })
}

/**
 * 批量删除角色的岗位
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function delrolepost (parameter) {
  return request({
    url: `${api.role}/deleterolepost`,
    method: 'delete',
    data: parameter
  })
}

/**
 * 获取某个角色包含的部门列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function roleDepartmentList (parameter) {
  return request({
    url: `${api.role}/departmentlist`,
    method: 'get',
    params: parameter
  })
}

/**
 * 添加某个角色的部门
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function addRoleDepartment (parameter) {
  return request({
    url: `${api.role}/addroledepartment`,
    method: 'post',
    data: parameter
  })
}

/**
 * 批量删除某个角色包含的部门
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function delRoleDepartment (parameter) {
  return request({
    url: `${api.role}/deleteroledepartment`,
    method: 'delete',
    data: parameter
  })
}

/**
 * 获取岗位列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function postList (parameter) {
  return request({
    url: `${api.post}/list`,
    method: 'post',
    data: parameter
  })
}

/**
 * 创建岗位
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function createPost (parameter) {
  return request({
    url: `${api.post}/addpost`,
    method: 'post',
    data: parameter
  })
}

/**
 * 批量删除岗位
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function deletePost (parameter) {
  return request({
    url: `${api.post}`,
    method: 'delete',
    data: parameter
  })
}

/**
 * 获取岗位常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function postInfo (parameter) {
  return request({
    url: `${api.post}`,
    method: 'get',
    params: parameter
  })
}

/**
 * 更新岗位常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function updatePostInfo (parameter) {
  return request({
    url: `${api.post}`,
    method: 'put',
    data: parameter
  })
}

/**
 * 获取岗位包含用户
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function postUserList (parameter) {
  return request({
    url: `${api.post}/userList`,
    method: 'post',
    params: parameter
  })
}

/**
 * 获取岗位包含用户
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function operationRecord (parameter) {
  return request({
    url: `${api.operationRecord}/list`,
    method: 'get',
    params: parameter
  })
}
