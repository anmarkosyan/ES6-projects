'use strict';

//1️⃣ Default parameters:
/*
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //old way of setting default parameters:ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
};

createBooking('AB231');
//override default parameters
createBooking('AB231', 2, 300);
createBooking('AB231', 2);
createBooking('AB231', 4);

//if we want to skip the one argument and specify another, for doing that we should write UNDEFINED, which will take the default value
createBooking('AB231', undefined, 1000); //{flightNum: "AB231", numPassengers: 1, price: 1000}
 */

//2️⃣ How passing arguments:primitive vs reference types
/*
const flight = 'AB123';
const anush = {
  name: 'Anush Markosyan',
  passport: 1233455677,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'AB234';
  passenger.name = 'Ms. ' + passenger.name;

  if (passenger.passport === 1233455677) {
    alert(`Checked in !`);
  } else {
    alert('Wrong passport number.Please try again!');
  }
};
//checkIn(flight, anush);
//console.log(flight); //AB123 => not changed, because flight is primitive type copy value:it's like doing  flightNum = flight
//console.log(anush); //{name: "Ms Anush Markosyan", passport: 1233455677} => changed, reference type, copy reference id passenger = anush

//exp:
const newPassport = function (person) {
  person.passport = Math.round(Math.random() * 1000000000000);
};
newPassport(anush);
checkIn(flight, anush);
console.log(anush); //{name: "Ms. Ms. Anush Markosyan", passport: 14948769096}
 */
/*
//3️⃣ Higher-order functions, functions that accept callback function as an input
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFistWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

//higher-order function using callback functions as an input
const transformer = function (str, func) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${func(str)}`);

  //functions like objects can have methods and properties:
  console.log(`Transformed by: ${func.name}`);
};
transformer('JavaScript is the best!', upperFistWord);
transformer('JavaScript is the best!', oneWord);

//📍exp
const high5 = function () {
  console.log(`🖐`);
};
//addEventListener=> higher-order function, give5 => callback function, which will call as soon as we click on the body
document.body.addEventListener('click', high5);

['Anush', 'Aram', 'Ararat'].forEach(high5);

//4️⃣ Functions returning functions
// const greet = function (greeting) {
//   return function (name) {
//     console.log(`${greeting} ${name}`);
//   };
// };

//using arrow function
const greet = greeting => name => console.log(`${greeting} ${name}`);

const greeter = greet('Hey');
greeter('Anush'); //Hey Anush
greeter('Aram'); //Hey Aram
greeter('Sarah'); // Hey Sarah
//or
greet('Hello')('Ann'); //Hello Ann
 */

//5️⃣ The call and apply methods: which allows us  explicitly define the this keyword in any function that we want.

const airline = {
  name: 'Armenian',
  numCode: 'AH',
  booking: [],
  //book: function(){}
  book(flightNum, passName) {
    console.log(
      `${passName} booked  seat on ${this.name} flight ${this.numCode}${flightNum}`
    );
    this.booking.push({ flight: `${this.numCode}${flightNum}`, passName });
  },
};

airline.book(123, 'Anush Markosyan');
airline.book(124, 'Aram Markosyan');
console.log(airline.booking);

const euroWings = {
  name: 'Eurowings',
  numCode: 'ER',
  booking: [],
};

const bookEuro = airline.book;
//❗️does not work
//bookEuro(234, 'Sarah Conner');
//Cannot read property 'planeName' of undefined => cannot read THIS, because now it is just a regular function

//📍Call method
bookEuro.call(euroWings, 123, 'Sarah Conner');
console.log(euroWings);

bookEuro.call(airline, 567, 'Stephan Spenser');
console.log(airline);

const swiss = {
  name: 'Swiss Air Lines',
  numCode: 'SW',
  booking: [],
};

bookEuro.call(swiss, 876, 'Mary Cooper');

//📍Apply method take an argument array
const flightData = [342, 'Albert Cooper'];
bookEuro.apply(swiss, flightData);
//but we can also do like this, using spread operator
bookEuro.call(swiss, ...flightData);
console.log(swiss);

//6️⃣ bind method: difference is that bind does not call functions immediately, but return new functions
const bookEW = bookEuro.bind(euroWings); //return new function
const bookSW = bookEuro.bind(swiss);
const bookAir = bookEuro.bind(airline);
bookEW(234, 'Tim'); //call the function
bookSW(345, 'Timur');
bookAir(456, 'Adam');

//📍using bind arguments
const bookEW23 = bookEuro.bind(euroWings, 23);
bookEW23('Andrew');
bookEW23('AnushMark');

