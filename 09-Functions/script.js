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
