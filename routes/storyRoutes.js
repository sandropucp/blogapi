var express = require('express');

var routes = function(Story){
    var storyRouter = express.Router();

    var storyController = require('../controllers/storyController')(Story)
    storyRouter.route('/')
        .post(storyController.post)
        .get(storyController.get);

    storyRouter.use('/:storyId', function(req,res,next){
        Story.findById(req.params.storyId, function(err,story){
            if(err)
                res.status(500).send(err);
            else if(story)
            {
                req.story = story;
                next();
            }
            else
            {
                res.status(404).send('no story found');
            }
        });
    });
    storyRouter.route('/:storyId')
        .get(function(req,res){

            var returnStory = req.story.toJSON();

            returnStory.links = {};
            var newLink = 'http://' + req.headers.host + '/api/stories/?author=' + returnStory.author;
            returnStory.links.FilterByThisAuthor = newLink.replace(' ', '%20');
            res.json(returnStory);

        })
        .put(function(req,res){
            req.story.title = req.body.title;
            req.story.body = req.body.body;
            req.story.author = req.body.author;
            req.story.comments = req.body.comments;          
            req.story.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.story);
                }
            });
        })
        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.story[p] = req.body[p];
            }

            req.story.save(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.json(req.story);
                }
            });
        })
        .delete(function(req,res){
            req.story.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            });
        });
    return storyRouter;
};

module.exports = routes;