'use strict';
const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const [a] = weekDays;
const openingHours = {
  //using the object literal syntax
  [weekDays[3]]: {
    open: 12,
    close: 22,
  },
  [weekDays[4]]: {
    open: 11,
    close: 23,
  },
  [a]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  //using the object literal syntax
  openingHours,
  weekDays,
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  //using ES6 object literals syntax, without functions keyword and :
  order(starterIdx, mainIdx) {
    return [this.starterMenu[starterIdx], this.mainMenu[mainIdx]];
  },

  orderDelivery({ time, address, mainIndex, starterIndex }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} 
       will be delivered ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
  },

  orderPizza(mainIng, ...otherIng) {
    console.log(mainIng, otherIng); //mushrooms ["onion", "oregano", "olive"]
    otherIng.length
      ? console.log(`Here is your pizza with ${mainIng} and ${otherIng}`)
      : console.log(`Here is your simple pizza only with ${mainIng}`);
  },
};

//1️⃣ Destructuring arrays
/*
const arr = [2, 3, 4];
//usual approach
const a = arr[0];
const b = arr[1];
const c = arr[2];
console.log(a, b, c); // 2, 3, 4

//destructuring
const [x, y, z] = arr;
console.log(x, y, z); //2, 3, 4
console.log(arr); //[2, 3, 4] don't change main arr

//📍 => basic example
const [first, second] = restaurant.categories;
console.log(first, second); //Italian Pizzeria

//📍=> skip second item
const [first1, , second2] = restaurant.categories;
console.log(first1, second2); //Italian Vegetarian

//📍=> Switch variables
let [main, , secondary] = restaurant.categories;
//usual approach
// const temp = main;
// main = secondary;
// secondary = temp;

//destructuring
[main, secondary] = [secondary, main];
console.log(main, secondary); //Vegetarian Italian

//📍=> how to order food
//receive 2 return values from a function
const [starter, mainList] = restaurant.order(2, 0);
console.log(starter, mainList); //Garlic Bread Pizza

//📍=> Nested array destructuring
const nested = [2, 3, [4, 5]];
const [i, , [j]] = nested;
console.log(i, j); //2 4

//📍=> Default values
const [p, q, r] = [8, 9];
console.log(p, q, r); //8 9 undefined
const [e = 1, t = 1, u = 1] = [8, 9];
console.log(e, t, u);//8 9 1

 */

//2️⃣ Destructuring objects

/*
//📍order food
restaurant.orderDelivery({
  time: '22:30',
  address: 'Abovyan 22/1',
  mainIndex: 2,
  starterIndex: 3,
});

//📍=> for create new variables we should use the same name as in object
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories); //Classico Italiano {thu: {…}, fri: {…}, sat: {…}} (4)["Italian", "Pizzeria", "Vegetarian", "Organic"]

//📍=> if want to change var name with new name
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags); //the same result

//📍=> default values
const { menu = [], starterMenu: starter = [] } = restaurant;
console.log(menu, starter); //[] (4)["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"]

//📍=> mutating variables
let a = 111;
let b = 23;
const obj = { a: 12, b: 34, c: 56 };
({ a, b } = obj);
console.log(a, b); //12 34

//📍=> nested object destructuring
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c); //11 23

 */
//3️⃣ The SPREAD operator => whenever we need the elements
// of an array individually,then we can use the spread operator
//‼️ Only work when we pass spread argument into a function and when build a new array ‼️

//📍add in other array
/*
const arr = [7, 3, 4];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
const goodNewArr = [12, 23, ...arr];
console.log(badNewArr); //[1, 2, 7, 3, 4]
console.log(goodNewArr); // [12, 23, 7, 3, 4]
console.log(...goodNewArr); //12 23 7 3 4

//📍 created newMenu , and add new item
const newMenu = [...restaurant.mainMenu, 'Avocado'];
console.log(newMenu);

//📍copy array
const mainMenuCopy = [...restaurant.mainMenu];

//📍Join 2 arrays together
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

//📍Iterables: strings, arrays, maps, sets but NOT objects
const str = 'Mark';
const letter = [...str];
console.log(letter); //["M", "a", "r", "k"]
console.log(...letter); //M a r k
//console.log(`${...letter} letter`);//Uncaught SyntaxError: Unexpected token '...'

//📍using into functions
// const ingredients = [
//   prompt("Let's make a pasta! Ingredients 1?"),
//   prompt('Ingredients 2?'),
//   prompt('Ingredients 3?'),
// ];
// console.log(ingredients);//["a", "b", "c"]
// restaurant.orderPasta(...ingredients);

//📍 since ES 2018, spread operator also work on objects
//shallow copy of main object: {...restaurant} === Object.assign({}, restaurant);
const newRestaurant = { foundedIn: 2000, ...restaurant, founder: 'Aram' };
console.log(newRestaurant);
const restaurantCopy = { ...restaurant };
restaurantCopy.name = "Aram's house";
console.log(restaurantCopy.name);//Aram's house
console.log(restaurant.name);//Classico Italiano
 */

