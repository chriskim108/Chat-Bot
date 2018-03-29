"use strict";

const Readline = require("readline");
const rl = Readline.createInterface({
    input:process.stdin,
    output:process.stdout,
    terminal:false
});
const matcher = require("./matcher");
const weather = require("./weather");

rl.setPrompt("> ");
rl.prompt();

rl.on("line", reply => {
    matcher(reply, data => {
        switch(data.intent){
            case "Hello": 
                console.log(`${data.entities.introduction} to you too!`);
                rl.prompt();
                break;
            case "Exit":
                console.log("See you later!");
                process.exit(0);
            case "CurrentWeather":
                console.log(`Checking weather for ${data.entities.city}...`);
                // Get the weather data from an API
                weather(data.entities.city, "current")
                    .then(response => {
                        console.log(response);
                        rl.prompt();
                    })
                    .catch(error => {
                        console.log("An error has occured");
                        rl.prompt();
                    })
                rl.prompt();
                break;
            default: {
                console.log("I'm sorry I did not understand that");
                rl.prompt();                
            }
        }
    });
});