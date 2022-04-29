// function to return array of questions for inquirer
// dynamically insert the position of the team mamber as "position"
const makeQuestions = (position) => {

    // different questions need to be asked to managers vs everybody else
    const commonQuestions = [
        {
            type: 'input',
            name: 'fullName',
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

module.exports = makeQuestions