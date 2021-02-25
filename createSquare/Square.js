// 版本1 重复创建12个对象
var square1 = {
  width: 5,
  getArea() { return this.width * this.width },
  getLength() { return this.width * 4 },
}
var square2 = {
  width: 6,
  getArea() { return this.width * this.width },
  getLength() { return this.width * 4 },
}//x11

// 版本2 使用for循环创建12个对象
var squareList = []
var widthList = [5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6]
for (let i = 0; i < widthList.length; i++) {
  squareList[i] = {
    width: widthList[i],
    getArea() { return this.width * this.width },
    getLength() { return this.width * 4 },
  }
}

// 版本3 使用Object.create从原型中构造对象
var squareList = []
var widthList = [5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6]
var squarePrototype = {
  getArea() { return this.width * this.width },
  getLength() { return this.width * 4 },
}
for (let i = 0; i < widthList.length; i++) {
  squareList[i] = Object.create(squarePrototype)
  squareList[i].width = widthList[i]
}

// 版本4 封装构造函数creatSquare：从原型中构造对象
var squareList = []
var widthList = [5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6]
var squarePrototype = {
  getArea() { return this.width * this.width },
  getLength() { return this.width * 4 },
}
var creatSquare = function (width) {
  var obj = Object.create(squarePrototype)
  obj.width = width
}
for (let i = 0; i < widthList.length; i++) {
  squareList[i] = creatSquare(widthList[i])
}

/**
 * 版本5 1.将squarePrototype原型，挂载到构造函数creatSquare上，
 *      2.将构造函数creatSquare挂载到squarePrototype原型上的constructor属性上
 **/
var squareList = []
var widthList = [5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6]
var creatSquare = function (width) {
  var obj = Object.create(squarePrototype)
  obj.width = width
}
creatSquare.squarePrototype = {
  getArea() { return this.width * this.width },
  getLength() { return this.width * 4 },
  constructor: creatSquare
}
for (let i = 0; i < widthList.length; i++) {
  squareList[i] = creatSquare(widthList[i])
}

// 版本6使用关键字new 
var squareList = []
var widthList = [5, 6, 5, 6, 5, 6, 5, 6, 5, 6, 5, 6]
function CreatSquare(width) {
  this.width = width
}
CreatSquare.prototype.getArea =function() { 
  return this.width * this.width 
}
CreatSquare.prototype.getLength =function() { 
  return this.width * 4 
}
for (let i = 0; i < widthList.length; i++) {
  squareList[i] =new CreatSquare()
}
