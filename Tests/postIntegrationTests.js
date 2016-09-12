var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    agent = request.agent(app);


describe('Post Crud Test', function(){
    it('Should allow a post to be posted and return a read and _id', function(done){
        var postPost = {title:'new Post', author:'Sandro', content:'Content of post'};

        agent.post('/api/posts')
            .send(postPost)
            .expect(200)
            .end(function(err, results){
                results.body.read.should.not.equal(false);
                results.body.should.have.property('_id');
                done()
            })
    })

    afterEach(function(done){
        Post.remove().exec();
        done();
    })
})