const express = require('express');

var route = function (Category) {
    var categoryRouter = express.Router();

    var categoryController = require('../controllers/categoryController')(Category);
    categoryRouter.route('/')     
        .post(categoryController.post)   
        .get(categoryController.getItems);        
    
    return categoryRouter;
};

module.exports = route;