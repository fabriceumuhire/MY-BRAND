/* const chai = require("chai");
const server = require("../index");
const chaiHttp = require("chai-http");
const { response } = require("../index");
chai.use(chaiHttp);
chai.should();
const {ObjectID} = require("mongodb");
const  { articles } = require("../controllers/articles");

describe("Article API", () => {

  // Get function tests
  describe("GET /api/routes", () => {
    it("It should GET all articles", (done) => {
      chai.request(server)
        .get("/api/routes/articles")
        .end((error,res) => {
            res.should.have.status(200);
            res.body.should.be.a("array");
            res.should.be.json;
        done();
        });
    });
    it("It should not GET any article", (done) => {
      chai.request(server)
        .get("/api/routes/article")
        .end((error,res) => {
            res.should.have.status(404);
        done();
        });
    });
    it("It should GET a single article", (done) => {
      const artID = "5f65ad0bca66312e5ceacc59";
      chai.request(server)
        .get(`/api/routes/articles/${artID}`)
        .end((error,res) => {
          res.should.have.status(200);
          //res.body.should.be.a("array");
        done();
        });
    });
    it("It should not GET article", (done) => {
      const artID = "5f65ad0bca66312e5c555";
      chai.request(server)
        .get(`/api/routes/articles/${artID}`)
        .end((error,res) => {
          res.should.have.status(404);
          //res.body.should.be.a("array");
        done();
        });
    });
  });
  describe("DELETE /api/routes", () => {
    it("It should DELETE a single article", (done) => {
      const artID = "5f70a1d468d03826a8b558f7";
        chai.request(server)
            .delete(`/api/routes/articles/${artID}`)
            .set("auth-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjY5YWU3NGU3OTViZTA5ZDBkYTM4NzEiLCJpYXQiOjE2MDEyMTY4NTF9.Q8eAgmlwQ3eviURHv6IjlN6JNmutQKIcqk4duTrkgXw")
            .end((error,res) => {
              res.should.have.status(204);
              //res.body.should.be.a("array");
            done();
            });
        });
    it("It should not DELETE article not found", (done) => {
      const artID = "5f70a1d468d038268b";
        chai.request(server)
          .delete(`/api/routes/articles/${artID}`)
          .set("auth-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjY5YWU3NGU3OTViZTA5ZDBkYTM4NzEiLCJpYXQiOjE2MDEyMTY4NTF9.Q8eAgmlwQ3eviURHv6IjlN6JNmutQKIcqk4duTrkgXw")
          .end((error,res) => {
            res.should.have.status(404);
            //res.body.should.be.a("array");
          done();
          });
        });
    });
  describe("PATCH /api/routes/article", () => {
    it("It should not PATCH a new article without auth", (done) => {
      const artID = "5f70b52b6d7e9b1a78af7250";
      const article = {
        "title": "JS Performance solution- Updated",
        "content": "Postman is a scalable API testing tool that quickly integrates into CI/CD pipelin.",
      }
      chai.request(server)
        .patch(`/api/routes/articles/${artID}`)
        .field(article)
        .type("form")
        .end((error,res) => {
          res.should.have.status(401);
          //res.body.should.be.a("array");
        done();
        });
    });
    it("It should PATCH a new article with auth", (done) => {
      const artID = "5f70b52b6d7e9b1a78af7250";
      const article = {
        "title": "JS Performance solution- Update",
        "content": "Update: Postman is a scalable API testing tool that quickly integrates into CI/CD pipelin.",
      }
      chai.request(server)
        .patch(`/api/routes/articles/${artID}`)
        .set("auth-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjY5YWU3NGU3OTViZTA5ZDBkYTM4NzEiLCJpYXQiOjE2MDEyMTY4NTF9.Q8eAgmlwQ3eviURHv6IjlN6JNmutQKIcqk4duTrkgXw")
        .field(article)
        .attach("image", "C:/Users/MERCY/Desktop/MY-BRAND/img/ideas.jpg")
        .type("form")
        .end((error,res) => {
          res.should.have.status(200);
          //res.body.should.be.a("array");
        done();
        });
    }); 
  });
  describe("POST /api/routes/article", () => {
    it("It should POST a new article", (done) => {
      const article = {
        "title": "JS Performance solution Array testing",
        "content": "Postman is a scalable API testing tool that quickly integrates into CI/CD pipeline."
      }
      chai.request(server)
        .post("/api/routes/articles")
        .set("auth-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjY5YWU3NGU3OTViZTA5ZDBkYTM4NzEiLCJpYXQiOjE2MDEyMTY4NTF9.Q8eAgmlwQ3eviURHv6IjlN6JNmutQKIcqk4duTrkgXw")
        .field(article)
        .attach("image", "C:/Users/MERCY/Desktop/MY-BRAND/img/ideas.jpg")
        .type("form")
        .end((error,res) => {
          res.should.have.status(200);
          //res.body.should.be.a("array");
          //res.should.be.json;
          
          //res.body.should.be.a("array");
        done();
        });   
    });
    it("It should not POST without token", (done) => {
      const article = {
        "title": "JS Performance solution Array test",
        "content": "Postman is a scalable API testing tool that quickly integrates into CI/CD pipeline."
      }
      chai.request(server)
        .post("/api/routes/articles")
        .field(article)
        .attach("image", "C:/Users/MERCY/Desktop/MY-BRAND/img/ideas.jpg")
        .type("form")
        .end((error,res) => {
          res.should.have.status(401);
          //res.body.should.have.property("message").equall("Not authorization");
          //res.body.should.be.a("array");
          //res.should.be.json;
        done();
        });
    });
    it("It should NOT POST a new article with content length less than 10", (done) => {
        const article = {
          "title": "JS Performance solution A rray test",
          "content": "Postmansdsdsd"
        }
        chai.request(server)
          .post("/api/routes/articles")
          .set("auth-token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjY5YWU3NGU3OTViZTA5ZDBkYTM4NzEiLCJpYXQiOjE2MDEyMTY4NTF9.Q8eAgmlwQ3eviURHv6IjlN6JNmutQKIcqk4duTrkgXw")
          .field(article)
          .attach("image", "C:/Users/MERCY/Desktop/MY-BRAND/img/ideas.jpg")
          .type("form")
          .end((error, res) => {
            res.should.have.status(400);
            //res.body.should.be.a("array");
            //res.should.be.json;
          done();
          });
          //res.body.should.be.a("array");
      });
    });
}); */