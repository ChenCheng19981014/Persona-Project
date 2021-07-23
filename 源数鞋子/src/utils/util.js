export function timeFix () {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
}

export function welcome () {
  const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent () {
  const event = document.createEvent('HTMLEvents')
  event.initEvent('resize', true, true)
  event.eventType = 'message'
  window.dispatchEvent(event)
}

export function handleScrollHeader (callback) {
  let timer = 0

  let beforeScrollTop = window.pageYOffset
  callback = callback || function () {}
  window.addEventListener(
    'scroll',
    event => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        let direction = 'up'
        const afterScrollTop = window.pageYOffset
        const delta = afterScrollTop - beforeScrollTop
        if (delta === 0) {
          return false
        }
        direction = delta > 0 ? 'down' : 'up'
        callback(direction)
        beforeScrollTop = afterScrollTop
      }, 50)
    },
    false
  )
}

export function isIE () {
  const bw = window.navigator.userAgent
  const compare = (s) => bw.indexOf(s) >= 0
  const ie11 = (() => 'ActiveXObject' in window)()
  return compare('MSIE') || ie11
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate (id = '', timeout = 1500) {
  if (id === '') {
    return
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id))
  }, timeout)
}
export function scorePassword (pass) {
  let score = 0
  if (!pass) {
    return score
  }
  // award every unique letter until 5 repetitions
  const letters = {}
  for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1
      score += 5.0 / letters[pass[i]]
  }

  // bonus points for mixing it up
  const variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass)
  }

  let variationCount = 0
  for (var check in variations) {
      variationCount += (variations[check] === true) ? 1 : 0
  }
  score += (variationCount - 1) * 10

  return parseInt(score)
}

/**
 * @description: 生成guid
 * @param {void}
 * @return {string} guid
 */
export function guid () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0; var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

/**
 * 对象/数组 深拷贝
 * @param {*} obj
 */
 export function deepCopy (obj) {
  let newObj = obj.constructor === Array ? [] : {} // 判断是深拷贝对象还是数组
  for (let i in obj) {
    if (typeof obj[i] === 'object' && obj[i] !== null) {
      newObj[i] = deepCopy(obj[i]) //  如果要拷贝的对象的属性依然是个复合类型，递归
    } else {
      newObj[i] = obj[i]
    }
  }
  return newObj
}

// 去重
export function mergeArray (arr1, arr2, field) {
  let _arr = []
  for (let i = 0; i < arr1.length; i++) {
    _arr.push(arr1[i])
  }
  for (let x = 0; x < arr2.length; x++) {
    let flag = true
    for (let j = 0; j < arr1.length; j++) {
      if (arr2[x][field] === arr1[j][field]) {
        flag = false
        break
      }
    }
    if (flag) {
      _arr.push(arr2[x])
    }
  }
  // _arr = spliceArray(_arr, this.checkedUserIds, field)
  return _arr
}
// 删除未选择数据
export function spliceArray (arr1, arr2, field) {
  let _arr = []
  for (let x = 0; x < arr1.length; x++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[x][field] === arr2[j]) {
        _arr.push(arr1[x])
      }
    }
  }
  return _arr
}
