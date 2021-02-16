'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },

  order: function (starterIdx, mainIdx) {
    return [this.starterMenu[starterIdx], this.mainMenu[mainIdx]];
  },

  orderDelivery: function ({ time, address, mainIndex, starterIndex }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} 
       will be delivered ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
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
//3️⃣ The Spread operator => whenever we need the elements
// of an array individually,then we can use the spread operator
//‼️ Only work when we pass spread argument into a function and when build a new array ‼️

//📍add in other array
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
