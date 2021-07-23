class Bus {
  constructor() {
    this.list = {};
  }
  $on(name, fn) {
    this.list[name] = this.list[name] || fn;
  }

  $emit(name, data) {
    if (this.list[name] === undefined) throw Error("请先挂载在使用");
    if (data instanceof Array) {
      this.list[name](...data);
      console.log("list");
    } else {
      console.log("lista");
      this.list[name](data);
    }
  }
  $off(name) {
    if (this.list[name]) {
      delete this.list[name];
    }
  }
}
export default new Bus();
