//console.log(this); // will executed in the browser => Window
'use strict';

//console.log(this); // Window: {window: Window, self: Window, document: document, name: "", location: Location, …}
//console.log(globalThis);//new name for see which global environment we have, for all languages
// if (!window.Promise) {
//   alert("Your browser is really old!");
// }else{
//   alert('yes, everything is new)))))')
// }//to test if a built-in Promise object exists (it doesn’t in really old browsers):

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
const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let maxNum = temps[0];
  let minNum = temps[0];
  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];

    if (typeof curTemp !== 'number') continue;
    if (curTemp > maxNum) maxNum = curTemp;
    if (curTemp < minNum) minNum = curTemp;
  }
  console.log(maxNum, minNum);
  return maxNum - minNum;
};

const amplitudeNew = calcTempAmplitudeNew([3, 5, 1, 'error'], [4, -4, 2, -1]);
console.log(amplitudeNew);
