import React, { useState, useEffect } from 'react';

export default function App() {

  const [weatherSearch, setWeatherSearch] = useState("");
  const [searchValue, setSearchValue] = useState("New York");
  const [degC, setDegC] = useState(false);
  const [degF, setDegF] = useState(false);
  const [currentTemp, setCurrentTemp] = useState("");
  const [temperature, setTemperature] = useState("");
  const [mainWeather, setMainWeather] = useState("");
  const [localeName, setLocaleName] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");

  const capitalizeFirstLetters = str => {
    return str.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const generateWeather = async () => {
    try {
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      const weatherData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${apiKey}`);
      const weatherJSON = await weatherData.json();
      setLocaleName(weatherJSON.name);
      const capitalizedDescription = capitalizeFirstLetters(weatherJSON.weather[0].description);
      setWeatherDescription(capitalizedDescription);
      setMainWeather(weatherJSON.weather[0].main);
      const weatherTemp = weatherJSON.main.temp; // In Kelvin
      setDegF(true);
      setTemperature(`${(Math.round((weatherTemp - 273.15) * (9/5) + 32)) + 1}º F`); // Converts Kelvin to Fahrenheit
      console.log(weatherJSON);
    } catch (err) {
      alert(`Generating error: ${err}`);
      setLocaleName(localeName);
    }
  }

  const changeBackground = () => {
    if (mainWeather === "Clear") {
      document.body.style.backgroundColor = "lightskyblue";
    } else if (mainWeather === "Rain") {
      document.body.style.backgroundColor = "cyan";
    } else if (mainWeather === "Clouds") {
      document.body.style.backgroundColor =  "ghostwhite";
    } else if (mainWeather === "Snow") {
      document.body.style.backgroundColor = "snow";
    } else if (mainWeather === "Mist") {
      document.body.style.backgroundColor =  "powderblue";
    }
  }

  useEffect(() => {
    changeBackground();
  }, [mainWeather]);

  const cToF = () => {
    if (degF) return;
    setDegC(false);
    setDegF(true);
    setTemperature(`${Math.round(((parseInt(currentTemp)) * (9/5) + 32))}º F`);
  }

  const fToC = () => {
    if (degC) return;
    setDegF(false);
    setDegC(true);
    setTemperature(`${Math.round((((parseInt(currentTemp) - 32) * 5)/(9)))}º C`);
  }

  useEffect(() => {
    setCurrentTemp(temperature);
  }, [temperature]);

  const handleChange = e => setWeatherSearch(e.target.value);

  const submitNewLocale = () => {
    if (weatherSearch === "") return;
    setSearchValue(weatherSearch);
  }

  useEffect(() => {
    generateWeather();
    setWeatherSearch("");
  }, [searchValue]);

  return (
    <div className="App">
      <div id="weatherDiv">
        <div id="locale">Location: {localeName}</div>
        <br/>
        <div id="weather">Weather: {weatherDescription}</div>
        <br/>
        <div id="temp">Temperature: {temperature}</div>
        <button id="fahrenheit" onClick={cToF}>ºF</button>
        <button id="celsius" onClick={fToC}>ºC</button>
      </div>
      <br/><br/><br/>
      <form action="">
        <input type="text" name="weatherSearch" value={weatherSearch} onChange={handleChange} id="weatherSearch"/>
        <button type="button" id="submit" onClick={submitNewLocale}>Submit</button>
      </form>
    </div>
  );
}