'use strict';

//const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
    </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = '1';
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = '1';
};

//=============== First AJAX Call: XMLHttpRequest ==================
// const getCountryData = function (country) {
//   const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   request.send();
//
//   request.addEventListener('load', function () {
//     //console.log(this.responseText);
//     const [data] = JSON.parse(this.responseText);
//     //console.log(data);
//
//     const html = `
//     <article class="country">
//           <img class="country__img" src="${data.flag}" />
//           <div class="country__data">
//             <h3 class="country__name">${data.name}</h3>
//             <h4 class="country__region">${data.region}</h4>
//             <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)}</p>
//             <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
//             <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
//           </div>
//         </article>
//     `;
//
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = '1';
//   });
// };
//
// getCountryData('Armenia');
// getCountryData('USA');
// getCountryData('France');

//======================== Welcome to Callback Hell ===========================

/*
const getCountryAndNeighbor = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //render country 1
    renderCountry(data);

    //get neighbor country 2
    const [neighbour] = data.borders;

    if (!neighbour) return;
    //AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();
    //add another callback in first callback
    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbor('armenia');

//another example of Callback Hell
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed')
      }, 1000)
    }, 1000);
  }, 1000);
}, 1000);

 */

//====================== Promises and the Fetch API:modern way of making AJAX call ======================

//before
//const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send()

//now
//const request = fetch('https://restcountries.eu/rest/v2/name/armenia')

// #1 solution: How to CONSUME a promises
// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// #2 solution
//create helper function
const getJSON = function (url, errorMsg = 'Something went wrong!') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }

    return response.json();
  });
};
//main function #1 without using helper function
// const getCountryData = function (country) {
//   //country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//
//       //country 2
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Country not found (${response.status})`);
//       }
//
//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥 ${err.message} : Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = '1';
//     });
// };

//#2: With helper function
// const getCountryData = function (country) {
//   //country 1
//   getJSON(
//     `https://restcountries.eu/rest/v2/name/${country}`,
//     'Country not found!'
//   )
//     .then(data => {
//       renderCountry(data[0]);
//
//       //country 2
//       const neighbour = data[0].borders[0];
//       if (!neighbour) throw new Error('No neighbour found!');
//
//       return getJSON(
//         `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
//         'Country not found!'
//       );
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥 ${err.message} : Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = '1';
//     });
// };
//
// // btn.addEventListener('click', function () {
// //   getCountryData('armenia');
// // });
// // //getCountryData('werrtyyu')

//===================== Coding Challenge #1 ================================================

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
Here are your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you received about the provided location. Then, using this data, log a message like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case.
So create an error to reject the promise yourself, with a meaningful error message.
PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
GOOD LUCK 😀
*/

// const whereAmI = (lat, lng) => {
//   fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
//     .then(res => {
//       if (!res.ok) throw new Error(`Cannot recoding (${res.status})💥`);
//
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//
//       return res.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => {
//       console.error(`${err.message}`);
//     });
// };
//
// whereAmI(52.508, 13.381); //You are in Berlin, Germany
// whereAmI(19.037, 72.873); //You are in Mumbai, India
// whereAmI(-33.933, 18.474); //You are in Cape Town, South Africa

//=================================== order of execution =====================================
// console.log('test start'); //1
// setTimeout(() => console.log('0 sec  timer'), 0); //5 => not after 0 second, but after second promise is executed
// Promise.resolve('Resolved promise 1').then(res => console.log(res)); //3
//
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 100000000; i++) {}
//   console.log(res);//4
// });
// console.log('test end'); //2

//======================= Creating  our own promises ======================================
/*
const lotteryPromise = new Promise(function (resolve, reject) {

  console.log('Lottery drew is happening 🔮');

  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 🏆');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//how to promisify setTimeout function
const wait = function (second) {
  return new Promise(resolve => {
    setTimeout(resolve, second * 1000);
  });
};
//======new way of doing
wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('4 second passed');
    return wait(1);
  });

//=============== old way of doing ===============
// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 seconds passed');
//       setTimeout(() => {
//         console.log('4 seconds passed')
//       }, 1000)
//     }, 1000);
//   }, 1000);
// }, 1000);

//========================= a way to very easy create a fulfilled or a rejected promise immediately
//and this is a static method of a promise constructor , which will resolve immediately
Promise.resolve('abc').then(response => console.log(response));
Promise.reject(new Error('efg')).catch(err => console.error(err));


 */
