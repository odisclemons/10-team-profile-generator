const Employee = require('../lib/employee.js');

describe("Employee", () => {
    describe("getFullName", () => {
        it("should return the fullName property", () => {
            var tempEmployee = new Employee('Jane Doe', '1', "test@test.com");

            expect(tempEmployee.fullName).toEqual("Jane Doe")
        })
    })
})