'use strict';

//1️⃣ Selectors
const btnAgain = document.querySelector('.again');
const number = document.querySelector('.number');
const message = document.querySelector('.message');
const btnCheck = document.querySelector('.check');
const guess = document.querySelector('.guess');
const score = document.querySelector('.score');
const highScore = document.querySelector('.highscore');
const body = document.querySelector('body');

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let scoreNum = 20;
let highScoreNum = 0;

//2️⃣ functionality
const displayMessage = function (msg) {
  message.textContent = msg;
};

//3️⃣ event listeners
btnCheck.addEventListener('click', function () {
  const guessVal = Number(guess.value);
  console.log(guessVal, typeof guessVal);

  //📌️ when there is no input
  if (!guessVal) {
    displayMessage('⛔️ No number!');

    //📌 when player wins
  } else if (guessVal === secretNumber) {
    displayMessage('🎉 Correct number!');
    number.textContent = secretNumber;

    //using CSS
    body.style.backgroundColor = '#60b347';
    number.style.width = '30rem';

    //set higher scope
    if (scoreNum > highScoreNum) {
      highScoreNum = scoreNum;
      highScore.textContent = highScoreNum;
    }

    //when guess is wrong
  } else if (guessVal !== secretNumber) {
    if (scoreNum > 1) {
      displayMessage(
        guessVal > secretNumber ? '📈 Too high number!' : '📉Too low number!'
      );
      scoreNum--;
      score.textContent = scoreNum;
    } else {
      displayMessage('💥 You lost the game!');
      score.textContent = 0;
    }
  }
});

//start game AGAIN
btnAgain.addEventListener('click', function () {
  scoreNum = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  number.textContent = '?';
  number.style.width = '15rem';
  displayMessage('Start guessing...');
  score.textContent = scoreNum;
  guess.value = '';
  body.style.backgroundColor = '#222';
});
