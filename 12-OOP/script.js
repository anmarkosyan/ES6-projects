'use strict';
//======================== 🔴 lecture part ==================
// const Person = function (fullName, birthYear) {
//   this.fullName = fullName;
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
// console.log(Person.prototype.isPrototypeOf(Pers on)); //false
//📍ES6 ====> CLASSES
//1️⃣ classes are not hoisted
//2️⃣ Classes are first-class citizens =>we can pass them
//into functions and also return them from functions.
//3️⃣ the body of a class is always executed in strict mode

//class expression
// const PersonExp = class {
//   constructor() {}
// };
//class declaration

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  //method will be added to .prototype property
  calcAge() {
    console.log(2021 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2021 - this.birthYear;
  }
  //set a property that already exist
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else console.log(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }
}

const agata = new PersonCl('Agata Marks', 1986);
console.log(agata); //PersonCl { fullName: 'Agata', birthYear: 1991 }
agata.calcAge(); //30
agata.greet(); //Hey Agata
console.log(agata.age);
console.log(agata.fullName);

const harout = new PersonCl('Harout Spenser', 1991);
console.log(harout);
console.log(harout.fullName); //Harout Spenser

// console.log(agata.__proto__ === PersonCl.prototype); //true
// console.log(agata.hasOwnProperty('calcAge')); //false
// for (const agataKey in agata) {
//   console.log(agataKey); // fullName birthYear
// }
// console.log(Object.getOwnPropertyDescriptor(agata.__proto__, 'calcAge'));

//📍 getter and setter functions
// const account = {
//   owner: 'John',
//   movements: [12, 45, 23, 78],
//
//   get latest() {
//     return this.movements.slice(-1).pop();
//   },
//   set latest(mov) {
//     this.movements.push(mov);
//   },
// };
//
// console.log(account.latest); //78
// account.latest = 100;
// console.log(account.movements);

//=========================== 🔴 coding challenge ===================
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

// function Car(make, speed) {
//   this.make = make;
//   this.speed = speed;
//
//   this.age = function(){
//     return 34;
//   }
// }
//
// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };
//
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} going at ${this.speed} km/h`);
// };
//
// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);
// console.log(car1)//Car { make: 'BMW', speed: 120 }
// console.log(car1.hasOwnProperty('brake'));//false
// console.log(car1.hasOwnProperty('make'));//true
//
// for(let key in car1){
//   console.log(key);
// }
// car1.accelerate();
// car1.accelerate();
// car1.brake();
// car2.accelerate();
// car2.accelerate();
// car2.brake();
