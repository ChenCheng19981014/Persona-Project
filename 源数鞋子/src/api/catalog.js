import request from '@/utils/request'
const Doc = '/ecm/v1'
const api = {
    catalog: `${Doc}/Catalog`, // 目录crud,
    catalogSpreadAll: `${Doc}/Catalog/spreadAll`,
    catalogStatistic: `${Doc}/Catalog/catalogStatistic`, // 文件夹目录统计
    catalogDetail: `${Doc}/Catalog/detail`, // 文件夹明细
    catalogType: `${Doc}/Catalog/cataLogType`,
    importCatalog: `${Doc}/Catalog/leadincatalog` // 上传文件夹
}
/**
 * 文件夹分类
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getCatalogType () {
    return request({
        url: api.catalogType
    })
}

/**
 * 文件夹目录
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getCatalogList (parameter) {
    return request({
        url: api.catalog,
        method: 'get'
    })
}

/**
 * 文件夹目录新增
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function insertNewCatalog (parameter) {
    return request({
        url: api.catalog,
        method: 'post',
        data: parameter
    })
}

/**
 * 文件夹目录更新
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function updateCatalog (parameter) {
    return request({
        url: `${api.catalog}?catalogid=${parameter.id}`,
        method: 'put',
        data: parameter
    })
}
/**
 * 文件夹目录删除
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function removeCatalog (parameter) {
    return request({
        url: api.catalog,
        method: 'DELETE',
        params: parameter
    })
}

/**
 * 文件夹目录
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getExpandCatalog (parameter) {
    return request({
        url: api.catalogSpreadAll,
        method: 'get',
        params: parameter
    })
}

/**
 * 文件夹目录统计
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getCatalogStatistic (parameter) {
    return request({
        url: api.catalogStatistic,
        method: 'get',
        params: parameter
    })
}

/**
 * 文件夹明细
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getCatalogDetail (parameter) {
    return request({
        url: api.catalogDetail,
        method: 'get',
        params: parameter
    })
}

/**
 * 上传文件夹
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function importCatalog (parameter) {
    return request({
        url: api.importCatalog,
        method: 'post',
        data: parameter
    })
}
