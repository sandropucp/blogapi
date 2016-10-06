var storyController = function (Story, Comment) {

    var post = function (req, res, next) {
        if (!req.body.title) {
            res.status(400);
            return next('Title is required');
        } else {
            Story.create(req.body, function (err, story) {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                res.status(201);
                res.json(story);
            });
        }
    };

    var getItems = function (req, res, next) {
        var query = {};
        if (req.query.author) {
            query.author = req.query.author;
        }
        if (req.query.tag) {
            query.tags = req.query.tag;
        }        
        Story.find(query, function (err, stories) {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                res.status(200);
                res.json(stories);
            })
            .populate('author')
            .populate('comments.author')
            .exec();
    };

    return {
        post: post,
        getItems: getItems
    };

};

module.exports = storyController;