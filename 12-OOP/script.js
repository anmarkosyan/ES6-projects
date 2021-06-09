'use strict';

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const anush = new Person('Anush', 1986);
const aram = new Person('Aram', 1985);

// const user1Prototype = Reflect.getPrototypeOf(anush);
// const user2Prototype = Reflect.getPrototypeOf(aram);
//
// console.log(anush === aram);
// console.log(user1Prototype === user2Prototype);

console.log(anush instanceof Person);//true
console.log(Person.prototype);

Person.prototype.calcAge = function(){
  console.log(2021 - this.birthYear);
}
anush.calcAge();
console.log(anush.__proto__);
console.log(Person.prototype.isPrototypeOf(anush));//true
console.log(Person.prototype.isPrototypeOf(Person));//false





