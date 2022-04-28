const inq = require('inquirer');
const fs = require('fs');
const path = require('path');

const templateFilePath = path.join(__dirname, 'template.html');
const finalHtmlPath = path.join(__dirname, 'profile.html');

var team = [];
var icons = { manager: '<i class="fas fa-mug-hot"></i>', engineer: '<i class="fas fa-glasses"></i>', intern: '<i class="fas fa-user-graduate"></i>' }

// 1-liner to capitalize words
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)

const seperator = () => console.log("=========================================================")

// returns the html card with each of the provided details filled in
const cardTemplate = ({ position, name, id, email, officeNumber, github, school }) => `

<div class="card">
    <div class="card-body">
        <h5 class="card-title">${name}<br />${icons[position] + capitalize(position)}</h5>
        <div class="card-bottom">
            <p>ID: ${id}</p>
            <p>Email: <a href="mailto:${email}">${email}</a></p>
            ${position === 'manager' ? `<p>Office number: ${officeNumber}</p>` : ''}
            ${position === 'engineer' ? `<p>Github: <a href="https://github.com/${github}" target="_blank">${github}</a></p>` : ''}
            ${position === 'intern' ? `<p>School: <a href="https://google.com/search?q=${school.replace(" ", "+")} target="_blank">${school}</a></p>` : ''}
        </div>
    </div>
</div>
`;

// function to return array of questions. 
// dynamically insert the position of the team mamber as "position"
const questions = (position) => {

    // different questions need to be asked to managers vs everybody else
    const commonQuestions = [
        {
            type: 'input',
            name: 'name',
            message: `Enter ${position === 'manager' ? 'manager' : 'team member'}'s full name.`,
        },
        {
            type: 'input',
            name: 'id',
            message: `Enter employee ID.`,
        },
        {
            type: 'input',
            name: 'email',
            message: `Enter email address.`,
        },
    ]

    const onlyManagers = [{
        type: 'input',
        name: 'officeNumber',
        message: `Enter office number.`,
    }
    ]

    const everybodyElse =
        [
            {
                type: 'list',
                name: 'position',
                message: `Team member's position?`,
                choices: [{ name: "engineer", value: "engineer" }, { name: "intern", value: "intern" }]
            },
            {
                type: 'input',
                name: 'github',
                message: `Github username.`,
                when(answers) {
                    return answers.position === 'engineer'
                }
            },
            {
                type: 'input',
                name: 'school',
                message: `School name`,
                when(answers) {
                    return answers.position === 'intern'
                }
            },
            {
                type: 'confirm',
                name: 'done',
                message: "Done?",
                default: false
            }
        ]

    // if user is manager give them common questions and onlyMangers 
    // otherwise give them the everybodyElse array 
    return position === 'manager' ? [...commonQuestions, ...onlyManagers] : [...commonQuestions, ...everybodyElse]
}


async function init() {
    var i = 0;

    var done = false;

    // loop through and keep asking them details until they tell us stop
    // p.s. I just realized inquirer can loop questions.  DOH!
    do {
        // the first time, we pass 'manager' as position.
        // after that we can loop and ask what type of team member until theyre done

        // await the answers from their prompts
        // on the first loop, pass manager as position.
        let answers = await inq.prompt(questions(i === 0 ? 'manager' : ''))

        // if they're a manager, add this key manually since it wont be set by inquirer
        if (i === 0) answers.position = 'manager';
        done = answers.done

        //add them to the list
        team.push(answers)
        i++
        seperator()
    } while (!done)

    // we're done with questions.  now is the time for action
    // we actually make the page here, is what im getting at
    generatePage()
}

const generatePage = async () => {
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


init()