'use strict';

//==================  💲BANKER APP ========================
//1️⃣ Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2021-04-12T17:01:17.194Z',
    '2021-04-16T23:36:17.929Z',
    '2021-04-18T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

//2️⃣ SELECTORS
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

//3️⃣ Functions
const formatMovementsDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  //console.log(daysPassed);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  //else do bellow
  // const day = `${date.getDate()}`.padStart(2, '0');
  // const month = `${date.getMonth() + 1}`.padStart(2, '0');
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  //remove all previous data
  containerMovements.innerHTML = '';

  //check sorting
  const movements = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  //create new data for each array element
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //create date field
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementsDate(date, acc.locale);

    const formatCur = formatCurrency(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatCur}</div>
      </div>
    `;

    //attach new data
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//📍calc balance and print
const calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, dog) => acc + dog, 0);
  labelBalance.textContent = formatCurrency(acc.balance, acc.locale, acc.currency);
};

//📍 calc Summary in and out and print
const calcSummary = function (currAcc) {
  const summaryIn = currAcc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCurrency(summaryIn, currAcc.locale, currAcc.currency);

  const summaryOut = currAcc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCurrency(Math.abs(summaryOut), currAcc.locale, currAcc.currency);

  const interest = currAcc.movements
    .filter(mov => mov > 0)
    .map(num => (num * currAcc.interestRate) / 100)
    .filter((mov, i, arr) => {
      //console.log(arr);// for checking previous operation/arr
      return mov >= 1;
    })
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumInterest.textContent = formatCurrency(interest, currAcc.locale, currAcc.currency);
};

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

//📍 update UI
const updateUI = function (acc) {
  //display movements
  displayMovements(acc);

  //display balance
  calcBalance(acc);

  //display summery
  calcSummary(acc);
};

const startLogoutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, '0'); //1.66666
    const sec = String(Math.trunc(time % 60)).padStart(2, '0'); //40
    //in each call, print remaindering time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //when 0 seconds log out the user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started!`;
      containerApp.style.opacity = '0';
    }
    //decrease time -1
    time--;
  };

  //set time to 5 minutes
  let time = 10;

  //call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//4️⃣ Event handlers
let currentAccount, timer;

//FAKE always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = '100';

//📍LOGIN
btnLogin.addEventListener('click', function (event) {
  //prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);

  if (currentAccount?.pin === +inputLoginPin.value) {
    //display UI and welcome massage
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = '100';

    //added current Date for current balance
    const now = new Date();
    const option = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, option).format(now);
    //2way
    // const day = `${now.getDate()}`.padStart(2, '0');
    // const month = `${now.getMonth() + 1}`.padStart(2, '0');
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, '0');
    // const minute = `${now.getMinutes()}`.padStart(2, '0');
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;

    //clear fields
    inputLoginUsername.value = inputLoginPin.value = '';

    //update timer
    if (timer) clearInterval(timer);
    timer = startLogoutTimer();

    //update UI
    updateUI(currentAccount);
  } else {
    alert('Incorrect user name or pin! Please, try again.');
  }
});

//📍SORT btn
let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sort);
  sort = !sort;
});

//📍 TRANSFER MONEY
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const receivedAccount = accounts.find(el => el.userName === inputTransferTo.value);
  const amount = +inputTransferAmount.value;
  //console.log(receivedAccount, amount);

  //clear inputs
  inputTransferTo.value = inputTransferAmount.value = '';

  if (receivedAccount && amount > 0 && currentAccount.balance >= amount && receivedAccount.userName !== currentAccount.userName) {
    //add negative movement to current user
    currentAccount.movements.push(-amount);
    //add positive movement to receiver
    receivedAccount.movements.push(amount);

    //add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receivedAccount.movementsDates.push(new Date().toISOString());

    //update UI
    updateUI(currentAccount);

    //reset the timer
    clearInterval(timer);
    timer = startLogoutTimer();
  } else {
    alert('Something went wrong, check the parameters!');
  }
});

//📍LOAN REQUEST
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);

  //clear input
  inputLoanAmount.value = '';

  //check if any deposit >= 10% of request
  if (amount > 0 && currentAccount.movements.some(num => num >= amount * 0.1)) {
    setTimeout(function () {
      //add movement
      currentAccount.movements.push(amount);
      //add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      //update UI
      updateUI(currentAccount);

      //reset timer
      clearInterval(timer);
      timer = startLogoutTimer();
    }, 2500);
  } else {
    alert('Amount is not allowed! Check your movements.');
  }
});

