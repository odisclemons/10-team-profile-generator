const inq = require('inquirer');

var team = [];
var positions = ["manager", "engineer", "member"]

// returns the html card with each of the provided details filled in
const cardTemplate = ({ position, name, id, email, officeNumber }) => `

<div class="card">
    <div class="card-body">
        <h5 class="card-title">${name}<br />${position}</h5>
        <div class="card-bottom">
            <p>ID: ${id}</p>
            <p>Email: <a href="mailto:${email}">${email}</a></p>
            <p>Office number: ${officeNumber}</p>
        </div>
    </div>
</div>
`;

// function to return array of questions. 
// dynamically insert the position of the team mamber as "position"
const questions = (position) => {
    let tempQuestions =
        [
            {
                type: 'input',
                name: 'name',
                message: `Enter team ${position}'s full name.`,
            },
            {
                type: 'input',
                name: 'id',
                message: `Enter team ${position}'s employee ID.`,
            },
            {
                type: 'input',
                name: 'email',
                message: `Enter team ${position}'s email address.`,
            },
            {
                type: 'input',
                name: 'number',
                message: `Enter team ${position}'s office number.`,
            },

        ]

    // only provide the last question if we're asking about team members
    // this way it will keep looping until there are no team members left to add
    let done = {
        type: 'confirm',
        name: 'done',
        message: "Done?",
        default: false
    }

    return position !== 'member' ? tempQuestions : [...tempQuestions, done]
}


async function init() {
    var i = 0;
    var position;

    var done = false;

    // loop through and keep asking them details until they tell us stop
    // p.s. I just realized inquirer can loop questions.  DOH!
    do {
        // if position is manager or engineer, insert that as their position
        // else, insert "member" for any time we go past the first 2 
        position = i < 2 ? positions[i] : positions[2]

        // await the answers from their prompts
        let answers = await inq.prompt(questions(position))
        done = answers.done
        //append their team position to their answers object
        team.push({ ...answers, position })
        i++
        console.log("=========================================================")
    } while (!done)

    // we're done with questions.  now is the time for action
    // we actually make the page here, is what im getting at
    generatePage()
}

const generatePage = () => {

}


init()