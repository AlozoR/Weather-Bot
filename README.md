# Weather-Bot
A little weather bot in Node.js

## Installation
Install the needed packages
```{sh}
npm install
```

## Available commands
| Command                                                                        | Output                                               | Example                         |
|--------------------------------------------------------------------------------|------------------------------------------------------|---------------------------------|
| weather in {city}                                                              | Current weather in the city                          | weather in Paris                |
| weather in {city}<br>{today\|tomorrow\|the day after tomorrow}                 | Weather in city at specific time                     | weather in Los Angeles tomorrow |
| is it {weather adverb} in {city}{today\|tomorrow\|the day after tomorrow}<br>  | Check a specific weather in city<br>at specific time | is it rainy in Berlin today     |
