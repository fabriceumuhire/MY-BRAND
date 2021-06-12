import chai from "chai";
import server from "../index.js";
import chaiHttp from "chai-http";
// import { newUser, credentials } from "../controllers/auth.js";
chai.use(chaiHttp);
chai.should();

describe("Register API", () => {
    describe("POST /api/routes", () => {
    /* it("It should POST new user", (done) => {
        const newUser = {
            name: "Sys Admin",
            email:"sysadm@hello.com",
            password: "12ggdsce"
        }
        chai.request(server)
        .post("/api/routes/register")
        .send(newUser)
        .end((error,res) => {
            res.should.have.status(200);
        done();
        });
    });*/
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
        });
        done();
    });
    it("It should not POST new user(wrong password)", (done) => {
        const newUser ={
            name: "Sys Admin7",
            email: "adminsysadm100@hello.com",
            password: "e12gg"
        }
        chai.request(server)
        .post("/api/routes/register")
        .send(newUser)
        .end((error,res) => {
            res.should.have.status(400);
        });
        done();
    });
    it("It should not POST new user(wrong usename)", (done) => {
        const newUser ={
            name: "Sys",
            email: "admi566@hello.com",
            password: "12ggdsce"
        }
        chai.request(server)
        .post("/api/routes/register")
        .send(newUser)
        .end((error,res) => {
            res.should.have.status(400);
        });
        done();
    });
    });
    describe("User login", () => {
    it("Login with invalid password", (done) => {
        const credentials = {
            email: "sysadmin@hello.com",
            password: "12ggdsssss"
        }
        //send request to the app
        chai.request(server)
            .post("/api/routes/login")
            .send(credentials)
            .end((error,res) => {
                res.should.have.status(400);
            });
        done();
        });
    it("Login with invalid email", (done) => {
        const credentials = {
            email: "sysadmin8964@hello.com",
            password: "12ggdsceff"
        }
        //send request to the app
        chai.request(server)
            .post("/api/routes/login")
            .send(credentials)
            .end((error,res) => {
                res.should.have.status(400);
            });
            done();
        });

    it("It should not POST new user(no input )", (done) => {
        const newUser ={ error: "null" }
        chai.request(server)
        .post("/api/routes/register")
        .send(newUser)
        .end((error,res) => {
            res.should.have.status(400);
        });
        done();
    });
    it("It should GET user", (done) => {
        chai.request(server)
        .get("/api/routes/register")
        .end((error,res) => {
            res.should.have.status(200);
        });
        done();
    });
    });
});
