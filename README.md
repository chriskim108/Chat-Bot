# Chat Bot

## Objective
Develop a chat bot with Node.JS that can interact with a person through the terminal and can inform the user about the weather.

<br>

## Built With
* [Visual Studio Code](https://code.visualstudio.com)
* [Node JS](https://nodejs.org/en/)
* [Ubuntu](https://www.ubuntu.com)

<br>

## Instructions: 

1. Initialize the Node JS File

`npm init`

2. Create an `app.js` and input the following code:

```
"use strict";

const Readline = require("readline");
const rl = Readline.createInterface({
    input:process.stdin,
    output:process.stdout,
    terminal:false
});
const matcher = require("./matcher");

rl.setPrompt("> ");
rl.prompt();

rl.on("line", reply => {
    matcher(reply, data => {
        switch(data.intent){
            case "Hello": 
                console.log("Hello from Espresso");
                rl.prompt();
                break;
            case "Exit":
                console.log("See you later!");
                process.exit(0);
            default: {
                console.log("I'm sorry I did not understand that");
                rl.prompt();                
            }
        }
    });
});
```

3. Install the following node package

`npm install -g nodemon`

`npm i xregexp@3.1.1 --save --save-exact` 

`npm i yql@1.0.2 --save --save-exact`


4. Make three folders 

`mkdir patterns`

`mkdir matcher`

`mkdir weather`

5. In each of the folder put an `index.js` file inside them

`touch patterns/index.js`

`touch matcher/index.js`

`touch weather/index.js`

6. Copy and paste the following code for the respected file

### patterns/index.js

```
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
```

### matcher/index.js

```
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
```

### weather/index.js

```
const YQL = require("yql");

let getWeather = (location, type = "forecast") => {
    return new Promise((resolve, reject) => {
        let query = new YQL(`select ${type === "current" ? "item.condition, location" : "*"} from weather.forecast where woeid in (select woeid from geo.places(1) where text = "${location}") and u="f"`);
    
        query.exec((error, response) => {
            if(error){
                reject(error);
            } else{
                resolve(response);
            }
        });
    });
}

module.exports = getWeather;
```

7. Run the app you can either use: 

`nodemon app.js` (Recommended)

`node app.js`

8. Ask the bot some questions that has `like in {Name of the City}` through the terminal. Look below for some test cases.

## Test Case 

User Input:

`What is the weather like in Los Angeles`

`What is the weather like in New York`

`What is the weather like in Chicago`

Output: JSON like this

```
{ 
    query:
    { 
        count: 1,
        created: '2018-03-29T16:46:36Z',
        lang: 'en-US',
        results: { channel: [Object] } 
    } 
}
```

<br>

## Author
[Christopher Kim](http://chriskimdev.com)

## Build Status
Functional