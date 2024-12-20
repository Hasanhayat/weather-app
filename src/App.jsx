import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState(""); // User input city
  const [weatherData, setWeatherData] = useState(null); // Weather data to display
  const [error, setError] = useState(""); // Error handling

  const apiKey = "0f3f4fb90b44404da01184927241912"; // Your API Key

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city.");
      return;
    }
    setError(""); // Clear previous error

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("City not found or an error occurred.");
      setWeatherData(null);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>

      <div>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div>
          <h2>Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
        </div>
      )}
    </div>
  );
}

export default App;
