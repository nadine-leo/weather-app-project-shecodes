//Timestamp             /////////////////////
let now = new Date();

let hours = now.getHours();
let min = now.getMinutes();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dayWeek = days[now.getDay()];

let timestamp = document.querySelector("#timestamp");
timestamp.innerHTML = `${dayWeek} ${hours}:${min}`;

//Get Current Location and info      //////////////

function showCurrentTemp(response) {
  console.log(response);
  let currTemp = Math.round(response.data.main.temp);
  let minT = Math.round(response.data.main.temp_min);
  let maxT = Math.round(response.data.main.temp_max);

  let tempToday = document.querySelector(".tempToday");
  let weatherDescription = document.querySelector("#weather-description");
  let cityName = document.querySelector("#current-city-name");
  let minTemp = document.querySelector("#current-min-temp");
  let maxTemp = document.querySelector("#current-max-temp");

  tempToday.innerHTML = `${currTemp}`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  cityName.innerHTML = response.data.name;
  minTemp.innerHTML = `min ${minT}°C`;
  maxTemp.innerHTML = `max ${maxT}°C`;
}

function retrievePosition(position) {
  var lat = position.coords.latitude;
  var long = position.coords.longitude;
  let apiKey = "257e74eb60b897c439a9569203b9000a";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentTemp);
}

function callNavigator() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
  let cityInput = document.querySelector("#submit-search-city");
  cityInput.value = "";
}

let buttonCurrent = document.querySelector("#current-loc-btn");
buttonCurrent.addEventListener("click", callNavigator);

callNavigator();

//Weather API Location     ///////////////////////
function callWeatherApi(city) {
  ////do sth fancier with if's for different url calls
  let apiKey = "257e74eb60b897c439a9569203b9000a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentTemp);
}

function showNewCityInfo(newCity) {
  let apiKey = "257e74eb60b897c439a9569203b9000a";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showCurrentTemp);
}

function changeCurrentCity(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city-name");
  let cityInput = document.querySelector("#submit-search-city");
  let inputValue = cityInput.value;
  city.innerHTML = inputValue;
  console.log(inputValue);
  callWeatherApi(inputValue);
}

let submitCity = document.querySelector("form");
submitCity.addEventListener("submit", changeCurrentCity);
