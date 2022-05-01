const Employee = require('./employee');

class Intern extends Employee {
    constructor(fullName, id, email, school) {
        super(fullName, id, email)
        this.school = school
    }

    getSchool() {
        return this.school
    }

    getRole() {
        return "Intern"
    }
}

module.exports = Intern