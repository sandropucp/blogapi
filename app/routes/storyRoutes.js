var express = require('express');

var _ = require('lodash');

var routes = function (Story, Comment) {
    var storyRouter = express.Router();

    var storyController = require('../controllers/storyController')(Story, Comment);
    storyRouter.route('/')
        .post(storyController.post)
        .get(storyController.getItems);

    storyRouter.use('/:storyId', function (req, res, next) {
        Story.findById(req.params.storyId, function (err, story) {
                if (err) {
                    res.status(500).send(err);
                } else if (story) {
                    req.story = story;
                    next();
                } else {
                    res.status(404).send('no story found');
                }
            })
            .populate('author')
            .populate('comments.author')
            .exec();
    });

    storyRouter.route('/:storyId')
        .get(function (req, res) {
            res.status(200);
            res.json(req.story);
        })
        .put(function (req, res) {
            req.story.title = req.body.title;
            req.story.body = req.body.body;
            req.story.author = req.body.author;
            req.story.comments = req.body.comments;
            req.story.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.story);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.story[p] = req.body[p];
            }

            req.story.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.story);
                }
            });
        })
        .delete(function (req, res) {
            req.story.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(200).send('Removed');
                }
            });
        });

    storyRouter.use('/:storyId/comments', function (req, res, next) {
        Story.findById(req.params.storyId, function (err, story) {
            if (err) {
                res.status(500).send(err);
            } else if (story) {
                req.story = story;
                next();
            } else {
                res.status(404).send('no story found');
            }
        });
    });

    storyRouter.route('/:storyId/comments')
        .post(function (req, res) {
            var comment = new Comment(req.body);
            var currentStory = req.story;
            currentStory.comments.push(comment);
            currentStory.save(function (err, commentresult) {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                res.status(200);
                res.json(commentresult);
            });
        });

    storyRouter.route('/:storyId/comments/:commentId')
        .get(function (req, res) {
            Story.findById(req.params.storyId, function (err, story) {
                if (err) {
                    res.status(500).send(err);
                } else if (story) {
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
                } else {
                    res.status(401).send('no story found');
                }
            });
        })
        .delete(function (req, res) {
            Story.findById(req.params.storyId, function (err, story) {
                if (err) {
                    res.status(500).send(err);
                } else if (story) {
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

                } else {
                    res.status(401).send('no story found');
                }
            });
        });

    return storyRouter;
};

module.exports = routes;