const Manager = require('../lib/manager');

var tempManager = new Manager('Jane Doe', '1', "test@test.com", 1);

describe("Manager", () => {
    describe("getRole", () => {
        it("should return Manager as role instead of Employee", () => {
            expect(tempManager.getRole()).toEqual("Manager")
        })
    })
})