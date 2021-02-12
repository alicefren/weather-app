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
if (currentHour < 10) {
  liveDate.innerHTML = `${currentDay} ${currentDate} ${currentMonth}, 0${currentHour}:${currentMinute}`;
} else {
  liveDate.innerHTML = `${currentDay} ${currentDate} ${currentMonth}, ${currentHour}:${currentMinute}`;
}
if (currentMinute < 10) {
  liveDate.innerHTML = `${currentDay} ${currentDate} ${currentMonth}, ${currentHour}:0${currentMinute}`;
} else {
  liveDate.innerHTML = `${currentDay} ${currentDate} ${currentMonth}, ${currentHour}:${currentMinute}`;
}

function showWeather(response) {
  
  celsiusTemperature = response.data.main.temp;

  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#temp-degrees").innerHTML = `Currently ${Math.round(response.data.main.temp)} `;
  document.querySelector("#humidity").innerHTML = ` ${response.data.main.humidity} %`;
  document.querySelector("#wind").innerHTML = ` ${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#max-temp").innerHTML = `High ${Math.round(response.data.main.temp_max)} °C`;
  document.querySelector("#min-temp").innerHTML = `Low ${Math.round(response.data.main.temp_min)} °C`;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#weather-icon")
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function searchCity(city) {
  let apiKey = "5c043941096cfca1b8129a71701e2dcf";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);


function searchLocation(position) {
  let apiKey = "5c043941096cfca1b8129a71701e2dcf";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let tempDegrees = document.querySelector("#temp-degrees");
  tempDegrees.innerHTML = `Currently ${Math.round(fahrenheitTemp)}`;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempDegrees = document.querySelector("#temp-degrees");
  tempDegrees.innerHTML = `Currently ${Math.round(celsiusTemperature)}`;
}

let celsiusTemperature = null;

let currentLocationButton = document.querySelector("#compass");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("London");