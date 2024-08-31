export default class BaseEntity<T> {
    constructor(data: T) {
      Object.assign(this, data)
    }
  }
  