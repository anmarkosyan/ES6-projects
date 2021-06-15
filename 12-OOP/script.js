'use strict';

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };
//
// const anush = new Person('Anush', 1986);
// const aram = new Person('Aram', 1985);

// const user1Prototype = Reflect.getPrototypeOf(anush);
// const user2Prototype = Reflect.getPrototypeOf(aram);
//
// console.log(anush === aram);
// console.log(user1Prototype === user2Prototype);

// console.log(anush instanceof Person); //true
// console.log(Person.prototype);
//
// Person.prototype.calcAge = function () {
//   console.log(2021 - this.birthYear);
// };
// anush.calcAge();
// console.log(anush.__proto__);
// console.log(Person.prototype.isPrototypeOf(anush)); //true
// console.log(Person.prototype.isPrototypeOf(Person)); //false

//============== coding challenge ============
/*
1. Use a constructor function to implement a Car. A car has a make and a speed property.
   The speed property is the current speed of the car in km/h;
   
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;

4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} going at ${this.speed} km/h`);
};

const car1 = new Car('BMW', 120);
const car2 = new Car('Mercedes', 95);

car1.accelerate();
car1.accelerate();
car1.brake();
car2.accelerate();
car2.accelerate();
car2.brake();
