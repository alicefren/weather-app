let todaysDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

let currentDay = days[todaysDate.getDay()];
let currentDate = todaysDate.getDate();
let currentMonth = months[todaysDate.getMonth()];
let currentHour = todaysDate.getHours();
let currentMinute = todaysDate.getMinutes();

let liveDate = document.querySelector(".card-title");
if (currentMinute < 10) {
  liveDate.innerHTML = `${currentDay} ${currentDate} ${currentMonth}, ${currentHour}:0${currentMinute}`;
} else {
  liveDate.innerHTML = `${currentDay} ${currentDate} ${currentMonth}, ${currentHour}:${currentMinute}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  let apiKey = "5c043941096cfca1b8129a71701e2dcf";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showWeather);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", search);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let message = `Currently ${temperature} °C`;
  let span = document.querySelector("span");
  span.innerHTML = message;
}

function searchLocation(position) {
  let apiKey = "5c043941096cfca1b8129a71701e2dcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#compass");
currentLocationButton.addEventListener("click", getCurrentLocation);
