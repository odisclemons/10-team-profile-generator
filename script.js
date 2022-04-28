const inq = require('inquirer');

var team = [];
var positions = ["manager", "engineer", "member"]

// const cardTemplate = `

// <div class="card">
//     <div class="card-body">
//         <h5 class="card-title">${name}<br />Manager</h5>
//         <div class="card-bottom">
//             <p>ID: ${id}</p>
//             <p>Email: <a href="mailto:${email}">${email}</a></p>
//             <p>Office number: ${officeNumber}</p>
//         </div>
//     </div>
// </div>
// `;

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
    return position === 'member' ? tempQuestions : [...tempQuestions, done]
}


async function init() {
    var i = 0;
    var position;

    var done = false;

    // loop through and keep asking them details until they tell us stop
    do {
        position = i < 2 ? positions[i] : positions[2]
        let answers = await inq.prompt(questions(position))
        done = answers.done
        team.push(answers)
        console.log(answers)
        i++
    } while (!done)
    // console.log(team)
}


init()