//✏️ strict mode ✏️️for secure JS code, to avoid accidental errors: it help us to introduce the bug into our code
//1️⃣ strict mode forbids us to do certain things
//2️⃣ it will actually create visible errors for us in certain situations in which without strict mode
//JavaScript will simply fail silently without letting us know that we did a mistake.
'use strict';
/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive))");
*/

//============ ✏️ Functions ====================

// function logger() {
//   console.log("I am here 🧐");
// }
//
// //calling/running/invoking
// logger();
// logger();
// logger();
//
// function fruitProcessor(apples, oranges) {
//   //console.log(apples, oranges);
//   // const juice = `Juice with ${apples} apples and ${oranges} oranges🥤`;
//   // return juice;
//   return `Juice with ${apples} apples and ${oranges} oranges🥤.`;
// }
//
// const appleJuice = fruitProcessor(3, 0);
// console.log(appleJuice);
//
// const appleAndOrangeJuice = fruitProcessor(2, 2);
// console.log(appleAndOrangeJuice);

// //1️⃣ Function declaration: can call before function define
// function calcAge1(birthYear) {
//   return 2021 - birthYear;
// }
//
// const age1 = calcAge1(1986);
// console.log(age1);
//
// //2️⃣ Function expression: cannot call before function define
// const calcAge2 = function (birthYear) {
//   return 2021 - birthYear;
// };
//
// const age2 = calcAge2(1986);
// console.log(age2);
//
// //3️⃣ Arrow function: cannot get THIS keyword
// const calcAge3 = (birthYear) => 2021 - birthYear;
// const age3 = calcAge3(1986);
// console.log(age3);
//
// //📌Functions calling other functions
// //it good for DRY principles
// function cut(fruit) {
//   return fruit * 4;
// }
// function fruitProcessor(apples, oranges) {
//   const applesPieces = cut(apples);
//   const orangesPieces = cut(oranges);
//
//   return `Juice with ${applesPieces} piece of apple and ${orangesPieces} piece of orange🥤.`;
// }
//
// console.log(fruitProcessor(3, 5));
//
// //============= ✏️ another challenge ==========
//
// const calcAge = (birthYear) => {
//   return 2021 - birthYear;
// };
//
// const yearsUntilRetirement = (birthYear, firstName) => {
//   const age = calcAge(birthYear);
//   const retirement = 65 - age;
//
//   if (retirement > 0) {
//     console.log(`${firstName} retires in ${retirement} years!`);
//     return retirement;
//   } else {
//     console.log(`${firstName} has already retired!`);
//     return -1;
//   }
// };
//
// console.log(yearsUntilRetirement(1986, "Aram"));
// console.log(yearsUntilRetirement(1945, "Armen"));

//========= ✏️ code challenge #2 ==================
// const calcAverage = (a, b, c) => Math.round((a + b + c) / 3);
//
// //test 1
// let score1 = calcAverage(44, 23, 71);
// let score2 = calcAverage(65, 54, 49);
// console.log(score1, score2);
//
// const checkWinner = (avg1, avg2) => {
//   if (avg1 >= avg2 * 2) {
//     console.log(`Win score N.1 ${avg1}`);
//   } else if (avg2 >= avg1 * 2) {
//     console.log(`Win score N.2 ${avg1}`);
//   } else {
//     console.log("No team wins...");
//   }
// };
//
// checkWinner(score1, score2);
//
// //test 2
// score1 = calcAverage(34, 47, 20);
// score2 = calcAverage(10, 23, 11);
// checkWinner(score1, score2);

//=========== ✏️ Arrays ================
/*
//📍
const firstName = "Anu";
const friends = [firstName, 20 + 12, "Aram", "Ara"];
console.log(friends); //["Anu", 32, "Aram", "Ara"]

//📍
const calcAge = (birthYear) => {
  return 2021 - birthYear;
};

const years = [2012, 2000, 2018, 2020, 1986];

const ages1 = [calcAge(years[0]), calcAge(years[1]), calcAge(years[2])];
const ages2 = years.map((el) => calcAge(el));

console.log(ages1, ages2); //[9, 21, 3, 1, 35]

//============ 👩🏻‍💻 Coding challenge =========
//create a calcTip function
const calcTip = (bill) =>
  bill >= 50 && bill <= 300 ? (bill * 15) / 100 : (bill * 20) / 100;

const bill = [125, 555, 44];
const tip = bill.map((el) => calcTip(el));
const total = [bill[0] + tip[0], bill[1] + tip[1], bill[2] + tip[2]];

console.log(total);

 */

