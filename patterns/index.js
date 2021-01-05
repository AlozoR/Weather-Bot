const patternDict = [{
  pattern: '\\b(?<greeting>Hi|Hello|Hey)\\b',
  intent: 'Hello'
}, {
  pattern: '\\b(bye|exit)\\b',
  intent: 'Exit'
}, {
  pattern: '\\bweather\\slike\\sin\\s\\b(?<city>[ a-z]+?)\\b(?<time>tomorrow|today)$',
  intent: 'Get weather'
}, {
  pattern: '\\bweather.*\\sin\\s\\b(?<city>[ a-z]+)\\b',
  intent: 'Current weather'
}];

module.exports = patternDict;
