const level1=document.querySelector(".level1")
const level2=document.querySelector(".level2")
const level3=document.querySelector(".level3")
const level4=document.querySelector(".level4")
const level5=document.querySelector(".level5")
const level6=document.querySelector(".level6")
const level7=document.querySelector(".level7")
let n=1
const f1=function(e){
  let t=e.currentTarget
 setTimeout(()=>{
   t.classList.add("x")
 },1000*n)
 n++
}
const f2=function(e){
  let t=e.currentTarget
 setTimeout(()=>{
   t.classList.remove("x")
 },1000*n)
 n++
}

level1.addEventListener("click",f1,true)
level2.addEventListener("click",f1,true)
level3.addEventListener("click",f1,true)
level4.addEventListener("click",f1,true)
level5.addEventListener("click",f1,true)
level6.addEventListener("click",f1,true)
level7.addEventListener("click",f1,true)

level1.addEventListener("click",f2)
level2.addEventListener("click",f2)
level3.addEventListener("click",f2)
level4.addEventListener("click",f2)
level5.addEventListener("click",f2)
level6.addEventListener("click",f2)
level7.addEventListener("click",f2)