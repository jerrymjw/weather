import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { LoadingWaveIcon } from 'src/App/components';
import './Forecast.css';

const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const ForecastItem = ({ isLoading, forecastData }) => {
  const { dt, temp, weather } = forecastData;
  const [date, setDate] = useState(new Date());
  const [text, setText] = useState(' ');
  const [iconUrl, setIconUrl] = useState(' ');

  useEffect(() => {
    setDate(new Date(dt));
    const { main, icon } = weather;
    setText(main);
    setIconUrl(icon);
  }, [forecastData]);

  if (isLoading) {
    return (
      <li className="weather__forecast__item">
        <LoadingWaveIcon />
      </li>
    );
  }

  return (
    <li className="weather__forecast__item">
      <span className="weather__forecast__item__day">
        {weekday[date.getDay()]}
      </span>
      <div className="weather__forecast__item__condition">
        <img src={iconUrl} alt={text} />
      </div>
      <div className="weather__forecast__item__temp">
        <span className="weather__forecast__item__temp_low">
          {temp && Math.round(temp.min).toString().padStart(2, '0')}
        </span>
        <span className="weather__forecast__item__temp_high">
          {temp && Math.round(temp.max).toString().padStart(2, '0')}
        </span>
      </div>
    </li>
  );
};

ForecastItem.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  forecastData: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default function Forecast({ isLoading, forecastData }) {
  return (
    <ul className="weather__forecast">
      {forecastData &&
        forecastData.map((data) => (
          <ForecastItem isLoading={isLoading} forecastData={data} />
        ))}
    </ul>
  );
}

Forecast.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  forecastData: PropTypes.arrayOf(PropTypes.string).isRequired
};
