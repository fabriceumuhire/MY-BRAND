/* const chai = require("chai");
const server = require("../index");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

describe("Register API", () => {
  describe("POST /api/routes", () => {
    it("It should not POST new user", (done) => {
        const newUser ={
            name: "Sys Admin7",
            email: "adminsysadm13@hello.com",
            password: "12ggdsce"
        }
        chai.request(server)
        .post("/api/routes/register")
        .send(newUser)
        .end((error,res) => {
            res.should.have.status(400);
            res.should.be.json;
            //res.body.should.be.a("array");
        done();
        });
    });
    it("It should POST new user", (done) => {
        const newUser ={
            name: "Sys Admin7",
            email: "adminsysadm76@hello.com",
            password: "12ggdsce"
        }
        chai.request(server)
        .post("/api/routes/register")
        .send(newUser)
        .end((error,res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.should.be.json;
        done();
        });
    });
    it("It should not POST new user(wrong email)", (done) => {
        const newUser ={
            name: "Sys Admin7",
            email: "adminsysadm5hello.com",
            password: "12ggdsce"
        }
        chai.request(server)
        .post("/api/routes/register")
        .send(newUser)
        .end((error,res) => {
            res.should.have.status(400);
            // res.should.be.json;
        done();
        });
    });
    it("It should not POST new user(wrong password)", (done) => {
        const newUser ={
            name: "Sys Admin7",
            email: "adminsysadm100@hello.com",
            password: "12ggdsce"
        }
        chai.request(server)
        .post("/api/routes/register")
        .send(newUser)
        .end((error,res) => {
            res.should.have.status(400);
            //res.should.be.json;
        done();
        });
    });
    it("It should not POST new user(wrong usename)", (done) => {
        const newUser ={
            name: "Sys",
            email: "adminsysadm5hello.com",
            password: "12ggdsce"
        }
        chai.request(server)
        .post("/api/routes/register")
        .send(newUser)
        .end((error,res) => {
            res.should.have.status(400);
            //res.should.be.json;
        done();
        });
    });
    it("It should not POST new user(no input )", (done) => {
        const newUser ={ error: "null" }
        chai.request(server)
        .post("/api/routes/register")
        .send(newUser)
        .end((error,res) => {
            res.should.have.status(400);
            // res.should.be.json;
        done();
        });
    });
    it("It should GET user", (done) => {
        chai.request(server)
        .get("/api/routes/register")
        .end((error,res) => {
            res.should.have.status(200);
            //res.should.be.json;
        done();
        });
    });
  });
  describe("User login", () => {
    it("Login with valid input", (done) => {
    //mock invalid user input
    const credentials = {
        email: "adminsysadm46@hello.com",
        password: "12ggdsce"
    }
    //send request to the app
    chai.request(server)
        .post("/api/routes/login")
        .send(credentials)
        .end((error,res) => {
            res.should.have.status(200);
            res.headers.should.have.property("auth-token");
        done();
        });
    });
    it("Login with invalid password", (done) => {
        const credentials = {
            email: "adminsysadm46@hello.com",
            password: "12ggds"
        }
        //send request to the app
        chai.request(server)
            .post("/api/routes/login")
            .send(credentials)
            .end((error,res) => {
                res.should.have.status(400);
                // res.body.should.have.property("error"); 
                //res.should.be.json;
            done();
            });
        });
    it("Login with invalid email", (done) => {
        const credentials = {
            email: "admin8964@hello.com",
            password: "12ggdsce"
        }
        //send request to the app
        chai.request(server)
            .post("/api/routes/login")
            .send(credentials)
            .end((error,res) => {
                res.should.have.status(400);
                // res.body.should.have.property("error");
                //res.should.be.json;
            done();
            });
        });
    });
}); */