const patternDict = [{
  pattern: '\\b(?<greeting>Hi|Hello|Hey)\\b',
  intent: 'Hello'
}, {
  pattern: '\\b(bye|exit)\\b',
  intent: 'Exit'
}, {
  pattern: '\\bweather.*\\sin\\s\\b(?<city>[ a-z]+)\\s\\b(?<time>the day after tomorrow)$',
  intent: 'Get weather 2'
}, {
  pattern: '\\bweather.*\\sin\\s\\b(?<city>[ a-z]+)\\s\\b(?<time>tomorrow|today)$',
  intent: 'Get weather'
}, {
  pattern: '\\bweather.*\\sin\\s\\b(?<city>[ a-z]+)\\b',
  intent: 'Current weather'
}, {
  pattern: '(?:is it|will it be)\\s\\b(?<temp>hot|warm|cold)?(?<weather>rainy|sunny|snowy)?\\s\\bin\\s(?<city>[ a-z]+)\\s\\b(?<time>tomorrow|today)$',
  intent: 'Check weather'
}];

module.exports = patternDict;
