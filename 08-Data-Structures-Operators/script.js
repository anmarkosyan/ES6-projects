'use strict';
/*
const weekDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const [type] = weekDays;
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
  [type]: {
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

 */

//1️⃣ Destructuring arrays
/*
const arr = [2, 3, 4];
//usual approach
const type = arr[0];
const from = arr[1];
const to = arr[2];
console.log(type, from, to); // 2, 3, 4

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
//receive 2 return values from type function
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
let type = 111;
let from = 23;
const obj = { type: 12, from: 34, to: 56 };
({ type, from } = obj);
console.log(type, from); //12 34

//📍=> nested object destructuring
const {
  fri: { open: o, close: to },
} = openingHours;
console.log(o, to); //11 23

 */
//3️⃣ The SPREAD operator => whenever we need the elements
// of an array individually,then we can use the spread operator
//‼️ Only work when we pass spread argument into type function and when build type new array ‼️

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
console.log(letter); //["M", "type", "r", "k"]
console.log(...letter); //M type r k
//console.log(`${...letter} letter`);//Uncaught SyntaxError: Unexpected token '...'

//📍using into functions
// const ingredients = [
//   prompt("Let's make type pasta! Ingredients 1?"),
//   prompt('Ingredients 2?'),
//   prompt('Ingredients 3?'),
// ];
// console.log(ingredients);//["type", "from", "to"]
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
const [type, from, ...other] = [1, 2, 3, 4];
const [x, y, ...others] = arr;
console.log(typeof type, typeof other); //number object
console.log(type, from, other); //1 2 [3, 4]
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
// So create type new array ('players1Final') containing all the original
// team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
//5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
//6. Write type function ('printGoals') that receives an arbitrary number of player names (NOT an array) and
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
/*
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

 */

//8️⃣ Looping Objects: Object Keys, Values, and Entries
/*
//📍looping over PROPERTY NAMES/KEYS
for (const day of Object.keys(openingHours)) {
  console.log(day); //thu fri mon
}
//or
const keyArray = Object.keys(openingHours);
console.log(keyArray); //["thu", "fri", "mon"]

let openStr = `We are open on ${keyArray.length} days: `;

for (const day of keyArray) {
  openStr += `${day}, `;
}
console.log(openStr);

//📍looping over PROPERTY VALUES/VALUES
const valArray = Object.values(openingHours);
console.log(valArray);//[{…}, {…}, {…}]

for(const {open, close} of valArray){
  console.log(`We open at ${open} and close at ${close}`);
}

//📍Entire object
const entries = Object.entries(openingHours);
console.log(entries);//[Array(2), Array(2), Array(2)]

for(const [key, {open, close}] of entries){
  console.log(`On ${key} we open at ${open} and close at ${close}`)

}

 */

//======================== 👩🏻‍💻 coding challenge N2 ========================
/*
1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use type loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in type nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). 
HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties,
and the number of goals as the value. In this game, it will look like this:
{
  Gnarby: 1,
    Hummels: 1,
  Lewandowski: 2
}

 */
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

//🏋🏻‍1
const scoredName = game.scored;
//console.log(scoredName); //["Lewandowski", "Gnarby", "Lewandowski", "Hummels"]
//first way
// for (let i = 0; i < scoredName.length; i++) {
//   console.log(`Goal ${i + 1}: ${scoredName[i]}`);
// }
//second way
for (const [i, name] of scoredName.entries())
  console.log(`Goal ${i + 1}: ${name}`);

//🏋🏻‍2
const oddsValArr = Object.values(game.odds);
//console.log(oddsValArr); //[1.33, 3.25, 6.5]

let sum = 0;
for (const num of oddsValArr) sum += num;

console.log(Math.round(sum / oddsValArr.length));

//🏋🏻‍3
const oddsEntries = Object.entries(game.odds);

for (const [team, val] of oddsEntries) {
  const teamName = game[team] ? `victory ${game[team]}` : 'draw';
  console.log(`Odd of ${teamName}: ${val}`);
}

