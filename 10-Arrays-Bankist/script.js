'use strict';

//******************* 💲BANKIST APP part ****************
//1️⃣ Selectors
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//2️⃣ Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

//3️⃣ Functions
//📍display movements
const displayMovements = function (movArr) {
  //remove all previous data
  containerMovements.innerHTML = '';

  //create new data for each array element
  movArr.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}</div>
      </div>
    `;

    //attach new data
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

//📍calc balance and print
const calcBalance = function (movementsArr) {
  const balance = movementsArr.reduce((acc, dog) => acc + dog, 0);
  labelBalance.textContent = `${balance}€`;
};
calcBalance(account1.movements);

//📍creat userName field in each account obj with names first letters
const createUserNames = function (accountArr) {
  accountArr.forEach(function (account) {
    account.userName = account.owner
      .split(' ')
      .map(el => el[0].toLowerCase())
      .join('');
  });
};
createUserNames(accounts);
//console.log(accounts);//added field with userName: "js", etc.

//********************** 🔴 Lecture part *************************
//1️⃣  forEach method
/*
//with for... of
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const dog of movements) {
for (const [i, dog] of movements.entries()) {
  if (dog > 0) {
    console.log(`Movement ${i + 1}: You deposited ${dog}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(dog)}`);
  }
  //2way
  // dog > 0
  //   ? console.log(`You deposited ${dog}`)
  //   : console.log(`You withdrew ${Math.abs(dog)}`);
}

console.log('----- forEach ------');

//using forEach method => here forEach is a higher order function and inside a callback function
movements.forEach(function (dog, i, arr) {
  dog > 0
    ? console.log(`Movement ${i + 1}: You deposited ${dog}`)
    : console.log(`Movement ${i + 1}: You withdrew ${Math.abs(dog)}`);
  //if(dog > 0) return `${i} hi`;// will not to work,we cannot break the forEach loop
});
*/

//📍 forEach method with Map
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
//console.log(currencies); //{"USD" => "United States dollar", "EUR" => "Euro", "GBP" => "Pound sterling"}
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// with Set
const currenciesUnique = new Set(['USA', 'EUR', 'USA', 'GBP', 'EUR']);
//console.log(currenciesUnique);//{"USA", "EUR", "GBP"}
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
*/

//======================= 👩🏻‍💻 coding challenge N1 =========================
/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age,
and stored the data into an array (one array for each).
For now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array,
 and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old")
or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉
TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const checkDogs = function (dogsJulia, dogsKate) {
  //1way with slice
  // const selectDogs = dogsJulia.slice(1, -2);
  // const dogs = [...selectDogs, ...dogsKate];

  //2way with splice
  const copyJuliaDogs = dogsJulia.slice();
  copyJuliaDogs.splice(0, 1);
  copyJuliaDogs.splice(-2);
  const dogs = copyJuliaDogs.concat(dogsKate);

  dogs.forEach(function (el, i) {
    el >= 3
      ? console.log(`Dog number ${i + 1} is an adult, and is ${el} years old`)
      : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  });
};
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]); //
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]); //
 */

//2️⃣ map method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;
//📍
const inUSD = movements.map(dog => dog * eurToUsd);
console.log(inUSD);

//📍
const msg = movements.map(
  (el, i) =>
    `Movement ${i + 1}: You ${el > 0 ? 'deposit' : 'withdrew'} ${Math.abs(el)}`
);

console.log(msg);

//📍
//const user = 'Steven Thomas Williams'; //stw

//1way
// const arr = user.toLowerCase().split(' ');
// let userName = '';
// for (const char of arr) {
//   userName += char[0];
// }

//2way
// let userName = '';
// for (const char of user) {
//   if (char === char.toUpperCase()) {
//     userName += char.toLowerCase();
//   }
// }
// console.log(userName.replace(/ /g, ''));

//3way
// const userName = user.split(' ').map(el => el[0].toLowerCase()).join('');
// console.log(userName);
 */

//3️⃣ filter method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
// const deposits = movements.filter(el => el > 0);
// const withdrew = movements.filter(el => el < 0);
// console.log(deposits, withdrew);

//4️⃣ reduce method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//accumulator => like SNOWBALL
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
//console.log(balance);

//📍 find maximum and minimum numbers using reduce method
const max = movements.reduce((acc, dog) => {
  if (acc > dog) return acc;
  else return dog;
}, movements[0]);
console.log(max); //3000

const max1 = movements.reduce(
  (acc, dog) => (acc > dog ? acc : dog),
  movements[0]
);
console.log(max1); //3000

const min = movements.reduce(
  (acc, dog) => (acc < dog ? acc : dog),
  movements[0]
);
console.log(min); //-650

//===================== 👩🏻‍💻 coding challenge N2 =======================
/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average 
age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula:
if the dog is <= 2 years old, humanAge = 2 * dogAge.
If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function (dogsAgeArr) {
  const humanAge = dogsAgeArr.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );

  const adult = humanAge.filter(age => age >= 18);
  //const average = adult.reduce((acc, age) => acc + age, 0) / adult.length;
  const average = adult.reduce((acc, age, i, arr) => acc + age / arr.length, 0);

  return Math.trunc(average);
};
console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3])); //47
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4])); //44
