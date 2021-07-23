import request from '@/utils/request'
const Doc = '/Doc/v1'
const api = {
    recycle: `${Doc}/Recycle` // 回收站,
}
/**
 * 获取回收站列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getRecycleList (parameter) {
    return request({
        url: `${api.recycle}/list`,
        method: 'get',
        params: parameter
    })
}

/**
 * 还原目录或文档
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function recoveryCatalog (parameter) {
    return request({
        url: `${api.recycle}`,
        method: 'put',
        data: parameter
    })
}

/**
 * （彻底）删除目录或文档
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function removeTrueRecycle (parameter) {
    return request({
        url: `${api.recycle}`,
        method: 'delete',
        data: parameter
    })
}

/**
 * 清空回收站
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function cleanRecycles () {
    return request({
        url: `${api.recycle}/clean`,
        method: 'delete'
    })
}