//🏋🏻‍bonus
const scorers = {};
for (const name of game.scored) {
  scorers[name] ? scorers[name]++ : (scorers[name] = 1);
}
console.log(scorers);

 */

//9️⃣ SET: data structure
/*
console.log(new Set('anushanush')); //{"type", "n", "u", "s", "h"}

const orderSet = new Set([
  'pizza',
  'risotto',
  'pizza',
  'pasta',
  'pizza',
  'pasta',
]);

console.log(orderSet); //Set(3){"pizza", "risotto", "pasta"}
console.log(orderSet.size); //3
console.log(orderSet.has('pizza')); //true
console.log(orderSet.add('cake')); //{"pizza", "risotto", "pasta", "cake"}
console.log(orderSet.delete('pizza')); //true
console.log(orderSet); //{"risotto", "pasta", "cake"}
//console.log(orderSet[0]);//undefined

for (const val of orderSet) console.log(val); //risotto pasta cake

//📍Use cases
//remove duplicate values of arrays
const staff = ['waiter', 'chef', 'manager', 'waiter', 'chef', 'manager'];

const uniqueStaff = new Set(staff);
const staffSize = new Set(staff).size;
console.log(uniqueStaff); //{"waiter", "chef", "manager"}
console.log(staffSize); //3

// convert to the array
const staffArr = [...new Set(staff)]; //
console.log(staffArr); //["waiter", "chef", "manager"]

//count how many unique letters in type string
const str = 'hello';
console.log(new Set(str).size); //4
 */

//🔟  MAP: data structure
/*
const rest = new Map();
//📍 set/add => key/value
rest
  .set('name', 'Aram house')
  .set(1, 'pizza')
  .set(2, 'risotto')
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 10)
  .set('close', 19)
  .set(true, 'We are open 🙏')
  .set(false, 'We are closed 😔');
console.log(rest); //{"name" => "Aram house", 1 => "pizza", 2 => "risotto", "categories" => Array(4)}

//📍Get method:how to read data
console.log(rest.get('name'));//Aram house
//console.log(rest.get(true));//we are open 🙏

//use case
const currTime = 16;
console.log(rest.get(currTime >= rest.get('open') && currTime <= rest.get('close')));//we are open 🙏

//📍 other methods
rest.has('categories');//true
rest.delete(2);//true
// rest.clear();//{}
console.log(rest);//{"name" => "Aram house", 1 => "pizza", "categories" => Array(4), "open" => 10, "close" => 19,…}
console.log(rest.size);//7


const arr = [1, 2, 3];
rest.set(arr, 'test');
//console.log(rest.get([1,2]));//undefined
console.log(rest.get(arr));//test

const dom = document.querySelector('h1');
rest.set(dom, 'heading');
console.log(rest.get(dom));//heading
 */

//📍Iteration
/*
const questions = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct answer 🎉'],
  [false, 'Try again 🏋🏻‍♀️'],
]);
console.log(questions); //{"question" => "What is the best programming language in the world?", 1 => "C", 2 => "Java", 3 => "JavaScript"}

//📍 Convert object to map
console.log(Object.entries(openingHours)); //look the same as type map with arrays
//so we can do this
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap); //{"thu" => {…}, "fri" => {…}, "mon" => {…}}

//📍 looping
console.log(questions.get('question'));
for (const [key, val] of questions) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${val}`);
}

// const answer = Number(prompt('Your answer...'));
// const corr = questions.get('correct');//3
// console.log(questions.get(answer === corr));

//📍 convert map to the array
console.log([...questions]);
console.log(questions.entries());
console.log([...questions.keys()]);
console.log(questions.values());
 */

