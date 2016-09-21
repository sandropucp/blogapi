var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;
console.log('Hello from Blog API');
if (process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/blogAPI_test');
}
else {
    db = mongoose.connect('mongodb://localhost/blogAPI');    
}

var app = express();
var port = process.env.PORT || 3001;

var Story = require('./app/models/storyModel');
var Comment = require('./app/models/commentModel');
storyRouter = require('./app/routes/storyRoutes')(Story, Comment);

var User = require('./app/models/userModel');
userRouter = require('./app/routes/userRoutes')(User);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/stories', storyRouter);
app.use('/api/users', userRouter);

app.get('/', function (req, res) {
    res.send('welcome to my Blog API!');
});

app.use(function (err, req, res, next) {
    // treat as 404
    if (err.message
        && (~err.message.indexOf('not found')
            || (~err.message.indexOf('Cast to ObjectId failed')))) {
        return next();
    }

    console.error(err.stack);

    if (err.stack.includes('ValidationError')) {
        res.status(422).render('422', { error: err.stack });
        return;
    }

    // error page
    res.status(500).render('500', { error: err.stack });
});

// assume 404 since no middleware responded
app.use(function (req, res) {
    res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
    });
});

app.listen(port, function () {
    console.log('running app on  PORT: ' + port);
});

module.exports = app; 
