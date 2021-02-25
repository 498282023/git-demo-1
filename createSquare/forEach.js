function forEach(array,fn){
  for (let i = 0; i < array.length; i++) {
    fn(array[i],i,array)
  }
} 

forEach(['a','b','c'],(v,i,arr)=>{
  console.log(v,i,arr);
})