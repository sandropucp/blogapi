var should = require('should'),
    request = require('supertest'),
    app = require('../app.js'),
    mongoose = require('mongoose'),
    Story = mongoose.model('Story'),
    agent = request.agent(app);


describe('Story Crud Test', function(){
    it('Should allow a story to be posted and return a read and _id', function(done){
        var postStory = {title:'new Story', body:'Content of story'};

        agent.post('/api/stories')
            .send(postStory)
            .expect(201)
            .end(function(err, results){
                //results.body.read.should.not.equal(false)
                results.body.title.should.equal('new Story');
                results.body.should.have.property('_id');
                done()
            })
    })

    afterEach(function(done){
        Story.remove().exec();
        done();
    })
})