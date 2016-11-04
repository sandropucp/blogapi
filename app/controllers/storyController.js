var storyController = function (Story, Comment) {

    var post = function (req, res) {
        if (!req.body.title) {
            res.status(400).json("Title is required");
        } else {
            Story.create(req.body)
                .then((story) => {
                    res.status(201).json(story);
                }, (error) => {
                    res.status(500).json(error);
                });
        }
    };

    var getItems = function (req, res, next) {
        var query = {};

        if (req.query.author) {
            query.author.id = req.query.author;
        }
        if (req.query.tag) {
            query.tags = {
                $in: [req.query.tag]
            };
        }
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.search) {                     
            query.title = new RegExp(req.query.search, "i");
        }
        console.log(query);
        Story.find(query)
            .populate('author')
            .populate('category')
            .populate('tags')
            .populate('comments.author')
            .then((stories) => {
                res.status(200).json(stories);
            }, (error) => {
                res.status(400).send(error);
            });
    };

    return {
        post: post,
        getItems: getItems
    };
};

module.exports = storyController;
