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


4. Make four folders 

`mkdir patterns`

`mkdir matcher`

`mkdir weather`

`mkdir parser`

5. In each of the folder put an `index.js` file inside them

`touch patterns/index.js`

`touch matcher/index.js`

`touch weather/index.js`

`touch parser/index.js`

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
```

### weather/index.js

```
"use strict";

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

### parser/index.js

```
let getFeel = temp => {
    if(temp < 5) {
		return "shivering cold";
	} else if(temp >= 5 && temp < 15) {
		return "pretty cold";
	} else if(temp >= 15 && temp < 25) {
		return "moderately cold";
	} else if(temp >= 25 && temp < 32) {
		return "quite warm";
	} else if(temp >= 32 && temp < 40) {
		return "very hot";
	} else {
		return "super hot";
	}
}

let currentWeather = response => {
    if(response.query.results){
        let resp = response.query.results.channel;
        let location = `${resp.location.city}, ${resp.location.country}`;

        let {text, temp} = resp.item.condition;

        return `Right now, it is ${text.toLowerCase()} in ${location}. It is ${getFeel(Number(temp))} at ${temp} degrees Fahrenheit.`
    }
}

module.exports = {
    currentWeather
}
```

7. Run the app you can either use: 

`nodemon app.js` (Recommended)

`node app.js`

8. Ask the bot some questions that has `like in {Name of the City}` through the terminal. Look below for some test cases.

## Test Case 

Examples: (Note these examples may not state the exact tempature do to different time)

User Input:
`What is the weather like in Los Angeles`

Output:
`Right now, it is sunny in Los Angeles, United States. It is super hot at 62 degrees Fahrenheit.`

User Input: 
`What is the weather like in New York`

Output:
`Right now, it is cloudy in New York, United States. It is super hot at 49 degrees Fahrenheit.`

User Input:
`What is the weather like in Chicago`

Output: 
`Right now, it is breezy in Chicago, United States. It is super hot at 43 degrees Fahrenheit.`

<br>

## Author
[Christopher Kim](http://chriskimdev.com)

## Build Status
Functional