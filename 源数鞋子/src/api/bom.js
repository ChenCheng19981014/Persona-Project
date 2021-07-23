import request from '@/utils/request'
const Bom = '/bom/v1'
const api = {
    bom: `${Bom}/Bill`, // bom,
    bomList: `${Bom}/Bill/list`, // 根据目录id获取bom列表,
    statusChange: `${Bom}/Bill/statusChange`, // 状态转换,
    move: `${Bom}/Bill/move`, // 批量移动BOM到文件夹
    cancel: `${Bom}/Bill/cancel`, // 取消(撤销)BOM的创建--创建BOM结构时用
    root: `${Bom}/Bill/root`, // 根据Bom id获取根物料id
    lock: `${Bom}/Bill/lock`, // 开始编辑BOM，加锁
    unlock: `${Bom}/Bill/unlock`, // 结束编辑BOM，解锁
    structure: `${Bom}/Structure`, // 添加子物料时，获取子物料向下分支的物料id列表(提供给前端验证用)
    billMaterialRuleRestrict: `${Bom}/billMaterialRuleRestrict`,
    variant: `${Bom}/Variant` // 变体
}

/**
 * 根据目录id获取bom列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function bomList (parameter) {
    return request({
        url: api.bomList,
        method: 'post',
        data: parameter
    })
}

/**
 * 新增bom
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function addBom (parameter) {
    return request({
        url: api.bom,
        method: 'post',
        data: parameter
    })
}

/**
 * 根据id获取bom常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function BomDetail (parameter) {
    return request({
        url: api.bom,
        method: 'get',
        params: parameter
    })
}

/**
 * 根据id更新bom常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function updateBom (parameter) {
    return request({
        url: `${api.bom}?id=${parameter.id}`,
        method: 'put',
        data: parameter
    })
}

/**
 * 批量删除bom
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function deleteBom (parameter) {
    return request({
        url: api.bom,
        method: 'delete',
        data: parameter
    })
}

/**
 * 状态转换
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function statusChange (parameter) {
    return request({
        url: api.statusChange,
        method: 'put',
        data: parameter
    })
}

/**
 * 批量移动bom到文件夹
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function move (parameter) {
    return request({
        url: api.move,
        method: 'put',
        data: parameter
    })
}

/**
 * 根据Bom id获取根物料id
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function root (parameter) {
    return request({
        url: api.root,
        method: 'get',
        params: parameter
    })
}

/**
 * 取消(撤销)BOM的创建--创建BOM结构时用
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function cancel (parameter) {
    return request({
        url: api.cancel,
        method: 'delete',
        params: parameter
    })
}

/**
 * 开始编辑bom,加锁
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function lock (parameter) {
    return request({
        url: api.lock,
        method: 'put',
        data: parameter
    })
}

/**
 * 结束编辑bom,解锁
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function unlock (parameter) {
    return request({
        url: api.unlock,
        method: 'put',
        data: parameter
    })
}

/**
 * 添加子物料时，获取选中的子物料及向下所有分支的物料子父关系结构数据(提供给前端验证用)
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function structure (parameter) {
    return request({
        url: `${api.structure}/front`,
        method: 'post',
        data: parameter
    })
}

/**
 * 编辑BOM数据(创建或修改BOM结构完成后，最后的总提交)
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function bindMaterial (parameter) {
    return request({
        url: `${api.structure}/ordinary`,
        method: 'post',
        data: parameter
    })
}

/**
 * 创建超级BOM(包含了BOM结构、类别配置及约束规则数据)
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function superCreate (parameter) {
    return request({
        url: `${api.structure}/superCreate`,
        method: 'post',
        data: parameter
    })
}

/**
 * 编辑超级BOM(包含了BOM结构和类别配置)
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function superEdit (parameter) {
    return request({
        url: `${api.structure}/superEdit`,
        method: 'post',
        data: parameter
    })
}

/**
 * 获取普通BOM下一层物料详情列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function nextOrdinaryList (parameter) {
    return request({
        url: `${api.structure}/ordinary`,
        method: 'get',
        params: parameter
    })
}

/**
 * 获取超级BOM下一层物料详情列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function nextSuperList (parameter) {
    return request({
        url: `${api.structure}/super`,
        method: 'get',
        params: parameter
    })
}

/**
 * 根据bomid获取根物料下一层用于约束规则的物料列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function firstMaterialList (parameter) {
    return request({
        url: `${api.structure}/restrict`,
        method: 'post',
        data: parameter
    })
}

/**
 * 获取导入bom的模板
 * @export
 * @param {*}
 * @return {*}
 */
 export function bomTemplate () {
    return request({
        url: `${api.structure}/bomTemplate`,
        method: 'get'
    })
}

/**
 * 导入bom
 * @export
 * @param {*}
 * @return {*}
 */
 export function importBom (parameter) {
    return request({
        url: `${api.structure}/import?catalogId=${parameter.catalogId}&bomKind=${parameter.bomKind}`,
        method: 'post',
        data: parameter.formData,
        responseType: 'arraybuffer'
    })
}

/**
 * 导出bom
 * @export
 * @param {*}
 * @return {*}
 */
 export function exportBom (parameter) {
    return request({
        url: `${api.structure}/export`,
        method: 'get',
        params: parameter,
        responseType: 'arraybuffer'
    })
}

/**
 * 获取超级bom约束规则列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function materialRuleList (parameter) {
    return request({
        url: `${api.billMaterialRuleRestrict}`,
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
        url: `${api.billMaterialRuleRestrict}/rulerestrictcheck`,
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
        url: `${api.billMaterialRuleRestrict}/rulerestrictoperate`,
        method: 'post',
        data: parameter
    })
}

/**
 * 变体列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function variantList (parameter) {
    return request({
        url: `${api.variant}`,
        method: 'post',
        data: parameter
    })
}

/**
 * 变体常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function variantDetail (parameter) {
    return request({
        url: `${api.variant}`,
        method: 'get',
        params: parameter
    })
}

/**
 * 变体bom信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function variantInfo (parameter) {
    return request({
        url: `${api.variant}/detail`,
        method: 'get',
        params: parameter
    })
}

/**
 * 创建变体
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function addVariant (parameter) {
    return request({
        url: `${api.variant}/create`,
        method: 'post',
        data: parameter
    })
}
