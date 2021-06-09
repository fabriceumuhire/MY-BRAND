import chai from 'chai';
import chaiHttp from 'chai-http';
import { async } from 'regenerator-runtime';
import app from '../app';
import User from '../models/user.model';
import {
  newUser,
  wrongUser,
  wrongPass,
  logginUser,
} from './mock/user.mock';

chai.use(chaiHttp);
chai.should();

describe('User login', () => {
  before(async () => {
    await User.create(logginUser);
  });
  const mockUser = {
    email: 'test@login.rw',
    password: 'Test1234',
  };
  it('User should login', (done) => {
    // eslint-disable-next-line no-unused-vars
    // send request to the app
    chai
      .request(app)
      .post('/api/v1/user/login')
      .send(mockUser)
      .end((error, res) => {
        res.should.have.status(200);
      });
    done();
  });
  it('Login with invalid password', (done) => {
    const wrongPassword = {
      email: newUser.email,
      password: wrongPass.password,
    };
    // send request to the app
    chai
      .request(app)
      .post('/api/v1/user/login')
      .send(wrongPassword)
      .end((error, res) => {
        res.should.have.status(401);
      });
    done();
  });
  it('Login with invalid email', (done) => {
    const errorEmail = {
      email: wrongUser.email,
      password: newUser.password,
    };
    // send request to the app
    chai
      .request(app)
      .post('/api/v1/user/login')
      .send(errorEmail)
      .end((error, res) => {
        res.should.have.status(401);
      });
    done();
  });
});
