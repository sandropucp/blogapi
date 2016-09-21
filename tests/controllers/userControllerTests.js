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
                name: 'Sandro Sanchez',
                email: 'sandropucp@gmail.com'
            },
            params: {},
            query: {},
        };
        return _.extend(defaults, overwrites);
    }
};

describe('userController', function () {
    var controller, req, res, next, User;

    beforeEach(function () {
        User = {
            create: sinon.stub(),
            find: sinon.stub(),
            findById: sinon.stub()
        };
        req = reqFactory.create();
        res = {
            json: sinon.spy(),
            status: sinon.spy(),
            send: sinon.spy()
        };
        next = sinon.spy();
        controller = require('../../app/controllers/userController')(User);
    });

    describe('#post', function () {

        it('should create a user from request body', function () {
            controller.post(req, res, next);
            expect(User.create).to.have.been.calledOnce;
            expect(User.create).to.have.been.calledWith(req.body);
        });

        it('should respond with created user on success', function () {
            var result = { id: 1, name: req.body.name, email: req.body.email };
            User.create.callsArgWith(1, null, result);
            controller.post(req, res, next);
            expect(res.json).to.have.been.calledOnce;
            expect(res.status).to.have.been.calledWith(204);
            expect(res.json).to.have.been.calledWith(result);
        });

        it('should ruturn by calling next with an error on failure', function () {
            User.create.callsArgWith(1, { err: 'err' }, null);
            controller.post(req, res, next);
            expect(next).to.have.been.calledOnce;
            expect(next).to.have.been.calledWith({ err: 'err' });
            expect(res.json).to.have.not.been.called;
        });
    });

    describe('#getItems', function () {
        it('should find stories', function () {
            controller.getItems(req, res, next);
            expect(User.find).to.have.been.called;
        });

        it('should respond with find result on success', function () {
            User.find.callsArgWith(1, null, [{ name: 'Sandro Sanchez' }]);
            controller.getItems(req, res, next);
            expect(res.json).to.have.been.calledWith([{ name: 'Sandro Sanchez' }]);
            expect(res.status).to.have.been.calledWith(200);
            expect(next).to.have.not.beenCalled;
        });

        it('should return by calling next with an error on failure', function () {
            User.find.callsArgWith(1, { err: 'some error' }, null);
            controller.getItems(req, res, next);
            expect(next).to.have.been.calledWith({ err: 'some error' });
            expect(res.status).to.have.been.calledWith(500);
            expect(res.json).to.have.not.been.called;
        });
    });

});