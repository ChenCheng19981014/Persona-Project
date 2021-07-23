import request from './request'

/**
 * @description: 获取上传地址
 * @param {string} guid 唯一标识
 * @param {string} fileName 文件名称
 * @return {Promise}
 */
export function fetchUploadUrl ({ guid, fileName, bucket }) {
  return request({
    baseURL: `http://192.168.1.230:10010/api/dfs/v1`,
    url: `/storage/${fileName}`,
    method: 'get',
    timeout: 600000,
    headers: { 'X-Bucket': bucket }
  })
}

/**
 * @description: 获取图片上传的url
 * @param {string} guid 唯一标识
 * @param {string} fileName 文件名称
 * @return {Promise}
 */
 export function getUploadUrl (parameters) {
  return request({
    baseURL: `http://192.168.1.230:10010/api/dfs/v1`,
    // url: `/storage/${guid}/${fileName}`,
    url: `/Storage/getObjectUrl`,
    method: 'post',
    data: parameters,
    // timeout: 600000,
    headers: { 'X-Bucket': 'bom' }
  })
}

/**
 * @description: 上传文件至minio服务器
 * @param {string} url minio地址
 * @param {object} data 文件流
 * @return {Promise}
 */
export function uploadFiles ({ url, data, onProgress }) {
  return request({
    baseURL: url,
    url: '',
    method: 'put',
    data,
    timeout: 600000,
    headers: { 'X-Bucket': 'doc', 'Content-Type': 'application/octet-stream' },
    onUploadProgress: progressEvent => {
      let percent = Number(((progressEvent.loaded / progressEvent.total) * 100).toFixed(0))
      onProgress(percent, data)
    }
  })
}

/**
 * @description: 上传文件至minio服务器（仅用于图片上传，不需要上传进度）
 * @param {string} url minio地址
 * @param {object} data 文件流
 * @return {Promise}
 */
 export function uploadImages ({ url, data, bucket }) {
  return request({
    baseURL: url,
    url: '',
    method: 'put',
    data,
    timeout: 600000,
    headers: { 'X-Bucket': bucket, 'Content-Type': 'application/octet-stream' }
  })
}

/**
 * @description: 创建上传文件的信息
 * @param {string} totalChunkCounts 文件块
 * @param {string} md5 文件md5值
 * @param {int} size 文件大小
 * @param {string} fileName 文件名
 * @return {Promise}
 */
export function newMultiFileUpload ({ totalChunks, md5, size, fileName }) {
  return request({
    baseURL: 'http://192.168.1.230:10010/api/dfs/v1/BreakPointUpload',
    method: 'post',
    data: { totalChunks, md5, size, fileName },
    timeout: 600000,
    headers: { 'X-Bucket': 'doc' }
  })
}

/**
 * @description: 更新分片
 * @param {object} data 文件流
 * @param {string} chunkNum 当前切片
 * @param {number} id 文件id
 * @param {boolean} isLastPart 是否是最后一块切片
 * @return {Promise}
 */
export function updateFileChunks ({ data, chunkNum, id, isLastPart }) {
  return request({
    baseURL: 'http://192.168.1.230:10010/api/dfs/v1/BreakPointUpload',
    url: `/uploadChunks?id=${id}&chunkNum=${chunkNum}&isLastPart=${isLastPart}`,
    method: 'post',
    headers: { 'X-Bucket': 'doc', 'Content-Type': 'application/octet-stream' },
    timeout: 600000,
    data
  })
}
/**
 * @description: 上传完成
 * @param {number} id 文件id
 * @return {Promise}
 */
export function completeFileMultipart ({ id }) {
  return request({
    baseURL: 'http://192.168.1.230:10010/api/dfs/v1/BreakPointUpload',
    url: `/completeMultiPart/${id}`,
    method: 'get',
    timeout: 600000,
    headers: { 'X-Bucket': 'doc' }
  })
}
