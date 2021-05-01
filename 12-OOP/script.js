'use strict';

const Person = function (firstName, birthYear) {
  console.log(this);//Person {}
  this.firstName = firstName;
  this.birthYear = birthYear;
};
//call function
const anush = new Person('Anush', 1986);
console.log(anush);//Person { firstName: 'Anush', birthYear: 1986 }
