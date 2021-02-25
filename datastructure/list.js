
const createList = (value) => {
  return createNode(value)
}
const appendList = (list, value) => {
  const node = createNode(value)
  list.next = node
  return node
}
const removeList = (list, node) => {
  let pre = null
  let p = list
  while (p !== node) {
    pre = p
    p = p.next
  }
  pre.next = p.next
}
const createNode = (value) => {
  return {
    data: value,
    next: null
  }
}
const travelList=(list,fn)=>{
    let p=list
    while(p){
      fn(p)
      p=p.next
    }
}
const list = createList(10)
const node2 = appendList(list, 20)
const node3 = appendList(node2, 30)
console.log("node3", node3);
console.log("node2", node2);
console.log("list", list);
// removeList(list, list)
// console.log("list", list);
travelList(list,(node)=>{
  console.log(node.data);
})