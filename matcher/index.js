"use strict";

const patterns = require("../patterns");
const XRegExp = require("xregexp");

let createEntities = (str, pattern) => {
    return XRegExp.exec(str, XRegExp(pattern, "i"));
}

let matchPattern = (str, callBack) => {
    let getResults = patterns.find(item => {
        if(XRegExp.test(str, XRegExp(item.pattern, "i"))){
            return true;
        }
    });

    if(getResults){
        return callBack({
            intent: getResults.intent,
            entities: createEntities(str, getResults.pattern)
        });
    } else{
        return callBack({});
    }
}

module.exports = matchPattern;