const chai = require("chai");
const server = require("../index");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();

describe("Queries API", () => {
  describe("GET /api/routes", () => {
    it("It should GET all queries", (done) => {
      chai.request(server)
        .get("/api/routes/queries")
        .end((error,res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.should.be.json;
          done();
          });
        });
    });
    it("It should not GET any query", (done) => {
      chai.request(server)
        .get("/api/routes/querie")
        .end((error,res) => {
          res.should.have.status(404);        
        done();
        });
        
    });
  });
  describe("GET /api/routes", () => {
    it("It should GET a single query", (done) => {
      const queryId = "5f5f9b39c529473654a70809";
      chai.request(server)
        .get(`/api/routes/queries/${queryId}`)
        .end((error,res) => {
          res.should.have.status(200);
        done();
        });
    });
    it("It should not GET a single query", (done) => {
      const queryId = "5f5f9b39c5294736";
      chai.request(server)
        .get(`/api/routes/queries/${queryId}`)
        .end((error,res) => {
          if (error) return done(error);
          res.should.have.status(404)
        done();
        });
    });
  });
  describe("POST /api/routes/queries", () => {
    it("It should POST a new query", (done) => {
      const queries = {
        name: "Soul Khalid",
        email: "soul.khalid@gmail.com",
        subject: "JS Performance solution Array testing",
        message: "Postman is a scalable API testing tool that quickly integrates into CI/CD pipeline."
      }
      chai.request(server)
        .post("/api/routes/queries")
        .send(queries)
        .end((error,res) => {
          res.should.have.status(200);
        done();
        });
    });
  });