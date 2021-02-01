//❗️strict mode ❗️for secure JS code, to avoid accidental errors: it help us to introduce the bug into our code
//1️⃣ strict mode forbids us to do certain things
//2️⃣ it will actually create visible errors for us in certain situations in which without strict mode
//JavaScript will simply fail silently without letting us know that we did a mistake.
"use strict";

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive))");