//4️⃣ REST pattern
/*
//DESTRUCTURING
//SPREAD, because on RIGHT side of assignment operator(=)
const arr = [1, 2, ...[3, 4], 5, 6];
console.log(arr); //[1, 2, 3, 4, 5, 6]

//REST, because on LEFT side of (=) and always must be the last element
const [a, b, ...other] = [1, 2, 3, 4];
const [x, y, ...others] = arr;
console.log(typeof a, typeof other); //number object
console.log(a, b, other); //1 2 [3, 4]
console.log(x, y, others); //1 2 [3, 4, 5, 6]

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood); //Pizza Risotto ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"]

//📍 for objects destructuring
const { sat, ...weekDays } = restaurant.openingHours;
console.log(sat); //{open: 0, close: 24}
console.log(weekDays); //{thu: {…}, fri: {…}}

//📍 1) Functions
const add = function (...numbers) {
  let sum = 0;
  //1)
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  //2)
  //for(let num of numbers) sum += num;
  //3)
  //const sum = numbers.reduce((acc, curr) => el + acc, 0);

  console.log(sum);
};
add(2, 3); //5
add(2, 4, 6, 7); //19
add(4, 5, 6, 7, 8, 9, 2, 3, 4); //48

const r = [23, 1, 3];
add(...r); //27

//📍2) function
restaurant.orderPizza('mushrooms', 'onion', 'oregano', 'olive');
restaurant.orderPizza('mushroom'); //mushroom []

 */

//5️⃣ Logical operators || and &&
//They can use ANY data type, can return ANY data type, do short-circuiting
//📍 || => or
/*
console.log('----- OR -----');
console.log(3 || 'Anush'); //3
console.log('' || true); //true
console.log(undefined || null); //null
console.log(0 || []); //[]
console.log(null || 0 || false || 'anush' || true); //anush => will return first true value and stop circuit

//📍 setting default values with ||
//restaurant.numGuests = 23;//but if 0 it will be false
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
const guests2 = restaurant.numGuests || 10; //the same
console.log(guests1); //10
console.log(guests2); // 10

//📍 && => and => All need to be true
console.log('---- AND -----');
console.log(0 && 'Anush'); //0 => will return first false value and stop circuit
console.log(23 && 'Aram'); // Aram => if all is true will return last true value
console.log(23 && 'hi' && true && 23 + 3); // 26
console.log(23 && 'hi' && true && null && 23 + 3); // null first false value

//📍 function example
// if (restaurant.orderPizza) {
//   restaurant.orderPizza('mushroom', 'onion');
// }
//same like this
restaurant.orderPizza && restaurant.orderPizza('mushroom', 'onion');

//📍 Nullish coalescing: null and undefined === false,  0 and '' === true;
restaurant.numGuests = 0;
const guest = restaurant.numGuests ?? 10;
console.log(guest);//0
 */

//=============== 👩🏻‍💻 Codding challenge N1 ====================
//1. Create one player array for each team (variables 'players1' and 'players2')
//2. The first player in any player array is the goalkeeper and the others are field players.
// For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name,
// and one array ('fieldPlayers') with all the remaining 10 field players
//3. Create an array 'allPlayers' containing all players of both teams (22 players)
//4. During the game, Bayern Munich (team 1) used 3 substitute players.
// So create a new array ('players1Final') containing all the original
// team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
//5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
//6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and
// prints each of them to the console, along with the number of goals that were scored in
// total (number of player names passed in)
//7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win,
// WITHOUT using an if/else statement or the ternary operator.
//
//
//  TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
/*
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//1.
const [players1, players2] = game.players;
console.log(players1, players2);
//2.
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);
//3.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
//4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);
//5.
//const { team1, x: draw, team2 } = game.odds;
const {odds: {team1, x: draw, team2}} = game
console.log(team1, draw, team2);
//6.
const printGoals = function (...players) {
  console.log(`${players.length} goals were scored`);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Muller', 'Lewandowski');
printGoals(...game.scored);
//7.
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');
 */

//6️⃣ Loop over array: ES6 for...of => here we can use continue and break keywords
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

//here we cannot get index of each element
for (const food of menu) console.log(food); //Focaccia ...

//using entries() method which new Array Iterator object that contains the key/value pairs for each index in the array.
for (const [i, el] of menu.entries()) {
  //console.log(`${food[0] + 1}: ${food[1]}`);
  console.log(`${i + 1}: ${el}`); //[0, "Focaccia"] ...
}

//console.log([...menu.entries()]);//[Array(2), Array(2), Array(2), Array(2), Array(2), Array(2), Array(2)]
 */

//7️⃣ Optional chaining ES2020: for checking
//if want to check
//📍old way
if (restaurant.openingHours && restaurant.openingHours.tue)
  console.log(restaurant.openingHours.tue.open); // Uncaught TypeError: Cannot read property 'open' of undefined

//if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open); //11

//📍with optional chaining: ES2020
//if not exist: is null or undefined, immediately return UNDEFINED (NOT TypeERROR)
console.log(restaurant.openingHours?.tue?.open); //undefined
//if exist: 0, '', value
console.log(restaurant.openingHours.mon?.open); //0

//📍real example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

//📍methods: for checking if method exist after call it
console.log(restaurant.order?.(1, 2) ?? "Method doesn't exist!!!");//["Bruschetta", "Risotto"]
console.log(restaurant.orderRizzoto?.(1, 2) ?? "Method doesn't exist!!!"); //Method doesn't exist!!!

//📍arrays: for checking if array is empty
const user = [{name: 'An', age: 23}, {name: 'John'}];
console.log(user[0]?.name ?? 'User array empty!!!');//An
console.log(user[1]?.age ?? 'User age is not defined!!!');//User age is not defined!!!
