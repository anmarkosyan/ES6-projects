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
/*
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


 */
//🧐 THIS keyword: Regular function vs arrow functions
//DONT use VAR
//var firstName = 'Araqs';
/*
const aram = {
  firstName: 'Aram',
  year: 1985,
  calcAge: function () {
    //console.log(this);
    console.log(2021 - this.year); //35

    //‼️ solution 1
    // const self = this;
    // const isMillennial = function () {
    //   //console.log(this);//undefined: like regular function this point window object
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };
    // isMillennial();//true

    //‼️ Solution 2 THIS within arrow function
    const isMillennial = () => {
      console.log(this); //aram: => will point aram object because it is his parent scope
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillennial(); //true
  },

  // THIS IN  ARROW FUNCTION will point his parent scope which is window
  // greet: () => {
  //   console.log(this);//window object
  //   console.log(` Hey ${this.firstName}`)
  // },
  greet: function () {
    console.log(` Hey ${this.firstName}`);
  },
};
aram.calcAge(); //36
aram.greet(); // Hey undefined => this === window object and there is not firstName from aram variable
aram.greet(); // hey Araqs => this === window object and var variable is there with firstName

// Arguments keyword

//regular functions
const add = function (a, b) {
  console.log(arguments);
};

add(3, 5); //[3, 5];
add(3, 5, 6, 7, 8); //[3, 5, 6, 7, 8];

const addArw = (a, b) => {
  console.log(arguments);
};

addArw(3, 5); //Uncaught ReferenceError: arguments is not defined

 */

//4️⃣ Primitives vs objects => primitives vs reference types
//📍 primitive type
let lastName = 'Mark';
let oldLastName = lastName;
lastName = 'Williams';

console.log(lastName, oldLastName); // Williams Mark

//📍reference type => object
const anush = {
  firstName: 'Anush',
  lastName: 'Mark',
  age: 34,
};

const marriedAnush = anush;
//change value in both place
marriedAnush.lastName = 'Williams';

//marriedAnush = {};//with CONST var we cannot change value in the stack, just in heap;
console.log('Before marriage:',anush);//       Before marriage: {firstName: "Anush", lastName: "Williams", age: 34}
console.log('After marriage:', marriedAnush);//After marriage:  {firstName: "Anush", lastName: "Williams", age: 34}

//📍Copying objects
const stephan = {
  firstName: 'Stephan',
  lastName: 'Mark',
  age: 34,
  friend: ['An', 'Adam', 'Igor'],
};
//will create completely new object, all prop are really copied, but only shallow copy, not deep
const me = Object.assign({}, stephan);
me.firstName = 'Anush';
me.friend.push('Vlad');//not deep copy, will appear in 2 place

console.log(stephan);//{firstName: "Stephan", lastName: "Mark", age: 34, friend: Array(4)}
console.log(me);//     {firstName: "Anush", lastName: "Mark", age: 34, friend: Array(4)}


