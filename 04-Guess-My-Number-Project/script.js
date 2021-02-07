'use strict';

/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = '🎉 Correct number!';
console.log(document.querySelector('.message').textContent);

const num = Number(document.querySelector('.number').textContent = '13');
console.log(num);

const score = Number(document.querySelector('.score').textContent = '13');
console.log(score)

const input = (document.querySelector('.guess').value = 23);
console.log(input);

 */

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //console.log(typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔️ No number!';
  }
});
