function React(width,height){
  this.width=width
  this.height=height
}
React.prototype.getArea=function(){
  return this.width*this.height
}
React.prototype.getLength=function(){
  return (this.width+this.height)*2
}
let r1=new React(4,5)
r1.getArea()
r1.getLength()