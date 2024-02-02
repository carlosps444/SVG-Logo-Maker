const fs = require('fs');
const path = require('path');


function generateSVG(logoData) {
    let shapeMarkup;

    switch (logoData.shape) {
        case 'circle':
            shapeMarkup = `<circle cx="${logoData.width / 2}" cy="${logoData.height / 2}" r="${logoData.width / 2}" fill="${logoData.backgroundColor}" />`;
            break;
        
        case 'triangle':
            shapeMarkup = `<polygon points="${logoData.width / 2},0, 0,${logoData.height} ${logoData.width},${logoData.height}" fill="${logoData.backgroundColor}" />`;
            break;

            case 'square':
                shapeMarkup = `<rect width="${logoData.width}" height="${logoData.height}" fill="${logoData.backgroundColor}" />`;
                break;

                default:
                    console.error('Invalid shape specified. Allow values: "circle", "triangle", "square"');
                    process.exit(1);
    }

    return `
    <svg width="${logoData.width}" height="${logoData.height}" xmlns="http://www.w3.org/2000/svg">
        ${shapeMarkup}
        <text x="50%" y="50%" alignment-baseline="middle" text-anchor="middle" font-size="${logoData.text.fontSize}" fill="${logoData.text.textColor}">
            ${logoData.text.content}
            </text>
            </svg>
            `;
}


function saveSVGToFile(svg, filePath) {
    fs.writeFileSync(filePath, svg);
    console.log(`SVG saved to: ${filePath}`);
}

const jsonFilePath = path.join(__dirname, 'logoData.json');

if(!fs.existsSync(jsonFilePath)) {
    console.error(`Error: logo data JSON file not found at ${jsonFilePath}`);
    process.exit(1);
}

const logoData = require(jsonFilePath);

const outputFilePath = path.join(__dirname, 'output', 'logo.svg');

if (!fs.existsSync(path.dirname(outputFilePath))) {
    fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });

}

const svgMarkup = generateSVG(logoData);

saveSVGToFile(svgMarkup, outputFilePath);