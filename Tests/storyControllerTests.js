var should = require('should'),
    sinon = require('sinon');

describe('Story Controller Tests:', function(){
    describe('Post', function(){
        it('should not allow an empty title on post', function(){
            var Story = function(story){
                this.save = function(){}
            };

            var req = {
                body: {
                    author: 'Sandro'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var storyController = require('../controllers/storyController')(Story);
            storyController.post(req,res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        }),
        it('should allow only title on post', function(){
            var Story = function(story){
                this.save = function(){}
            };

            var req = {
                body: {
                    title: 'Story Title'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var story1 = new Story(req.body);

            var storyController = require('../controllers/storyController')(Story);
            storyController.post(req,res);

            res.status.calledWith(201).should.equal(true, 'Good Status ' + res.status.args[0][0]);
            //res.send.calledWith('Title is required').should.equal(false);
            //res.send.calledWith(story).should.equal('Story Title');
        })
    })
})