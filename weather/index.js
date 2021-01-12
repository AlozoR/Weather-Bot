'use strict';
const axios = require('axios');
const API_KEY = '58a99fec28563a1f3b9bfcc7d48259cb';

const getWeather = location => {
  return axios.get(
    'http://api.openweathermap.org/data/2.5/' +
    `forecast?id=524901&appid=${API_KEY}`,
    {
      params: {
        appid: API_KEY,
        q: location
      }
    }).then(response => response.data)
    .catch(error => console.log('error'));
};

module.exports = getWeather;
