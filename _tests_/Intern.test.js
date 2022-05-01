const Intern = require('../lib/intern');

var tempIntern = new Intern('Jane Doe', '1', "test@test.com", "Harvard University");

describe("Intern", () => {
    describe("getSchool", () => {
        it("should return the value of the school property", () => {
            expect(tempIntern.getSchool()).toEqual("Harvard University")
        })
    })

    describe("getRole", () => {
        it("should return 'Intern' as role instead of Employee", () => {
            expect(tempIntern.getRole()).toEqual("Intern")
        })
    })
})