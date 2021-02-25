// function Person(name,age){
//   this.name=name
//   this.age=age
//   this.sayHi=()=>{
//     console.log("你好，我叫 "+name);
//   }
// }
// let person = new Person('frank', 18)
// person.name === 'frank' // true
// person.age === 18 // true
// person.sayHi() // 打印出「你好，我叫 frank」

// let person2 = new Person('jack', 19)
// person2.name === 'jack' // true
// person2.age === 19 // true
// person2.sayHi() // 打印出「你好，我叫 jack」

class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  sayHi() {
    console.log("你好，我叫 " + this.name);
  }
}

let person = new Person('frank', 18)
person.name === 'frank' // true
person.age === 18 // true
person.sayHi() // 打印出「你好，我叫 frank」

let person2 = new Person('jack', 19)
person2.name === 'jack' // true
person2.age === 19 // true
person2.sayHi() // 打印出「你好，我叫 jack」