// let js = "amazing";
// console.log(40 + 20 + 50 - 50);
//
// //========= 📌Values and Variables ======
//
// console.log(js);
// console.log("Jonas");
// console.log(23);
// let firstName = "Matilda";
// console.log(firstName);
// console.log(firstName);
// console.log(firstName);
// // Variable name conventions
// //👍 good way
// let jonas_matilda = "JM";
// let $function = 27;
// let myFirstJob = "Coder";
// let myCurrentJob = "Teacher";
// let person = "jonas";
//
// //👎 bad way
// let PI = 3.1415;
// let job1 = "programmer";
// let job2 = "teacher";
// console.log(myFirstJob);
//
// //=========== ✏️ coding challenge  ===========
//
const massMarks = 78;
const heightMarks = 1.69;
const massJohn = 92;
const heightJohn = 1.95;

const bmiOfMarks = massMarks / heightMarks ** 2;
const bmiOfJohn = massJohn / (heightJohn * heightJohn);

let compare;
if (bmiOfMarks > bmiOfJohn) {
  compare = `Mark's BMI ${bmiOfMarks} is higher then John's BMI ${bmiOfJohn}`;
} else {
  compare = `John's BMI ${bmiOfJohn} is higher then Mark's BMI ${bmiOfMarks}`;
}

console.log(compare);

//===================== ✏️coding challenge ================
const bill = 275;
const tip = bill >= 50 && bill <= 300 ? (bill * 15) / 100 : (bill * 20) / 100;

console.log(
  `The bill was ${bill}, the tip was ${tip}, and the total was ${bill + tip}`
);
