// Fetching inputOptions from DOM
const allInputOptionsEl = document.getElementById("all-input-options");
let allInputOptions = JSON.parse(allInputOptionsEl.dataset.inputOptions);
// console.log(allInputOptions);

// Fetching configuration from DOM element `configHolder`
const appConfigEl = document.getElementById("configHolder");
const appConfiguration = JSON.parse(appConfigEl.dataset.conf);
// console.log(appConfiguration);

// Fetching location from DOM element `location`
const locationEl = document.getElementById("location");
const uriLocation = locationEl.dataset.location;
// console.log(uriLocation);

const combined = {
  inputOptions: allInputOptions,
  appConfiguration,
  uriLocation,
};

export { allInputOptions as inputOptions, appConfiguration, uriLocation, combined as default };
