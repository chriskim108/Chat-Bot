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