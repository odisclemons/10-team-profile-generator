// generates the page after questions are answered

const fs = require('fs');
const path = require('path');
const cardTemplate = require('./cardTemplate');
const { seperator } = require('../src/littleHelpers');

const templateFilePath = path.join('src', 'template.html');
const finalHtmlPath = path.join('dist', 'profile.html');

const generatePage = async (team) => {
    // map through each team object and return a card template string, 
    // then join that array of strings into one long one
    let finalTeam = team.map(member => cardTemplate(member)).join('')
    seperator()

    // load contents of the template file
    try {
        var finalHtml = await fs.readFileSync(templateFilePath, 'utf-8')
    }
    catch (err) {
        console.error("Error reading from file: " + err)
        process.exit()
    }

    // replace that comented text with the entire string of generated cards
    finalHtml = finalHtml.replace('<!-- cards go here -->', finalTeam)

    // write the file
    fs.writeFile(finalHtmlPath, finalHtml, (err) => {
        if (err) {
            console.error("Error writing file: " + err)

            return;
        }

        console.log("Successfully generated team profile page!\nYour file is saved as \"profile.html.\"")
    })
}

module.exports = generatePage