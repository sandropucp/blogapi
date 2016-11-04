var tagController = function (Tag) {

    var post = function (req, res) {
        if (!req.body.name) {
            res.status(400).json("Name is required");
        } else {
            Tag.create(req.body)
                .then((tag) => {
                    res.status(201).json(tag);
                }, (error) => {
                    res.status(500).json(error);
                });
        }
    };

    var getItems = function (req, res) {
        var query = {};

        if (req.query.name) {
            query.name = req.query.name;
        }
        Tag.find(query)
            .then((tags) => {
                res.status(200).json(tags);
            }, (error) => {
                res.status(400).send(error);
            });
    };

    return {
        post: post,
        getItems: getItems
    };
};

module.exports = tagController;
