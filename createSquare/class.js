// // 语法1：
// class Person{
//   sayHi(name){}
//   // 等价于
//   sayHi: function(name){} 
//   // 注意，一般我们不在这个语法里使用箭头函数
// }
// //等价于
// function Person(){}
// Person.prototype.sayHi=function(name){}


// 语法2：注意冒号变成了等于号
// class Person{
//   sayHi=(name)=>{}// 注意，一般我们不在这个语法里使用普通函数，多用箭头函数
// }
// 等价于
// function Person(){
//   this.sayHi=(name)=>{}
// }

new Person().sayHi()
