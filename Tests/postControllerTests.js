var should = require('should'),
    sinon = require('sinon');

describe('Post Controller Tests:', function(){
    describe('Post', function(){
        it('should not allow an empty title on post', function(){
            var Post = function(post){this.save = function(){}};

            var req = {
                body: {
                    author: 'Sandro'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var postController = require('../controllers/postController')(Post);

            postController.post(req,res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        })
    })
})