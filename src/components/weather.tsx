import React, { useState } from 'react';
import axios from 'axios';

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [locationInput, setLocationInput] = useState<string>(''); // State for location input
  const [error, setError] = useState<string>(''); // State for error messages

  const apiKey = '14ae4b9c89dc571a1c59f9e3fb5e2a21'; // Your API key

  // Function to fetch weather data
  const fetchWeather = async (input: string) => {
    try {
      let response;

      // Check if the input is in latitude, longitude format
      if (/^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/.test(input.trim())) {
        const [lat, lon] = input.split(',');
        response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat.trim()}&lon=${lon.trim()}&appid=${apiKey}&units=metric`);
      } else {
        // Assume it's a city name
        response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`);
      }

      setWeatherData([response.data]); // Store the data in state
      setError(''); // Clear any previous errors
    } catch (err) {
      setError('Location not found'); // Handle errors
      console.error(err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    if (locationInput) {
      fetchWeather(locationInput); // Fetch weather data for the entered location
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-500 min-h-screen flex flex-col justify-center items-center p-4">
      <h1 className="text-white text-4xl font-bold mb-6 text-center">Weather App</h1>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row mb-6 w-full max-w-md">
        <input
          type="text"
          value={locationInput}
          onChange={(e) => setLocationInput(e.target.value)}
          placeholder="Enter city name or latitude,longitude"
          className="border border-gray-300 rounded-lg p-3 text-gray-800 focus:outline-none focus:border-blue-400 mb-2 sm:mb-0 sm:mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200">
          Get Weather
        </button>
      </form>
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {weatherData.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-4">
          <h2 className="text-2xl font-bold text-gray-800">{weatherData[0].name}</h2>
          <p className="text-lg text-gray-700">Temperature: {weatherData[0].main.temp}°C</p>
          <p className="text-lg text-gray-700">Weather: {weatherData[0].weather[0].description}</p>
          <p className="text-lg text-gray-700">Humidity: {weatherData[0].main.humidity}%</p>
          <p className="text-lg text-gray-700">Wind Speed: {weatherData[0].wind.speed} m/s</p>
        </div>
      )}
      {/* Footer Section */}
      <footer className="w-full mt-auto p-4 text-center text-white">
        <p className="text-sm">Powered by KimTech</p>
        <p className="text-sm">Email: elijahkimani1293@gmail.com</p>
        <p className="text-sm">Phone: 0791337188</p>
      </footer>
    </div>
  );
};

export default Weather;
