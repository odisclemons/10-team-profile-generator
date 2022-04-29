const inq = require('inquirer');
const makeQuestions = require('./src/makeQuestions');
const generatePage = require('./src/generatePage');
const { seperator } = require('./src/littleHelpers');

var team = [];

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
        let answers = await inq.prompt(makeQuestions(i === 0 ? 'manager' : ''))

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
    generatePage(team)
}

init()