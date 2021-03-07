import EventBus from "./EventBus";

class Model extends EventBus {
  constructor(options) {
    super()
    const keys = ["data", "create", "delete", "update", "get"]
    keys.forEach((key) => {
      if (key in options) {
        this[key] = options[key]
      }
    })
  }

  create() {
    console && console.error && console.error("你还没有实现create")
  }

  delete() {
    console.error("你还没有实现delete")
  }

  update() {
    console.error("你还没有实现update")
  }

  get() {
    console.error("你还没有实现get")
  }

}

export default Model