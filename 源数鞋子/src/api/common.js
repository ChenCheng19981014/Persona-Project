import request from '@/utils/request'
const Ecm = '/ecm/v1'
const api = {
    upload: `${Ecm}/Common`, // 回收站,
    serialNumber: `${Ecm}/SerialNumber` // 回收站,
}

/**
 * 上传图片
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function uploadImage (parameter) {
    return request({
        url: `${api.upload}/uploadImage`,
        method: 'post',
        data: parameter,
        headers: { 'Content-Type': 'multipart/form-data' }
    })
}

/**
 * 判断模块是否有配置编码规则
 * @export
 * @param {*} parameter
 * @return {*}
 */
 export function ifConfigRule (parameter) {
    return request({
        url: `${api.serialNumber}/rule`,
        method: 'get',
        params: parameter
    })
}
