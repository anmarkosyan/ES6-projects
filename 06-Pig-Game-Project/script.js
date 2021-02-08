'use strict';

//1️⃣ Selectors
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const displayDice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//2️⃣ Variables and Functions
//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
displayDice.classList.add('hidden');

//variables
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //with toggle class method we can add class if it is not there, and remove if it is there
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

//3️⃣ Event Listeners
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generation a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //console.log(dice);

    //2.display dice roll
    displayDice.classList.remove('hidden');
    displayDice.src = `img/dice-${dice}.png`;

    //3. check if number is 1:
    //if not: add number to the current score
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;

      // if true: switch to the next player
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to the total score
    //scores[0] += currentScore
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. check if score >= 100 ?
    if (scores[activePlayer] >= 20) {
      playing = false;
      //current player win: Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      displayDice.classList.add('hidden');

      //switch the player
    } else {
      switchPlayer();
    }
  }
});
