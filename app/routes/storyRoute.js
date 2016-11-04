const express = require('express');
var {authenticate} = require('../middleware/authenticate');

var route = function (Story, Comment) {//
    var storyRouter = express.Router();

    var storyController = require('../controllers/storyController')(Story, Comment);
    storyRouter.route('/')
        .post(storyController.post)
        .get(authenticate,storyController.getItems);

    storyRouter.use('/:storyId', function (req, res, next) {
        Story.findById(req.params.storyId)
            .populate('author')
            .populate('category')
            .populate('tags')
            .populate('comments.author')
            .then((story) => {
                if (story) {
                    req.story = story;
                    next();
                } else {
                    res.status(404).send('no story found');
                }
            }, (error) => {
                res.status(500).send(error);
            });
    });

    storyRouter.route('/:storyId')
        .get(authenticate,function (req, res) {
            res.status(200).json(req.story);
        })
        .put(function (req, res) {
            req.story.title = req.body.title;
            req.story.body = req.body.body;
            req.story.author = req.body.author;
            req.story.comments = req.body.comments;
            req.story.save()
                .then((story) => {
                    res.status(201).json(req.story);
                }, (error) => {
                    res.status(500).json(error);
                });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.story[p] = req.body[p];
            }

            req.story.save()
                .then((story) => {
                    res.status(201).json(req.story);
                }, (error) => {
                    res.status(500).json(error);
                });
        })
        .delete(function (req, res) {
            req.story.remove().then(() => {
                res.status(200).json('Removed');
            }, (error) => {
                res.status(500).send(error);
            });
        });

    storyRouter.use('/:storyId/comments', function (req, res, next) {
        Story.findById(req.params.storyId)
            .populate('author')
            .populate('category')
            .populate('tags')
            .populate('comments.author')
            .then((story) => {
                if (story) {
                    req.story = story;
                    next();
                } else {
                    res.status(404).send('no story found');
                }
            }, (error) => {
                res.status(500).send(error);
            });
    });

    storyRouter.route('/:storyId/comments')
        .get(function (req, res) {
            res.status(200).json(req.story);
        })
        .post(function (req, res) {
            var comment = new Comment(req.body).populate('author');
            var currentStory = req.story;
            currentStory.comments.push(comment);
            currentStory.save()
                .then((comment) => {
                    //console.log(comment);
                    //res.status(201).json(comment);

                    Story.findById(req.params.storyId)
                        .populate('author')
                        .populate('category')
                        .populate('tags')
                        .populate('comments.author')
                        .then((story) => {
                            console.log(story);
                            res.status(201).json(story);
                        }, (error) => {
                            res.status(500).send(error);
                        });


                }, (error) => {
                    res.status(500).json(error);
                });
        });

    storyRouter.route('/:storyId/comments/:commentId')
        .get(function (req, res) {
            Story.findById(req.params.storyId)
                .then((story) => {
                    var currentStory = story;
                    var index = currentStory.comments
                        .map(comment => comment._id.toString())
                        .indexOf(req.params.commentId);
                    if (index == -1) {
                        res.status(401).send('no comment found');
                    } else {
                        res.status(200);
                        res.json(currentStory.comments[index]);
                    }
                }, (error) => {
                    res.status(500).send(error);
                });
        })
        .delete(function (req, res) {
            Story.findById(req.params.storyId)
                .then((story) => {
                    var currentStory = story;
                    var index = currentStory.comments
                        .map(comment => comment._id.toString())
                        .indexOf(req.params.commentId);
                    if (index == -1) {
                        res.status(401).send('no comment found');
                    } else {
                        currentStory.comments.splice(index, 1);
                        currentStory.save();

                        res.status(200);
                        res.json(currentStory);
                    }
                }, (error) => {
                    res.status(500).send(error);
                });
        });

    return storyRouter;
};

module.exports = route;