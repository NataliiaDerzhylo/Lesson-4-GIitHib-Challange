let date = document.querySelector(".col-6-day");
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
date.innerHTML = `${day} ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let city = document.querySelector(".col-6-city");

  if (searchInput.value) {
    city.innerHTML = searchInput.value;
  } else {
    city.innerHTML = null;
    alert("Please type a city");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temperature");
  temperatureElement.innerHTML = `<strong>${temperature}°</strong>`;
}
function searchTemp(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "7dc301a446bb9379190bcbafb3374dfc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchTemp);

function showLocationTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let locationTemp = document.querySelector(".temperature");
  locationTemp.innerHTML = `<strong>${temperature}°</strong>`;
  let city = document.querySelector(".col-6-city");
  city.innerHTML = `<strong>${response.data.name}<strong>`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "7dc301a446bb9379190bcbafb3374dfc";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showLocationTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#location-temp");
locationButton.addEventListener("click", getCurrentPosition);
