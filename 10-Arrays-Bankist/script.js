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

//***************** Lecture part *************************
//1️⃣  forEach method
/*
//with for... of
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const num of movements) {
for (const [i, num] of movements.entries()) {
  if (num > 0) {
    console.log(`Movement ${i + 1}: You deposited ${num}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(num)}`);
  }
  //2way
  // num > 0
  //   ? console.log(`You deposited ${num}`)
  //   : console.log(`You withdrew ${Math.abs(num)}`);
}

console.log('----- forEach ------');

//using forEach method => here forEach is a higher order function and inside a callback function
movements.forEach(function (num, i, arr) {
  num > 0
    ? console.log(`Movement ${i + 1}: You deposited ${num}`)
    : console.log(`Movement ${i + 1}: You withdrew ${Math.abs(num)}`);
  //if(num > 0) return `${i} hi`;// will not to work,we cannot break the forEach loop
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
