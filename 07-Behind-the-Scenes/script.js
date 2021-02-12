'use strict';

//1️⃣ SCOPING
/*
function calcAge(birthYear) {
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
//calcAge(1986);// reference error: we cannot call the function before declaration firstName variable;
const firstName = 'Anush';
calcAge(1986); //Anush


 */

//2️⃣ HOISTING

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
