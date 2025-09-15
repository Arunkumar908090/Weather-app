import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const API_KEY = "b76004fadd7b89577894a9a1551438c2"; // 🔑 replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city) return;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    setWeather(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">🌦 Weather App</h1>

      <div className="flex space-x-2 mb-6">
        <input
          type="text"
          placeholder="Enter city Everywhere"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded-lg text-black"
        />
        <button
          onClick={fetchWeather}
          className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold"
        >
          Search
        </button>
      </div>

      {weather && weather.main ? (
        <div className="bg-white text-black p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold">{weather.name}</h2>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p className="text-3xl font-bold">{weather.main.temp}°C</p>
        </div>
      ) : (
        <p className="opacity-80">Search for a city to see the weather.</p>
      )}
    </div>
  );
}

