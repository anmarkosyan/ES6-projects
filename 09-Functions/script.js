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
