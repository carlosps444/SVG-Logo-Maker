const fs = require("fs");
import inquirer from "inquirer";
const SVG = require("svg.js");


async function promptUser() {
    return inquirer.prompt([
       {
        type: "input",
        name: "text",
        message: "Enter up to three characters:",
        validate: input => (input.length <= 3 ? true : "Please enter up to three characters."),
       },
       {
        type: "input",
        name: "textColor",
        message: "Enter text color (color keyword or hexadecimal number):",
       },
       {
        type: "list",
        name: "shape",
        message: "Choose a shape:",
        choices: ["circle", "triangle", "sqaure"],
       },
       {
        type: "input",
        name: "shapeColor",
        message: "Enter shape color (color keyword or hexadecimal number):",
       },

    ]);
}


function generateSVG(userInput) {
    const draw = SVG().size(300,200);
    const text = draw.text(userInput.text).fill(userInput.textColor).move(10, 50);


    if (userInput.shape === "circle") {
        draw.circle(100).fill(userInput.shapeColor).move(100, 50);
    } else if (userInput.shape === "triangle") {
        draw.polygon("0,100 50,0 100,100").fill(userInput.shapeColor).move(100, 50);
    } else if (userInput.shape === "square") {
        draw.rect(100, 100).fill(userInput.shapeColor).move(100, 50);
    }

    return draw.svg();

}

async function init() {
    try {
        const userInput = await promptUser();
        const svgData = generateSVG(userInput);

        fs.writeFileSync("logo.svg", svgData);
        console.log("Generated logo.svg");
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}


init();