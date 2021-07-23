import request from '@/utils/request'
const Bom = '/bom/v1'
const Ecm = '/ecm/v1'
const api = {
    categoryProperty: `${Bom}/CategoryProperty`, // 物料类别属性
    material: `${Bom}/Material`, // 物料
    import: `${Bom}/Material/import`, // 导入物料
    materialCategory: `${Bom}/MaterialCategory`, // 物料类别
    dropdown: `${Ecm}/Unit/dropdown`, // 获取物料单位列表
    materialTemplate: `${Bom}/Material/materialTemplate`, // 获取物料单位列表
    statusChange: `${Bom}/Material/statusChange`, // 状态转换
    checkMaterialUsed: `${Bom}/Material/checkMaterialUsed` // 创建BOM选取物料验证
}

/**
 * 物料类别属性新增
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function addTypeAttribute (parameter) {
    return request({
        url: `${api.categoryProperty}?catagoryid=${parameter.categoryId}`,
        method: 'post',
        data: parameter
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

/**
 * 获取物料类型属性列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getTypeAttributeList (parameter) {
    return request({
        url: `${api.categoryProperty}?categoryId=${parameter.categoryId}`,
        method: 'get'
    })
}

/**
 * 导入物料
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function importMaterial (parameter) {
    return request({
        url: `${api.import}?catalogId=${parameter.catalogId}`,
        method: 'post',
        data: parameter.formData,
        responseType: 'arraybuffer'
    })
}

/**
 * 新建物料
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function addMaterial (parameter) {
    return request({
        url: `${api.material}`,
        method: 'post',
        data: parameter
    })
}

/**
 * 更新物料（1个）
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function updateMaterial (parameter) {
    return request({
        url: `${api.material}`,
        method: 'put',
        data: parameter
    })
}

/**
 * 删除物料（可批量）
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function delMaterial (parameter) {
    return request({
        url: `${api.material}`,
        method: 'delete',
        data: parameter
    })
}

/**
 * 获取一个物料的常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function materialDetail (parameter) {
    return request({
        url: `${api.material}?id=${parameter.id}`,
        method: 'get'
    })
}

/**
 * 获取选中文件夹下的物料
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getMaterial (parameter) {
    return request({
        url: `${api.material}/list`,
        method: 'post',
        data: parameter
    })
}

/**
 * 下载物料模板
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function materialTemplate () {
    return request({
        url: `${api.materialTemplate}`,
        method: 'get'
    })
}

/**
 * 物料类别新增
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function addMaterialType (parameter) {
    return request({
        url: `${api.materialCategory}`,
        method: 'post',
        data: parameter
    })
}

/**
 * 物料类别删除
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function delMaterialType (parameter) {
    return request({
        url: `${api.materialCategory}`,
        method: 'delete',
        data: parameter
    })
}

/**
 * 物料类别更新
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function updateMaterialType (parameter) {
    return request({
        url: `${api.materialCategory}?categoryid=${parameter.id}`,
        method: 'put',
        data: parameter
    })
}

/**
 * 物料类别明细
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function materialTypeDetail (parameter) {
    return request({
        url: `${api.materialCategory}/detail?categoryid=${parameter}`,
        method: 'get'
    })
}

/**
 * 物料类别列表-分页,搜索条件 类别名称
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getMaterialTypeList (parameter) {
    return request({
        url: `${api.materialCategory}/list`,
        method: 'get',
        params: parameter
    })
}

/**
 * 获取物料单位列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getUnit (parameter) {
    return request({
        url: `${api.dropdown}`,
        method: 'get',
        params: parameter
    })
}

/**
 * 获取物料类别列表（下拉选择框使用）
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getCategory (parameter) {
    return request({
        url: `${api.materialCategory}/dropdown`,
        method: 'get',
        params: parameter
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
        url: `${api.statusChange}`,
        method: 'put',
        data: parameter
    })
}

/**
 * 状态转换
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function checkMaterialUsed (parameter) {
    return request({
        url: `${api.checkMaterialUsed}`,
        method: 'get',
        params: parameter
    })
}
