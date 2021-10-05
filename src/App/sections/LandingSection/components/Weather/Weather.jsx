import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { Header, Current, Forecast } from './components';
import './Weather.css';

import getWeatherDataFromLocation from './services/WeatherAPI';

export default function Weather() {
  const [city, setCity] = useState('sydney');
  const [backgroundStyle, setBackgroundStyle] = useState({
    background: `linear-gradient(
          0deg,
          rgba(0, 0, 10, 0.8),
          rgba(0, 0, 10, 0.8)
        )`
  });
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const updateCity = (event) => {
    event.preventDefault();
    setCity(event.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    getWeatherDataFromLocation({ location: city }).then((response) => {
      setBackgroundStyle({
        backgroundImage: `linear-gradient(
          0deg,
          rgba(0, 0, 10, 0.6),
          rgba(0, 0, 10, 0.6)
        ),
        url(${response.background})`
      });
      setWeatherData(response.filteredWeatherData);
      setIsLoading(false);
    });
  }, [city]);

  const [currentData, ...forecastData] = weatherData;

  return (
    <motion.section
      style={backgroundStyle}
      className="weather"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <section className="content">
        <Header currentData={currentData} updateCity={updateCity} />
        {currentData && (
          <Current isLoading={isLoading} currentData={currentData} />
        )}
        {forecastData && (
          <Forecast isLoading={isLoading} forecastData={forecastData} />
        )}
      </section>
    </motion.section>
  );
}
