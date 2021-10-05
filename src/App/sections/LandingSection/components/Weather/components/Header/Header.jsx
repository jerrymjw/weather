import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Header.css';

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export default function Header({ currentData, updateCity }) {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    if (currentData) {
      const date = new Date(currentData.dt);
      setCurrentDate(
        `${weekday[date.getDay()]}, ${date.getDate()} ${
          month[date.getMonth()]
        } ${date.getFullYear()}`
      );
    }
  }, [currentData]);

  return (
    <div className="weather__header">
      <span>{currentDate}</span>
      <div className="weather__header__city-selector">
        <select onChange={updateCity}>
          <option value="sydney">Sydney</option>
          <option value="melbourne">Melbourne</option>
          <option value="canberra">Canberra</option>
          <option value="brisbane">Brisbane</option>
          <option value="adelaide">Adelaide</option>
        </select>
      </div>
    </div>
  );
}

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  currentData: PropTypes.object.isRequired,
  updateCity: PropTypes.func.isRequired
};
