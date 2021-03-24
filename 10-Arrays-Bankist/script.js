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
const displayMovements = function (movArr, sort = false) {
  //remove all previous data
  containerMovements.innerHTML = '';

  //check sorting
  const movements = sort ? movArr.slice().sort((a, b) => a - b) : movArr;

  //create new data for each array element
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    //attach new data
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
//displayMovements(account1.movements);

//📍calc balance and print
const calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, dog) => acc + dog, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
//calcBalance(account1.movements);

//📍 calc Summary in and out and print
const calcSummary = function (currAcc) {
  const summaryIn = currAcc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${summaryIn}€`;

  const summaryOut = currAcc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(summaryOut)}€`;

  const interest = currAcc.movements
    .filter(mov => mov > 0)
    .map(num => (num * currAcc.interestRate) / 100)
    .filter((mov, i, arr) => {
      //console.log(arr);// for checking previous operation/arr
      return mov >= 1;
    })
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumInterest.textContent = `${interest}€`;
};
//calcSummary(account1.movements);

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

//📍 update UI
const updateUI = function (acc) {
  //display movements
  displayMovements(acc.movements);

  //display balance
  calcBalance(acc);

  //display summery
  calcSummary(acc);
};

//4️⃣ Event handler
let currentAccount;

//📍LOGIN
btnLogin.addEventListener('click', function (event) {
  //prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);
  //console.log(currentAccount)

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //display UI and welcome massage
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = '100';

    //clear fields
    inputLoginUsername.value = inputLoginPin.value = '';

    //update UI
    updateUI(currentAccount);
  } else {
    alert('Incorrect user name or pin! Please try again.');
  }
});

//📍SORT btn
let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sort);
  sort = !sort;
});

//📍 TRANSFER MONEY
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const receivedAccount = accounts.find(el => el.userName === inputTransferTo.value);
  const amount = Number(inputTransferAmount.value);
  //console.log(receivedAccount, amount);

  //clear inputs
  inputTransferTo.value = inputTransferAmount.value = '';

  if (receivedAccount && amount > 0 && currentAccount.balance >= amount && receivedAccount.userName !== currentAccount.userName) {
    //add negative movement to current user
    currentAccount.movements.push(-amount);
    //add positive movement to receiver
    receivedAccount.movements.push(amount);
    //update UI
    updateUI(currentAccount);
  } else {
    alert('Something went wrong, check the parameters!');
  }
});

//📍LOAN REQUEST
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  //clear input
  inputLoanAmount.value = '';

  //check if any deposit >= 10% of request
  if (amount > 0 && currentAccount.movements.some(num => num >= amount * 0.1)) {
    //add movement
    currentAccount.movements.push(amount);
    //update UI
    updateUI(currentAccount);
  } else {
    alert('Amount is not allowed! Check your movements.');
  }
});

//📍 DELETE ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  //check if credentials are correct
  if (inputCloseUsername.value === currentAccount.userName && Number(inputClosePin.value) === currentAccount.pin) {
    //delete account
    const closeAccIdx = accounts.findIndex(el => el.userName === currentAccount.userName);
    accounts.splice(closeAccIdx, 1);
    //hide UI
    containerApp.style.opacity = '0';
    //log out timer expires
  } else {
    alert('Incorrect user name or pin!');
  }
  //clear inputs
  inputCloseUsername.value = inputClosePin.value = '';
});

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
//const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//accumulator => like SNOWBALL
// const balance = movements.reduce((acc, cur) => acc + cur, 0);
//console.log(balance);

//📍 find maximum and minimum numbers using reduce method
/*
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
 */

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
/*
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
 */

//5️⃣ chaining methods
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurToUSD = 1.1;
// const res = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUSD)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(res);

//========================= 👩🏻‍💻 coding challenge N3====================
/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = dogsAgeArr =>
  dogsAgeArr
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
 */

//6️⃣ find method
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const firstMin = movements.find(el => el < 0);
// console.log(firstMin); //-400
//
// console.log(accounts);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account); //{owner: "Jessica Davis", movements: Array(8), interestRate: 1.5, pin: 2222, userName: "jd"}

// let user;
// for (const acc of accounts) {
//   if (acc.owner === 'Jessica Davis') user = acc;
// }
// console.log(user);

//7️⃣ some / every methods
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// console.log(movements.includes(-130));//true => only check for equality
//
// const deposit = movements.some(el => el > 0);
// console.log(deposit);// true => check for given condition

//8️⃣ flat methods => for removing the nested array and flattened the array
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8, 9];
console.log(arr.flat()); //[1, 2, 3, 4, 5, 6, 7, 8, 9];

const arrDeeper = [[[1, 2], 3], [[1], 2, 3], [3, 4], 5];// => work with nested arrays
console.log(arrDeeper.flat()); //[Array(2), 3, Array(1), 2, 3, 3, 4, 5]
console.log(arrDeeper.flat(2)); //[1, 2, 3, 1, 2, 3, 3, 4, 5]

//📍
console.log(accounts); //[{…}, {…}, {…}, {…}]
// const accountMovements = accounts.map(acc => acc.movements);
// const allMovementsArr = accountMovements.flat();//[200, 450, -400, 3000, -650, -130, 70, 1300, 5000, 3400, -150, -790, -3210, ...]
// const balance = allMovementsArr.reduce((acc, num) => acc + num, 0);
// console.log(balance);//17840

//or with chaining
const accountMovements = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(accountMovements);//17840

//✅ flatMap method => which actually combine map + flat ,
//❗ but with flatMap() we can go just 1 level depth, no 2 level
const accountMovements2 = accounts.flatMap(acc => acc.movements).reduce((acc, mov) => acc + mov, 0);

console.log(accountMovements2); //17840
 */

//9️⃣ sort method => ❗️does mutate original array
/*
//strings
const owners = ['Zara', 'Emmi', 'Stevan', 'Adam'];
const sortedName = owners.sort();
console.log(sortedName); //["Adam", "Emmi", "Stevan", "Zara"]

//numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const ascendingOrder = movements.sort((a, b) => a - b);
console.log(ascendingOrder);
const descendingOrder = movements.sort((a, b) => b - a);
console.log(descendingOrder);
 */

//🔟 new Array() constructor + fill method
//ways to create an array
/*
console.log([1, 2, 3, 4]); //[1, 2, 3, 4]
console.log(new Array(1, 2, 3, 4)); //[1, 2, 3, 4]

const x = new Array(3);
console.log(x); //[]
console.log(x.fill(1)); //[1, 1, 1]
console.log(x.fill(3, 1)); //[1, 3, 3]
console.log(x.fill(5, 1, 2)); //[1, 5, 3]

//📍 Array.from(arrayLike(iterable  = string, Map, Set), mapFn, thisArg)
const b = Array.from({ length: 7 }, () => 1);
console.log(b); //[1, 1, 1, 1, 1, 1, 1]

const c = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(c); //[1, 2, 3, 4, 5, 6, 7]

const str = Array.from('hello', char => char.toUpperCase());
console.log(str); //["H", "E", "L", "L", "O"]

//📌 print all movements in array, which stored in user interface
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', '')));

  //2 way
  const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(el => Number(el.textContent.replace('€', '')));

  console.log(movementsUI, movementsUI2); //[1300, 70, -130, -650, 3000, -400, 450, 200]
});
 */

//============================== 👩🏻‍💻 coding challenge N4 ===============================
/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property.
Do NOT create a new array, simply loop over the array.
Formula: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners,
so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means:
current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