//========================== how to promisify geolocation API ==================
//the way of callback API
// navigator.geolocation.getCurrentPosition(
//   position => console.log(position),
//   err => console.error(err)
// );//2 execution

//console.log('First execution!'); //1 execution

//promisify
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     // navigator.geolocation.getCurrentPosition(
//     //   position => resolve(position),
//     //   err => reject(err)
//     // );
//     //or simply
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

//getPosition().then(pos => console.log(pos));

// const whereAmI = () => {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;
//
//       return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Cannot recoding (${res.status})💥`);
//       return res.json();
//     })
//     .then(data => {
//       console.log(data);
//       console.log(`You are in ${data.city}, ${data.country}`);
//
//       return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
//     })
//     .then(res => {
//       if (!res.ok) throw new Error(`Country not found (${res.status})`);
//       return res.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//
//     .catch(err => {
//       console.error(`${err.message}`);
//     });
// };
//
// btn.addEventListener('click', whereAmI);

//======================= coding challenge  #2 ==================================
/*
Build the image loading functionality that I just showed you on the screen.
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉
PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img'))
and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise.
The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.
If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Consume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT:
Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.
TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path.
Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
GOOD LUCK 😀
*/

/*
const imgContainer = document.querySelector('.images');

const wait = function (second) {
  return new Promise(resolve => {
    setTimeout(resolve, second * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;
createImage('img/img-1.jpeg')
  .then(img => {
    currentImg = img;
    console.log('added 1 image');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';

    return createImage('img/img-2.jpeg');
  })
  .then(img => {
    currentImg = img;
    console.log('added 2 image');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
 */

//====================== 2017 Async/Await ==========================================
//here is better and easier way to consume promises
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

//how to catch errors with async/await
// try {
//   let y = 3;
//   const x = 4;
//   x = 5;
// } catch (err)  {
//   alert(err.message)
// }

//old way
//return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`).then(res => console.log(res));

const whereAmI = async function () {
  //using try for catch errors
  try {
    //geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    //reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) {
      throw new Error('problem getting location data');
    }
    const dataGeo = await resGeo.json();

    //country data
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    //reject promise returned from async function
    throw err;
  }
};

console.log('1: will get location');
//old way
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

//how convert old way of promises to async/await
//we can use IIFE:immediately-invoked function expressions
(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();

 */

//============= Running promises PARALLEL ========================
//In this section we want to get data about 3 countries at the same time.
//but order does not matter. we should use async function
/*
const get3Countries = async function (c1, c2, c3) {
  try {
    //in this way it doesnt loaded in the same time, each Ajax call wait until before ended
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);
    //============== Promise.all() ===========
    //‼️ this will return a new promise, and will loaded at the same time: parallel
    //and Promise.all() function called combinator function, because it allows us to combine multiply promises
    //❗️but if one of the promises reject,then the whole promises reject as well
   const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);

   console.log(data.map(el => el[0].capital))


  } catch (err) {
    console.error(`${err.message}`);
  }
};
get3Countries('armenia', 'canada', 'france');
*/

//========== Promise.race() =========
//another combinator function , and promise returned by this function settled as soon as one of the input promises settles.
//And remember that settled simply means,that a value is available,
//❗️but it doesn't matter if the promise got rejected or fulfilled.
//And so in Promise.race(), basically the first settled promise wins the race.

(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/armenia`),
    getJSON(`https://restcountries.eu/rest/v2/name/russia`),
    getJSON(`https://restcountries.eu/rest/v2/name/france`),
  ]);
  console.log(res[0]);
})();
