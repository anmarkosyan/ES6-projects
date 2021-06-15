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
// class PersonCl {
//   constructor(fullName, birthYear) {
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//
//   //instance methods => method will be added to .prototype property
//   calcAge() {
//     console.log(2021 - this.birthYear);
//   }
//
//   greet() {
//     console.log(`Hey ${this.fullName}`);
//   }
//
//   get age() {
//     return 2021 - this.birthYear;
//   }
//   //set a property that already exist
//   set fullName(name) {
//     if (name.includes(' ')) this._fullName = name;
//     else console.log(`${name} is not a full name`);
//   }
//
//   get fullName() {
//     return this._fullName;
//   }
//   //static method => method wil be attached constructor function itself
//   static color() {
//     console.log('green');
//     console.log(this);
//   }
// }
//
// const agata = new PersonCl('Agata Marks', 1986);
// console.log(agata); //PersonCl { fullName: 'Agata', birthYear: 1991 }
// agata.calcAge(); //30
// agata.greet(); //Hey Agata
// console.log(agata.age);
// console.log(agata.fullName);
// PersonCl.color();
//
// const harout = new PersonCl('Harout Spenser', 1991);
// console.log(harout);
// console.log(harout.fullName); //Harout Spenser

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

//📍 Object.creat() function on any object literals
// const PersonProto = {
//   getAge() {
//     console.log(2021 - this.birthYear);
//   },
//   about(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };
// const aram = Object.create(PersonProto);
// aram.about('Aram', 1985);
// aram.getAge();
// console.log(aram); //{ firstName: 'Aram', birthYear: 1985 }
// console.log(aram.__proto__ === PersonProto); //true

//📍 Inheritance between classes(parent and child) => constructor functions
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};
//linked the prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is  ${this.firstName}, I am a ${this.course} developer`);
};

const anush = new Student('Anush', 1991, 'node.js');
console.log(anush);
anush.introduce();
anush.calcAge();//30

console.log(anush instanceof Student);//true
console.log(anush instanceof Person);//true
console.log(anush instanceof Object);//true

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
console.log(anush.__proto__);//Student.prototype
console.log(anush.__proto__.__proto__);//Person.prototype
console.log(anush.__proto__.__proto__.__proto__);//Object.prototype


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
// //creating static method
// Car.color = function () {
//   console.log('Black 🚙');
//   console.log(this);
// };
//
// const car1 = new Car('BMW', 120);
// const car2 = new Car('Mercedes', 95);
// console.log(car1); //Car { make: 'BMW', speed: 120 }
// console.log(car1.hasOwnProperty('brake')); //false
// console.log(car1.hasOwnProperty('make')); //true
// Car.color();

// for(let key in car1){
//   console.log(key);
// }
// car1.accelerate();
// car1.accelerate();
// car1.brake();
// car2.accelerate();
// car2.accelerate();
// car2.brake();

//2️⃣ using ES class
/*
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, 
   by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h
GOOD LUCK 😀
*/
/*
class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} going at ${this.speed} km/h`);
  }

  get speedUs() {
    return this.speed / 1.6;
  }

  set speedUs(speed) {
    this.speed = speed * 1.6;
  }
}

const car1 = new Car('Ford', 120);
console.log(car1.speedUs);
car1.accelerate();
car1.accelerate();
car1.brake();
car1.speedUs = 20;
console.log(car1);
 */
