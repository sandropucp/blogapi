'use strict';

var app = require('../../server.js');

var request = require('supertest');
var expect = require('chai').expect;
var agent = request.agent(app);

describe('## Story APIs', () => {
    let storyItem = {
        title: 'Node JS',
        body: 'Node JS is a JavaScript runtime built on Chromes V8 JavaScript engine'
    };

    let commentItem = {
        body: 'Node JS is cool'
    };

    describe('# POST /api/stories', () => {
        it('Should allow a story to be posted and return  title and body', function (done) {
            agent.post('/api/stories')
                .send(storyItem)
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.title).to.equal(storyItem.title);
                    expect(res.body.body).to.equal(storyItem.body);
                    storyItem = res.body;
                    done();
                });
        })
    });

    describe('# GET /api/stories/:storyId', () => {
        it('should get story details', (done) => {
            agent.get(`/api/stories/${storyItem._id}`)
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.title).to.equal(storyItem.title);
                    expect(res.body.body).to.equal(storyItem.body);
                    done();
                });
        });

        it('should report error with message - Not found, when story does not exists', (done) => {
            agent.get('/api/stories/56c787ccc67fc16ccc1a5e92')
                .expect(404)
                .end(function (err, res) {
                    console.log(res.text);
                    expect(res.text).to.equal('no story found');
                    done();
                });
        });
    });

    describe('# PUT /api/stories/:storyId', () => {
        it('should update story details', (done) => {
            storyItem.title = 'KK';
            agent.put(`/api/stories/${storyItem._id}`)
                .send(storyItem)
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.title).to.equal('KK');
                    expect(res.body.body).to.equal(storyItem.body);
                    done();
                });
        });
    });

    describe('# GET /api/stories/', () => {
        it('should get all stories', (done) => {
            agent.get('/api/stories')
                .expect(200)
                .end(function (err, res) {
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('# POST /api/stories/:storyId/comments', () => {
        it('Should allow a comment to be posted and return  body and _id', function (done) {
            agent.post(`/api/stories/${storyItem._id}/comments`)
                .send(commentItem)
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.comments[0].body).to.equal(commentItem.body);
                    commentItem = res.body.comments[0];
                    done();
                });
        })
    });

    describe('# GET /api/stories/:storyId/comments/:commentId', () => {
        it('should get comment details', (done) => {
            agent.get(`/api/stories/${storyItem._id}/comments/${commentItem._id}`)
                .expect(200)
                .end(function (err, res) {
                    expect(res.body.body).to.equal(commentItem.body);
                    done();
                });
        });

        it('should report error with message - Not found, when comment does not exists', (done) => {
            agent.get(`/api/stories/${storyItem._id}/comments/56c787ccc67fc16ccc1a5e92`)
                .expect(401)
                .end(function (err, res) {
                    console.log(res.text);
                    expect(res.text).to.equal('no comment found');
                    done();
                });
        });
    });

    describe('# DELETE /api/stories/:storyId/comments/:commentId', () => {
        it('should delete story', (done) => {
            agent.delete(`/api/stories/${storyItem._id}/comments/${commentItem._id}`)
                .expect(200)
                .end(function (err, res) {
                    //expect(res.text).to.equal('Removed');
                    done();
                });
        });
    });

    describe('# DELETE /api/stories/', () => {
        it('should delete story', (done) => {
            agent.delete(`/api/stories/${storyItem._id}`)
                .expect(200)
                .end(function (err, res) {
                    expect(res.text).to.equal('Removed');
                    done();
                });
        });
    });

});