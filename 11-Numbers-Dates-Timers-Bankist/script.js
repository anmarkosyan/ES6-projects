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
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
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

//📍calc balance and print
const calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, dog) => acc + dog, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

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
  displayMovements(acc.movements);

  //display balance
  calcBalance(acc);

  //display summery
  calcSummary(acc);
};

//4️⃣ Event handlers
let currentAccount;

//📍LOGIN
btnLogin.addEventListener('click', function (event) {
  //prevent form from submitting
  event.preventDefault();

  currentAccount = accounts.find(acc => acc.userName === inputLoginUsername.value);

  if (currentAccount?.pin === +inputLoginPin.value) {
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
  const amount = +inputTransferAmount.value;
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
  const amount = +inputLoanAmount.value;

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
console.log(23 === 23.0); //true

//Decimal base 10 => 0 to 9
//Binary base 2 => 0 and 1
console.log(0.1 + 0.2); //0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false

//📍string convert to number
console.log(Number('12'));
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


