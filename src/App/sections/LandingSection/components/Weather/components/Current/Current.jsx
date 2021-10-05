import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { LoadingWaveIcon } from 'src/App/components';
import sunriseSVG from './assets/sunrise.svg';
import sunsetSVG from './assets/sunset.svg';
import './Current.css';

export default function Current({ isLoading, currentData }) {
  const [conditionIcon, setConditionIcon] = useState('');
  const [condition, setCondition] = useState('');

  const [minTemp, setMinTemp] = useState(0);
  const [maxTemp, setMaxTemp] = useState(0);

  const [setTime, setSunset] = useState(0);
  const [riseTime, setSunrise] = useState(0);

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const clock = setInterval(() =>
      setCurrentTime(
        new Date().toLocaleTimeString('en-AU', {
          timeZone: currentData.timezone
        }),
        1000
      )
    );
    return () => clearInterval(clock);
  }, [currentData]);

  useEffect(() => {
    const { sunrise, sunset, temp, weather } = currentData;
    const { main, icon } = weather;
    setCondition(main);
    setConditionIcon(icon);

    setMinTemp(Math.round(temp.min).toString().padStart(2, '0'));
    setMaxTemp(Math.round(temp.max).toString().padStart(2, '0'));

    const sunriseTime = new Date(sunrise);
    const sunriseStr = `${sunriseTime
      .getHours()
      .toString()
      .padStart(2, '0')}:${sunriseTime
      .getMinutes()
      .toString()
      .padStart(2, '0')} AM`;
    setSunrise(sunriseStr);
    const sunsetTime = new Date(sunset);
    const sunsetStr = `${sunsetTime
      .getHours()
      .toString()
      .padStart(2, '0')}:${sunsetTime
      .getMinutes()
      .toString()
      .padStart(2, '0')} PM`;
    setSunset(sunsetStr);
  }, [currentData]);

  if (isLoading) {
    return (
      <section className="weather__current">
        <div className="weather__current__condition">
          <LoadingWaveIcon />
        </div>
        <div className="weather__current__temp">
          <div>
            <LoadingWaveIcon />
          </div>
          <div>
            <LoadingWaveIcon />
          </div>
        </div>
        <div className="weather__current__detail">
          <LoadingWaveIcon />
          <div className="weather__current__detail__sun">
            <div>
              <LoadingWaveIcon />
            </div>
            <div>
              <LoadingWaveIcon />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="weather__current">
      <div className="weather__current__condition">
        <img src={conditionIcon} alt={condition} />
        <span>{condition}</span>
      </div>
      <div className="weather__current__temp">
        <div>
          <span className="weather__current__temp__label">Low</span>
          <span className="weather__current__temp__degree_min">{minTemp}</span>
        </div>
        <div>
          <span className="weather__current__temp__label">High</span>
          <span className="weather__current__temp__degree_max">{maxTemp}</span>
        </div>
      </div>
      <div className="weather__current__detail">
        <div className="weather__current__detail__time">{currentTime}</div>

        <div className="weather__current__detail__sun">
          <div>
            <img src={sunriseSVG} alt="Sunrise" />
            <span className="weather__current__detail__sun__label">
              {riseTime}
            </span>
          </div>
          <div>
            <img src={sunsetSVG} alt="Sunset" />
            <span className="weather__current__detail__sun__label">
              {setTime}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

Current.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  currentData: PropTypes.shape({
    timezone: PropTypes.string,
    dt: PropTypes.number,
    sunrise: PropTypes.number,
    sunset: PropTypes.number,
    temp: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number
    }),
    weather: PropTypes.shape({
      main: PropTypes.string,
      icon: PropTypes.string
    })
  }).isRequired
};
