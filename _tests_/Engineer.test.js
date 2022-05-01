const Engineer = require('../lib/engineer');

var tempEngineer = new Engineer('Jane Doe', '1', "test@test.com", "testgithub");

describe("Engineer", () => {
    describe("getGithub", () => {
        it("should return the value of the school property", () => {
            expect(tempEngineer.getGithub()).toEqual("testgithub")
        })
    })

    describe("getRole", () => {
        it("should return 'Engineer' as role instead of Employee", () => {
            expect(tempEngineer.getRole()).toEqual("Engineer")
        })
    })
})