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

//📍using arrow function
const greet = greeting => name => console.log(`${greeting} ${name}`);

const greeter = greet('Hey');
greeter('Anush'); //Hey Anush
greeter('Aram'); //Hey Aram
greeter('Sarah'); // Hey Sarah
//or
greet('Hello')('Ann'); //Hello Ann


 */
//📍exp
const sum = function (x, y) {
  //1way
  if( arguments.length === 2) {
    return x + y
  }else{
    return function(y){
      return x + y;
    }
  }
  //2way
  // if (y !== undefined) {
  //   return x + y;
  // } else {
  //   return function (y) {
  //     return x + y;
  //   };
  // }
};

console.log(sum(2, 3));// Outputs 5
console.log(sum(2)(3)); // Outputs 5

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
/*
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
/*
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
 */

//📍using object methods with eventListeners
/*
airline.planes = 300;
airline.buyPlane = function () {
  console.log(this);//{name: "Armenian", numCode: "AH", booking: Array(3), planes: 300, book: ƒ,…}

  this.planes++;
  console.log(this.planes);//301
};

//airline.buyPlane();

document
  .querySelector('.buy')
  .addEventListener('click', airline.buyPlane.bind(airline));//if don't use bind, this will point the buy bottom, as it call this method

//📍About partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));//220

const addVat = addTax.bind(null, 0.23);
console.log(addVat(100));//123
console.log(addVat(23));//28.29

//📍The same problem function return function approach
const addTax2 = rate => value => value + value * rate;

const addVat2 = addTax2(0.23);
console.log(addVat2(200));//246
console.log(addVat2(100));//123
console.log(addVat2(23));//28.29
 */

//========================= 👩🏻‍💻 coding challenge N1 ===========================
/*
Let's build a simple poll app!
A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option.
This data is stored in the starter object below.
Here are your tasks:
1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)

  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1.
  Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'),
which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log().
This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1".
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option.
Do NOT put the arrays in the poll object! So what should the this keyword look like in this situation?
BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]
GOOD LUCK 😀
*/
/*
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0), //[0, 0, 0, 0]
  registerNewAnswer() {
    //get the answer
    const input = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );
    //register answer in answer field
    typeof input === 'number' &&
      input < this.answers.length &&
      this.answers[input]++;

    //after call displayResult method in 2 ways
    this.displayResults('string');
    this.displayResults();
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`); //"Poll results are 13, 2, 4, 1".
    }
  },
};
//poll.registerNewAnswer();

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }); //[5, 2, 3]
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string'); //[1, 5, 3, 9, 6, 1] || with 'string' => Poll results are 1, 5, 3, 9, 6, 1


 */

//7️⃣ Immediately Invoked Function Expression(IIFE): which called only once
// simple function expression, which can call again and again
const runOnce = function () {
  console.log('This will  run again!');
};
runOnce();

//IIFE
(function () {
  console.log('This will never run again!');
})();

(() => console.log('This will ALSO never run again!'))();

runOnce();
