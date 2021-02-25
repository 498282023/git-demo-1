// var arr = [
//   { 名称: "动物", id: 1, parent: null },
//   { 名称: "狗", id: 2, parent: 1 },
//   { 名称: "猫", id: 3, parent: 1 },
// ]
// var obj = {
//   id: 1,
//   名称: "动物",
//   children: [
//     { id: 2, 名称: "狗", children: null },
//     { id: 3, 名称: "猫", children: null },
//   ]
// }
// var newres=arr.reduce((result, item) => {
//   if(item.parent===null){
//     result.id=item.id
//   }else{
//     result.children.push(item)
//     delete item.parent
//     item.children=null
//   }
//   return result
// }, {id:null,children:[]})
// console.log(newres);