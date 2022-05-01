const Employee = require('./employee')

class Manager extends Employee {
    constructor(fullName, id, email, officeNumber) {
        super(fullName, id, email)
        this.officeNumber = officeNumber
    }

    getRole() {
        return "Manager"
    }
}

module.exports = Manager