const patternDict = [{
    pattern: "\\b(?<introduction>Hi|Hello|Hey|What's up)\\b",
    intent: "Hello"
}, {
    pattern: "\\b(bye|exit)\\b",
    intent: "Exit"
}, {
    pattern: "like\\sin\\s\\b(?<city>.+)",
    intent: "CurrentWeather"
}];

module.exports = patternDict;