var app = require('../app.js');

var request = require('supertest');
var expect = require('chai').expect;
var agent = request.agent(app);

describe('## User APIs', () => {
    let userItem = {
        name: 'Sandro Sanchez',
        email: 'sandropucp@gmail.com'
    };

    describe('# POST /api/users', () => {
        it('Should allow a user to be posted and return name and _id', function (done) {
            agent.post('/api/users')
                .send(userItem)
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.name).to.equal(userItem.name);
                    expect(res.body.email).to.equal(userItem.email);
                    userItem = res.body;
                    done();
                });
        })
    });

    describe('# GET /api/users/:userId', () => {
        it('should get user details', (done) => {
            agent.get(`/api/users/${userItem._id}`)
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.name).to.equal(userItem.name);
                    expect(res.body.email).to.equal(userItem.email);
                    done();
                });
        });

        it('should report error with message - Not found, when user does not exists', (done) => {
            agent.get('/api/users/56c787ccc67fc16ccc1a5e92')
                .expect(404)
                .end(function (err, res) {
                    console.log(res.text);
                    expect(res.text).to.equal('no user found');
                    done();
                });
        });
    });

    describe('# PUT /api/users/:userId', () => {
        it('should update user details', (done) => {
            userItem.name = 'KK';            
                agent.put(`/api/users/${userItem._id}`)
                .send(userItem)
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.name).to.equal('KK');
                    expect(res.body.email).to.equal(userItem.email);
                    done();
                });
        });
    });

    describe('# GET /api/users/', () => {
        it('should get all users', (done) => {            
                agent.get('/api/users')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('# DELETE /api/users/', () => {
        it('should delete user', (done) => {            
                agent.delete(`/api/users/${userItem._id}`)
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.equal('Removed');                    
                    done();
                });
        });
    });
});