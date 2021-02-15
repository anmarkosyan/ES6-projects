'use strict';

//1️⃣ Destructuring arrays
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

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIdx, mainIdx) {
    return [this.starterMenu[starterIdx], this.mainMenu[mainIdx]];
  },
};

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
