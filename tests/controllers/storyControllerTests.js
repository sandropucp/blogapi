'use strict';

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var _ = require('lodash');

var reqFactory = {
    create: function (overwrites) {
        var defaults = {
            body: {
                title: 'Node JS',
                body: 'Node JS is a JavaScript runtime built on Chromes V8 JavaScript engine'
            },
            params: {},
            query: {},
        };
        return _.extend(defaults, overwrites);
    }
};

describe('storyController', function () {
    var controller, req, res, next, Story;

    beforeEach(function () {
        Story = {
            create: sinon.stub(),
            find: sinon.stub(),
            findById: sinon.stub(),
            save: sinon.stub()
        };
        req = reqFactory.create();
        res = {
            json: sinon.spy(),
            status: sinon.spy(),
            send: sinon.spy()
        };
        next = sinon.spy();
        controller = require('../../app/controllers/storyController')(Story);
    });

    describe('#post', function () {

        it('should create a story from request body', function () {
            controller.post(req, res, next);
            expect(Story.create).to.have.been.calledOnce;
            expect(Story.create).to.have.been.calledWith(req.body);
        });

        it('should respond with created story on success', function () {
            var result = { id: 1, title: req.body.title, body: req.body.body };
            Story.create.callsArgWith(1, null, result);
            controller.post(req, res, next);
            expect(res.json).to.have.been.calledOnce;
            expect(res.status).to.have.been.calledWith(201);
            expect(res.json).to.have.been.calledWith(result);
        });

        it('should ruturn by calling next with an error on failure', function () {
            Story.create.callsArgWith(1, { err: 'err' }, null);
            controller.post(req, res, next);
            expect(next).to.have.been.calledOnce;
            expect(next).to.have.been.calledWith({ err: 'err' });
            expect(res.json).to.have.not.been.called;
        });
    });

    describe('#getItems', function () {
        it('should find stories', function () {
            controller.getItems(req, res, next);
            expect(Story.find).to.have.been.called;
        });

        it('should respond with find result on success', function () {
            Story.find.callsArgWith(1, null, [{ title: 'Node JS' }]);
            controller.getItems(req, res, next);
            expect(res.json).to.have.been.calledWith([{ title: 'Node JS' }]);
            expect(res.status).to.have.been.calledWith(200);
            expect(next).to.have.not.beenCalled;
        });

        it('should return by calling next with an error on failure', function () {
            Story.find.callsArgWith(1, { err: 'some error' }, null);
            controller.getItems(req, res, next);
            expect(next).to.have.been.calledWith({ err: 'some error' });
            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.not.been.called;
        });
    }); 
});