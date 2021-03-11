import chai from 'chai';
import chaiHttp from 'chai-http';
import Query from '../models/query.model';
import server from '../app';

chai.use(chaiHttp);
chai.should();

let queryId;

describe('Queries API', () => {
  it('It should POST a new query', async () => {
    await Query.deleteMany({});
    const queries = {
      name: 'Soul Khalid',
      email: 'soul.khalid@gmail.com',
      subject: 'JS Performance solution Array testing',
      message:
        'Postman is a scalable API testing tool that quickly integrates into CI/CD pipeline.',
    };
    chai
      .request(server)
      .post('/api/v1/query')
      .send(queries)
      .end((error, res) => {
        res.should.have.status(201);
        queryId = res.body.data._id;
      });
  });
  it('It should GET all queries', async () => {
    chai
      .request(server)
      .get('/api/v1/query')
      .end((error, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        // res.should.be.json;
      });
  });
  it('It should not GET any query', async () => {
    chai
      .request(server)
      .get('/api/routes/querie')
      .end((error, res) => {
        res.should.have.status(404);
      });
  });
  it('It should GET a single query', async () => {
    chai
      .request(server)
      .get(`/api/v1/query/${queryId}`)
      .end((error, res) => {
        res.should.have.status(200);
      });
  });
  it('It should not GET a single query', async () => {
    const invalidId = '5f5f9b39c5294736';
    chai
      .request(server)
      .get(`/api/v1/query/${invalidId}`)
      .end((error, res) => {
        if (error) return done(error);
        res.should.have.status(500);
      });
  });
});
