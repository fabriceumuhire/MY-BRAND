import chai from "chai";
import server from "../index.js";
import chaiHttp from "chai-http";
import User from "../models/User.js";
// import { it, describe, beforeEach, afterEach } from 'mocha';
chai.use(chaiHttp);
chai.should();
const should = chai.should();
const { expect } = chai;

describe("Register& Login API", () => {
    beforeEach(async () => {
        await User.deleteMany({});
        });
    afterEach(async () => {
        await User.deleteMany({});
    });
    const newUser = {
        name: "Sys Admin",
        email:"sysadm@hello.com",
        password: "$2a$10$UItQ/zZS7.KOHKxBt/kL7eZQVf6FxRLFvthWv5vnzE3XEZFUnK.8S"
    }
    const loginUser = {
        email:"sysadm@hello.com",
        password: "12ggdsce"
    }
    describe("POST /register", () => {
        it("It should POST new user", async() => {
            const res = await chai.request(server)
                            .post("/api/routes/register")
                            .send(newUser);
            expect(res.status).to.equal(201);
            });
        it("It should GET all user", async() => {
            const res = await chai.request(server)
                            .get("/api/routes/register");
            expect(res.status).to.equal(200);
        });
        it("It should not POST wrong email", async() => {
            const registerMockUSer = await User.create(newUser);
            await registerMockUSer.save();
            const res = await chai.request(server)
                                    .post("/api/routes/register")
                                    .send({ ...newUser, email: "sysadm@hello.com" });
            expect(res.status).to.equal(400);
        });
        it("It should not POST wrong email", async() => {
            const registerMockUSer = await User.create(newUser);
            await registerMockUSer.save();
            const res = await chai.request(server)
                                    .post("/api/routes/register")
                                    .send({ ...newUser, password: "e12gg" });
            expect(res.status).to.equal(400);
        });
    });
    describe("POST /login", () => {
        it("It should login", async() => {
            const registerMockUSer = await User.create(newUser);
            await registerMockUSer.save();
            const res = await chai.request(server)
                                    .post("/api/routes/login")
                                    .send(loginUser);
            expect(res.status).to.equal(201);
        });
        it("Login with invalid email", async() => {
            const registerMockUSer = await User.create(newUser);
            await registerMockUSer.save();
            const res = await chai.request(server)
                                    .post("/api/routes/login")
                                    .send({ ...loginUser, email: "sysadmindsq@hello.pom" });
            expect(res.status).to.equal(400);
        });
        it("Login with invalid password", async() => {
            const registerMockUSer = await User.create(newUser);
            await registerMockUSer.save();
            const res = await chai.request(server)
                                    .post("/api/routes/login")
                                    .send({ ...loginUser, password: "2547ddf" });
            expect(res.status).to.equal(400);

        });
    });
});
