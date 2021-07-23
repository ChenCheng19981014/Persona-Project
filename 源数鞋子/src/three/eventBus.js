/* eslint-disable */
class Bus {
  constructor() {
    this.list = {}
  }
  $on(name, fn) {
    this.list[name] = fn
  }
  $emit() {
    if (this.list[arguments[0]] === undefined) throw Error('请先挂载在使用')
    return this.list[arguments[0]]([...arguments].filter((i, index) => index !== 0))
  }
  $off(name) {
    if (this.list[name]) {
      delete this.list[name]
    }
  }
}
export default Bus
