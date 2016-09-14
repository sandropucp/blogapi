var storyController = function(Story){

    var post = function(req, res){
        var story = new Story(req.body);
        console.log(req.body);    
        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }
        else {
            story.save();
            res.status(201);
            res.send(story);
        }
    }

    var get = function(req,res){
        var query = {};

        if(req.query.author)
        {
            query.author = req.query.author;
        }
        Story.find(query, function(err,stories){
            if(err)
                res.status(500).send(err);
            else {
                var returnStories = [];
                stories.forEach(function(element, index, array){
                    var newStory = element.toJSON();
                    newStory.links= {};
                    newStory.links.self = 'http://' + req.headers.host + '/api/stories/' + newStory._id
                    returnStories.push(newStory);
                });
                res.json(returnStories);
            }
        });
    }

    return {
        post: post,
        get:get
    }
}

module.exports = storyController;