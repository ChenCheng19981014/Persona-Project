import request from '@/utils/request'
const wm = '/wm/v1'
const api = {
  wmList: `${wm}/Warehouses`, // 仓库列表,
  houseDetail: `${wm}/Warehouse`, // 仓库信息
  deleteWare: `${wm}/Warehouses`, // 删除仓库信息
  addWare: `${wm}/Warehouse`, // 新增用户信息
  state: `${wm}/Warehouses/State`, // 启用禁用
  updateDepartment: `${wm}/Warehouses`, // 修改
  daList: `${wm}/Reservoirs`, // 库区列表
  reState: `${wm}/Reservoirs/State`, // 库区启用禁用
  deleteReser: `${wm}/Reservoirs`, // 删除库区
  reservoirDetail: `${wm}/Reservoir`, // 获取库位信息
  addReservoir: `${wm}/Reservoir`, // 添加库区信息
  updateReservoir: `${wm}/Reservoirs`, // 修改库区信息
  locationList: `${wm}/Locations` // 库位列表
}
/**
 * 获取仓库列表信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function wmList (parameter) {
  return request({
    url: `${api.wmList}?pageIndex=${parameter.pageIndex}&pageSize=${parameter.pageSize}`,
    method: 'post',
    data: parameter
  })
}
/**
 * 获取库区列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function daList (parameter) {
  return request({
    url: `${api.daList}?pageIndex=${parameter.pageIndex}&pageSize=${parameter.pageSize}`,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取库位列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function locationList (parameter) {
  return request({
    url: `${api.locationList}?pageIndex=${parameter.pageIndex}&pageSize=${parameter.pageSize}`,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取仓库信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function houseDetail (parameter) {
  return request({
    url: `${api.houseDetail}/${parameter.id}`,
    method: 'get'
  })
}

/**
 * 获取库位信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function reservoirDetail (parameter) {
  return request({
    url: `${api.reservoirDetail}/${parameter.id}`,
    method: 'get'
  })
}

/**
 * 删除仓库信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function deleteWare (parameter) {
  return request({
    url: api.deleteWare,
    method: 'delete',
    data: parameter
  })
}
/**
 * 删除库区信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function deleteReser (parameter) {
  return request({
    url: api.deleteReser,
    method: 'delete',
    data: parameter
  })
}

/**
 * 新增仓库信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function addWare (parameter) {
  return request({
    url: api.addWare,
    method: 'post',
    data: parameter
  })
}

/**
 * 新增库区信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function addReservoir (parameter) {
  return request({
    url: api.addReservoir,
    method: 'post',
    data: parameter
  })
}

/**
 * 启用禁用
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function state (parameter) {
  return request({
    url: api.state,
    method: 'put',
    data: parameter
  })
}
/**
 * 库区启用禁用
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function reState (parameter) {
  return request({
    url: api.reState,
    method: 'put',
    data: parameter
  })
}
/**
 * 修改仓库
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function updateDepartment (parameter) {
  return request({
    url: api.updateDepartment,
    method: 'put',
    data: parameter
  })
}

/**
 * 修改库区
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function updateReservoir (parameter) {
  return request({
    url: api.updateReservoir,
    method: 'put',
    data: parameter
  })
}