//======================= 👩🏻‍💻 coding challenge N3 ======================
/*
Let's continue with our football betting app! This time, we have type map with type log of the events that happened during the game.
The values are the events themselves, and the keys are the minutes in which each event happened (type football game has 90 minutes plus some extra time).
1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that type game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL
GOOD LUCK 😀
*/
/*
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//🏋🏻‍♀️1
const events = [...new Set(gameEvents.values())];
console.log(events);
//🏋🏻‍♀️2
gameEvents.delete(64);
//🏋🏻‍♀️3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
//bonus
const time = [...gameEvents.keys()].pop();
//console.log(gameEvents);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);

//🏋🏻‍♀️4
for (const [key, val] of gameEvents) {
  const half = key < 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${key}: ${val}`);
}
 */

//1️⃣1️⃣ Strings
/*
const airLine = 'TOP Air Armenia';
const plane = 'A320';

console.log(plane[0]); //A
console.log(plane[1]); //3
console.log(plane[2]); //2
console.log('B232'[0]); //B

console.log(plane.length); //4
console.log('B232'.length); //4

console.log(airLine.indexOf('m')); //6
console.log(airLine.lastIndexOf('A')); //4

console.log(airLine.slice(4)); //Air
console.log(airLine.slice(4, 7)); //Air

console.log(airLine.slice(0, airLine.indexOf(' '))); //TOP=> extract first word
console.log(airLine.slice(airLine.lastIndexOf(' ') + 1)); //Armenia => extract last word

console.log(airLine.slice(-1)); //type => last char of string
console.log(airLine.slice(-3)); //nia => last 3 chars of string
console.log(airLine.slice(1, -1)); //OP Air Armeni => cut first and last chars

const checkMiddleSeat = function (seat) {
  //B and E are middle seats
  const lastChar = seat.slice(-1);
  if (lastChar === 'B' || lastChar === 'E')
    console.log(`${seat}: You got middle seat 😬`);
  else console.log(`${seat}: You got lucky 🤩`);
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('12E');

//❓if string is primitive data type, why it has type so many methods?
//It will automatically behind the scenes convert it to string object -> call the method -> put again as type primitive string

console.log(typeof new String('Anush'));//{"Anush"} => object
console.log(typeof new String('hello')[0]);//h => string
 */

//✅ part 2
/*
const airLine = 'TOP Air Armenia';

console.log(airLine.toLowerCase());
console.log(airLine.toUpperCase());
console.log('hello'.toUpperCase());

//❗️fix the capitalization in name
const passenger = 'dAvID'; // David
const lower = passenger.toLowerCase();
const correctName = lower[0].toUpperCase() + lower.slice(1);
console.log(correctName); //David

//❗️example
const capitalName = function (name) {
  const loweCase = name.toLowerCase().split(' ');
  let newStr = '';
  for (const n of loweCase) {
    newStr += n[0].toUpperCase() + n.slice(1) + ' ';
  }
  console.log(newStr);
};
capitalName('aNuSh');
capitalName('mArK sOnY Seda');

//❗️example check email
const email = 'anush@gmail.com';
const loginEmail = '   ANUSh@GMail.Com  \n';

const check = loginEmail.toLowerCase().trim();
console.log(email === check); //true

//❗️replacing
const priceGB = '234,56€';
const priceUS = priceGB.replace('€', '﹩').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23! ';
console.log(announcement.replace('door', 'gate')); //replace just first word
//using regexp
console.log(announcement.replace(/door/g, 'gate')); //in all place

//❗️includes, startsWith/endsWith
const plane = 'Airbus A321neo';
console.log(plane.includes('A32')); //true
console.log(plane.includes('34')); //false
console.log(plane.startsWith('A321')); //true
console.log(plane.startsWith('A324')); //false
console.log(plane.endsWith('neo')); //true

if (plane.startsWith('Airbus') && plane.endsWith('neo'))
  console.log('Part of NEW Airbus family!');

//example
const checkBaggage = function (items) {
  const lowerText = items.toLowerCase();
  if (lowerText.includes('gun') || lowerText.includes('knife')) {
    console.log('Strong check of this person!!!!!');
  } else {
    console.log('Welcome aboard🙏');
  }
};
checkBaggage('I have type laptop, some Food, and pocket Knife.');
checkBaggage('Socks, camera.');
checkBaggage('Got some snacks and gun for protection.');
 */

