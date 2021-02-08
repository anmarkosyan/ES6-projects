'use strict';

//1️⃣ Selectors
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

//console.log(btnsOpenModal); //NodeList(3)[button.show-modal, button.show-modal, button.show-modal]

for (let i = 0; i < btnsOpenModal.length; i++)
  console.log(btnsOpenModal[i].textContent);

//2️⃣ Functions


//3️⃣ Event Listeners

