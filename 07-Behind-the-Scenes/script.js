'use strict';

//1️⃣ SCOPING
/*
function calcAgeArw(birthYear) {
  const age = 2021 - birthYear;
  //console.log(firstName);

  function printAge() {
    const output = `${firstName} are ${age}, born in ${birthYear} 👩🏻‍💻.`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      const firstName = 'Araqs';
      var millennial = true;
      const str = `Oh, and you're a millennial, ${firstName}.`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      console.log(add(2, 3));
    }
    console.log(millennial); // true: function scope variable
  }

  printAge();
  return age;
}
//calcAgeArw(1986);// reference error: we cannot call the function before declaration firstName variable;
const firstName = 'Anush';
calcAgeArw(1986); //Anush


 */

//2️⃣ HOISTING
/*

//❗️hoisting variables:
//using before declaring them
//console.log(me); //undefined
//console.log(job); //Uncaught ReferenceError: Cannot access 'job' before initialization
//console.log(year); //Uncaught ReferenceError: Cannot access 'year' before initialization

var me = 'Anush';
let job = 'developer';
const year = 1986;

// console.log(me === window.me);//true => will create a property on the global window object
// console.log(job === window.job);//false
// console.log(year === window.year);//false


//❗️hoisting functions
//using before declaring them
//console.log(addDecl(3, 5)); // 8
//console.log(addExp(3, 5));//Uncaught ReferenceError: Cannot access 'addExp' before initialization
//console.log(addArw(3, 5));//Uncaught ReferenceError: Cannot access 'addArw' before initialization
//console.log(addArw1(2, 3));//addArw1 is not a function => because it is undefined

function addDecl(a, b) {
  return a + b;
}

const addExp = function (a, b) {
  return a + b;
};

const addArw = (a, b) => a + b;

var addArw1 = (a, b) => a + b;

//console.log(addDecl(2,3) === window.addDecl(2,3));//true
//console.log(addExp(2,3) === window.addExp(2,3));//window.addExp is not a function
//console.log(addArw(2,3) === window.addArw(2,3));//window.addArw is not a function

// ‼️ examples that shouldn't happen
//console.log(numProducts); //undefined
if (!numProducts) deleteShoppingCard(); //'All products deleted!!!'
//if(true) deleteShoppingCard();

var numProducts = 10;

function deleteShoppingCard() {
  console.log('All products deleted!!!');
}

 */

//3️⃣ THIS KEYWORD

//console.log(this); // window global object

//❗️ in regular function
const calcAge = function (year) {
  //console.log(2021 - year); //35
  // console.log(this); //undefined => with 'strict mode' it has it's own this keyword, but it's undefined and not attached to the object
  // but without strict mode it will point window global object
};
calcAge(1986);

function calcAgeDec(year) {
  //console.log(2021 - year);
  //console.log(this); //this same like function expression
}
calcAgeDec(1986);

//❗️ in arrow function

const calcAgeArw = year => {
  //console.log(2021 - year); //35
  //console.log(this); //window => arrow function does not get it's own this keyword, and point the parent scope - global object
};
calcAgeArw(1986);

//❗️ using this inside of a method: this will point  to the object that is  calling the method
const me = {
  year: 1986,
  calcAge: function () {
    //console.log(this); //{year: 1986, calcAge: ƒ}
    console.log(2021 - this.year); //35
  },
};
me.calcAge();

const myFriend = {
  year: 1990,
};

myFriend.calcAge = me.calcAge; //myFriend borrow the method from the me object
myFriend.calcAge(); // 31 =>  now myFriend call the method

const f = me.calcAge;
console.log(f);// f function
f();//undefined => be like regular function => undefined
