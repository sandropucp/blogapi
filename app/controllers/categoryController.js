var categoryController = function (Category) {

    var post = function (req, res) {
        if (!req.body.name) {
            res.status(400).json("Name is required");
        } else {
            Category.create(req.body)
                .then((category) => {
                    res.status(201).json(category);
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
        Category.find(query)
            .then((categories) => {
                res.status(200).json(categories);
            }, (error) => {
                res.status(400).send(error);
            });
    };

    return {
        post: post,
        getItems: getItems
    };
};

module.exports = categoryController;