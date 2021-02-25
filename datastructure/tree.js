const createTree = (value) => {
  return {
    data: value,
    children: null,
    parent:null
  }
}
const addChild = (node, value) => {
  const child = createTree(value)
  child.parent=node
  node.children = node.children || []
  node.children.push(child)
  return child
}

const travel=(tree,fn)=>{
  fn(tree)
  if(!tree.children)return
  for (let i = 0; i < tree.children.length; i++) {
    travel(tree.children[i],fn)
  }
}

const removeNode=(tree,node)=>{
  const siblings=node.parent.children
  for (let i = 0; i < siblings.length; i++) {
    if(siblings[i]===node){
      return siblings.splice(i,1)
    }    
  }
  return undefined
}

const tree=createTree(10)
const node2=addChild(tree,20)
addChild(tree,30)
addChild(tree,40)
const node5=addChild(tree,50)
addChild(node2,201)
addChild(node2,202)
addChild(node2,203)
addChild(node2,204)
console.log(tree);
// travel(tree,node=>{console.log(node.data);})

removeNode(tree,node5)
console.log(tree);