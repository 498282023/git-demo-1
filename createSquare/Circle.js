function Circle(radius){
  this.radius=radius
}
Circle.prototype.getArea=function(){
  return Math.PI*this.radius*this.radius
}
Circle.prototype.getLength=function(){
  return Math.PI*2
}