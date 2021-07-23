import request from '@/utils/request'
const Config = '/sm/v1'
const api = {
    productConfig: `${Config}/ProductConfiguration`, // 产品配置
    rules: `${Config}/SalesRuleRestrict` // 约束规则
}

/**
 * 获取超级bom约束规则列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function materialRuleList (parameter) {
    return request({
        url: `${api.rules}`,
        method: 'get',
        params: parameter
    })
}

/**
 * 校验约束规则
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function rulerestrictcheck (parameter) {
    return request({
        url: `${api.rules}/rulerestrictcheck`,
        method: 'post',
        data: parameter
    })
}

/**
 * 编辑超级bom约束规则
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function editMaterialRule (parameter) {
    return request({
        url: `${api.rules}/rulerestrictoperate`,
        method: 'post',
        data: parameter
    })
}

/**
 * 获取bom结构平铺展示
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function configInfo (parameter) {
    return request({
        url: api.productConfig,
        method: 'get',
        params: parameter
    })
}

/**
 * 添加销售配置
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function addProductConfig (parameter) {
    return request({
        url: api.productConfig,
        method: 'post',
        data: parameter
    })
}

/**
 * 编辑销售配置常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function editProductConfig (parameter) {
    return request({
        url: `${api.productConfig}?configId=${parameter.configId}`,
        method: 'put',
        data: parameter
    })
}

/**
 * 编辑销售配置详情
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function editProductConfigDetail (parameter) {
    return request({
        url: `${api.productConfig}/editDetail?configId=${parameter.configId}`,
        method: 'put',
        data: parameter
    })
}

/**
 * 删除销售配置
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function delProductConfig (parameter) {
    return request({
        url: `${api.productConfig}`,
        method: 'delete',
        data: parameter
    })
}

/**
 * 销售配置列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function productConfigList (parameter) {
    return request({
        url: `${api.productConfig}/list`,
        method: 'post',
        data: parameter
    })
}

/**
 * 获取配置常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function productConfigDetail (parameter) {
    return request({
        url: `${api.productConfig}/detail`,
        method: 'get',
        params: parameter
    })
}

/**
 * 配置点击下一步验证
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function checkConfig (parameter) {
    return request({
        url: `${api.productConfig}/checkCategory?billId=${parameter.billId}`,
        method: 'post',
        data: parameter.list
    })
}

/**
 * 获取销售配置电商模拟视图
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function webView (parameter) {
    return request({
        url: `${api.productConfig}/view`,
        method: 'get',
        params: parameter
    })
}
