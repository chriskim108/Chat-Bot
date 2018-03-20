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

rl.setPrompt("> Enter a name: ");
rl.prompt();

rl.on("line", reply => {
    console.log(`You said ${reply}`);
    rl.prompt();
});
```

3. Install this node package

`npm install -g nodemon`

4. Run the app you can either use: 

`nodemon app.js` (Recommended)

`node app.js`

<br>

## Author
[Christopher Kim](http://chriskimdev.com)

## Build Status
In progress