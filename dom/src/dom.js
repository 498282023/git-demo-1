var dom = {
  create(string) {
    const container = document.createElement("template")
    container.innerHTML = string.trim()
    return container.content.firstChild
  },
  after(node, node2) {
    console.log(node.nextSibling);
    node.parentNode.insertBefore(node2, node.nextSibling)
  },
  before(node, node2) {
    node.parentNode.insertBefore(node2, node)
  },
  append(parent, child) {
    parent.appendChild(child)
  },
  wrap(node, parent) {
    dom.before(node, parent)
    dom.append(parent, node)
  },
  remove(node) {
    node.parentNode.removeChild(node)
    return node
  },
  empty(node) {
    const { childNodes } = node
    const array = []
    let x = node.firstChild
    while (x) {
      array.push(dom.remove(x))
      x = node.firstChild
    }
    return array
  },
  attr(node, name, value) {
    if (arguments.length === 3) {
      node.setAttribute(name, value)
    } else {
      return node.getAttribute(name)
    }
  },
  text(node, string) {
    if (arguments.length === 2) {
      if ("innerText" in node) {
        node.innerText = string
      } else {
        node.textContent = string
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string
    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(test,{border:"1px solid red",color:"blue"})
      node.style[name] = value
    } if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(test,"border")
        return node.style[name]
      } else if (name instanceof Object) {
        // dom.style(test,"border","1px solid red")
        for (let key in name) {
          node.style[key] = name[key]
        }
      }
    }
  },
  class:{
    add(node,className){
      node.classList.add(className)
    },
    remove(node,className){
      node.classList.remove(className)
    },
    has(node,className){
      return node.classList.contains(className)
    }
  },
  on(node,eventName,fn){
    node.addEventListener(eventName,fn)
  },
  off(node,eventName,fn){
    node.removeEventListener(eventName,fn)
  },
  find(selector,scope){
    return (scope||document).querySelector(selector)
  },
  parent(node){
    return node.parentNode
  },
  children(node){
    return node.children
  },
  sibling(node){
    return Array.from(node.parentNode.children).filter(v=>v!==node)
  },
  next(node){
    let x=node.nextSibling
    while(x.nodeType===3){
      x=x.nextSibling
    }
    return x
  },
  previous(node){
    let x=node.previousSibling
    while(x.nodeType===3){
      x=x.previousSibling
    }
    return x
  }

}
window.dom = dom