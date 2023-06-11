import fetch from 'node-fetch'
import config from './config.js';

function fetchData(month) {
  const date = new Date();
  date.setMonth(month - 1);

  const startAtForAllDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
  const endAtForAllDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0];

  // Subtract one day from startAtForAllDay and add one second to get startAt
  const startAt = new Date(Date.parse(startAtForAllDay) - 24 * 60 * 60 * 1000 + 1000).toISOString();

  // Add one day to endAtForAllDay and subtract one second to get endAt
  const endAt = new Date(Date.parse(endAtForAllDay) + 24 * 60 * 60 * 1000 - 1000).toISOString();

  const apiUrl = config.apiUrl +`?endAt=${encodeURIComponent(endAt)}&endAtForAllDay=${endAtForAllDay}&startAt=${encodeURIComponent(startAt)}&startAtForAllDay=${startAtForAllDay}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data.events);
}

export default fetchData;
