import request from '@/utils/request'
const prCrm = '/crm/v1'
const pr = '/crm/v1/customer'
const prDict = '/crm/v1/dictdatas'
const prUser = '/user/v1/User'

const api = {
  customerList: `${pr}/Customer/list` // 客户列表
}

/**
 * 客户列表
 * @export
 * @param {*} params
 * @return {*}
 */
export function CustomerList (params) {
    return request({
        url: `${pr}/list?pageIndex=${params.p.pageIndex}&pageSize=${params.p.pageSize}`,
        method: 'post',
        data: params.d
    })
}

/**
 * 创建客户
 * @export
 * @param {*} params
 * @return {*}
 */
export function Addcustomer (params) {
    return request({
        url: `${pr}`,
        method: 'post',
        data: params
    })
}

/**
 * 批量删除客户
 * @export
 * @param {*} params
 * @return {*}
 */
export function DeleteCustomer (params) {
    return request({
        url: `${prCrm}/customers`,
        method: 'delete',
        data: params
    })
}

/**
 * 获取客户常规信息
 * @export
 * @param {*} params
 * @return {*}
 */
export function CustomerDetail (params) {
    return request({
        url: `${pr}/${params.id}`,
        method: 'get'
    })
}

/**
 * 修改客户常规信息
 * @export
 * @param {*} params
 * @return {*}
 */
export function UpdatedCustomerDetail (params) {
    return request({
        url: `${pr}/${params.id}`,
        method: 'put',
        data: params
    })
}

/**
 * 获取联系人分页列表
 * @export
 * @param {*} params
 * @return {*}
 */
export function ContactList (params) {
    return request({
        url: `/crm/v1/contact/list`,
        method: 'post',
        data: params
    })
}

/**
 * 根据客户id获取联系人
 * @export
 * @param {*} params
 * @return {*}
 */
export function ContactListById (params) {
    return request({
        url: `${pr}/${params.id}/contacts`,
        method: 'post'
    })
}

/**
 * 创建联系人
 * @export
 * @param {*} params
 * @return {*}
 */
export function CreateNewContact (params) {
    return request({
        url: `${pr}/${params.id}/contact`,
        method: 'post',
        data: params
    })
}

/**
 * 修改联系人
 * @export
 * @param {*} params
 * @return {*}
 */
export function UpdatedContact (params) {
    return request({
        url: `${pr}/contact/${params.id}`,
        method: 'put',
        data: params
    })
}

/**
 * 设为默认联系人
 * @export
 * @param {*} params
 * @return {*}
 */
export function SetDefault (params) {
    return request({
        url: `${pr}/${params.id}/contact/${params.cid}/default`,
        method: 'put',
        data: params
    })
}

/**
 * 批量删除联系人
 * @export
 * @param {*} params
 * @return {*}
 */
export function DeleteContacts (params) {
    return request({
        url: `${pr}/${params.id}/contacts`,
        method: 'delete',
        data: params.cids
    })
}

/**
 * 用户列表
 * @export
 * @param {*} params
 * @return {*}
 */
export function GetUserList (params) {
    return request({
        url: `${prUser}/list`,
        method: 'post',
        data: params
    })
}

/**
 * 下拉枚举 0：客户类型，1：客户来源，2：客户状态
 * @export
 * @param {*} params
 * @return {*}
 */
export function GetSelectList (params) {
    return request({
        url: `${prDict}/${params.type}`,
        method: 'post'
        // params: params
    })
}

/**
 * 获取物料类别属性详情
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function typeAttributeDetail (parameter) {
    return request({
        url: `${api.categoryProperty}/detail`,
        method: 'get',
        params: parameter
    })
}

/**
 * 物料类别属性编辑
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function editTypeAttribute (parameter) {
    return request({
        url: `${api.categoryProperty}/update?propertyid=${parameter.propertyid}`,
        method: 'put',
        data: parameter
    })
}

/**
 * 物料类别属性删除
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function delTypeAttribute (parameter) {
    return request({
        url: `${api.categoryProperty}`,
        method: 'delete',
        data: parameter
    })
}
