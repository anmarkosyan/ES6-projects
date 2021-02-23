'use strict';

//1️⃣ Default parameters:
const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //old way of setting default parameters:ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
};

createBooking('AB231');
//override default parameters
createBooking('AB231', 2, 300);
createBooking('AB231', 2);
createBooking('AB231', 4);

//if we want to skip the one argument and specify another, for doing that we should write UNDEFINED, which will take the default value
createBooking('AB231', undefined, 1000); //{flightNum: "AB231", numPassengers: 1, price: 1000}
