const locale = document.querySelector("#locale");
const weather = document
.querySelector("#weather");
const temp = document.querySelector("#temp");

const weatherSearch = document.querySelector("#weatherSearch");

let searchValue = "London";

let weatherDescription = "";

const body = document.querySelector("body");
let mainWeather = "";

let temperature = "";
let currentTemp = "";
const fahrenheit = document.querySelector("#fahrenheit");
const celsius = document.querySelector("#celsius");
let degF = false;
let degC = false;

function capitalizeFirstLetters(str) {
 return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function generateWeather() {
 fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=6abc7a32401f7fc386341ccc08d3085a`, {mode: "cors"})
  .then(function(response) {
   return response.json();
  })
  .then(function(response) {
   locale.textContent = "Location: " + response.name;

   weatherDescription = capitalizeFirstLetters(response.weather[0].description);
   weather.textContent = "Weather: " + weatherDescription;
   mainWeather = response.weather[0].main;
   changeBackground();

   currentTemp = response.main.temp;
   temperature = ((Math.round((currentTemp - 273.15) * (9/5) + 32))) + "º F";
   temp.textContent = "Temperature: " + temperature;
   degF = true;
   currentTemp = temperature;
   calculateTemp();
   console.log(response);
  });
}

function changeBackground() {
 if (mainWeather == "Clear") {
  body.style.backgroundColor = "lightskyblue";
 } else if (mainWeather == "Rain") {
  body.style.backgroundColor = "cyan";
 } else if (mainWeather == "Clouds") {
  body.style.backgroundColor = "ghostwhite";
 } else if (mainWeather == "Snow") {
  body.style.backgroundColor = "snow";
 } else if (mainWeather == "Mist") {
  body.style.backgroundColor = "powderblue";
 }
}

function calculateTemp() {
 celsius.addEventListener('click', fToC);
 fahrenheit.addEventListener('click', cToF);
}

function fToC() {
 if (degC) return;
 temperature = Math.round((((parseInt(currentTemp) - 32) * 5)/(9))) + "º C";
 degF = false;
 degC = true;
 temp.textContent = "Temperature: " + temperature;
 currentTemp = temperature;
}

function cToF(){
 if (degF) return;
 temperature = Math.round(((parseInt(currentTemp)) * (9/5) + 32)) + "º F";
 degC = false;
 degF = true;
 temp.textContent = "Temperature: " + temperature;
 currentTemp = temperature;
}

generateWeather();

function submitNewLocale() {
 if (weatherSearch.value == "") return;
  searchValue = weatherSearch.value;
  generateWeather();
  weatherSearch.value = "";
}

const submit = document.querySelector("#submit");

submit.addEventListener('click', submitNewLocale);