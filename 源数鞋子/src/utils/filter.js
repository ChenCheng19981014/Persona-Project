import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
 export function numberFormatter (num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * 时间转换
 * @param {*}  input  初始时间
 * @param {*}  fmtstring  时间格式
 */
export const numberToFixed = (val) => {
  if (!val) {
    return ''
  } else {
    return parseFloat(val).toFixed(2)
  }
}

/**
 * 时间转换
 * @param {*}  input  初始时间
 * @param {*}  fmtstring  时间格式
 */
export const dateFormat = (input, fmtstring) => {
  if (!input || input <= 0) {
    return ''
  }
  // 使用momentjs这个日期格式化类库实现日期的格式化功能
  return moment(input).format(fmtstring)
}

/**
 * 文件大小转换
 * @param {*}  input  初始时间
 * @param {*}  fmtstring  时间格式
 */
export const documentSizeFormat = (size) => {
  return parseInt(size / 1024) + 'KB'
}

export const documentStatus = (status) => {
  let statusStr = ''
  switch (status) {
    case 1:
      statusStr = '拟制'
      break
    case 2:
      statusStr = '归档'
      break
    case 3:
      statusStr = '发布'
      break
    case 4:
      statusStr = '废止'
  }
  return statusStr
}

export const materialProductionType = (type) => {
  let typeStr = ''
  switch (type) {
    case 1:
      typeStr = '自制件'
      break
    case 2:
      typeStr = '外购件'
      break
    case 3:
      typeStr = '外协件'
      break
    case 4:
      typeStr = '组合件'
  }
  return typeStr
}

export const renderDocumentType = (type) => {
  let url
  if (type === '.xls' || type === '.xlsx') {
    url = require('@/assets/document/excel.png')
  } else if (type === '.pdf') {
    url = require('@/assets/document/pdf.png')
  } else if (type === '.doc' || type === '.docx') {
    url = require('@/assets/document/word.png')
  } else if (type === '.ppt') {
    url = require('@/assets/document/ppt.png')
  } else if (type === '.jpg' || type === '.png') {
    url = require('@/assets/document/image.png')
  } else if (type === '.txt') {
    url = require('@/assets/document/txt.png')
  } else {
    url = require('@/assets/document/weizhi.png')
  }
  return url
}