//========== ✏️ Objects ==============
/*
//const friends = ['Anu', 20 + 12, ["Aram", "Ara"]];
const aboutMe = {
  firstName: "Anush",
  age: 20 + 12,
  friends: ["Aram", "Ara", 'Araqs'],
  job: "developer",
};

console.log(aboutMe);
console.log(aboutMe.firstName);
console.log(aboutMe["job"]);

const interestedIn = prompt(
  "What do you want to know about me? Choose between firstName, age, friends and job!"
);
console.log(interestedIn);
//console.log(aboutMe[interestedIn]);//developer

if (aboutMe[interestedIn]) {
  console.log(aboutMe[interestedIn]);
} else {
  console.log("Wrong request! Choose between firstName, age, friends and job!");
}

//add new property to the object
aboutMe.location = 'Yerevan';
aboutMe['gitHub'] = 'https://github.com/anmarkosyan';
console.log(aboutMe);

//'Anush has 3 friends, and her best friend is called Aram'
console.log(`${aboutMe.firstName} has ${aboutMe.friends.length} friends, and her best friend is called ${aboutMe.friends[0]}.`)

*/
/*
const aboutMe = {
  firstName: "Anush",
  birthYear: 1986,
  friends: ["Aram", "Ara", "Araqs"],
  job: "developer",
  hasDriversLicense: true,
  //1️⃣ use only function expression
  // calcAge: function (birthYear) {
  //   return 2021 - birthYear;
  // },

  //2️⃣ using THIS keyword which equal to aboutMe
  // calcAge: function () {
  //   //console.log(this);//like aboutMe
  //   return 2021 - this.birthYear;
  // },

  //3️⃣ create new property using THIS keyword
  calcAge: function () {
    this.age = 2021 - this.birthYear;
    return this.age;
  },

  describeMe: function () {
    this.me = `${this.firstName} is a ${this.calcAge()} years old ${
      this.job
    }, and she has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
    return this.me;
  },
};

//❗️this can be very heavy for program
// console.log(aboutMe.calcAge());
// console.log(aboutMe.calcAge());
// console.log(aboutMe.calcAge());
// console.log(aboutMe.calcAge());
// console.log(aboutMe.calcAge());

// 👍 just calculate for once, and after use property for call function
// console.log(aboutMe.calcAge());
// console.log(aboutMe.age);
// console.log(aboutMe.age);
// console.log(aboutMe.age);

//========== 👩🏻‍💻 coding challenge ==========
//'Anush is a 35 years old  developer, and she has a/no driver's license'
console.log(aboutMe.describeMe());
console.log(aboutMe.me);
console.log(aboutMe.me);
console.log(aboutMe.me);

 */

//============== 👩🏻‍💻 coding challenge ===============
/*
const mark = {
  fullName: "Mark Miller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};
const john = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.bmi = this.mass / this.height ** 2;
    return this.bmi;
  },
};
mark.calcBMI();
john.calcBMI();
if (mark.bmi < john.bmi) {
  console.log(
    `${john.fullName}'s BMI (${john.bmi}) is higher than ${mark.fullName}'s (${mark.bmi})`
  );
} else if (john.bmi < mark.bmi) {
  console.log(
    `${mark.fullName}'s BMI (${mark.bmi}) is higher than ${john.fullName}'s (${john.bmi})`
  );
}

 */

//============= ✏️ Loop: as control structure ====================
//1️⃣
const aboutMeArray = ['Anu', 20 + 12, 'developer', ['Aram', 'Ara']];
const types = [];
for (let i = 0; i < aboutMeArray.length; i++) {
  //console.log(aboutMeArray[i], typeof aboutMeArray[i]);
  //types[i] = typeof aboutMeArray[i];
  types.push(typeof aboutMeArray[i]);
}
console.log(types);

//2️⃣
const years = [1991, 2000, 1986, 1981];
const ages = [];
for (let i = 0; i < years.length; i++) {
  ages.push(2021 - years[i]);
}
console.log(ages);

//3️⃣ loop inside a loop
for (let exercise = 1; exercise <= 3; exercise++) {
  console.log(`------- Starting Exercise ${exercise}`);

  for (let rep = 1; rep <= 5; rep++) {
    console.log(`Exercise ${exercise}: Lifting weight repetition ${rep} 🏋🏻‍ `);
  }
}

//============= 👩🏻‍💻 coding challenge ===============
const calcTip = bill =>
  bill >= 50 && bill <= 300 ? (bill * 15) / 100 : (bill * 20) / 100;
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const total = [];

for (let i = 0; i < bills.length; i++) {
  //const tip = calcTip(bills[i]);
  tips.push(calcTip(bills[i]));
  total.push(bills[i] + tips[i]);
}
console.log(bills, tips, total);

const calcAverage = function (arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum / arr.length;
};
console.log(calcAverage(bills));
console.log(calcAverage(tips));
console.log(calcAverage(total));
