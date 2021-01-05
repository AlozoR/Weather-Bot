'use strict';
const axios = require('axios');
const API_KEY = '58a99fec28563a1f3b9bfcc7d48259cb';

const getWeather = location => {
  return new Promise(async (resolve, reject) => {
    try {
      const weatherConditions = await axios.get(
        `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_KEY}`,
        {
          params: {
            appid: API_KEY,
            q: location
          }
        });

      resolve(weatherConditions.data);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = getWeather;
