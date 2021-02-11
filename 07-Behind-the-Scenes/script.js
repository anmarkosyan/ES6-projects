'use strict';

function calcAge(birthYear) {
  const age = 2021 - birthYear;
  //console.log(firstName);

  function printAge() {
    const output = `${firstName} are ${age}, born in ${birthYear} 👩🏻‍💻.`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      const firstName = 'Araqs';
      var millennial = true;
      const str = `Oh, and you're a millennial, ${firstName}.`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
      console.log(add(2, 3));
    }
    console.log(millennial); // true: function scope variable
  }

  printAge();
  return age;
}
//calcAge(1986);// reference error: we cannot call the function before declaration firstName variable;
const firstName = 'Anush';
calcAge(1986); //Anush
