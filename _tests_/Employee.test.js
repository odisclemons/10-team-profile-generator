const Employee = require('../lib/employee.js');

var tempEmployee = new Employee('Jane Doe', '1', "test@test.com");

describe("Employee", () => {
    describe("getFullName", () => {
        it("should return the fullName property", () => {
            expect(tempEmployee.fullName).toEqual("Jane Doe")
        })
    })

    describe("getId", () => {
        it("should return the id property", () => {
            expect(tempEmployee.id).toEqual("1")
        })
    })

    describe("getEmail", () => {
        it("should return the email property", () => {
            expect(tempEmployee.email).toEqual("test@test.com")
        })
    })

    describe("getRole", () => {
        it("should return the role from the getRole method", () => {
            expect(tempEmployee.getRole()).toEqual("Employee")
        })
    })

})