//📍 DELETE ACCOUNT
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  //check if credentials are correct
  if (inputCloseUsername.value === currentAccount.userName && +inputClosePin.value === currentAccount.pin) {
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

//========================= 🔴 LECTURES PART =============================
//❗️❗️In JS all numbers are represented internally as floating point numbers!!! Always as decimals!!!
/*
console.log(23 === 23.0); //true

//Decimal base 10 => 0 to 9
//Binary base 2 => 0 and 1
console.log(0.1 + 0.2); //0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

//✅ string convert to number
console.log(Number('12'));//12
console.log(+'12.23'); //12.23
console.log(+'12.3abc'); // NaN

//✅ using parsing GLOBAL functions
console.log(Number.parseInt('12.23abc', 10)); //12 => will return an integer
console.log(Number.parseInt('e12.3abc', 10)); //NaN => string should start with number

console.log(Number.parseFloat('    12.3abc    '));// 12.3 => ignore whitespaces
console.log(Number.parseFloat('    12ert      '));// 12  => ignore whitespaces

//console.log(parseInt('234fg'));//234 =====> will return the same result, but this is old-school way, without Number namespace

//✅ checking if value is NaN
console.log(Number.isNaN(123));//false
console.log(Number.isNaN('123'));//false
console.log(Number.isNaN(+'123er'));//true
console.log(Number.isNaN(12/0));//false ❗️but 12/0 = infinity but here its check as an it is number

//✅ best way of checking if value is number and there is no infinity number
console.log(Number.isFinite(123));//true
console.log(Number.isFinite('123'));//false
console.log(Number.isFinite(+'1223cvb'));//false
console.log(Number.isFinite(12/0));//false
//also in this way we can check
console.log(Number.isInteger(234));//true
console.log(Number.isInteger(12.45));//true
console.log(Number.isInteger('123'));//false
console.log(Number.isInteger(23/0));//false
console.log(Number.isSafeInteger(23/0));//false
 */

//✅ working with Math operations
/*
// Math.sqrt()
console.log(Math.sqrt(25)); //5
console.log(25 ** (1 / 2)); //5 ===> square root
console.log(8 ** (1 / 3)); //2 ===> cubic root

// Math.max() / min()
console.log(Math.max(2, 4, 6, 78, 90, 12)); //90
console.log(Math.max(2, '23', 4, 3)); //23
console.log(Math.max(2, '23ac', 56, 3)); //NaN

console.log(Math.min(2, 4, 6, 78, 90, 12)); //2

// Math.PI
console.log(Math.PI * Number.parseFloat('10px') ** 2); //calculate area of circle  => 3.141592653589793(PI) * 10(radius) ** 2 = 314.1592653589793

// Math.random() Math.trunc()
console.log(Math.random()); // => random numbers between 0 and 1
console.log(Math.trunc(Math.random() * 6) + 1); // => random numbers between 1 and 6
const randomInt = (min, max) => Math.floor(Math.random() * (max - min) + 1) + min; // 0...1 -> 0...(max-min) + 1 -> min...max
console.log(randomInt(10, 20)); // 10 .... 20

// rounding integers and all they have type coercion
console.log(Math.round(23.4)); //23
console.log(Math.round('23.7')); //24 => will work, because of type coercion

console.log(Math.ceil(23.4)); //24
console.log(Math.ceil(23.7)); //24

console.log(Math.floor(23.4)); //23
console.log(Math.floor(23.8)); //23

console.log(Math.trunc(-1.3)); //-1
console.log(Math.floor(-1.3)); //-2 => it's better to use floor instead of trunc

// rounding decimals
console.log((2.7).toFixed(0));//3 => return rounding number in string
console.log(+(23.234).toFixed(2));//23.23 => converted to number
 */

//✅ Remainder operator => return remainder of a division
/*
console.log(5 % 2); // 1
console.log(5 / 2); // 5 = 2 * 2 + 1

//📌 check if number is even or odd or integer
console.log(6 % 2 === 0); //true
console.log(5 % 2 === 0); //false

console.log('----------');
const isEven = n => n % 2 === 0;
const isOdd = n => n % 2 !== 0;
const isInteger = n => n % 1 === 0;
console.log(isEven(23)); //false
console.log(isEven(52)); //true
console.log(isOdd(23)); //true
console.log(isOdd(154)); //false
console.log(isInteger(12.3));//false
console.log(isInteger(123));//true

//📌exp:
labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = 'red';
    if (i % 3 === 0) row.style.backgroundColor = 'green';
  });
});
*/

//✅ Date => by using date constructor function
//📌 Create a date  using 4 ways
// const now = new Date(); // => called as constructor and returns date object
// console.log(now); //Sat Apr 17 2021 20:59:37 GMT+0400 (Armenia Standard Time)
// console.log(typeof new Date()); //object
//
// const now1 = Date(); //called as function, and returns string
// console.log(now1); //Sat Apr 17 2021 20:59:37 GMT+0400 (Armenia Standard Time)
// console.log(typeof now1); //string

//📌 parse the date from a date string
// console.log(new Date('Apr 14 2021')); //Wed Apr 14 2021 00:00:00 GMT+0400 (Armenia Standard Time)
// console.log(new Date(account1.movementsDates[0])); //Tue Nov 19 2019 01:31:17 GMT+0400 (Armenia Standard Time)
//
// //📌by giving all parameters
// console.log(new Date(2022, 11, 22, 6, 23, 3)); //Thu Dec 22 2022 06:23:03 GMT+0400 (Armenia Standard Time)
// // =>UNIX TIME =>00
// console.log(new Date(0));//Thu Jan 01 1970 04:00:00 GMT+0400 (Armenia Standard Time)
// console.log(new Date(3 * 24 * 60 * 60 * 1000));//Sun Jan 04 1970 04:00:00 GMT+0400 (Armenia Standard Time)

//📌Dates are another special type of objects, and so they have their own methods
// const future = new Date(2022, 11, 22, 6, 12);
// console.log(future); //Thu Dec 22 2022 06:23:03 GMT+0400 (Armenia Standard Time)
// console.log(future.getFullYear()); //2022 =>  typeof number
// console.log(future.getMonth()); //11,=> but 12 should be, 0 base counting
// console.log(future.getDate()); //22
// console.log(future.getDay()); //4
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// //📌 get timestamps and based on create a new date
// console.log(future.getTime());//1671675120000
// console.log(new Date(1671675120000));//Thu Dec 22 2022 06:12:00 GMT+0400 (Armenia Standard Time)

// //📌 convert to string
// console.log(future.toISOString());//2022-12-22T02:12:00.000Z

// //📌 there is also set versions of all these methods
// future.setFullYear(2023);
// console.log(future); //Fri Dec 22 2023 06:12:00 GMT+0400 (Armenia Standard Time)
//
// //📌 using static method
// console.log(Date.now()); //Sun Apr 18 2021 14:06:45 GMT+0400 (Armenia Standard Time)

//📌 doing calculations with dates
// const future1 = new Date(2022, 11, 22, 6, 12);
// console.log(future1); //Thu Dec 22 2022 06:12:00 GMT+0400 (Armenia Standard Time)
// console.log(+future1); //1671675120000 => converted to timestamp
// //EXP:find how many count of diff days
// const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
//
// const days1 = calcDaysPassed(new Date(2022, 11, 22), new Date(2022, 11, 3));
// console.log(days1);

//✅ Internationalization API: Intl object
//1️⃣ Internationalizing Dates (Intl)
// const now = new Date();
// const formattedDate = new Intl.DateTimeFormat('arm-HY').format(now);
// console.log(formattedDate); // 4/18/2021
//
// //📌 setting options
// const option = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday: 'short',
// };
// console.log(Intl.DateTimeFormat('fr-FR', option).format(now)); //lun. 19 avril 2021, 10:31
//
// //📌 will get user location from user's browser, will take browsers language
// const locale = navigator.language;
// console.log(locale); //en-US
// console.log(Intl.DateTimeFormat(locale, option).format(now)); //Mon, April 19, 2021, 10:27 AM

//2️⃣ Internationalizing Numbers (Intl)
// const num = 2341267.89;
// console.log('US:     ', new Intl.NumberFormat('en-US').format(num)); //2,341,267.89 => typeof string
// console.log('GERMANY:', new Intl.NumberFormat('de-DE').format(num)); //GERMANY: 2.341.267,89
// console.log('Syria:  ', new Intl.NumberFormat('ar-SY').format(num)); //Syria:   ٢٬٣٤١٬٢٦٧٫٨٩
// console.log(navigator.language, new Intl.NumberFormat(navigator.language).format(num)); //en-US 2,341,267.89
//
// const options = {
//   style: 'currency',
//   currency: 'USD',
// };
// console.log('US:     ', new Intl.NumberFormat('en-US', options).format(num));

//✅ Timers:
//1️⃣ setTimeout will run only once
//They are used to schedule the execution of functions.
//They are part of window object, and inside of both timers THIS will point of window

//setTimeout(() => console.log('Here is your pizza 🍕'), 3000);

// const ingredients = ['olive', 'spinach'];
// const pizzaTimer = setTimeout((ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2} 🍕`), 3000, ...ingredients);
//
// console.log('1 will execute...');
//
// //stop timer by using clearTimeout
// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);// nothing will execute

//exp:
/*
const log = console.log;

function printStatement() {
  log('Will be printed after 3000 milliseconds');
}

setTimeout(printStatement, 3000);

//-----
setTimeout(function () {
  log('Will be printed after 2000 millisecond');
}, 2000);

//======
setTimeout(function () {
  log('Will be printed after 0 milliseconds');
}, 0); //after

//=======
log('Will be the first print'); //always the first

//📍passing parameters =>  Syntax -> setTimeout(callbackMethod, delay, param1, param2, ..)
const multiplyByTwo = function (num) {
  log(`${num} multiply by two is ${num * 2}`);
};

setTimeout(multiplyByTwo, 1500, 5);

//------
const arrOfNums = [1, 2, 3, 4];

for (let i = 0; i < arrOfNums.length; i++) {
  setTimeout(function () {
    log(`Value of ${i}: ${arrOfNums[i]}`);
  }, 2000);
}
 */

//2️⃣ setInterval will keep running forever until we stop it
//create a clock
// setInterval(() => {
//   const now = new Date();
//   // const hour =  now.getHours();
//   // const min = now.getMinutes();
//   // const sec = now.getSeconds();
//   // console.log(`${hour}:${min}:${sec}`);
//
//   console.log(new Intl.DateTimeFormat(navigator.language, { hour: 'numeric', minute: 'numeric', second: 'numeric' }).format(now));
// }, 1000);
