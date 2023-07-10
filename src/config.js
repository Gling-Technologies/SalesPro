// Fetching inputOptions from DOM
const allInputOptionsEl = document.getElementById("all-input-options");
let allInputOptions = JSON.parse(allInputOptionsEl.dataset.inputOptions);
console.log(allInputOptions);

// Fetching configuration from DOM element `configHolder`
const appConfigEl = document.getElementById("configHolder");
const appConfiguration = JSON.parse(appConfigEl.dataset.conf);
console.log(appConfiguration);

const combined = { inputOptions: allInputOptions, appConfiguration };

export { allInputOptions as inputOptions, appConfiguration, combined as default };
