//console.log(this); // will executed in the browser => Window
'use strict';

//console.log(this); // Window: {window: Window, self: Window, document: document, name: "", location: Location, …}
//console.log(globalThis);//new name for see which global environment we have, for all languages
// if (!window.Promise) {
//   alert("Your browser is really old!");
// }else{
//   alert('yes, everything is new)))))')
// }//to test if a built-in Promise object exists (it does not in really old browsers):

//================ ✏️How to solve a problem =====================
/*
1️⃣ PROBLEM:
IN the company, where building home thermometer,we can mostly have this question:
❗️Given an array of temperatures of one day, calculate the temperature amplitude.
keep in mind that sometimes there might be  sensor error.
 */
// const temperatures = [3, -2, -1, 'error', 3, 4, 9, -6, -7];
//
// //1) Understand the problem
// //- What is curTemp amplitude? Answer:difference between highest and lowest curTemp
// //- How to compute maxNum and minNum temps?
// //- What's an sensor error can be and what to do? Answer: ignore
//
// //2) Breaking down into sub-problems
// //- How to ignore errors?
// //- Find maxNum and minNum curTemp
// //- Subtract minNum from maxNum
//
// const calcTempAmplitude = function (temps) {
//   let maxNum = temps[0];
//   let minNum = temps[0];
//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//
//     if (typeof curTemp !== 'number') continue;
//     if (curTemp > maxNum) maxNum = curTemp;
//     if (curTemp < minNum) minNum = curTemp;
//   }
//   console.log(maxNum, minNum);
//   return maxNum - minNum;
// };
//
// //console.log(calcTempAmplitude([2, 4, 1, -4]));
// const amplitude = calcTempAmplitude(temperatures);
// console.log(amplitude);
//
// //2️⃣ Problem:
// //Function should now receive 2 arrays of temperatures
//
// //1) Understand the problem
// //- With 2 arrays , should we implement the same function twice? Answer: NO, marge 2 arrays
//
// //2) Breaking down into sub-problems
// //- Marge 2 arrays
//
// const calcTempAmplitudeNew = function (t1, t2) {
//   const temps = t1.concat(t2);
//   console.log(temps);
//
//   let maxNum = temps[0];
//   let minNum = temps[0];
//   for (let i = 0; i < temps.length; i++) {
//     const curTemp = temps[i];
//
//     if (typeof curTemp !== 'number') continue;
//     if (curTemp > maxNum) maxNum = curTemp;
//     if (curTemp < minNum) minNum = curTemp;
//   }
//   console.log(maxNum, minNum);
//   return maxNum - minNum;
// };
//
// const amplitudeNew = calcTempAmplitudeNew([3, 5, 1, 'error'], [4, -4, 2, -1]);
// console.log(amplitudeNew);

//============== ✏️ Debugging with console =============
/*
const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',

    //Fix bug
    value: Number(prompt('Degrees celsius!')),

  };

  //Find bug
  //console.table(measurement);
  //console.log(measurement.value);∂
  //console.warn(measurement.value);
  //console.error(measurement.value);

  return measurement.value + 273;
};

console.log(measureKelvin()); //10 + 273 = 283
 */

//================= 👩🏻‍💻 coding challenge =================
/*
 Given an array of maximum temperatures and should return a string with these temperatures.
 Create a function which takes an array, and return a string

*/

const maxTemps = [17, 21, 23];

function printForecast(arr) {
  //create an empty string
  let displayString = '';
  //loop over the array
  for (let i = 0; i < arr.length; i++) {
    displayString += `${arr[i]}°C in ${i + 1} days ... `;
  }

  //return string
  return '... ' + displayString;
}
console.log(globalThis);

console.log(printForecast(maxTemps)); //'... 17°C in 1 days ... 21°C in 2 days ... 23°C in 3 days ...'
console.log(printForecast([12, 5, -5, 0, 4])); //'... 12°C in 1 days ... 5°C in 2 days ... -5°C in 3 days ... 0°C in 4 days ... 4°C in 5 days ...
