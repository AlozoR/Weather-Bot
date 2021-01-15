# Weather-Bot
A little weather bot in Node.js

## Installation
Install the needed packages
```{sh}
npm install
```

## Available commands
| Command                                                                              | Output                                                | Example                         |
|--------------------------------------------------------------------------------------|-------------------------------------------------------|---------------------------------|
| weather in `{city}`                                                                  | Current weather in the city                           | weather in Paris                |
| weather in `{city}`<br/>`{today\|tomorrow\|the day after tomorrow}`                  | Weather in city at specific time                      | weather in Los Angeles tomorrow |
| is it `{weather adverb}` in `{city}`<br/>`{today\|tomorrow\|the day after tomorrow}` | Check a specific weather in city<br/>at specific time | is it rainy in Berlin today     |
| weather in `{city}` in `{number}` `{day\|days}`                                      | Check weather at specific day                         | weather in London in 3 days     |
