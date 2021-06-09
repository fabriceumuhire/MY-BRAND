import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import User from '../models/user.model';
import { newUser, wrongUser, wrongPass } from './mock/user.mock';

chai.use(chaiHttp);
chai.should();

describe('Register API', () => {
  it('It should POST new user', async () => {
    await User.deleteMany({});
    chai
      .request(app)
      .post('/api/v1/user/register')
      .send(newUser)
      .end((error, res) => {
        res.should.have.property('status');
        res.body.should.have.property('message');
        res.should.have.status(201);
      });
  });
  it('It should not POST new user(wrong email)', async () => {
    chai
      .request(app)
      .post('/api/v1/user/register')
      .send(wrongUser)
      .end((error, res) => {
        res.should.have.status(400);
      });
  });
  it('It should not POST new user(wrong password)', async () => {
    chai
      .request(app)
      .post('/api/v1/user/register')
      .send(wrongPass)
      .end((error, res) => {
        res.should.have.status(400);
      });
  });
  it('It should not POST existing user', async () => {
    chai
      .request(app)
      .post('/api/v1/user/register')
      .send(newUser)
      .end((error, res) => {
        res.body.should.have.property('error');
        res.should.have.status(400);
      });
  });
  it('It should GET all users', async () => {
    chai
      .request(app)
      .get('/api/v1/user')
      .end((error, res) => {
        res.should.have.status(200);
      });
  });
});
