import request from '@/utils/request'
const Doc = '/Doc/v1'
const api = {
  documentList: `${Doc}/Document/list`, // 文档crud,
  document: `${Doc}/Document`, // 文档常规信息
  removeDocumentHistoryVersion: `${Doc}/Document/deleteHistoryVersion`, // 删除文档的某个历史版本
  documentHistoryList: `${Doc}/Document/historyList`, // 获取选中文档的历史版本列表
  recycle: `${Doc}/Recycle`, // 回收站
  documentCategory: `${Doc}/Document/documentCategory`,
  setCurrent: `${Doc}/Document/setCurrent`, // 置为当前
  statusChange: `${Doc}/Document/statusChange`, // 状态变更
  checkRepeat: `${Doc}/Document/checkRepeat`, // 导入文档弹框确定后验证名字和编号
  import: `${Doc}/Document/import`, // 导入一个或多个文档
  download: `${Doc}/Document/download`, // 下载文件
  newVersion: `${Doc}/Document/newVersion`, // 上传新版本
  relationList: `${Doc}/Document/relationList`, // 获取关联文档列表
  addRelation: `${Doc}/Document/addRelation`, // 添加关联文档
  deleteRelation: `${Doc}/Document/deleteRelation` // 删除关联文档
}

/**
 * 获取文件夹下的所有文档
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getDocumentListById (parameter) {
  return request({
    url: api.documentList,
    method: 'post',
    data: parameter
  })
}

/**
 * 添加新的文档
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function insertNewDocument (parameter) {
  return request({
    url: api.document,
    method: 'post',
    params: parameter
  })
}
/**
 * 更新文档
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function updateDocument (parameter) {
  return request({
    url: api.document,
    method: 'put',
    data: parameter
  })
}

/**
 * 删除当前文档到回收站
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function removeDocument (parameter) {
  return request({
    url: api.document,
    method: 'delete',
    data: parameter
  })
}

/**
 * 获取选中文档的常规信息
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getDocumentDetailById (parameter) {
  return request({
    url: api.document,
    method: 'get',
    params: parameter
  })
}

/**
 * 获取选中文档的历史版本
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getDocumentHistoryList (parameter) {
  return request({
    url: api.documentHistoryList,
    method: 'get',
    params: parameter
  })
}

/**
 * 删除文档的历史版本
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function removeDocumentHistoryVersion (parameter) {
  return request({
    url: api.removeDocumentHistoryVersion,
    method: 'delete',
    data: parameter
  })
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
export function restoreRecycleById (parameter) {
  return request({
    url: `${api.recycle}/${parameter}`,
    method: 'put'
  })
}

/**
 * 彻底删除目录或文档
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function removeTrueRecycleById (parameter) {
  return request({
    url: `${api.recycle}/${parameter}`,
    method: 'delete'
  })
}
/**
 * 获取新建文档时文档分类
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function getDocumentCategory (parameter) {
  return request({
    url: api.documentCategory,
    method: 'get',
    params: parameter
  })
}

/**
 * 新建文档
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function addDocument (parameter) {
  return request({
    url: api.document,
    method: 'post',
    data: parameter
  })
}

/**
 * 置为当前
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function setCurrent (parameter) {
  return request({
    url: api.setCurrent,
    method: 'get',
    params: parameter
  })
}

/**
 * 状态变更
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
 * 验证名字是否重复
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function checkRepeat (parameter) {
  let url = ''
  if (parameter.documentId) {
    url = `${api.checkRepeat}?catalogId=${parameter.catalogId}&documentId=${parameter.documentId}`
  } else url = `${api.checkRepeat}?catalogId=${parameter.catalogId}`
  return request({
    url,
    method: 'post',
    data: parameter.fileList
  })
}

/**
 * 导入一个或多个文档
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function importDocument (parameter) {
  return request({
    url: api.import,
    method: 'post',
    data: parameter
  })
}

/**
 * 下载文件
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function download (parameter) {
  return request({
    url: api.download,
    method: 'post',
    data: parameter
  })
}

/**
 * 上传新版本
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function newVersion (parameter) {
  return request({
    url: api.newVersion,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取关联文档列表
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function relationList (parameter) {
  return request({
    url: api.relationList,
    method: 'get',
    params: parameter
  })
}

/**
 * 添加关联文档
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function addRelation (parameter) {
  return request({
    url: api.addRelation,
    method: 'post',
    data: parameter
  })
}

/**
 * 删除关联文档
 * @export
 * @param {*} parameter
 * @return {*}
 */
export function deleteRelation (parameter) {
  return request({
    url: api.deleteRelation,
    method: 'delete',
    data: parameter
  })
}

export const callbackEditExcelUrl = `${process.env.VUE_APP_API_BASE_URL}${Doc}/Document/saveCallBack`
