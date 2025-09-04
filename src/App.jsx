import { useState } from "react";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

import video from "./assets/video.mp4";

function App() {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";

  const fetchWeather = async (city) => {
    setIsLoading(true);
    setError("");
    try {
      const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const respone = await axios.get(url);
      console.log(respone.data);
      setWeather(respone.data);
    } catch (error) {
      if (error.respone && error.respone.status === 404) {
        setError("City not found. please try again");
      } else {
        setError("An error occurred. please try again");
      }
      setWeather(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 relative overflow-hidden ">
      <video
        className="absolute inset-0 w-full h-full object-cover  "
        autoPlay
        loop
        muted
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video
      </video>
      <div className="absolute left-0 top-0 bg-black/20 w-full h-full z-1"></div>
      <div className="bg-black/70 text-white rounded-lg shadow-lg p-8 max-w-md w-full z-50">
        <h1 className="text-3xl text-center font-bold mb-6">Weather App</h1>
        <SearchBar fetchWeather={fetchWeather} />
        {isLoading && <p className="text-center mt-4">Loading...</p>}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;
