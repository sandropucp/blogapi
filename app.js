var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;
console.log('Hello from Blog API');
if(process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/blogAPI_test');
}
else{
    db= mongoose.connect('mongodb://localhost/blogAPI');
    //db= mongoose.connect('mongodb://sandro:sandro03@ds044679.mlab.com:44679/bookapi');
}

var app = express();
var port = process.env.PORT || 3001;

var Story = require('./models/storyModel');
storyRouter = require('./routes/storyRoutes')(Story);

var User = require('./models/userModel');
userRouter = require('./routes/userRoutes')(User);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/api/stories', storyRouter); 
app.use('/api/users', userRouter); 

app.get('/', function(req, res){
    res.send('welcome to my Blog API!');
});

app.listen(port, function(){
    console.log('running app on  PORT: ' + port);
});

module.exports = app; 
