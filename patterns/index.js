const patternDict = [{
    pattern: "\\b(Hi|Hello|Hey)\\b",
    intent: "Hello there"
}, {
    pattern: "\\b(bye|exit)\\b",
    intent: "Bye it was nice knowing you"
}];

module.exports = patternDict;