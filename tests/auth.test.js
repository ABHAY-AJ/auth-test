import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from '../app.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Auth', () => {
    it('should register a user', (done) => {
        chai.request(app)
            .post('/api/auth/register')
            .send({ username: 'newuser', email: 'newUser@gmail.com', password: 'newuser@123' })
            .end((err, res) => {
                if (err) {
                    console.error('Registration error:', err);
                    return done(err);
                }
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').eql('User registered');
                done();
            });
    });

    it('should login a user', (done) => {
        chai.request(app)
            .post('/api/auth/login')
            .send({ email: 'newUser@gmail.com', password: 'newuser@123' })
            .end((err, res) => {
                if (err) {
                    console.error('Login error:', err);
                    return done(err);
                }
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').eql('Login successful');
                expect(res.body).to.have.property('token');
                done();
            });
    });

    it('should get profile with valid token', (done) => {
        chai.request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'password123' })
            .end((err, res) => {
                if (err) {
                    console.error('Profile fetch error:', err);
                    return done(err);
                }
                const token = res.body.token;
                chai.request(app)
                    .get('/api/auth/profile')
                    .set('Authorization', `Bearer ${token}`)
                    .end((err, res) => {
                        if (err) {
                            console.error('Profile fetch error:', err);
                            return done(err);
                        }
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.an('object');
                        expect(res.body).to.have.property('message').eql('Profile data');
                        done();
                    });
            });
    });
});
