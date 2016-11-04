const express = require('express');

var route = function (Tag) {
    var tagRouter = express.Router();

    var tagController = require('../controllers/tagController')(Tag);
    tagRouter.route('/')
        .post(tagController.post)
        .get(tagController.getItems);
            
    return tagRouter;
};

module.exports = route;