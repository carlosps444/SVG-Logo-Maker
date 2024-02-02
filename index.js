const filesystem = require("./node_modules/graceful-fs/graceful-fs")
const inquirer = require('inquirer');
const {Circle, Square, Triangle} = require('./lib/shapes');


class Svg{
    constructor(){
        this.textElement = ""
        this.shapeElement = ""
    }
    render(){
        return `<svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='300' height='200'>${this.shapeElement}${this.textElement}</svg>`

    }
    setTextElement(text,color){
        this.textElement = `<text x='125' y='125' font-size='60' text-anchor='middle' fill='${color}'>${text}</text>`

    }

    setShapeElement(shape){
        this.shapeElement = shape.render()
    }
}

const questions = [
{
    type: 'input',
    name: 'text',
    message: 'Enter up to 3 characters.',
},
{
    type: 'input',
    name: 'text-color',
    message: 'Enter a color keyword (or hex number).',
},
{
    type: 'input',
    name: 'shape',
    message: 'Enter a color keyword (or hex number).',
},
{
    type: 'list',
    name: 'pixel-image',
    message: 'Choose which Pixel Image you would like.',
    choices: ['Circle', 'Square', 'Triangle'],
},

];


function writeToFile(fileName, data) {
    console.log('Writing [' + data + '] to file [' +fileName + ']')

    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('Generating logo.svg.... Complete!');
    });
}

async function init() {
    console.log('Starting init');
    var svgString = '';
    var svg_file = 'logo.svg';

    const answers = await inquirer.prompt(questions);


    var user_text = '';
    if(answers.text.length > 0 && answers.text.length < 4) {
        user_text = answers.text;
    } else {
        console.log('Invalid user text field detected! Please enter 1-3 Characters.');
    return;
    }
    console.log('User text: [' + user_text + ']');
    user_font_color = answers['text-color'];
    console.log('User font color: [' + user_shape_color + ']');
    user_shape_type = answers['pixel-image'];
    console.log('User entered shape = || [' + user_shape_type + ']');

    let user_shape;
    if (user_shape_type === 'Square' || user_shape_type === 'square') {
        user_shape = new Square();
        console.log('User selected Square');
    }
    else if (user_shape_type === 'Circle' || user_shape_type === 'circle') {
        user_shape = new Circle();
        console.log('User selected Circle');
    }
    else if (user_shape_type === 'Triangle' || user_shape_type === 'triangle') {
        user_shape = new Triangle();
        console.log('User selected Triangle');
    }
    else {
        console.log('Invalid shape');
    }
    user_shape.setColor(user_shape_color);


    var svg = new Svg();
    svg.setShapeElement(user_text, user_font_color);
    svg.setShapeElement(user_shape);
    svgString = svg.render();

    console.log('Displaying shape:\n\n' + svgString);

    console.log('shape generation complete!');
    console.log('Writing shape to file...');
    writeToFile(svg_file, svgString);

    
}
init()