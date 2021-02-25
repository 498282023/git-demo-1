function find(array,fn){
  for (let i = 0; i < array.length; i++) {
    if(fn(array[i])) return array[i] 
  }
}
function findIndex(array,fn){
  for (let i = 0; i < array.length; i++) {
    if(fn(array[i])) return i
  }
}
var arr=[1,3,5,7,9,5,3,155,20,111,222]
var res=find(arr,v=>v%10==0)
console.log(res);