const patternDict = [{
    pattern: "\\b(?<introduction>Hi|Hello|Hey|What's up)\\b",
    intent: "Hello"
}, {
    pattern: "\\b(bye|exit)\\b",
    intent: "Exit"
}];

module.exports = patternDict;