const express = require('express');

var route = function (User) {
    var userRouter = express.Router();

    var userController = require('../controllers/userController')(User);
    userRouter.route('/')
        .post(userController.post)
        .get(userController.getItems);

    userRouter.route('/authentication')
        .post(userController.authentication);

    userRouter.use('/:userId', function (req, res, next) {
        User.findById(req.params.userId)
            .then((user) => {
                if (user) {
                    req.user = user;
                    next();
                } else {
                    res.status(404).send('no user found');
                }
            }, (error) => {
                res.status(500).send(error);
            });
    });

    userRouter.route('/:userId')
        .get(function (req, res) {
            res.status(200).json(req.user);
        })
        .put(function (req, res) {
            req.user.name = req.body.name;
            req.user.email = req.body.email;
            req.user.password = req.body.password;
            req.user.birthYear = req.body.birthYear;

            req.user.save()
                .then((user) => {
                    res.status(201).json(req.user);
                }, (error) => {
                    res.status(500).json(error);
                });
        })
        .patch(function (req, res) {
            if (req.body._id)
                delete req.body._id;

            for (var p in req.body) {
                req.user[p] = req.body[p];
            }

            req.user.save()
                .then((user) => {
                    res.status(201).json(req.user);
                }, (error) => {
                    res.status(500).json(error);
                });
        })
        .delete(function (req, res) {
            req.user.remove()
                .then(() => {
                    res.status(200).json('Removed');
                }, (error) => {
                    res.status(500).send(error);
                });
        });


    return userRouter;
};

module.exports = route;