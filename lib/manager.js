const Employee = require('./employee')
class Manager extends Employee {
    constructor(officeNumber) {
        super(fullName, id, email)
    }

    getRole() {
        return "Manager"
    }
}