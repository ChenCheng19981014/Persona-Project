import request from '@/utils/request'
const record = '/record/v1'
const api = {
    operation: `${record}/Operation/list` // 获取操作记录
}
/**
 * 获取操作日志
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function operation (parameter) {
    return request({
        url: api.operation,
        method: 'get',
        params: parameter
    })
}
