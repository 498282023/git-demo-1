const unique = (array) => {
  const map=new Map()
  array.forEach((value)=>{
      if(!map.has(value))map.set(value,true) 
  })
  return Array.from(map.keys())
}
let arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN','NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr));