# Chat Bot

## Objective
A computer program that can interact with a human through a chat interface and is designed to simulate a human.

<br>

## Built With
* [Visual Studio Code](https://code.visualstudio.com)
* [Node JS](https://nodejs.org/en/)

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

4. Run the app you can either use: 

`nodemon app.js` (Recommended)
`node app.js`

5. Make two folders 

`mkdir patterns`

`mkdir matcher`

6. In each of the folder put an `index.js` file inside them

`touch patterns/index.js`

`touch matcher/index.js`

7. Copy and paste the following code for the respected file

### patterns/index.js

```
const patternDict = [{
    pattern: "\\b(Hi|Hello|Hey|What's up)\\b",
    intent: "Hello"
}, {
    pattern: "\\b(bye|exit)\\b",
    intent: "Exit"
}];

module.exports = patternDict;
```

### matcher/index.js

```
"use strict";

const patterns = require("../patterns");
const XRegExp = require("xregexp");

let matchPattern = (str, callBack) => {
    let getResults = patterns.find(item => {
        if(XRegExp.test(str, XRegExp(item.pattern, "i"))){
            return true;
        }
    });

    if(getResults){
        return callBack({
            intent: getResults.intent
        });
    } else{
        return callBack({});
    }
}

module.exports = matchPattern;
```

<br>

## Author
[Christopher Kim](http://chriskimdev.com)

## Build Status
Functional