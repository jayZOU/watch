class Watch {
  constructor (context) {
    this.page = context
    this.observers = new Map()
    this.init()
  }

  // 将 watch 数据写入观察者队列
  init() {
    const ctx = this.page

    Object.keys(ctx.watch).forEach(path => {
      if (this.inData(path)) {
        this.observers.set(path, ctx.watch[path])
      }
    })
  }

  // 更新值并触发回调 不更新视图
  data(path, newVal) {
    if (this.inData(path)) {
      this.setter(this.page.data, path, newVal)
    }
  }

  // 更新值并触发回调 并更新视图
  setData(obj) {
    const oldData = Object.assign({}, this.page.data)

    this.page.setData(obj)
    Object.keys(obj).forEach(path => {
      if (this.observers.has(path)) {
        this.notify(path, obj[path], this.getter(oldData, path))
      }
    })
  }

  // 触发key的对应回调
  notify(key, newVal, oldVal) {
    if (!this.observers.has(key)) return
    this.observers.get(key).call(this.page, newVal, oldVal)
  }

  // 删除观察者
  unSubscribe(key) {
    this.observers.delete(key)
  }

  /**
   * 根据路径设置 data 值
   * @param {string} path 
   * @param {any} newVal 
   */
  setter(data, path, newVal) {
    if (!this.inData(path)) return

    let oldVal
    const pathArr = this._getPathArr(path)
    let res = pathArr.reduce((res, currentPath, currentIndex) => {
      // assign the new value to the key
      if (currentIndex === pathArr.length - 1) {
        oldVal = res[currentPath]
        res[currentPath] = newVal
      }

      return res[currentPath]
    }, data)

    if (this.observers.has(path)) {
      this.notify(path, newVal, oldVal)
    }

    return res
  }

  /**
   * getter 根据路径获取对应 key 的 value
   * 
   * @param {object} data data 对象
   * @param {string} path data 对象下的某一键值对的索引
   * @return {any} keyValue
   * 
   * e.g.
   * var data = {"a":{"b":{"c":{"d":123}}}}
   * getter(data, 'a.b[c]') // return {"d":123}
   */
  getter(data, path) {
    const pathArr = this._getPathArr(path)
    return pathArr.reduce((res, currentPath) => {
      const currentValueType = Object.prototype.toString.call(res)
      return /String|Number|Boolean|Null|Undefined/.test(currentValueType)
        ? undefined
        : res[currentPath]
    }, data)
  }

  // check if data.path exist
  inData(path) {
    return this.getter(this.page.data, path) !== undefined
  }

  _getPathArr(path) {
    const REG_KEY = /\[((?:\S+?))\]|\./g
    return path.toString().split(REG_KEY).filter(item => !!item)
  }
}

export default Watch
