import request from '@/utils/request'
const Ecm = '/ecm/v1'
const api = {
    numberRules: `${Ecm}/numberRules`, //
    numberRule: `${Ecm}/numberRule` //
}

/**
 * 获取编码对象枚举键值对
 * @export
 * @param {*}
 * @return {*}
 */
export function typeList () {
    return request({
        url: `${api.numberRule}/enums`,
        method: 'post'
    })
}

/**
 * 获取编码规则列表
 * @export
 * @param {*}
 * @return {*}
 */
 export function numberRuleList (parameter) {
    return request({
        url: `${api.numberRules}?pageIndex=${parameter.pageIndex}&pageSize=${parameter.pageSize}`,
        method: 'post',
        data: parameter
    })
}

/**
 * 新建编码规则
 * @export
 * @param {*}
 * @return {*}
 */
 export function createNumberRule (parameter) {
    return request({
        url: `${api.numberRule}`,
        method: 'post',
        data: parameter
    })
}

/**
 * 编辑编码规则
 * @export
 * @param {*}
 * @return {*}
 */
 export function updateNumberRule (parameter) {
    return request({
        url: `${api.numberRule}/${parameter.id}`,
        method: 'put',
        data: parameter
    })
}

/**
 * 批量删除编码规则
 * @export
 * @param {*}
 * @return {*}
 */
 export function delNumberRule (parameter) {
    return request({
        url: `${api.numberRules}`,
        method: 'delete',
        data: parameter
    })
}

/**
 * 获取编码规则明细
 * @export
 * @param {*}
 * @return {*}
 */
 export function numberRuleDetail (parameter) {
    return request({
        url: `${api.numberRule}/${parameter.id}`,
        method: 'get'
    })
}

/**
 * 获取编段详情列表
 * @export
 * @param {*}
 * @return {*}
 */
 export function codeSegmentList (parameter) {
    return request({
        url: `${api.numberRule}/${parameter.id}/numberFields`,
        method: 'post'
    })
}

/**
 * 编辑码段列表
 * @export
 * @param {*}
 * @return {*}
 */
 export function updateCodeSegment (parameter) {
    return request({
        url: `${api.numberRule}/${parameter.id}/numberFields`,
        method: 'put',
        data: parameter.list
    })
}
