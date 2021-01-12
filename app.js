'use strict';
// 58a99fec28563a1f3b9bfcc7d48259cb
const Readline = require('readline'); // for reading inputs

const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const matcher = require('./matcher');
const weather = require('./weather/');
const colors = require('./colors');

const countries = require('i18n-iso-countries');
const chalk = require('chalk');

const getIndex = (time = 'today') => {
  switch (time) {
  case 'today':
    return 0;
  case 'tomorrow':
    return 8;
  case 'the day after tomorrow':
    return 16;
  }
};

const getWeatherColor = desc => {
  for (const [key, value] of Object.entries(colors.weatherColors)) {
    if (desc.includes(key)) {
      return value;
    }
  }
  return 'white';
};

const getTempKeyword = temp => {
  return temp < 0 ? 'very cold' :
    temp >= 0 && temp < 12 ? 'cold' :
      temp >= 12 && temp < 25 ? 'warm' :
        temp >= 25 && temp < 35 ? 'hot' : 'very hot';
};

const displayWeather = (data, time = 'today') => {
  const index = getIndex(time);
  const verb = index === 0 ? 'is' : 'will be';
  const country = countries.getName(data.city.country, 'en');
  console.log('The weather in'
    + chalk.keyword('purple')(` ${data.city.name}, ${country} `)
    + time + ':\n');
  const weatherData = data.list[index];
  const desc = weatherData.weather[0].description;
  console.log(`The weather ${verb} ${chalk.keyword(getWeatherColor(desc))(desc)}.`);
  const temp = (Math.round(weatherData.main.temp - 273.15));
  const tempString = getTempKeyword(temp);
  console.log(`It ${verb} ${chalk.keyword(colors.tempColors[tempString])(tempString)}, with a temperature of ${temp} °C.`);
  console.log(`The wind ${verb} blowing at ${Math.round(weatherData.wind.speed)} kph.\n`);
};

rl.setPrompt('> ');
rl.prompt();
rl.on('line', reply => {
  matcher(reply, cb => {
    switch (cb.intent) {
    case 'Hello':
      console.log(cb.entities.greeting);
      rl.prompt();
      break;
    case 'Exit':
      console.log('The program will exit');
      process.exit(0);
      break;
    case 'Get weather':
    case 'Get weather 2':
      console.log(chalk.yellow('Querying the weather api...'));
      weather(cb.entities.city).then(data => {
        displayWeather(data, cb.entities.time);
      }).then(() => rl.prompt());
      break;
    case 'Current weather':
      console.log(chalk.yellow('Querying the weather api...'));
      weather(cb.entities.city).then(data => {
        displayWeather(data);
      }).then(() => rl.prompt());
      break;
    case 'Check weather':
      console.log(chalk.yellow('Querying the weather api...'));
      weather(cb.entities.city).then(data => {
        const index = getIndex(cb.entities.time);
        const verb = index === 0 ? 'is' : 'will be';
        const weatherData = data.list[index];
        if (cb.entities.weather) {
          let toCheck = '';
          switch (cb.entities.weather) {
          case 'rainy':
            toCheck = ['rain'];
            break;
          case 'sunny':
            toCheck = ['clear', 'scattered'];
            break;
          case 'snowy':
            toCheck = ['snow'];
            break;
          }
          const actualWeather = weatherData.weather[0].description;
          if (new RegExp(toCheck.join('|')).test(actualWeather)) {
            console.log('Yes, absolutely!');
          } else {
            console.log(`No, the weather ${verb} ${chalk.keyword(getWeatherColor(actualWeather))(actualWeather)}.`);
          }
        } else {
          const temp = (Math.round(weatherData.main.temp - 273.15));
          const tempString = getTempKeyword(temp);
          if (cb.entities.temp === tempString) {
            console.log(`Yes, absolutely! The exact temperature ${verb} ${temp} °C.`);
          } else {
            console.log(`No, it ${verb} ${chalk.keyword(colors.tempColors[tempString])(tempString)}, with a temperature of ${temp} °C.`);
          }
        }
      }).then(() => rl.prompt());
      break;
    default:
      console.log('Not supported');
      rl.prompt();
    }
  });
});
