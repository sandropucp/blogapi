var userController = function (User) {

    var post = function (req, res, next) {
        if (!req.body.name) {
            res.status(400);
            res.send('Name is required');
        } else {
            User.create(req.body, function (err, user) {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                res.status(200);
                res.json(user);
            });
        }
    };

    var getItems = function (req, res, next) {
        var query = {};

        if (req.query.email) {
            query.email = req.query.email;
        }
        User.find(query, function (err, users) {
            if (err) {
                res.status(500);
                return next(err);
            }
            res.status(200);
            res.json(users);
        });
    };

    var authentication = function (req, res, next) {
        var query = {};

        if (req.body.email) {
            query.email = req.body.email;
            User.findOne(query, function (err, user) {
                if (err) {
                    res.status(500);
                    return next(err);
                }
                res.status(200);
                res.json(user);
            });
        }
    };

    return {
        post: post,
        getItems: getItems,
        authentication: authentication
    };
};

module.exports = userController;