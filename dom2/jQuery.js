window.jQuery = window.$ = function (selectorOrArray) {
  let elements
  if (typeof selectorOrArray === "string") {
    elements = document.querySelectorAll(selectorOrArray)
  } else {
    elements = selectorOrArray
  }
  const api = Object.create(jQuery.prototype)
  Object.assign(api, {
    elements: elements,
    oldApi: selectorOrArray.oldApi
  })
  return api
}
jQuery.prototype = {
  constructor:jQuery,
  jquery: true,
  get(index){
    return this.elements[index]
  },
  addClass(className) {
    for (let i = 0; i < this.elements.length; i++) {
      this.elements[i].classList.add(className)
    }
    return this
  },
  find(selector) {
    let array = []
    for (let i = 0; i < this.elements.length; i++) {
      array = array.concat(Array.from(this.elements[i].querySelectorAll(selector)))
    }
    array.oldApi = this
    return jQuery(array)
  },
  each(fn) {
    for (let i = 0; i < this.elements.length; i++) {
      fn.call(null, this.elements[i], i)
    }
    return this
  },
  parent() {
    const array = []
    this.each((div) => {
      if (array.indexOf(div.parentNode) === -1) {
        array.push(div.parentNode)
      }
    })
    return jQuery(array)
  },
  children() {
    const array = []
    this.each(node => {
      if (array.indexOf(node) === -1) array.push(...node.children)
    })
    return jQuery(array)
  },
  siblings() {
    let array = []
    this.each(node => {
      if (array.indexOf(node.parentNode) === -1) array.push(node.parentNode)
    })
    return jQuery(array)
  },
  print() {
    console.log(this.elements);
  },
  end() {
    return this.oldApi
  },
}