var assert = require('assert')
var userController = require('./../../app/controllers/UserController')

describe("UserController", () => {
    describe("index", () => {
        it("Should throw errors", () => {
            try {
                assert.equal(2, 3);
            } catch (e) {
                console.log(e);
            }
        })
    })


});

// describe("GET /",()=>{
//     it("responds with Hello unigether",(done)=>{
//         request(app).get("/").expect("Hello unigether",done);
//     })
// })