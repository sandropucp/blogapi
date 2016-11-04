const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const _ = require('lodash');

var Comment = require('./app/models/commentModel');
var User = require('./app/models/userModel');
var Tag = require('./app/models/tagModel');
var Category = require('./app/models/categoryModel');
var Story = require('./app/models/storyModel');

require('dotenv').config({silent: true});

var app = express();
var port = process.env.PORT || 3001;

var db;
console.log('Hellos from Blog API');
console.log('process.env.ENV: ' + process.env.ENV);

mongoose.Promise = global.Promise;
if (process.env.ENV == 'Test') {    
    db = mongoose.connect(process.env.DB_CONNECTIONSTRING);
}
else {    
    db = mongoose.connect(process.env.DB_CONNECTIONSTRING);
}

storyRoute = require('./app/routes/storyRoute')(Story, Comment);
userRoute = require('./app/routes/userRoute')(User);
tagRoute = require('./app/routes/tagRoute')(Tag);
categoryRoute = require('./app/routes/categoryRoute')(Category);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('welcome to my Blog API!!');
});

app.use('/api/stories', storyRoute);
app.use('/api/users', userRoute);
app.use('/api/tags', tagRoute);
app.use('/api/categories', categoryRoute);

app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message && (~err.message.indexOf('not found') || (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
        res.status(422);
        res.send({
            message: '422',
            error: err.stack
        });
        return;
    }

    // error page
    res.status(500).send('500', { error: err.stack });
});

// assume 404 since no middleware responded
app.use(function (req, res) {
    res.status(404);
    res.send({
        url: req.originalUrl,
        error: 'Not found'
    });
});

app.listen(port, function () {
    console.log('running app on  PORT: ' + port);
});

module.exports = app; 