//✅ part 3
/*
//📍split('separator') and join('separator');
console.log('type+very+nice+place'.split('+')); //["type", "very", "nice", "place"]
console.log('anush markosyan'.split(' ')); //["anush", "markosyan"]

const [firstName, lastName] = 'Anush markosyan'.split(' ');
const newName = ['Miss.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const arr = name.split(' ');
  //const newName = [];
  let newStr = '';
  for (const n of arr) {
    //newName.push(n[0].toUpperCase() + n.slice(1));
    //newStr += n[0].toUpperCase() + n.slice(1) + ' ';
    newStr += n.replace(n[0], n[0].toUpperCase()) + ' ';
  }
  //console.log(newName.join(' '));
  console.log(newStr);
};
capitalizeName('jessica ann smith corner');
capitalizeName('anush markosyan');

//📍 padding
const message = 'Go to gate 23';
console.log(message.padStart(25, '+').padEnd(30, '+')); //++++++++++++Go to gate 23+++++
console.log('Anush'.padStart(25, '+').padEnd(30, '+')); //++++++++++++++++++++Anush+++++

//exp:
const maskCreditCards = function (number) {
  const str = number + '';
  const lastDig = str.slice(-4);
  const length = str.length;
  return lastDig.padStart(length, '*');
};
console.log(maskCreditCards(123234345456)); //********5456
console.log(maskCreditCards('3457891234567889456')); //***************9456

//📍 repeat
const message2 = 'Bad weather... All departures delayed... \n';
console.log(message2.repeat(3));

//exp:
const planesInLine = function (n) {
  return `There are ${n} planes in line ${'🛩'.repeat(n)}`;
};
console.log(planesInLine(5)); //There are 5 planes in line 🛩🛩🛩🛩🛩
console.log(planesInLine(12)); //There are 12 planes in line 🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩🛩
console.log(planesInLine(2)); //There are 2 planes in line 🛩🛩
 */

//==================================== 👩🏻‍💻 coding challenge N4 ==========================
/*
Write type program that receives type list of variable names written in underscore_case and convert them to camelCase.
The input will come from type textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅
HINT 1: Remember which character defines type new line in the textarea 😉
HINT 2: The solution only needs to work for type variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!
Afterwards, test with your own test data!
GOOD LUCK 😀
*/
/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

const btn = document.querySelector('button');
const textArea = document.querySelector('textarea');

btn.addEventListener('click', () => {
  const str = textArea.value;
  const arr = str.toLowerCase().split('\n');
  let newStr = '';
  for (const [i, name] of arr.entries()) {
    const correctName = name.trim().split('_');
    const [first, last] = correctName;
    const camelCase = first + last.replace(last[0], last[0].toUpperCase());
    newStr += `${camelCase.padEnd(20, ' ')}${'✅'.repeat(i + 1)} \n`;
  }
  console.log(newStr);
});

 */

//=============================== 👩🏻‍💻 coding challenge N5 ==============================
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+' +
  '_Arrival;bru0943384722;fao93766109;11:45' +
  '+_Delayed_Arrival;hel7439299980;fao93766109;12:05' +
  '+_Departure;fao93766109;lis2323639855;12:30';
// 🔴 Delayed Departure from FAO to TXL (11h25)==>"_Delayed_Departure;fao93766109;txl2133758440;11:25"
//              Arrival from BRU to FAO (11h45)==> _Arrival;bru0943384722;fao93766109;11:45
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.toUpperCase().replace(/\d/g, '');

const arr = flights.split('+');
for (const flight of arr) {
  const [type, from, to, time] = flight.split(';');

  const name = type.replace(/_/g, ' ');
  const flyFrom = getCode(from);
  const flyTo = getCode(to);
  const hour = time.replace(':', 'h');

  const msg = `${
    name.startsWith(' Delayed') ? '🔴' : ''
  }${name} from ${flyFrom} to ${flyTo} (${hour})`;

  console.log(msg.padStart(45, ' '));
}
