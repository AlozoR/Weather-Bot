'use strict';
// 58a99fec28563a1f3b9bfcc7d48259cb
const Readline = require('readline'); // for reading inputs

const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const matcher = require('./matcher');
const weather = require("./weather");

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
        console.log('Querying the weather api...');
        console.log(cb.entities.city);
        rl.prompt();
        break;
      case 'Current weather':
        console.log('Querying the weather api...');
        weather(cb.entities.city).then(data => {
          console.log(`The weather in ${cb.entities.city} currently:`);
          const currentWeather = data.list[0];
          console.log(`The weather is currently ${currentWeather.weather[0].description}`);
          console.log(`The temperature is ${(currentWeather.main.temp - 273.15).toFixed(1)} °C`);
          console.log(`The wind blows at ${currentWeather.wind.speed.toFixed(0)} kph`);
          rl.prompt();
        });
        break;
      default:
        console.log('Not supported');
        rl.prompt();
    }
  })
});
